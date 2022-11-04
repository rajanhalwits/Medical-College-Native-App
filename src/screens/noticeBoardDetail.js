import TopBar from "./topBar";
import{View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert} from 'react-native'
import MidContent from "../components/midContent";
import { apiUrl } from "../constant";
import { useEffect, useState } from "react";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

function NoticeBoardDetail({route, navigation}){
    const {noticeId, otherParam} = route.params;
    const [noticeData, setNoticeData] = useState([])
    useEffect(()=>{
        fetchNoticeDetail()
    },[])
    const fetchNoticeDetail = () => {
        function json(response) {
            return response.json()
        }
        var url = `${apiUrl}GetNoticeDetails`;
        fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: "id=" + noticeId
        })
        .then(json)
        .then(function (response) {
            console.log(response);
            if (response.status == 'success') {
                setNoticeData(response.noticeDetails[0]);
            } else {
                Alert.alert(response.message)
            }
        })
        .catch(function (error) {
            console.error(error);
        });
    }
    function downloadFile(){
        const uri = noticeData.document
        let fileUri = FileSystem.documentDirectory + ''+noticeData.file_name;
        FileSystem.downloadAsync(uri, fileUri)
        .then(({ uri }) => {
            saveFile(uri);
          })
          .catch(error => {
            console.error(error);
          })
    }
    const saveFile = async (fileUri) => {
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        await MediaLibrary.createAlbumAsync("Download", asset, false)
    }
    return(
        <View contentContainerStyle={styles.parent}>
        <TopBar/>
        <MidContent title={
            {
                img: require('./../../assets/notice_board.png'),
                heading : 'Notice Board',
                subHeading :''
            }
        }  />
            <View style={styles.detailBox}>
                <View style={styles.postBox}>
                    <View style={{width:'100%'}}>
                        <View style={{width:'100%'}}>
                            <Text style={{fontSize:14, fontWeight:'bold', textTransform:'capitalize'}}>{noticeData.title}</Text>
                            <Text style={{marginTop:5, color:'#666', fontSize:13}}>{noticeData.description}</Text>
                            <Text style={{marginTop:8, color:'#666', fontSize:13}}>
                                <Image source={require('./../../assets/calnder.png')} style={{ width: 20, height: 18}} />
                                &nbsp;{noticeData.notice_date}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.blueBtn} onPress={()=>downloadFile()}>
                        <Text style={styles.btnText}>
                            <Image source={require('./../../assets/job_description/downlog_bt.png')} style={{ width: 14, height: 14, marginRight:15}} /> 
                            &nbsp;Download
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    blueBtn :{
        marginTop:20,
        backgroundColor: '#0866A6',
        padding:8,
        borderRadius:8,
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
      btnText:{
        color: '#FFF',
        textAlign: 'center',
        fontSize:20,
        fontWeight:'bold'
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
export default NoticeBoardDetail;