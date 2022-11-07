import { useEffect, useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, SwipeableListViewProps } from "react-native";
import TopBar from "./topBar";
import MidContent from "../components/midContent";

function Carousel({ route, navigation }) {
    const { imgData, sNo } = route.params;
    const [carouselItem, setCarouselItem] = useState([]);
    const [activeImg, setActiveImg] = useState('');
    const [imgIndex, setImgIndex] = useState(0);
    useEffect(() => {
        setActiveImg(sNo)
        console.log(JSON.parse(imgData));
        setCarouselItem(JSON.parse(imgData));
        setImgIndex(JSON.parse(imgData).findIndex(c => c.id == sNo));
    }, []);
    const prevImg = () => {
        if (imgIndex < carouselItem.length && imgIndex != 0) {
            setImgIndex((prevIndex) => prevIndex - 1);
            setActiveImg(carouselItem[imgIndex - 1].id)
        } else {
            setImgIndex(carouselItem.length - 1);
            setActiveImg(carouselItem[carouselItem.length - 1].id)
        }
    }
    const nextImg = () => {
        if (imgIndex < carouselItem.length - 1) {
            setImgIndex((prevIndex) => prevIndex + 1);
            setActiveImg(carouselItem[imgIndex + 1].id)
        } else {
            setImgIndex(0);
            setActiveImg(carouselItem[0].id)
        }
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
            {/* <TopBar />
            <MidContent title={
                {
                    img: '',
                    heading: '',
                    subHeading: ''
                }
            } /> */}
            {
                
            }
            {
                carouselItem.length > 0
                    ?
                    carouselItem.map((item) =>
                        activeImg == item.id ?
                            <Image source={{ uri: item.image }} key={item.id}
                                style={{ width: '100%', flex: 1 }} resizeMode="contain" />
                            :
                            null
                    )
                    : null
            }
            <TouchableOpacity style={styles.leftArrow} onPress={() => prevImg()}>
                <Image source={require('./../../assets/back.png')} style={styles.imgArrow} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightArrow} onPress={() => nextImg()}>
                <Image source={require('./../../assets/next.png')} style={styles.imgArrow} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    leftArrow: {
        position: 'absolute',
        borderRadius: 50,
        left: 15,
        top: '52%',
        zIndex: 1,
    },
    rightArrow: {
        position: 'absolute',
        borderRadius: 50,
        right: 15,
        top: '52%',
        zIndex: 1,
    },
    imgArrow: {
        width: 50,
        height: 50
    },
});
export default Carousel;