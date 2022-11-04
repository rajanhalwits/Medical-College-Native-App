import TopBar from "./topBar";
import{View, Text, StyleSheet, Image, Alert, FlatList, TouchableOpacity} from 'react-native';
import MidContent from "../components/midContent";
import { useEffect, useRef, useState } from "react";
import { apiUrl } from "../constant";
function GalleryDetail({route, navigation}){
    const {galleryId, otherParam} = route.params;
    const [galleryData, setGalleryData] = useState([]);
    const [galleryDetail, setGalleryDetail] = useState([]);
    
    useEffect(()=>{
        fetchGallery();
    },[])
    const fetchGallery = () =>{
        function json(response) {
            return response.json()
        }
        var url = `${apiUrl}GetAlbumGallery`;
        fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: "album_id=" + galleryId
        })
        .then(json)
        .then(function (response) {
            console.log(response);
            if(response.status =='success'){
                setGalleryData(response.gallery);
                console.log('---> ',response.gallery);
                setGalleryDetail(response.albgallery);
            }else{
                Alert.alert(response.message)
            }
        })
        .catch(function (error) {
            console.error(error);
        });
    }
    if(galleryData.length =='0'){
        return(
            <Text>Loading...</Text>
        )
    }
    return(
        
        <View contentContainerStyle={styles.parent}>
        <TopBar/>
        <MidContent title={
            {
                img: '',
                heading : 'Gallery',
                subHeading :''
            }
        } />
            
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{width:'74%'}}>
                            <Text style={{fontSize:16,color:'#333'}}>{galleryDetail.album_name}</Text>
                        </View>
                        <View style={{width:'26%'}}>
                            <Text style={{fontSize:11, color:'#333'}}>
                                <Image source={require('./../../assets/calnder.png')} style={styles.dateImg} />
                                &nbsp;{galleryDetail.album_date}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{fontSize:13,color:'#666', marginTop:5}}>
                            {galleryDetail.description}
                        </Text>
                    </View>
                </View>
                <View>
                    {/* <Text>
                        {JSON.stringify(galleryData).toString()}
                    </Text> */}
                <FlatList
                    data={galleryData}
                    numColumns={3}
                    style={{height:'81%'}}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{marginTop:10, width:'32%', marginRight:'0.8%'}} activeOpacity={0.8}
                            onPress={()=>navigation.navigate('Carousel', 
                                {
                                    imgData:JSON.stringify(galleryData).toString(), 
                                    sNo: item.id 
                                }
                            )}
                        >
                            <Image source={{uri: item.image}} style={{width:'100%', height:150,}} />
                        </TouchableOpacity>
                    )}
                />
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        padding:10,
    },
    parent:{
        backgroundColor:'#fafbff',
        height:'100%',
    },
    card:{
        backgroundColor: '#FFF',
        padding:8,
        borderRadius:5,
        borderColor:'#DDD',
        borderWidth:1,
    },
    dateImg:{
        width:15,
        height:15,
    },
    galleryImg:{
        width:'32%',
        height:140,
        marginTop:5,
    },
    marginLeftRight:{ 
        width:'32%',
        height:140,
        marginTop:5,
        marginRight:'1.5%',
        marginLeft:'1.5%'
    },
  }); 
export default GalleryDetail;