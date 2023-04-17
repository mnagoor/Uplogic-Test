import React, {useEffect} from 'react';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splashscreen from './Splashscreen';
import Login from './Login';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import Screen4 from './Screen4';
import { v4 as uuidv4 } from 'uuid';

const Stack = createStackNavigator();
function Screens(props) {

  useEffect(() => {
    const uniqueId = uuidv4();
    console.log(uniqueId, "uniqueIdApp")
  }, [])
  
    return( 
    <NavigationContainer>
      <Stack.Navigator >
      <Stack.Screen name="Splashscreen" component={Splashscreen} options={{headerShown:false}}  />
      <Stack.Screen name="Screen1" component={Screen1} options={{headerShown:false}}  />
      <Stack.Screen name="Screen2" component={Screen2} options={{headerShown:false}}  />
      <Stack.Screen name="Screen3" component={Screen3} options={{headerShown:false}}  />
      <Stack.Screen name="Screen4" component={Screen4} options={{headerShown:false}}  />
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}  />
      
  
      </Stack.Navigator>

    </NavigationContainer>
    )
}
export default Screens;