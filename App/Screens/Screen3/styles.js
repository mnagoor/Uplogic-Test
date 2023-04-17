import { Dimensions, StyleSheet } from "react-native"

const { width, height } = Dimensions.get("window")
export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fffff"
    },
    back: {
        width: 30, height: 30, resizeMode: "contain", marginLeft: 15
    },
    qrcode: {
        width: 70, height: 70, resizeMode: "contain", alignSelf:"center",marginTop:20
    },
    header: {
        flexDirection: "row", marginTop: 10, justifyContent: "space-between"
    },
    setting: {
        width: 30, height: 30, resizeMode: "contain", marginRight: 15
    },
    linearGradient: {
        width: "100%", borderRadius: 10,
    },
 
    expcard: {
        width: 100, height: 40, backgroundColor: "#6098fe", borderRadius: 10, justifyContent: "center", alignItems: "center",
        marginTop:5,right:10
    },
    cardnocard:{
        width: "90%", height: 45, borderRadius: 10, marginTop:5,marginLeft:15
    },
    cardnocard1:{
        width: "100%", height: 45, borderRadius: 10, justifyContent: "center", 
    },
    cardnocard2:{
        width: "100%", height: 45, borderRadius: 10, marginTop:5,marginLeft:15
    },
    cardnocard3:{
        width: "100%", height: 45, borderRadius: 10, justifyContent: "center", 
    },
 
    atmcard: {
        width: "93%", alignSelf: "center", alignSelf: "center", marginTop: 25, borderRadius: 10
    },
    add: {
        width: "85%", height: 50, backgroundColor: "#1083fa", alignSelf: "center", marginTop: 30, borderRadius: 50, justifyContent: "center", alignItems: "center"
    },
    addtext: {
        color: "white", fontWeight: "700", fontSize: 17
    },
    centeredView: {
        width: "100%", height: "100%", backgroundColor: "rgba(52, 52, 52, 0.8)"
    },
    closeview: {
        width: 60, height: 60, backgroundColor: "white", borderRadius: 70, top: "7%", alignSelf: "center", justifyContent: "center"
    },
    cardno: {
        color: "black", marginTop: 10, marginBottom: 10, textAlign: "center", fontSize: 15, fontWeight: "500"
    },
    clsimg: {
        width: 25, height: 25, resizeMode: "contain", alignSelf: "center"
    },
    modalcard: {
        width: "90%",
        height: 500,
        backgroundColor: "white",
        borderRadius: 25,
        top: "8.75%", alignSelf: "center", justifyContent: "center",
    },
    foottext: {
        fontSize: 12, fontWeight: "500", color: "black", marginTop: 3
    },
    footimg: {
        width: 30, height: 30, resizeMode: "contain",
    },
    footone: {
        flexDirection: "column", height: 55, justifyContent: "center", alignItems: "center"
    },
    footview: {
        width: "100%", height: 55, flexDirection: "row", backgroundColor: "white", marginTop: 10, justifyContent: "space-evenly"
    },
    input:{ width: "90%",color:"black", height: 35, borderBottomWidth: 1, marginLeft: 20, marginTop: 7 }

})