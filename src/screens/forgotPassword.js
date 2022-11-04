import { useState } from 'react';
import {View, StyleSheet, Text,Image, TextInput, TouchableOpacity} from 'react-native';
function ForgotPassword({navigation}){
    
    const getPassword = ()=>{
        
        //navigation.navigate('Alumni');
    }
    
    const toggleCheckbox = ()=>{
        setSelection(!isSelected)
      }
    return(
        <View style={{height:'100%', backgroundColor:'#fafbff'}}>
            <Image source={require('./../../assets/logo.png')} style={styles.midImg} />
            <Text style={styles.midTitle}>Forgot Password</Text> 
            <Text style={styles.midSubTitle}>Enter email to get password</Text>
            
            <View style={{paddingLeft:15, paddingRight:15, marginTop:10}}>
                <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false} placeholder="Enter Email ID" />
                <Image source={require('./../../assets/get_started/email_id.png')} 
                style={{ width: 20, height: 24, marginTop:-35, marginLeft:5 }} />
                
                <TouchableOpacity activeOpacity={0.8} style={styles.loginBtn} onPress={()=>getPassword()}>
                    <Text style={styles.btnText}>Submit</Text>
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