import TopBar from "./topBar";
import{View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert, AsyncStorage, Platform} from 'react-native'
import MidContent from "../components/midContent";
import { useEffect, useState } from "react";
import { apiUrl } from "../constant";

function Feedback({navigation}){    
    const [subject, setSubject] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [userData, setUserData] = useState([])
    useEffect(()=>{
        retrieveData()
    },[])
    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('user-info');
            if (value !== null) {
                console.log(JSON.parse(value));
                setUserData(JSON.parse(value))
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    const sendFeedback = () =>{
        let userId = userData.signup_aid;
        function json(response) {
            return response.json()
        }
        var url = `${apiUrl}feedBack`
        fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: "subject=" + subject + "&suggestion=" + suggestion + "&user_id=" + userId
        })
        .then(json)
        .then(function (response) {
            console.log(response);
            if(response.status =='success'){
                setSuggestion('');
                setSubject('')
                navigation.navigate('Feedback Thankyou', {msg: response.message})
            }else{
                Alert.alert(response.message);
            }
        })
        .catch(function (error) {
            console.error(error);
        });
    }
    return(
        <ScrollView contentContainerStyle={Platform.OS =='ios' ? styles.parentIos : styles.parent}>
        <TopBar/>
        <MidContent title={
            {
                img: require('./../../assets/feedback.png'),
                heading : 'Feedback / Suggestions',
                subHeading :'Share your feedback/Suggestion for the  improvement of college'
            }
        }  />
            <View style={{paddingLeft:15, paddingRight:15}}>
                <Text style={{marginTop:20, color:'#999'}}>Select Subject</Text>
                <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false} placeholder="Enter Subject"
                onChangeText={(sub)=>setSubject(sub)} 
                value={subject}   />
                <Image source={require('./../../assets/edit.png')} style={styles.inputImg} />
                <Text style={{marginTop:30, color:'#999'}}>Type your Suggestion</Text>
                <TextInput style={styles.textArea} multiline={true}
                    numberOfLines={14}
                    onChangeText={(sugg)=>setSuggestion(sugg)}
                    value={suggestion}/>
                <TouchableOpacity style={styles.blueBtn} onPress={()=>sendFeedback()}>
                    <Text style={styles.btnText}>Send</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    parentIos: {
        backgroundColor: '#fafbff',
        height:'140%'
    },
    parent: {
        backgroundColor: '#fafbff',
        minHeight:'100%'
    },
    blueBtn :{
        marginTop:30,
        backgroundColor: '#0866A6',
        padding:8,
        borderRadius:8,
    },
    btnText:{
        color: '#FFF',
        textAlign: 'center',
        fontSize:20,
        fontWeight:'bold'
    },
    TitleBox: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:30,
        paddingBottom:30,
    },
    input: {
        height: 42,
        borderWidth: 1,
        padding: 8,
        borderColor: '#DDD',
        borderRadius: 5,
        marginTop:10,
        placeholderTextColor: '#666',
        paddingLeft:30,
        backgroundColor:'#FFF'
      },
      inputImg:{
        width: 22, 
        height: 25, 
        marginTop:-34,
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
        textAlignVertical:'top',
        height:150
      },
  }); 
export default Feedback;