import  React ,{ useEffect} from 'react';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import { configureStore } from '@reduxjs/toolkit'
import Screens from './App/Screens/index'
import  {Provider}  from 'react-redux';
import rootReducer from './App/Slices'
// import PushNotification from "react-native-push-notification";

const store = configureStore({reducer:rootReducer})
const App =() => {


    return( 
        <Provider store={store} >
         <Screens/>
        </Provider>
    )
}
export default App;