import TopBar from "./topBar";
import{View, Text, StyleSheet, Image, FlatList, Alert} from 'react-native'
import MidContent from "../components/midContent";
import { useEffect, useState } from "react";
import { apiUrl, imagePath } from "../constant";

function Event({navigation}){
    const [eventList, setEventData] = useState([]);
    useEffect(()=>{
        fetchEvent()
    },[])
    const fetchEvent = () =>{
        function json(response) {
            return response.json()
        }
        var url = `${apiUrl}GetEvent`
        fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            }
        })
        .then(json)
        .then(function (response) {
            console.log(response);
            if(response.status =='success'){
                setEventData(response.eventList)
            }else{
                Alert.alert(response.message)
            }
        })
        .catch(function (error) {
            console.error(error);
        });
    }
    return(
        <View style={{backgroundColor:'#fafbff', minHeight:'100%'}}>
            <TopBar/>
            <MidContent title={
            {
                img: require('./../../assets/event_icon.png'),
                heading : 'Event',
                subHeading :''
            }
        }  />
            
            <View style={{paddingLeft:15, paddingRight:15}}>
                {
                    eventList.length>0 ?
                    <FlatList
                        data={eventList}
                        numColumns={1}
                        style={{height:'72%'}}
                        showsVerticalScrollIndicator={false} 
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                        <View style={styles.postBox}>
                            <View style={{width:'30%'}}>
                                <Image source={{uri:item.photo}} style={{ width: 85, height: 85}} />
                            </View>
                            <View style={{width:'70%',}}> 
                                <Text style={{fontWeight:'bold', color:'#333'}}>{item.title}</Text>
                                <Text style={{color:'#999', fontSize:12}}>{item.description}</Text>
                                <Text style={{color:'#999', fontSize:12, marginTop:5,}}>
                                    <Image source={require('./../../assets/calnder.png')} 
                                    style={{ width: 14, height: 14, marginTop:5}} /> &nbsp;
                                    {item.eventdate}
                                </Text>
                            </View>
                        </View>
                    )}
                />
                
                    : 
                    <View style={styles.postBox}>
                        <View style={{width:'100%', alignItems:'center'}}> 
                            <Image source={require('./../../assets/empty-box.png')} style={{width:100, height:100, marginBottom:10}} />
                        <Text style={{fontWeight:'bold', color:'#333'}}>No Record Found</Text>
                        </View>
                    </View>
                }
                
                
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
        backgroundColor:'#FFF'
      },
      postBox :{
        flexDirection: 'row',
        backgroundColor:'#FFF',
        borderWidth:1,
        borderRadius:5,
        borderColor:'#ddd',
        marginTop:8,
        padding:8
      },
  }); 
export default Event;