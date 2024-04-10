import { Button, View } from 'react-native';

export const Navigation = ({ navigation }) => {
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Button
				title="Login"
				onPress={() => navigation.navigate('Login')}
			/>
			<Button
				title="ViewPrescription"
				onPress={() =>
					navigation.navigate('ViewPrescription')
				}
			/>
		</View>
	);
};
