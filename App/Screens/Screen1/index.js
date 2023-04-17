import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, Dimensions, ImageBackground, StatusBar } from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-gesture-handler';
import moment from 'moment/moment';
import database from '@react-native-firebase/database';
import { getloginObj, loginObjelector } from '../../Slices/login';

export default function Screen1({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [amountset,setamount]=useState("")
    const [description,setdescription]=useState("")
    const { loginObj } = useSelector(loginObjelector)
    const dispatch = useDispatch();

    const data = "white"
    useEffect(()=>{

    },[])
    const updateAmount = () =>{
        const upCost=Number(loginObj.amount)+Number(amountset);
        const reference = database().ref('/users/'+(loginObj.id));
        reference.update({
            amount: upCost
          })
          .then(() => {
       
            dispatch(getloginObj({...loginObj,amount:upCost}))
            setamount("")
            setModalVisible(false)
          })
    }
    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <Image source={require("../../Assets/left.png")} style={styles.back} />
              <TouchableOpacity onPress={()=>navigation.navigate("Screen2")}>
                <Image source={require("../../Assets/settings.png")} style={styles.setting} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#ca80f0', '#8b4dff', '#3778fd']} style={styles.linearGradient}>
                    <Text style={{ color: "white" }}>My Balance</Text>
                    <Text style={{ color: "grey", marginTop: 5, fontSize: 13 }}>{moment(new Date()).format("DD-MM-YYYY")}</Text>
                    <Text style={{ color: "white", marginTop: 20, fontSize: 25 }}>$ {loginObj.amount}</Text>
                    <Text style={{ color: "grey", marginTop: 20, fontSize: 13 }}>TOTAL BALANCE</Text>
                </LinearGradient>

                <Card style={styles.card}>
                    <Image source={require("../../Assets/wallet.png")} style={styles.cardimg} />
                    <View style={styles.line}></View>
                    <View style={styles.cardview}>
                        <Text style={styles.cardhead}>Money Cash</Text>
                        <Text style={styles.cardsec}>Money in your wallet</Text>
                    </View>
                    <Text style={styles.cardprice}>-$35.00</Text>
                </Card>

                <Card style={styles.card}>
                    <Image source={require("../../Assets/card.png")} style={styles.cardimg} />
                    <View style={styles.line}></View>
                    <View style={styles.cardview}>
                        <Text style={styles.cardhead}>Debit Card</Text>
                        <Text style={styles.cardsec}>**** **** **** 3568</Text>
                    </View>
                    <Text style={styles.cardprice}>-$25.00</Text>
                </Card>

                <Card style={styles.card}>
                    <Image source={require("../../Assets/bank.png")} style={styles.cardimg} />
                    <View style={styles.line}></View>
                    <View style={styles.cardview}>
                        <Text style={styles.cardhead}>Money Cash</Text>
                        <Text style={styles.cardsec}>**** **** **** 1564</Text>
                    </View>
                    <Text style={styles.cardprice}>-$55.00</Text>
                </Card>

                <Card style={styles.card}>
                    <Image source={require("../../Assets/card.png")} style={styles.cardimg} />
                    <View style={styles.line}></View>
                    <View style={styles.cardview}>
                        <Text style={styles.cardhead}>Money Cash</Text>
                        <Text style={styles.cardsec}>**** **** **** 4865</Text>
                    </View>
                    <Text style={styles.cardprice}>-$15.00</Text>
                </Card>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <View style={styles.add}>
                        <Text style={styles.addtext}>ADD WALLET</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>

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
                        <TextInput keyboardType='numeric' onChangeText={(text)=>setamount(text)} value={amountset} style={{ width: "90%",color:"black", height: 50, borderBottomWidth: 1, marginLeft: 20, marginTop: 10 }}></TextInput>
                        <Text style={{ fontSize: 18,color:"black", fontWeight: '800', marginTop: 25, marginLeft: 15 }}>Description</Text>
                        <TextInput onChangeText={(text)=>setdescription(text)} value={description}
                        multiline textAlignVertical='top' style={{ width: "90%",color:"black", height: 150, borderWidth: 1, marginLeft: 20, marginTop: 10 }}></TextInput>
                        <TouchableOpacity onPress={()=>updateAmount()}>
                            <View style={styles.add}>
                                <Text style={styles.addtext}>ADD</Text>
                            </View>
                        </TouchableOpacity>
                    </Card>

                </View>
            </Modal>

            <View style={styles.footview}>
                <TouchableOpacity onPress={()=>navigation.navigate("Screen3")}>
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
                <TouchableOpacity onPress={()=>navigation.navigate("Screen4")}>
                    <View style={styles.footone}>
                        <Image style={styles.footimg} source={require("../../Assets/user.png")} />
                        <Text style={styles.foottext} >PROFILE</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}


