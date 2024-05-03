import React, { useContext } from 'react'
import { Image } from 'react-native'
import { Marker } from 'react-native-maps'
import { SelectMarkerContext } from '../../Context/SelectMarkerContext'

export default function Markers({ index, place }) {
	// console.log('place', place)
	const {selectedMarker,setSelectedMarker} = useContext(SelectMarkerContext)
	return (
		place && (
			<Marker
				coordinate={{
					latitude: place.location?.latitude,
					longitude: place.location?.longitude,
				}}
				onPress={() => {
					setSelectedMarker(index)
				}}
			>
				<Image source={require('./../../../assets/images/marker-selected.png')} 
			style={{width:60,height:60}}
		/>
			</Marker>
		)
	)
}
