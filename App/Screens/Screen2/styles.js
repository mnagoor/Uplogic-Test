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
    header: {
        flexDirection: "row", marginTop: 10, justifyContent: "space-between"
    },
    setting: {
        width: 30, height: 30, resizeMode: "contain", marginRight: 15
    },
    linearGradient: {
        width: "85%", height: 170, alignSelf: "center", marginTop: 25, borderRadius: 10, justifyContent: "center", alignItems: "center"
    },
    card: {
        backgroundColor: 'white', width: "85%", height: 75, alignSelf: "center", marginTop: 20, flexDirection: "row"
        , alignItems: "center"
    },
    cardimg: {
        width: 30, height: 30, resizeMode: "contain", marginLeft: 15
    },
    line: {
        width: 1, height: "80%", backgroundColor: "grey", marginLeft: 10
    },
    cardview: {
        flexDirection: "column", width: "55%"
    },
    cardhead: {
        color: "black", marginLeft: 10, fontWeight: "700"
    },
    cardsec: {
        color: "black", marginLeft: 10, fontSize: 12
    },
    cardprice: { 
        color: "black", fontWeight: "bold", fontSize: 20 
    },
    add:{
        width:"85%",height:50,backgroundColor:"#1083fa",alignSelf:"center",marginTop:30,borderRadius:50,justifyContent:"center",alignItems:"center"
},
addtext:{
    color:"white",fontWeight:"700",fontSize:17
},
centeredView:{
     width: "100%", height: "100%", backgroundColor: "rgba(52, 52, 52, 0.8)" 
},
closeview:{
     width: 60, height: 60, backgroundColor: "white", borderRadius: 70, top: "7%", alignSelf: "center", justifyContent: "center" 
},
clsimg:{ 
    width: 25, height: 25, resizeMode: "contain", alignSelf: "center" 
},
modalcard:{
    width: "90%",
    height: 500,
    backgroundColor: "white",
    borderRadius: 25,
    top: "8.75%", alignSelf: "center",justifyContent:"center",
},
foottext:{  
    fontSize: 12,fontWeight:"500",  color: "black", marginTop:3
},
footimg:{ 
    width: 30, height: 30, resizeMode: "contain", 
},
footone:{
    flexDirection:"column",height:55,justifyContent:"center",alignItems:"center"
},
footview:{
     width: "100%", height: 55, flexDirection: "row", backgroundColor: "white", marginTop: 10,justifyContent:"space-evenly" 
    }
})