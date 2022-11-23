import { ActivityIndicator, View, StyleSheet, Dimensions } from "react-native";
function Loader(){
    const deviceHeight = Dimensions.get('window').height;;
    const deviceWidth = Dimensions.get('window').width;;

    return(
        <View style={styles.darkBg}>
            <ActivityIndicator style={{position:'absolute', 
        left: (deviceWidth/2)-20, 
        top: deviceHeight/2}} size="large" color="#0866A6" />
        </View>
    )
}
const styles = StyleSheet.create({
    darkBg: {
        position:'absolute', 
        backgroundColor:'rgba(0,0,0,0.7)', 
        width:'100%', zIndex:9, 
        height:'100%'
    },
    circle:{
        
    }
  });
export default Loader;