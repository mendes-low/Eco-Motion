import React, { useContext, useEffect, useState } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { SelectMarkerContext } from '../../Context/SelectMarkerContext'
import { UserLocationContext } from '../../Context/UserLocationContext'
import GlobalApi from '../../Utils/GlobalApi'
import AppMapView from './AppMapView'
import PlaceListView from './PlaceListView'
import SearchBar from './SearchBar'

export default function HomeSreen() {
	const { location, setLocation } = useContext(UserLocationContext)
	const [placeList, setPlaceList] = useState([])
	const [selectedMarker, setSelectedMarker] = useState(0)
	useEffect(() => {
		location && GetNearByPlace()
	}, [location])
	const GetNearByPlace = () => {
		const data = {
			includedTypes: ['park'],
			maxResultCount: 10,
			locationRestriction: {
				circle: {
					center: {
						latitude: location?.latitude,
						longitude: location?.longitude,
					},
					radius: 5000.0,
				},
			},
		}
		GlobalApi.NewNearByPlace(data).then(res => {
			// console.log('====================', JSON.stringify(res.data))
			setPlaceList(res.data?.places)
		})
	}
	return (
		<SelectMarkerContext.Provider value={{ selectedMarker, setSelectedMarker }}>
			<View>
				<View style={styles.headerContainer}>
					<SearchBar label='Origin' onPlaceSelected={() => {}} />
					<SearchBar label='Destination' onPlaceSelected={() => {}} />
				</View>
				<AppMapView placeList={placeList} />
				<View style={styles.placeListContainer}>
					{placeList && <PlaceListView placeList={placeList} />}
				</View>
				<StatusBar style='auto' />
			</View>
		</SelectMarkerContext.Provider>
	)
}
const styles = StyleSheet.create({
	headerContainer: {
		position: 'absolute',
		zIndex: 10,
		padding: 10,
		width: '100%',
		paddingHorizontal: 20,
		backgroundColor: 'grey',
		borderRadius: 20,
		color: 'white',
	},
	placeListContainer: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		zIndex: 10,
	},
})
