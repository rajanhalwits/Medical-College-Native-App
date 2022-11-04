import TopBar from "./topBar";
import{View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, FlatList, Alert} from 'react-native'
import MidContent from "../components/midContent";
import { apiUrl } from "../constant";
import { useEffect, useState } from "react";

function Gallery({navigation}){
    const [galleryList, setGalleryData] = useState([]);
    useEffect(()=>{
        fetchGallery()
    },[])
    const fetchGallery = () =>{
        function json(response) {
            return response.json()
        }
        var url = `${apiUrl}GetAlbum`;
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
                setGalleryData(response.albumList)
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
                img: '',
                heading : 'Gallery',
                subHeading :''
            }
        }  />
            <View style={{padding:10}}>
                <FlatList
                    data={galleryList}
                    style={{height:'84%'}}
                    showsVerticalScrollIndicator={false} 
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={0.8} style={styles.card} 
                    onPress={()=>navigation.navigate('Gallery Detail', {galleryId: item.id})}>
                        <Image source={{uri:item.thumb_image}} style={styles.cardImg} />
                        <View style={{padding:5}}>
                            <Text style={styles.cardTitle}>{item.album_name}</Text>
                            <Text style={{color:'#333'}}>{item.description}</Text>
                        </View>
                    </TouchableOpacity>
                    )}
                />
            </View>
            
        </View>
    )
}
const styles = StyleSheet.create({
    parent:{
        backgroundColor:'#fafbff',
        height:'100%',
    },
    card:{
        borderRadius:5, 
        backgroundColor:'#FFF', 
        borderColor:'#DDD', 
        borderWidth:1,
        marginRight:10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom:10,
        width:'48.5%',
    },
    cardImg:{
        width: '100%', 
        height: 165, 
        borderTopLeftRadius:5, 
        borderTopRightRadius:5
    },
    cardTitle:{
        fontSize:16, 
        fontWeight:'bold', 
        color:'#333', 
        marginTop:5, 
        marginBottom:5
    }
  }); 
export default Gallery;