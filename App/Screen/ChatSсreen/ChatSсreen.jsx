import React, { useState, useEffect } from "react";
import * as GoogleGenerativeAI from "@google/generative-ai";
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator } from "react-native";

export default function ChatScreen() {
	const [messages, setMessages] = useState([]);
	const [userInput, setUserInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [chatStarted, setChatStarted] = useState(false);

	const API_KEY = "AIzaSyA-RiB6nvzquymNr4YPUXcfMY3LQd2pxJ4";

	useEffect(() => {
		if (chatStarted) {
			const startChat = async () => {
				const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
				const model = genAI.getGenerativeModel({ model: "gemini-pro" });
				const result = await model.generateContent("");
				const response = result.response;
				const text = response.text();
				setMessages((prevMessages) => [
					...prevMessages,
					{
						text,
						user: false,
					},
				]);
			};
			startChat();
		}
	}, [chatStarted]);

	const sendMessage = async () => {
		setLoading(true);
		const userMessage = { text: userInput, user: true };
		setMessages((prevMessages) => [...prevMessages, userMessage]);

		const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
		const model = genAI.getGenerativeModel({ model: "gemini-pro" });
		const prompt = userMessage.text;
		const result = await model.generateContent(prompt);
		const response = result.response;
		const text = response.text();
		setMessages((prevMessages) => [...prevMessages, { text, user: false }]);
		setLoading(false);
		setUserInput("");
		setChatStarted(true);
	};

	const ClearMessage = () => {
		setMessages([]);
		setChatStarted(false);
	};

	const renderMessage = ({ item }) => (
		<View style={[styles.messageContainer, item.user ? styles.userMessage : styles.botMessage]}>
			<Text style={styles.messageText}>{item.text}</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={messages.reverse()}
				renderItem={renderMessage}
				keyExtractor={(item, index) => index.toString()}
				inverted
			/>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Type a message"
					onChangeText={setUserInput}
					value={userInput}
					onSubmitEditing={sendMessage}
					style={styles.input}
					placeholderTextColor="#fff"
				/>
				{loading && <ActivityIndicator size="small" color="black" style={styles.loader} />}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#ffff", },
	messageContainer: { padding: 10, marginVertical: 5 },
	messageText: { fontSize: 16, color: "#fff" },
	inputContainer: { flexDirection: "row", alignItems: "center", padding: 10 },
	input: {
		flex: 1,
		padding: 10,
		backgroundColor: "#0bc224",
		borderRadius: 10,
		height: 50,
		color: "white",
	},
	botMessage: { backgroundColor: "black", alignSelf: "flex-start", margin: 10, width: '80%' },
	userMessage: { backgroundColor: "#0bc224", alignSelf: "flex-end", margin: 10, width: '80%' },
	loader: { marginLeft: 10 },
});
