import TopBar from "./topBar";
import{View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import { apiUrl } from "../constant";
import { useEffect, useState } from "react";
function JobDescription({navigation}){
    
    return(
        <View style={{backgroundColor:'#fafbff'}}>
            <TopBar/>
            <View style={styles.TitleBox}>
                <Image source={require('./../../assets/job_description/7th_03.png')} style={{ width: 144, height: 144}} />
                <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop:15, color:'#2F2F31'}}>
                    Job Description11</Text>
            </View>
            <View style={{paddingLeft:15, paddingRight:15}}>
                <View style={styles.postBox}>
                    <View style={{width:'100%'}}>
                        <View style={{width:'100%'}}>
                            <Text style={{fontSize:14, fontWeight:'bold'}}>Female Staff Nurses / Sister incharges / Ass. / Dy Nursing</Text>
                        </View>
                        <View style={{width:'100%', flexDirection:'row'}}>
                            <View style={{width:'70%', justifyContent:'center'}}>
                                <Text style={{fontSize:13, color:'#666'}}>Apply Between 11 June - 30 July</Text>
                            </View>
                            <View style={styles.urgent}>
                                <Text style={{fontSize:13, color:'#FFF'}}>Urgent</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{marginTop:15}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
                            </Text>
                            <Text style={{marginTop:15}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex 
                                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                                nulla pariatur.
                            </Text>    
                        </View>
                    </View>
                </View>
                <View style={{marginTop:15, marginBottom:10}}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>Contact for Hiring</Text>
                </View>
                <View style={{backgroundColor:'#FFF',
                    padding:8,
                    borderWidth:1,
                    borderRadius:5,
                    borderColor:'#ddd',
                    marginTop:8}}>
                    <View style={{flexDirection:'row', width:'100%'}}>
                        <View style={{width:'12%'}}>
                            <Image source={require('./../../assets/job_description/name.png')} style={{ width: 31, height: 25, marginRight:5}} /> 
                        </View>
                        <View style={{width:'57%', justifyContent:'center'}}>
                            <Text style={{color:'#666'}}>Anjani Kumar Verma</Text>
                        </View>
                        <View style={{width:'8%'}}>
                            <Image source={require('./../../assets/job_description/phone.png')} style={{ width: 15, height: 25, marginRight:5}} />
                        </View>
                        <View style={{width:'27%', justifyContent:'center'}}>
                            <Text style={{ color:'#666'}}>785666521</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', width:'100%', justifyContent:'center', marginTop:15}}>
                        <View style={{width:'10%'}}>
                            <Image source={require('./../../assets/job_description/mail_h.png')} style={{ width: 31, height: 25, marginRight:5}} /> 
                        </View>
                        <View style={{width:'90%', flexDirection:'row', justifyContent:'center'}}>
                            <Text style={{color:'#666', fontSize:13}}>Email your resume at </Text>
                            <Text style={{color:'#0866A6', fontSize:13}}>anjani@mmchonline.com</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.lightBlueBtn}>
                        <Text style={styles.btnText}>
                            <Image source={require('./../../assets/job_description/downlog_bt.png')} style={{ width: 25, height: 25, marginRight:5}} />
                            Download
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.blueBtn}>
                        <Text style={styles.btnText}>
                            <Image source={require('./../../assets/job_description/whatspp.png')} style={{ width: 25, height: 25, marginRight:5}} />
                            WhatsApp your resume
                        </Text>
                    </TouchableOpacity>
                </View>
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
      },
      lightBlueBtn:{
        marginTop:20,
        backgroundColor: '#90C8EE',
        padding:8,
        borderRadius:8,
        justifyContent:'center'
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
        marginTop:20,
        placeholderTextColor: '#666',
        paddingLeft:30,
        backgroundColor:'#FFF'
      },
      btnText:{
        color: '#FFF',
        textAlign: 'center',
        fontSize:20,
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
        width:'25%', 
        backgroundColor:'#0866A6',
        padding:8,
        borderRadius:5,
        textAlign:'center',
    }
  }); 
export default JobDescription;