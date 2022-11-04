import TopBar from "./topBar";
import{View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
function AlumniThankyou(navigation){
    return(
        <View style={{backgroundColor:'#fafbff', minHeight:'100%'}}>
            <TopBar/>
            <View style={styles.container}>
                <Image source={require('./../../assets/thank_you.jpeg')} style={styles.thankyouImg} />
                <Text style={styles.textThanks}>Congratulations on becoming an Alumni of Mujaffar Nagar Medical College</Text>
                <Text style={styles.textThanks}>We have send you a verification email on your registered Email Id. Please check and verify your account.</Text>
                <Text style={styles.textThanks}>If you have not received verification email then click here to resend the verification email.</Text>
                <TouchableOpacity style={styles.blueBtn}>
                    <Text style={styles.btnText}>Resend</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    blueBtn :{
        marginTop:20,
        backgroundColor: '#0866A6',
        padding:8,
        borderRadius:8,
        width:'100%'
    },
    btnText:{
        color: '#FFF',
        textAlign: 'center',
        fontSize:20,
    },
    container:{
        padding:15,
        justifyContent:'center',
        alignItems:'center',
        minHeight:'93%',
        backgroundColor:'#FFF'
    },
    textThanks:{
        fontSize:18,
        marginTop:5,
        color:'#333',
        textAlign:'center'
    },
    thankyouImg:{
        width: 327, 
        height: 332, 
        marginBottom:15
    }
  }); 
export default AlumniThankyou;