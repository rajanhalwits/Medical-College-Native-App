import TopBar from "./topBar";
import{View, Text, StyleSheet, Image, ScrollView, Pressable, FlatList} from 'react-native';
import MidContent from "../components/midContent";
import { useState, useEffect } from "react";
import { apiUrl } from "../constant";
function WeAreHiring({navigation}){
    const [jobList, setJobData ] = useState([]);
    useEffect(()=>{
        fetchJob()
    },[])
    const fetchJob = () =>{
        function json(response) {
            return response.json()
        }
        var url = `${apiUrl}GetJobs`;
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
                setJobData(response.jobsList)
            }else{
                Alert.alert(response.message)
            }
        })
        .catch(function (error) {
            console.error(error);
        });
    }
    return(
        <View contentContainerStyle={styles.parent}>
            <TopBar/>
            <MidContent title={
                {
                    img: require('./../../assets/we_are_hiring.png'),
                    heading : 'We Are Hiring',
                    subHeading :''
                }
            } />
            <View style={{padding:10}}>
                {
                    <FlatList
                        data={jobList}
                        numColumns={1}
                        keyExtractor={(item, index) => index.toString()}
                        style={{height:'72%'}}
                        showsVerticalScrollIndicator={false} 
                        renderItem={({ item }) => (
                        <Pressable style={styles.postBox} onPress={()=>navigation.navigate('JobDetail',{jobId: item.id})}>
                            <View style={{width:'95%'}}>
                                <View style={{width:'100%'}}>
                                    <Text style={styles.jobTitle}>{item.title}</Text>
                                </View>
                                <View style={{width:'100%', flexDirection:'row'}}>
                                    <View style={{width:'80%', justifyContent:'center'}}>
                                        <Text style={styles.applyDate}>
                                            {item.apllydate}</Text>
                                    </View>
                                    {
                                        item.job_type ?
                                        <View style={styles.urgent}>
                                            <Text style={styles.urgetTxt}>Urgent</Text>
                                        </View>
                                        : null
                                    }
                                    
                                </View>
                            </View>
                            <View style={{width:'5%', alignItems:'flex-end', justifyContent:"flex-end", paddingBottom:2}}>
                                <Image source={require('./../../assets/arrow.png')} style={styles.arrowImg} />
                            </View>
                        </Pressable>
                        )}
                    />
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    jobTitle:{
        fontSize:13, 
        fontWeight:'bold'
    },
    applyDate:{
        fontSize:12, 
        color:'#666',
        marginBottom:2,
        marginTop:2,
    },
    urgetTxt:{
        fontSize:11, 
        color:'#FFF', 
        textAlign:'center'
    },
    parent: {
        backgroundColor:'#fafbff',
        height:'100%',
    },
      postBox :{
        flexDirection: 'row',
        backgroundColor:'#FFF',
        padding:8,
        borderWidth:1,
        borderRadius:5,
        borderColor:'#ddd',
        marginTop:8,
      },
      urgent:{
        width:'20%', 
        backgroundColor:'#0866A6',
        borderRadius:5,
        textAlign:'center',
        justifyContent:'center'
    },
    arrowImg:{
        width:10,
        height:17,
    }

  }); 
export default WeAreHiring;