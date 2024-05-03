import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Screen/HomeScreen/HomeSreen';
import ChatScreen from '../Screen/ChatSсreen/ChatSсreen';
import ProfileSreen from '../Screen/ProfileSсreen/ProfileSсreen';
import ForecastScreen from '../Screen/ForecastScreen/ForecastScreen';
import { COLORS } from '../Utils/Colors';

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

export default class TabNavigation extends Component {
	render() {
		return (
			<Tab.Navigator
				screenOptions={{
					headerShown: true,
					headerTintColor: COLORS.PRIMARY,
					headerStyle: {
						height: 70,
					},
				}}
			>
				<Tab.Screen
					name='Home'
					component={HomeScreen}
					options={{
						tabBarLabel: 'Map',
						tabBarActiveTintColor: COLORS.PRIMARY,
						tabBarIcon: ({ color, size }) => (
							<Ionicons name='map' size={size} color={color} />
						),
					}}
				/>
				<Tab.Screen
					name='MotionAI'
					component={ChatScreen}
					options={{
						tabBarLabel: 'MotionAI',
						tabBarActiveTintColor: COLORS.PRIMARY,
						tabBarIcon: ({ color, size }) => (
							<Ionicons name='chatbox-sharp' size={size} color={color} />
						),
					}}
				/>
				<Tab.Screen
					name='Forecast'
					component={ForecastScreen}
					options={{
						tabBarLabel: 'Forecast',
						tabBarActiveTintColor: COLORS.PRIMARY,
						tabBarIcon: ({ color, size }) => (
							<Ionicons name='cloudy' size={size} color={color} />
						),
					}}
				/>
				<Tab.Screen
					name='Profile'
					component={ProfileSreen}
					options={{
						tabBarLabel: 'Profile',
						tabBarActiveTintColor: COLORS.PRIMARY,
						tabBarIcon: ({ color, size }) => (
							<MaterialIcons name='account-circle' size={size} color={color} />
						),
					}}
				/>
			</Tab.Navigator>
		)
	}
}
