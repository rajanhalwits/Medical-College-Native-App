import TopBar from "./topBar";
import{View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView} from 'react-native'
import MidContent from "../components/midContent";
function ChangePassword({navigation}){
    return(
        <ScrollView contentContainerStyle={styles.parent}>
        <TopBar/>
        <MidContent title={
            {
                img: require('./../../assets/change_password.png'),
                heading : 'Change Password',
                subHeading :''
            }
        }  />
            <View style={{paddingLeft:15, paddingRight:15}}>
                
                <Text style={{marginTop:20, color:'#666'}}>Old Password</Text>
                <TextInput style={styles.textArea} value=''/>
                <Image source={require('./../../assets/password.png')}  style={styles.inputImg} />
                <Text style={{marginTop:35, color:'#666'}}>New Password</Text>
                <TextInput style={styles.textArea} value=''/>
                <Image source={require('./../../assets/password.png')}  style={styles.inputImg} />
                <Text style={{marginTop:35, color:'#666'}}>Confirm New Password</Text>
                <TextInput style={styles.textArea} value=''/>
                <Image source={require('./../../assets/password.png')}  style={styles.inputImg} />
                <TouchableOpacity style={styles.blueBtn} onPress={()=>navigation.navigate('Change Password Thankyou')}>
                    <Text style={styles.btnText}>Change Password</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    parent:{
        backgroundColor:'#fafbff',
        height:'100%',
    },
    blueBtn :{
        marginTop:50,
        backgroundColor: '#0866A6',
        padding:8,
        borderRadius:8,
        width:'100%'
    },
    btnText:{
        color: '#FFF',
        textAlign: 'center',
        fontSize:20,
        fontWeight:'bold'
    },
    input: {
        height: 42,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        marginTop:10,
        placeholderTextColor: '#666',
        paddingLeft:30,
        backgroundColor:'#FFF'
      },
      inputImg:{
        width: 18, 
        height: 27, 
        marginTop:-40,
        marginLeft:5,
      },
      textArea:{
        borderWidth: 1,
        padding: 8,
        borderColor: '#DDD',
        borderRadius: 5,
        marginTop:10,
        placeholderTextColor: '#666',
        backgroundColor:'#FFF'
      },
      postBox :{
        flexDirection: 'row',
        backgroundColor:'#FFF',
        borderWidth:1,
        borderRadius:5,
        borderColor:'#ddd',
        marginTop:8,
      },
  }); 
export default ChangePassword;