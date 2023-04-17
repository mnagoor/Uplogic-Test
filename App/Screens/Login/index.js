import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, ImageBackground, StatusBar } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Card } from 'react-native-shadow-cards';
import Toast from 'react-native-simple-toast';

import { useDispatch, useSelector } from 'react-redux';
import database from '@react-native-firebase/database';
import { getloginObj } from '../../Slices/login';

export default function Login({ navigation }) {
    const dispatch = useDispatch();

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const signIn = () => {
        const reference = database().ref('/users');
        reference.on('value', snapshot => {
            console.log('User data: ', snapshot.val());
            const users = snapshot.val();
            const checkUser = users.find(e => e.email == email.toLowerCase() && e.password == password)
            console.log(checkUser, email, 'checkUser')
            if (checkUser) {
                dispatch(getloginObj(checkUser))
                navigation.navigate("Screen1")
                // Toast.show("Logged in Successfully", Toast.SHORT);

            } else {
                Toast.show("Logged in Failed", Toast.SHORT);

            }

        });

    }
    useEffect(() => {
        // getdata()

    }, [])

    const data = "white"
    return (
        <View style={{ flex: 1, backgroundColor: "#EFF0F9", justifyContent: 'center', }} >

            <Text style={{ color: "#000000", textAlign: "center", fontSize: 30, fontWeight: "500", }}>Hello Again!</Text>
            <Text style={{ color: "#000000", textAlign: "center", fontSize: 16, fontWeight: "400", lineHeight: 19, marginTop: 20 }}>Welcome back you’ve been {'\n'} missed!</Text>

            <View style={{ width: "80%", height: 56, backgroundColor: "#FFFFFF", borderRadius: 8, alignSelf: "center", marginTop: 30 }}>


                <TextInput style={{ width: "100%", height: 56, marginLeft: 15,color:"black" }} placeholder='Enter Email'
                    value={email} placeholderTextColor={'#A3A3A3'} onChangeText={(text) => setemail(text)}></TextInput>
            </View>

            <View style={{ width: "80%", height: 56, backgroundColor: "#FFFFFF", borderRadius: 8, alignSelf: "center", marginTop: 20, flexDirection: "row", alignItems: "center" }}>
                <TextInput style={{ width: "85%", height: 56, marginLeft: 15,color:"black" }} placeholder='Password'
                    placeholderTextColor={'#A3A3A3'} onChangeText={(text) => setpassword(text)} value={password}></TextInput>
                <Image source={require("../../Assets/eyeof.png")} style={{ width: 20, height: 20, resizeMode: "contain", }} />
            </View>
            <Text style={{ color: "#A3A3A3", fontSize: 12, fontWeight: "400", lineHeight: 19, marginTop: 10, marginLeft: "67%" }}>Forgot Password</Text>
            <TouchableOpacity onPress={() => signIn()}>
                <Card style={{ width: "80%", height: 56, backgroundColor: "#0A1E3F", borderRadius: 12, alignSelf: "center", marginTop: 30, justifyContent: 'center', alignItems: "center" }}>
                    <Text style={{
                        fontSize: 16, fontWeight: "500", color: "#FFFFFF"
                    }}>Sign In</Text>
                </Card>
            </TouchableOpacity>

        </View>
    )
}


