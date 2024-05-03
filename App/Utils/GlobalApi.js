import axios from 'axios'

const BASE_URL = 'https://places.googleapis.com/v1/places:searchNearby'
const API_KEY = 'AIzaSyBjQUnN-LxdwBooU3FJqY_Kz3GNqryRf8U'

const config = {
	headers: {
		'Content-Type': 'application/json',
		'X-Goog-Api-Key': API_KEY,
		'X-Goog-FieldMask': [
			"places.nationalPhoneNumber",
			'places.displayName',
			'places.formattedAddress',
			"places.shortFormattedAddress",
			'places.location',
			'places.evChargeOptions',
			'places.photos',
		],
	},
}

const NewNearByPlace = (data) => axios.post(BASE_URL,data,config)
export default{
	NewNearByPlace,
	API_KEY,
}
