import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, ImageBackground, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function Splash_screen({ navigation }) {

  useEffect(() => {
    getdata()
  }, [])
  const dispatch = useDispatch();
  const getdata = async () => {
    setTimeout(() => {
        navigation.navigate("Login")

    // var Response = await AsyncStorage.getItem('token')
    // // navigation.navigate("login")
    // setTimeout(() => {
    //   if (!Response) {
    //     navigation.navigate("login")
    //   }

    //   else {
    //     apitrigger()
    //     navigation.navigate("Sidemenu")
    //   }
    }, 1000)
  }
  const apitrigger = async () => {
    var Response = await AsyncStorage.getItem('token')


  }
  const data = "white"
  return (
    <View style={{ flex: 1, backgroundColor: "white", justifyContent: "center" }} >
      <StatusBar backgroundColor="#000000"  barStyle="light-content" />
      <Image source={require("../../Assets/logo.jpg")} style={{ width: 260, height: 260, alignSelf: "center",resizeMode:"contain" }} />
    </View>
  )
}


