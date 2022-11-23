import { useState } from 'react';
import {View, StyleSheet, Text,Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import { apiUrl } from '../constant';

function ForgotPassword({navigation}){
    const [email, setEmail] = useState('');
    const getPassword =()=>{
        
        function json(response) {
            return response.json()
        }
        var url = `${apiUrl}Forgetpassword`
        fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: "user_name=" + email
        })
            .then(json)
            .then(function (response) {
                console.log(response);
                Alert.alert(response.message)
                if(response.status =='success'){
                    navigation.replace('MMCH')
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    return(
        <View style={{height:'100%', backgroundColor:'#fafbff'}}>
            <Image source={require('./../../assets/logo.png')} style={styles.midImg} />
            <Text style={styles.midTitle}>Forgot Password</Text> 
            <Text style={styles.midSubTitle}>Enter email to get password</Text>
            
            <View style={{paddingLeft:15, paddingRight:15, marginTop:10}}>
                <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false} 
                placeholder="Enter Email ID"
                onChangeText={(query)=>setEmail(query)} value={email} />
                <Image source={require('./../../assets/get_started/email_id.png')} 
                style={{ width: 20, height: 24, marginTop:-35, marginLeft:5 }} />
                
                <TouchableOpacity activeOpacity={0.8} style={styles.loginBtn} onPress={()=>getPassword()}>
                    <Text style={styles.btnText}>Get Password</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row', marginTop:20, textAlign:'center'}}>
                    <Text style={{color:'#333'}}> Back to</Text>
                    <Text style={{color:'#0866A6', paddingLeft:5}} onPress={()=>navigation.navigate('MMCH')}>
                         Sign In</Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    midTitle:{
        fontSize: 24, 
        fontWeight: 'bold', 
        textAlign: 'center',
        color:'#2F2F31',
        marginBottom:10,
        marginTop:10,
    },
    midSubTitle:{
        fontSize: 15, 
        fontWeight: 'bold', 
        textAlign: 'center',
        color:'#525252',
    },
    midImg:{
        alignSelf:'center',
        marginTop:50,
        width:109,
        height:152,
    },
    input: {
        height: 45,
        borderWidth: 1,
        padding: 8,
        borderColor: '#DDD',
        borderRadius: 5,
        marginTop:35,
        placeholderTextColor: '#666',
        paddingLeft:25,
        backgroundColor:'#FFF'
      },
      loginBtn :{
        marginTop:35,
        backgroundColor: '#0866A6',
        padding:8,
        borderRadius:8,
      },
      btnText:{
        color: '#FFF',
        textAlign: 'center',
        fontSize:20,
        fontWeight:'bold'
      }
  }); 
export default ForgotPassword;