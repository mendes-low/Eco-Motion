import { View, Text, Image, ImageBackground, StyleSheet, FlatList, Pressable } from 'react-native'
import { useUser, useAuth } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'

export default function ProfileSreen() {
	const { user } = useUser()
	const { isLoaded, signOut } = useAuth();

	const menu = [
		{
			id: 1,
			icon: 'pencil',
			title: user?.fullName,
			onPress: () => { }
		},
		{
			id: 2,
			icon: 'mail',
			title: user?.primaryEmailAddress?.emailAddress,
			onPress: () => { }
		},
		{
			id: 3,
			icon: 'location',
			title: 'Location',
			onPress: () => { }
		},
		{
			id: 4,
			icon: 'log-out',
			title: 'Log out',
			onPress: () => signOut()
		}
	]

	return (
		<View style={styles.container}>
			<ImageBackground source={require('../../../assets/images/profile-bg.png')} style={styles.bgImage}>
				<View style={styles.header}>

					<View style={styles.headerTop}>
						<Image source={{ uri: user?.imageUrl }} style={{ width: 80, height: 80, borderRadius: 100 }} />
						<Text style={styles.fullname}>{user?.fullName}</Text>
					</View>

					<FlatList
						data={menu}
						style={{
							backgroundColor: 'white',
							borderRadius: 15,
						}}
						renderItem={({ item }) => (
							<Pressable
								key={item.id}
								onPress={() => item.id === 4 && item.onPress()}
								style={[
									styles.headerItem,
									item.id === 4 && styles.headerLastItem
								]}
							>
								<Ionicons name={item.icon} size={25} color="#5D5D5D" />
								<Text style={{ color: '#5D5D5D', fontSize: 18 }}>{item.title}</Text>
							</Pressable>
						)}
					/>

				</View>
			</ImageBackground >
		</View >
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#e7e7e7',
	},
	header: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '90%',
		marginTop: 150,
		gap	: 50,
	},
	headerTop: {
		flexDirection: 'column',
		alignItems: 'center',
	},
	headerBottom: {
		flexDirection: 'column',
		alignItems: 'start',
		backgroundColor: 'white',
	},
	headerItem: {
		flexDirection: 'row',
		justifyContent: 'start',
		alignItems: 'center',
		gap: 15,
		width: '100%',
		padding: 15,
		borderBottomColor: '#BCBCBC',
		borderBottomWidth: 1,
	},
	headerLastItem: {
		borderBottomWidth: 0,
		paddingBottom: '-30px',
	},
	bgImage: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100%',
		height: '65%'
	},
	fullname: {
		color: 'white',
		fontSize: 24,
		fontWeight: '900',
		marginTop: 5,
	},
})
