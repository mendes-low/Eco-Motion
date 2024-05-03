import Constants from 'expo-constants'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { Text } from 'react-native-paper'
export default function SearchBar({ label, onPlaceSelected, placeholder }) {
	return (
		<View >
			{/* <Header /> */}
			<Text style={styles.Header}>{label}</Text>
			<GooglePlacesAutocomplete
				styles={{ textInput: styles.input }}
				placeholder={placeholder || ''}
				fetchDetails
				onPress={(data, details = null) => {
					onPlaceSelected(details)
				}}
				query={{
					key: 'AIzaSyBjQUnN-LxdwBooU3FJqY_Kz3GNqryRf8U',
					language: 'en',
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	Header:{
		color:"white",
	},
	searchContainer: {
		position: 'absolute',
		width: '90%',
		backgroundColor: 'white',
		shadowColor: 'black',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 4,
		elevation: 4,
		padding: 8,
		borderRadius: 8,
		top: Constants.statusBarHeight,
	},
	input: {
		borderColor: '#888',
		borderWidth: 1,
	},
})
