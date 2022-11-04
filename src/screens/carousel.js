import { useEffect, useState } from "react";
import { View, Image, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, Text, Alert } from "react-native";
import TopBar from "./topBar";
import MidContent from "../components/midContent";

function Carousel({route, navigation}){
    const {imgData, sNo} = route.params;
    const [carouselItem, setCarouselItem] = useState([]);
    const [activeImg, setActiveImg] = useState('');
    const [imgIndex, setImgIndex] = useState(0);
    useEffect(()=>{
        setActiveImg(sNo)
        console.log(JSON.parse(imgData));
        setCarouselItem(JSON.parse(imgData));
        setImgIndex(JSON.parse(imgData).findIndex(c => c.id == sNo));
    },[]);
    const prevImg = () =>{
        if(imgIndex < carouselItem.length && imgIndex !=0){
            setImgIndex((prevIndex)=>prevIndex-1);
            setActiveImg(carouselItem[imgIndex-1].id)
        }else{
            setImgIndex(carouselItem.length-1); 
            setActiveImg(carouselItem[carouselItem.length-1].id)
        }
    }
    const nextImg = () =>{
        if(imgIndex < carouselItem.length-1){
            setImgIndex((prevIndex)=>prevIndex+1);
            setActiveImg(carouselItem[imgIndex+1].id)
        }else{
            setImgIndex(0);
            setActiveImg(carouselItem[0].id)
        }
    }
    return(
        <View contentContainerStyle={styles.parent}>
            <TopBar/>
            <MidContent title={
                {
                    img: '',
                    heading : '',
                    subHeading :''
                }
            } />
            <View style={styles.ex}>
                {
                    carouselItem.length >0 
                    ?
                    carouselItem.map((item)=>
                        activeImg == item.id ?
                            <ImageBackground source={{uri: item.image}} key={item.id} 
                            style={styles.fullScreenImage} ></ImageBackground>
                        : 
                        null
                    )
                    : null
                }
                <TouchableOpacity style={styles.leftArrow} onPress={()=>prevImg()}>
                    <Image source={require('./../../assets/back.png')} style={styles.imgArrow} />                    
                </TouchableOpacity>
                <TouchableOpacity style={styles.rightArrow} onPress={()=>nextImg()}>
                    <Image source={require('./../../assets/next.png')} style={styles.imgArrow} />                    
                </TouchableOpacity>
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
        minHeight:'100%',
    },
    ex: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor:'pink',
        marginTop:-10,
        justifyContent:'center',
    },
    fullScreenImage:{
        resizeMode: 'cover',
        width:'100%' ,
        height:'100%'
    },
    leftArrow:{
        position:'absolute',
        borderRadius:50,
        left:15,
        top:'45%',
        zIndex:9,
    },    
    rightArrow:{
        position:'absolute',
        borderRadius:50,
        right:15,
        top:'45%',
        zIndex:9,
    },
    imgArrow:{
        width:50,
        height:50
    },
  }); 
export default Carousel;