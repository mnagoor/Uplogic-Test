import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, Component } from 'react';
import { View, Text, Linking, TouchableOpacity, Image, ScrollView, Modal, Dimensions, ImageBackground, StatusBar } from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-gesture-handler';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { getloginObj, loginObjelector } from '../../Slices/login';
import database from '@react-native-firebase/database';
import Toast from 'react-native-simple-toast';

export default function Screen3({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const { loginObj } = useSelector(loginObjelector)

    const [modalVisible1, setModalVisible1] = useState(false);
    const [sender, setSender] = useState(false)
    const [amount, setAmount] = useState("");


    const onSuccess = (e) => {
        console.log(e.data, "qrcode response")
        setModalVisible1(false)

        const reference = database().ref('/users');
        reference.on('value', snapshot => {
            const users = snapshot.val();
            const checkUser = users.find(user => user.qr == e.data)

            if (checkUser) {
                setSender(checkUser);
                // Toast.show("Successfully", Toast.SHORT);

            } else {
                Toast.show("Invalid QR", Toast.SHORT);

            }

        });


        // Linking.openURL(e.data).catch(err =>
        //     console.error('An error occured', err)
        // );
    };

    const sendMoney = async () => {
        console.log(Boolean(sender), "ssssssssssss")

        if (loginObj.amount < amount) {
            Toast.show("Insufficient Balance", Toast.SHORT);
            // return false;
        }
        if (sender) {
            const upCost = Number(loginObj.amount) - Number(amount);
            const userReference = database().ref('/users/' + (loginObj.id));
            await userReference.update({
                amount: upCost
            })

            const senderCost = Number(sender.amount) + Number(amount);
            const senderReference = database().ref('/users/' + (sender.id));
            await senderReference.update({
                amount: senderCost
            });

            const historyReference = database().ref('/history').push();
            await historyReference.set({
                from: loginObj.id,
                to: sender.id,
                amount: amount,
                date: new Date()
            });

            dispatch(getloginObj({ ...loginObj, amount: upCost }))
            setAmount("");

        } else {
            Toast.show("Invalid Sender Please Scan QR Again", Toast.SHORT);
        }

    }

    const [cardnoo, setcardNoo] = useState("")
    const [expdate, setexpDate] = useState("")
    const [cardhold, setcardHold] = useState("")
    const [cardcvv, setcardCvv] = useState("")

    const addcardDetails = async () => {
        if (cardnoo.length == '') {
            Toast.show("Please Enter Card Number", Toast.SHORT);
        }
        else if (cardnoo.length < 12) {
            Toast.show("Please Enter 12 Digit Card Number", Toast.SHORT);
        }
        else if (cardhold.length =='') {
            Toast.show("Please Enter Your Card Holder Name", Toast.SHORT);
        }
        else if (cardcvv.length == '') {
            showToastWithGravity("Please enter Card CVV Number");
        }
        else {
            const cardObj = {
                cardNo: cardnoo,
                expDate: expdate,
                cardHolder: cardhold,
                cardCVV: cardcvv
            }
            await database().ref(`/users/${loginObj.id}/cardDetail`).remove();
            const reference = database().ref(`/users/${loginObj.id}/cardDetail`);
            reference.set({
                ...cardObj,
            })
                .then(() => {
                    dispatch(getloginObj({ ...loginObj, cardDetail: cardObj }))
                    setModalVisible(false)
                });

        }
    }
    const data = "white"
    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../../Assets/left.png")} style={styles.back} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <Card style={styles.atmcard}>

                    <Text style={styles.cardno}>{loginObj.cardDetail ? loginObj.cardDetail.cardNo : "**** **** **** ****"}</Text>

                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#ca80f0', '#8b4dff', '#3778fd']} style={styles.linearGradient}>
                        <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
                            <Text style={{ color: "white", fontSize: 13, right: 25, marginTop: 5 }}>EXPIRY DATE</Text>
                            <View style={styles.expcard}>
                                <Text style={{ color: "white", fontSize: 17, }}>{loginObj.cardDetail ? loginObj.cardDetail.expDate : "--/--"}</Text>
                            </View>
                        </View>

                        <Text style={{ marginLeft: 10, color: "white" }}>CARD NUMBER</Text>
                        <Card style={styles.cardnocard}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#ca80f0', '#8b4dff', '#3778fd']} style={styles.cardnocard1}>
                                <Text style={{ color: "white", fontSize: 17, marginLeft: 10 }}>{loginObj.cardDetail ? loginObj.cardDetail.cardNo : "**** **** **** ****"}</Text>
                            </LinearGradient>
                        </Card>

                        <View style={{ flexDirection: "row", width: "100%", marginBottom: 15 }}>
                            <View style={{ flexDirection: "column", width: "55%" }}>
                                <Text style={{ marginLeft: 10, color: "white", marginTop: 15 }}>CARD HOLDER</Text>
                                <Card style={styles.cardnocard2}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                        colors={['#ca80f0', '#3778fd']} style={styles.cardnocard3}>
                                        <Text style={{ color: "white", fontSize: 17, marginLeft: 10 }}>{loginObj.cardDetail ? loginObj.cardDetail.cardHolder : "**********"}</Text>
                                    </LinearGradient>
                                </Card>
                            </View>
                            <View style={{ flexDirection: "column", width: "33%", marginLeft: 10 }}>
                                <Text style={{ marginLeft: 10, color: "white", marginTop: 15 }}>CVV</Text>
                                <Card style={styles.cardnocard2}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                        colors={['#3778fd', '#3778fd']} style={styles.cardnocard3}>
                                        <Text style={{ color: "white", fontSize: 17, marginLeft: 10 }}>{loginObj.cardDetail ? loginObj.cardDetail.cardCVV : "***"}</Text>
                                    </LinearGradient>
                                </Card>
                            </View>
                        </View>
                    </LinearGradient>
                </Card>


                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <View style={styles.add}>
                        <Text style={styles.addtext}>ADD CARD</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setModalVisible1(true)}>
                    <Image source={require("../../Assets/barcode.png")} style={styles.qrcode} />
                    <Text style={{ color: "blue", textAlign: "center", fontSize: 16 }}>Scan QR</Text>
                </TouchableOpacity>

                <TextInput onChangeText={(text) => setAmount(text)} keyboardType='numeric'
                    value={amount} style={{ borderBottomWidth: 1, width: "85%", alignSelf: "center", borderColor: "#b4d1eb", height: 40, marginTop: 10, color: "black" }}
                    placeholder='Enter amount' placeholderTextColor={'#b4d1eb'}></TextInput>
                <TouchableOpacity onPress={() => sendMoney()}>
                    <View style={styles.add}>
                        <Text style={styles.addtext}>Send Amount</Text>
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
                        <Text style={{ fontSize: 18, fontWeight: '800', marginLeft: 15, color: "black" }}>Card Number</Text>
                        <TextInput maxLength={12} placeholder='Enter your 12 digit card number' placeholderTextColor={'grey'} keyboardType='numeric' style={styles.input} onChangeText={(text) => setcardNoo(text)}></TextInput>
                        <Text style={{ fontSize: 18, fontWeight: '800', marginLeft: 15, marginTop: 15, color: "black" }}>Expiry Date</Text>
                        <TextInput  placeholder='mm / yy' placeholderTextColor={'grey'} style={styles.input} onChangeText={(text) => setexpDate(text)}></TextInput>
                        <Text style={{ fontSize: 18, fontWeight: '800', marginLeft: 15, marginTop: 15, color: "black" }}>Card Holder</Text>
                        <TextInput style={styles.input} onChangeText={(text) => setcardHold(text)}></TextInput>
                        <Text style={{ fontSize: 18, fontWeight: '800', marginLeft: 15, marginTop: 15, color: "black" }}>CVV</Text>
                        <TextInput maxLength={3} placeholder='* * *' placeholderTextColor={'grey'} keyboardType='numeric' style={styles.input} onChangeText={(text) => setcardCvv(text)}></TextInput>
                        <TouchableOpacity onPress={() => addcardDetails()}>
                            <View style={styles.add}>
                                <Text style={styles.addtext}>ADD CARD</Text>
                            </View>
                        </TouchableOpacity>
                    </Card>

                </View>
            </Modal>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible1}
            >
                <View style={styles.centeredView}>

                    <TouchableOpacity onPress={() => setModalVisible1(false)} style={styles.closeview} >
                        <Image style={styles.clsimg} source={require('../../Assets/close.png')} />
                    </TouchableOpacity>
                    <QRCodeScanner
                        onRead={onSuccess}
                        flashMode={RNCamera.Constants.FlashMode.auto}
                    />

                    <TouchableOpacity onPress={() => setModalVisible1(false)}
                        style={{ backgroundColor: "white", height: 50, justifyContent: "center", alignItems: "center" }}>
                        <Text style={styles.buttonText}>OK. Got it!</Text>
                    </TouchableOpacity>

                </View>
            </Modal>
            <View style={styles.footview}>
                <TouchableOpacity>
                    <View style={styles.footone}>
                        <Image style={styles.footimg} source={require("../../Assets/card.png")} />
                        <Text style={styles.foottext} >HOME</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Screen1")}>
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


