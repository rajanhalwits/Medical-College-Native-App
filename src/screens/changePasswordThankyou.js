import TopBar from "./topBar";
import{View, Text, StyleSheet, Image} from 'react-native'
function ChangePasswordThankYou({route, navigation}){
    const {msg, otherParam} = route.params;
    return(
        <View style={{backgroundColor:'#FFF', minHeight:'100%'}}>
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
        color:'#333'
    },
    thankyouImg:{
        width: 253, 
        height: 248, 
        marginBottom:15
    }
  }); 
export default ChangePasswordThankYou;