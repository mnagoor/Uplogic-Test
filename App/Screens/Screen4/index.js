
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, ImageBackground, StatusBar } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import "react-native-get-random-values";
import { loginObjelector } from '../../Slices/login';
export default function Screen4({ navigation }) {
    const [qrValue, setQrValue] = useState(null);
    // const uniqueId = uuidv4();
  const { loginObj } = useSelector(loginObjelector)

    // console.log(uniqueId, "screen4unique")
    useEffect(() => {
        setQrValue(loginObj.qr);
    }, [])

    const data = "white"
    return (
        <View style={{ flex: 1, backgroundColor: "white", }} >
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image source={require("../../Assets/left.png")} style={styles.back} />
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", width: "100%", height: "90%" }}>
                {qrValue && <QRCode value={qrValue} size={200} />}
            </View>
        </View>
    )
}


