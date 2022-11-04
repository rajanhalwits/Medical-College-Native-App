import {View, Text, Image, StyleSheet} from 'react-native'
function MidContent(props){
    console.log(props.title.img)
    return(
        <View style={styles.midBox}>
            {
                props.title.img !='' ?
                <Image source={props.title.img} style={styles.midImg} />
                : null
            }
            {
                props.title.heading !=''? 
                <Text style={styles.midTitle}>{props.title.heading}</Text> 
                : null
            }
            {
                props.title.subHeading !=''?
                <Text style={styles.midSubTitle}>{props.title.subHeading}</Text>
                : null
            }
        </View>
    )
}
const styles = StyleSheet.create({
    midBox: {
        alignItems: 'center',
        justifyContent: 'center',
         marginTop:80,
         paddingLeft:15,
         paddingRight:15
    },
    midImg:{ 
        width: 100, 
        height: 90 
    },
    midTitle:{
        fontSize: 24, 
        fontWeight: 'bold', 
        textAlign: 'center',
        color:'#2F2F31',
        marginBottom:10
    },
    midSubTitle:{
        fontSize: 15, 
        fontWeight: 'bold', 
        textAlign: 'center',
        color:'#525252',
        marginBottom:15,
    }

})
export default MidContent;