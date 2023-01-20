import TopBar from "./topBar";
import{View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert, AsyncStorage} from 'react-native'
import MidContent from "../components/midContent";
import { useState, useEffect } from "react";
import { apiUrl } from "../constant";

function ChangePassword({navigation}){
    const [userId, setUserId] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmPassword] = useState('');
    useEffect(()=>{
        retrieveData();       
    },[]);
    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('user-info');
            if (value !== null) {
                console.log('rajan---> ',JSON.parse(value).user_id);
                setUserId(JSON.parse(value).user_id);
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    const ChangePassword = () =>{
        function json(response) {
            return response.json()
        }
        var url = `${apiUrl}Changepassword`
        fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: "old_password=" + oldPassword + "&new_password=" + newPassword + 
            "&new_conf_password=" + confirmNewPassword + "&user_id=" + userId
        })
        .then(json)
        .then(function (response) {
            console.log(response);
            if(response.status =='success'){
                navigation.navigate('Change Password Thankyou', {msg: response.message})
            }else{
                Alert.alert(response.message);
            }
        })
        .catch(function (error) {
            console.error(error);
        });
    }
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
                <TextInput style={styles.textArea} value={oldPassword} onChangeText={(oldPass)=>setOldPassword(oldPass)} />
                <Image source={require('./../../assets/password.png')}  style={styles.inputImg} />

                <Text style={{marginTop:35, color:'#666'}}>New Password</Text>
                <TextInput style={styles.textArea} value={newPassword} onChangeText={(newPass)=>setNewPassword(newPass)}/>
                <Image source={require('./../../assets/password.png')}  style={styles.inputImg} />

                <Text style={{marginTop:35, color:'#666'}}>Confirm New Password</Text>
                <TextInput style={styles.textArea} value={confirmNewPassword} onChangeText={(confPass)=>setConfirmPassword(confPass)} />
                <Image source={require('./../../assets/password.png')}  style={styles.inputImg} />

                <TouchableOpacity style={styles.blueBtn} onPress={()=>ChangePassword()}>
                    <Text style={styles.btnText}>Change Password</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    parent:{
        backgroundColor:'#fafbff',
        minHeight:'100%',
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
        backgroundColor:'#FFF', 
        paddingLeft:25
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