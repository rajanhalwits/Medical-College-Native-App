import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Alert,AsyncStorage } from "react-native";
import TopBar from "./topBar";
import { useEffect, useState } from "react";
import { apiUrl } from "../constant";

function DeleteProfile({navigation}){
    const [text, setText] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(()=>{
        retrieveData();
    },[])
    const retrieveData = async () => { 
        try {
          const value = await AsyncStorage.getItem('user-info');
          if (value !== null) {
            console.log('Id to delete ______',JSON.parse(value).signup_aid)
            setUserId(JSON.parse(value).signup_aid);
          }else{
            console.log('aa')
          }
        } catch (error) {
          // Error retrieving data
        }
      }
    const DeleteAccount =()=>{
        let boxValue = text.toLowerCase();
        if(boxValue =='' || boxValue !='delete me'){
            Alert.alert('Enter "delete me" in the box')
        }else{
            function json(response) {
                return response.json()
            }
            var url = `${apiUrl}delteUser`
            fetch(url, {
                method: 'post',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                body: "user_id=" + userId
            })
            .then(json)
            .then(function (response) {
                console.log(response);
                Alert.alert(response.message);
                if(response.status =='success'){
                    setText('')
                    AsyncStorage.clear();
                    navigation.navigate('MMCH');
                }
            })
            .catch(function (error) {
                console.error(error);
            });
        }
        
    }

    return(
        <ScrollView contentContainerStyle={styles.parent}>
            <TopBar/>
            <View style={styles.midBox}>
            <Image source={require('./../../assets/user_delete.png')} style={styles.midImg} />
            <Text style={styles.midTitle}>Delete My Account</Text> 
            <Text style={styles.midSubTitle}>When you delete your account, your Profile, Photos, Wall of Fame will be 
            permanently removed.</Text>
        </View>
            
            <View style={{paddingLeft:15, paddingRight:15}}>
                <Text></Text>
                <Text>In order to delete your account enter "delete me" in the box below and tap the Delete Account button.</Text>
                <TextInput style={styles.input} onChangeText={(del)=>setText(del)} value={text} placeholder="delete me"/>
                <TouchableOpacity activeOpacity={0.7} style={styles.blueBtn} onPress={()=>DeleteAccount()}>
                    <Text style={styles.btnText}>Delete Account</Text>
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
        marginTop:20,
        placeholderTextColor: '#666',
        paddingLeft:10,
        backgroundColor:'#FFF'
      },
      midBox: {
        alignItems: 'center',
        justifyContent: 'center',
         marginTop:100,
         paddingLeft:15,
         paddingRight:15
    },
    midImg:{ 
        width: 100, 
        height: 100 
    },
    midTitle:{
        fontSize: 24, 
        fontWeight: 'bold', 
        textAlign: 'center',
        color:'#2F2F31',
        marginBottom:25,
        marginTop:20
    },
    midSubTitle:{
        fontSize: 15, 
        fontWeight: 'bold', 
        textAlign: 'center',
        color:'#525252',
        marginTop:20,
        marginBottom:15
    }
  }); 
export default DeleteProfile;