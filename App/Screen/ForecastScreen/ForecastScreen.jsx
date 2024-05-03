import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Platform, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CITY_LIST from '../../Utils/city.json';
import Pannel from './Pannel';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../Utils/Colors';

export const baseUrl = 'https://api.openweathermap.org/data/2.5/air_pollution';
export const apiKey = 'b9fd81042ae048bc2e5a4b72d0e66e54';

export default function ForecastScreen() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(CITY_LIST);

  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setData();
    const cityData = items.filter((val) => val.city === value);
    if (cityData.length > 0) {
      setLat(cityData[0].lat);
      setLng(cityData[0].lng);
    }
  }, [items, value]);

  useEffect(() => {
    const apiCalling = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/forecast?lat=${lat}&lon=${lng}&appid=${apiKey}`,
        );
        const json = await response.json();
        setData(json.list);
        setError(null);
      } catch (err) {
        setError(err);
      }
    };
    if (lat && lng) {
      apiCalling(lat, lng);
    }
  }, [lat, lng]);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.appName}>Air Quality ForeCast</Text>
        <View style={{
          minHeight: open && Platform.OS === 'android' ? 250 : 0,
        }}
        >
          <DropDownPicker
            open={open}
            searchable
            searchPlaceholder="Type to get the city"
            searchTextInputStyle={{
              borderWidth: 0,
              fontWeight: '700',
            }}
            searchContainerStyle={{
              paddingVertical: 15,
              borderBottomColor: COLORS.ACCENT,
            }}
            placeholder="Select a city"
            placeholderStyle={{
              color: COLORS.DARKGREY,
            }}
            containerStyle={{
              margin: 15,
              width: SIZES.width - 30,
            }}
            labelStyle={{
              color: COLORS.PRIMARY_FORECAST,
              fontWeight: 'bold',
              fontSize: SIZES.h3,
            }}
            listItemLabelStyle={{
              color: COLORS.PRIMARY_FORECAST,
              fontWeight: '700',
            }}
            showTickIcon={false}
            dropDownContainerStyle={{
              borderColor: COLORS.PRIMARY_FORECAST,
            }}
            ArrowUpIconComponent={() => <Ionicons name="chevron-up-sharp" size={20} color={COLORS.PRIMARY} />}
            ArrowDownIconComponent={() => <Ionicons name="chevron-down-sharp" size={20} color={COLORS.PRIMARY} />}
            value={value}
            items={items.map(({ city }) => ({
              label: city,
              value: city,
            }))}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
      </View>
      {
        data ? (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View>
                <Pannel data={item} />
              </View>
            )}
          />
        ) : (
          <View style={styles.noData}>
            <Text style={styles.noDataTxt}>
              {!value ? ' - No Data - ' : 'Data loading...'}
            </Text>
          </View>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    paddingBottom: 15,
    zIndex: 400,
    elevation: 400,
  },
  appName: {
    color: COLORS.WHITE,
    paddingTop: 50,
    fontWeight: 'bold',
    fontSize: SIZES.h2,
  },
  noData: {
    marginTop: 100,
    alignItems: 'center',
  },
  noDataTxt: {
    color: COLORS.BLACK,
    fontSize: SIZES.h2,
    fontWeight: 'bold',
  },
});