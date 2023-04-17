import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, Dimensions, ImageBackground, FlatList } from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-gesture-handler';
import { loginObjelector } from '../../Slices/login';
import database from '@react-native-firebase/database';

export default function Screen1({ navigation }) {
    const dispatch = useDispatch();
    const { loginObj } = useSelector(loginObjelector)
    const [modalVisible, setModalVisible] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(()=>{
        const reference = database().ref('/history');
        reference.on('value', snapshot => {
            console.log('User data: ', snapshot.val());
            const data = snapshot.val();
            if(data){
                const userHistory = Object.values(data).filter(e=>e.from == loginObj.id || e.to == loginObj.id)
                setHistory(userHistory)
            }
            else{

            }
        
        });
    },[])

    const data = "white"
    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../../Assets/left.png")} style={styles.back} />
                </TouchableOpacity>

                <Image source={require("../../Assets/settings.png")} style={styles.setting} />
            </View>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#ca80f0', '#8b4dff', '#3778fd']} style={styles.linearGradient}>
                <Text style={{ color: "white" }}>TOTAL BALANCE</Text>
                <Text style={{ color: "white", marginTop: 20, fontSize: 25 }}>$ {loginObj.amount}</Text>
            </LinearGradient>
            {/* <ScrollView> */}
            <FlatList
              data={history}
              renderItem={({ item, index }) => (
                <Card style={{ width: "85%", height: 80, alignSelf: "center", marginTop: 20, flexDirection: "row", alignItems: 'center', }}>
                    <Text style={{ color: "black", marginLeft: 15 }}>Mar , 24</Text>
                    <View style={item.from == loginObj.id?{ backgroundColor: "red", height: 10, width: 10, borderRadius: 55, marginLeft: 15 }:{ backgroundColor: "green", height: 10, width: 10, borderRadius: 55, marginLeft: 15 }}></View>
                    <View style={{ flexDirection: "column" }}>
                        
                        <Text style={{ color: "black", marginLeft: 15 }}>{item.from == loginObj.id?"Sended":"Income"}</Text>
                        <Text style={{ color: "black", marginLeft: 15 }}>{item.from == loginObj.id?`${item.amount} in deposit`:`Received ${item.amount} in deposit`}</Text>
                    </View>
                </Card>
                    )
                }
              />
            {/* </ScrollView> */}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>

                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeview} >
                        <Image style={styles.clsimg} source={require('../../Assets/close.png')} />
                    </TouchableOpacity>
                    <Card style={styles.modalcard} >
                        <Text style={{ fontSize: 18, fontWeight: '800', marginLeft: 15 ,color:"black"}}>Amount</Text>
                        <TextInput style={{ width: "90%", height: 50, borderBottomWidth: 1, marginLeft: 20, marginTop: 10 }}></TextInput>
                        <Text style={{ fontSize: 18, fontWeight: '800', marginTop: 25, marginLeft: 15 }}>Description</Text>
                        <TextInput multiline textAlignVertical='top' style={{ width: "90%", height: 150, borderWidth: 1, marginLeft: 20, marginTop: 10 }}></TextInput>
                        <TouchableOpacity >
                            <View style={styles.add}>
                                <Text style={styles.addtext}>ADD</Text>
                            </View>
                        </TouchableOpacity>
                    </Card>

                </View>
            </Modal>

            <View style={styles.footview}>
                <TouchableOpacity onPress={() => navigation.navigate("Screen3")}>
                    <View style={styles.footone}>
                        <Image style={styles.footimg} source={require("../../Assets/card.png")} />
                        <Text style={styles.foottext} >HOME</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.footone}>
                        <Image style={styles.footimg} source={require("../../Assets/wallet.png")} />
                        <Text style={styles.foottext} >MY CARDS</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Screen4")}>
                    <View style={styles.footone}>
                        <Image style={styles.footimg} source={require("../../Assets/user.png")} />
                        <Text style={styles.foottext} >PROFILE</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}


