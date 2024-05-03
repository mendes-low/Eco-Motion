import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';
import { COLORS } from '../../Utils/Colors';
import { Ionicons } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
	useWarmUpBrowser();

	const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
	const onPress = async () => {
		try {
			const { createdSessionId, signIn, signUp, setActive } =
				await startOAuthFlow();

			if (createdSessionId) {
				setActive({ session: createdSessionId });
			} else {
				// Use signIn or signUp for next steps such as MFA
			}
		} catch (err) {
			console.error("OAuth error", err);
		}
	}
	return (
		<View
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100%',
			}}
		>
			<View style={{ padding: 20 }}>
				<Text style={styles.TextLogo}>Eco-motion</Text>
				<Text style={styles.TextLogo}>Move Greener Live Cleaner</Text>
				<TouchableOpacity style={styles.button}
					onPress={onPress}
				>
					<Ionicons name="logo-google" size={24} color={COLORS.WHITE} />
					<Text style={styles.buttonText}>Login with your Google Account</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	logoImage: {
		with: 200,
		height: 200,
		ObjectFit: 'contain',
	},
	TextLogo: {
		fontFamily: 'outfi',
		color: COLORS.GRAY,
		fontSize: 40,
	},
	button: {
		backgroundColor: COLORS.PRIMARY,
		padding: 16,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 15,
		borderRadius: 99,
		marginTop: 20,
	},
	buttonText: {
		color: COLORS.WHITE,
		textAlign: 'center',
		fontFamily: 'outfi',
		fontSize: 17,
	},
})
