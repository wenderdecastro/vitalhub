import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
	MontserratAlternates_500Medium,
	MontserratAlternates_600SemiBold,
	MontserratAlternates_700Bold,
	useFonts,
} from "@expo-google-fonts/montserrat-alternates";
import {
	Quicksand_400Regular,
	Quicksand_500Medium,
	Quicksand_600SemiBold,
} from "@expo-google-fonts/quicksand";
import { NavigationContainer } from "@react-navigation/native";
import { Navigation } from "./src/screens/navigation/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "./src/screens/authentication/LoginScreen";
import { ForgotPasswordScreen } from "./src/screens/authentication/ForgotPasswordScreen";
import { ResetPasswordScreen } from "./src/screens/authentication/ResetPasswordScreen";
import { RegisterScreen } from "./src/screens/authentication/RegisterScreen";
import { EmailConfirmationScreen } from "./src/screens/authentication/EmailConfirmationScreen";

const Stack = createNativeStackNavigator();


export default function App() {
	// load fonts
	let [fontsLoaded, fontError] = useFonts({
		MontserratAlternates_500Medium,
		MontserratAlternates_600SemiBold,
		MontserratAlternates_700Bold,
		Quicksand_400Regular,
		Quicksand_500Medium,
		Quicksand_600SemiBold,
	});

	// abort if font error 
	if (!fontsLoaded && fontError) return null;

	return (
		//involves the structure of navigation
		<NavigationContainer>
		{/* Navigation component */}
		<Stack.Navigator>
		  <Stack.Screen 
			//screen name
			name='Navigation'
			//component that will be called
			component={Navigation}
			//screen title
			options={{title: 'Navigation'}}
		  />
		  <Stack.Screen 
			name='Login'
			component={LoginScreen}
			options={{title: 'Login', headerShown: false}}
		  />
		  <Stack.Screen 
			name='ForgotPassword'
			component={ForgotPasswordScreen}
			options={{title: 'ForgotPassword', headerShown: false}}
		  />
		  <Stack.Screen 
			name='ResetPassword'
			component={ResetPasswordScreen}
			options={{title: 'ResetPassword', headerShown: false}}
		  />
		  <Stack.Screen 
			name='Register'
			component={RegisterScreen}
			options={{title: 'CreateAccount', headerShown: false}}
		  />

		  <Stack.Screen 
			name='EmailConfirmation'
			component={EmailConfirmationScreen}
			options={{title: 'CreateAccount', headerShown: false}}
		  />
  
		</Stack.Navigator>
	  </NavigationContainer>
	);
}
