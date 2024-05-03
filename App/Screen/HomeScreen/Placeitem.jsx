import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import GlobalApi from '../../Utils/GlobalApi';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../../Utils/Colors';
;
export default function Placeitem({ place }) {
    const PLACE_PHOTO_BASE_URL = 'https://places.googleapis.com/v1/'

    return (
        <View
            style={{
                backgroundColor: COLORS.WHITE,
                margin: 5,
                borderRadius: 16,
                width: Dimensions.get('screen').width,
            }}
        >
            <LinearGradient colors={['transparent', '#ffffff']}>
                <Image
                    source={
                        place?.photos
                            ? {
                                uri:
                                    PLACE_PHOTO_BASE_URL +
                                    place?.photos[0]?.name +
                                    '/media?key=' +
                                    GlobalApi.API_KEY +
                                    '&maxHeightPx=800&maxWidthPx=1200',
                            }
                            : require('./../../../assets/images/ev-charging.png')

                    }
                    style={{ width: '100%', height: 150, zIndex: -1, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                />
                <View style={{ width: '100%', position: 'absolute', bottom: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 9, height: 100 }}  >
                    <View style={{ padding: 15 }}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                            }}
                        >
                            {place.displayName.text}
                        </Text>
                        <Text
                            style={{
                                color: COLORS.GRAY,
                                fontSize: 13,
                            }}
                        >
                            {place?.shortFormattedAddress}
                        </Text>
                    </View>
                    <View style={{ padding: 15 }}>
                        <View style={{ backgroundColor: COLORS.PRIMARY, padding: 10, borderRadius: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesome name="location-arrow"
                                size={20} color="white" />

                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}
