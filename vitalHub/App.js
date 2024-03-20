import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { login } from './src/screens/Login/Login';

const Stack = createNativeStackNavigator();

import { useFonts, MontserratAlternates_600SemiBold, MontserratAlternates_500Medium, MontserratAlternates_700Bold } from "@expo-google-fonts/montserrat-alternates";
import { Quicksand_500Medium, Quicksand_600SemiBold, Quicksand_400Regular } from '@expo-google-fonts/quicksand';
import { Account } from './src/screens/Account/Account';
import { Recover } from './src/screens/Recover/Recover';
import { EmailCode } from './src/screens/EmailCode/EmailCode';
import { Reset } from './src/screens/Reset/Reset';
import { Profile } from './src/screens/Profile/Profile';
import { Home } from './src/screens/Home/Home';
import { SelectClinic } from './src/screens/SelectClinic/SelectClinic';
import { SelectDoctor } from './src/screens/SelectDoctor/SelectDoctor';
import { SelectDate } from './src/screens/SelectData/SelectDate';
import { LocalAppointment } from './src/screens/LocalAppointment/LocalAppointment';
import { ViewPrescription } from './src/screens/ViewPrescription/ViewPrecription';
import { Main } from './src/screens/Main/Main';
import { LogBox } from 'react-native';
import { ViewRecord } from './src/screens/ViewRecord/ViewRecord';
import { InsertRecord } from './src/screens/InsertRecord/InsertRecord';
import Camera from './src/screens/Camera/Camera';
import CameraScreen from './src/screens/Camera/Camera';

// LogBox.ignoreAllLogs()
LogBox.ignoreLogs(['Warning: ...'])

export default function App() {


  const[fontsLoaded, fontsError] = useFonts({
    MontserratAlternates_600SemiBold, MontserratAlternates_500Medium, MontserratAlternates_700Bold, Quicksand_500Medium, Quicksand_600SemiBold, Quicksand_400Regular
  })

  if (!fontsLoaded && !fontsError) {
    return null
  }
  
  return (
 
    <NavigationContainer>

      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>

        
        <Stack.Screen 
        name='Login'
        component={login}
        options={{ title: 'Login' }}        
        />

        <Stack.Screen
        name="Main"
        component={Main}
        />


        <Stack.Screen 
        name='Account'
        component={Account}
        options={{ title: 'Account' }}        
        />

        <Stack.Screen 
        name='Recover'
        component={Recover}
        options={{ title: 'Recover' }}        
        /> 
        
        <Stack.Screen 
        name='EmailCode'
        component={EmailCode}
        options={{ title: 'EmailCode' }}        
        />   

        <Stack.Screen 
        name='Reset'
        component={Reset}
        options={{ title: 'Reset' }}        
        />  

        <Stack.Screen 
        name='Profile'
        component={Profile}
        options={{ title: 'Profile' }}        
        />  

         <Stack.Screen 
        name='Home'
        component={Home}
        options={{ title: 'Home' }}        
        />     

         <Stack.Screen 
        name='ViewRecord'
        component={ViewRecord}
        options={{ title: 'ViewRecord' }}        
        />  

         <Stack.Screen 
        name='InsertRecord'
        component={InsertRecord}
        options={{ title: 'InsertRecord' }}        
        />  

         <Stack.Screen 
        name='SelectClinic'
        component={SelectClinic}
        options={{ title: 'SelectClinic' }}        
        />   

         <Stack.Screen 
        name='SelectDoctor'
        component={SelectDoctor}
        options={{ title: 'SelectDoctor' }}        
        />   

         <Stack.Screen 
        name='SelectDate'
        component={SelectDate}
        options={{ title: 'SelectDate' }}        
        />   

         <Stack.Screen 
        name='LocalAppointment'
        component={LocalAppointment}
        options={{ title: 'LocalAppointment' }}        
        />   

         <Stack.Screen 
        name='ViewPrescription'
        component={ViewPrescription}
        options={{ title: 'ViewPrescription' }}        
        />   

         <Stack.Screen 
        name='CameraScreen'
        component={CameraScreen}
        options={{ title: 'CameraScreen' }}        
        />   
      </Stack.Navigator>

    </NavigationContainer>
  );
}

