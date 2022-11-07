import TopBar from "./topBar";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform, Linking, Alert } from 'react-native'
import MidContent from "../components/midContent";
import { useEffect, useState } from "react";
import { apiUrl } from "../constant";
import * as FileSystem from 'expo-file-system';
import * as Camera from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
function JobDetail({ route, navigation }) {
    const { jobId, otherParams } = route.params;
    const [jobData, setJobData] = useState([]);
    useEffect(() => {
        fetchJobDetail()
    }, []);
    const fetchJobDetail = () => {
        function json(response) {
            return response.json()
        }
        var url = `${apiUrl}GetJobsDetails`;
        fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: "id=" + jobId
        })
        .then(json)
        .then(function (response) {
            console.log(response);
            if (response.status == 'success') {
                setJobData(response.jobsDetails[0]);

            } else {
                Alert.alert(response.message)
            }
        })
        .catch(function (error) {
            console.error(error);
        });
    }
    const sendWhatsApp = () => {
        let msg = jobData.title;
        let phoneWithCountryCode = `+91${jobData.whatsapp_no}`;

        let mobile =
            Platform.OS == "ios" ? phoneWithCountryCode : "+" + phoneWithCountryCode;
        if (mobile) {
            if (msg) {
                let url = "whatsapp://send?text=" + msg + "&phone=" + mobile;
                Linking.openURL(url)
                    .then(data => {
                        console.log("WhatsApp Opened");
                    })
                    .catch(() => {
                        console.log("Make sure WhatsApp installed on your device");
                    });
            } else {
                console.log("Please insert message to send");
            }
        } else {
            console.log("Please insert mobile no");
        }
    }
    if (jobData.length == 0) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }
    const saveToCameraRoll = async (image) =>{
        let {status} = await MediaLibrary.requestPermissionsAsync();
         console.log(status);
        if(status !=='granted'){
             console.log('ask for permission');
             status = await MediaLibrary.requestPermissionsAsync();
         }
         if(status ==='granted'){
             FileSystem.downloadAsync(image, FileSystem.documentDirectory+jobData.file_name+''+jobData.file_type).then(({uri})=>{
                 MediaLibrary.saveToLibraryAsync(uri)
                 Alert.alert('Document saved into device')
             }).catch(error =>{
                 console.log(error)
             })
         }else{
             Alert.alert('Allow the Permissions to download the document')
         } 
     }
    return (
        <View contentContainerStyle={styles.parent}>
            <TopBar />
            <MidContent title={
                {
                    img: require('./../../assets/notice_board.png'),
                    heading: 'Job Description',
                    subHeading: ''
                }
            } />
            <ScrollView style={styles.detailBox}>
                <View style={styles.postBox}>
                    <View style={{ width: '100%' }}>
                        <View style={{ width: '100%' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '82%' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textTransform:'capitalize' }}>
                                        {jobData.title}</Text>
                                </View>
                                <View style={{ width: '18%' }}>
                                    <View style={styles.urgent}>
                                        <Text style={styles.urgetTxt}>Urgent</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={{ marginTop: 5, color: '#666', fontSize: 13 }}>{jobData.description}</Text>

                            <Text style={{ marginTop: 8, color: '#666', fontSize: 13 }}>
                                <Image source={require('./../../assets/calnder.png')} style={{ width: 20, height: 18 }} />
                                &nbsp;{jobData.apllydate}
                            </Text>
                        </View>
                    </View>
                </View>
                <Text style={{ marginTop: 8, color: '#333', fontSize: 16, fontWeight: 'bold' }}>Contact for Hiring</Text>
                <View style={styles.postBox}>
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={{ width: '8%' }}>
                            <Image source={require('./../../assets/job_description/name.png')} style={{ width: 20, height: 18 }} />
                        </View>
                        <View style={{ width: '53%' }}>
                            <Text style={{ color: '#666', fontSize: 13 }}>{jobData.contact_name}</Text>
                        </View>
                        <View style={{ width: '5%' }}>
                            <Image source={require('./../../assets/job_description/phone.png')} style={{ width: 10, height: 18 }} />
                        </View>
                        <View style={{ width: '34%' }}>
                            <Text style={{ color: '#666', fontSize: 13 }}>{jobData.mobile_no}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 8 }}>
                        <View style={{ width: '8%' }}>
                            <Image source={require('./../../assets/job_description/mail_h.png')} style={{ width: 20, height: 18 }} />
                        </View>
                        <View style={{ width: '92%' }}>
                            <Text style={{ color: '#666', fontSize: 13 }}>Eamil your resume to {jobData.email}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableOpacity activeOpacity={0.8} style={styles.blueBtn} onPress={()=>saveToCameraRoll(jobData.document)}>
                        <Text style={styles.btnText}>
                            <Image source={require('./../../assets/job_description/downlog_bt.png')} style={{ width: 14, height: 14, marginRight: 15 }} />
                            &nbsp;Download
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.blueBtn} onPress={() => sendWhatsApp()}>
                        <Text style={styles.btnText}>
                            <Image source={require('./../../assets/job_description/whatspp.png')} style={{ width: 18, height: 18, marginRight: 15 }} />
                            &nbsp;Whatsapp your Resume
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    detailBox:{ 
        paddingLeft: 15, 
        paddingRight: 15,
        maxHeight:'72%',
    },

    parent: {
        backgroundColor: '#fafbff',
        height: '100%',
    },
    blueBtn: {
        marginTop: 20,
        backgroundColor: '#0866A6',
        padding: 8,
        borderRadius: 8,
    },
    btnText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
    },
    TitleBox: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        paddingBottom: 30,
    },
    btnText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    postBox: {
        backgroundColor: '#FFF',
        padding: 8,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        marginTop: 8,
    },
    urgetTxt: {
        fontSize: 11,
        color: '#FFF',
        textAlign: 'center'
    },
    urgent: {
        width: '100%',
        backgroundColor: '#0866A6',
        borderRadius: 5,
        textAlign: 'center',
        justifyContent: 'center',
        padding: 3
    },
});
export default JobDetail;