import { View, Text, FlatList, Dimensions } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import Placeitem from './Placeitem'
import { SelectMarkerContext } from '../../Context/SelectMarkerContext'

export default function PlaceListView({ placeList }) {
    // console.log('placeList', placeList)
    const flatListRef = useRef(null)

    const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext)
    useEffect(() => {
        // scrollToIndex(1)
        selectedMarker && scrollToIndex(selectedMarker)
    }, [selectedMarker])

    const scrollToIndex = (index) => {
        flatListRef.current?.scrollToIndex({ index, animated: true })
    }

    const getItemLayout = (_, index) => ({
        length: Dimensions.get('window').width,
        offset: Dimensions.get('window').width * index,
        index
    })

    return (
        <View>
            <FlatList
                data={placeList}
                horizontal={true}
                pagingEnabled
                ref={flatListRef}

                getItemLayout={getItemLayout}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View key={index}>
                        <Placeitem place={item} />
                    </View>
                )}
            />
        </View>
    )
}
