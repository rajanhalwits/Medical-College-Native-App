import TopBar from "./topBar";
import{View, Text, StyleSheet, Image, ScrollView} from 'react-native'
function WallOfFameThankyou({route, navigation}){
    const {msg, otherParam} = route.params;
    return(
        <View style={{backgroundColor:'#FFF', height:'100%', flex:1}}>
            <TopBar/>
            <View style={styles.container}>
                <Image source={require('./../../assets/thank_you.jpeg')} style={styles.thankyouImg} />
                <Text style={styles.textThanks}>{msg}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        padding:15,
        marginTop:70,
        alignItems:'center',
    },
    textThanks:{
        fontSize:18,
        marginTop:5,
        color:'#333',
        textAlign:'center'
    },
    thankyouImg:{
        width: 253, 
        height: 248, 
        marginBottom:15
    }
  }); 
export default WallOfFameThankyou;