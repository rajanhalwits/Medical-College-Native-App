import TopBar from "./topBar";
import { View, Text, StyleSheet, Image, FlatList, Linking, TouchableOpacity, Platform } from 'react-native'
import MidContent from "../components/midContent";
import { useEffect, useState } from "react";
import { apiUrl } from "../constant";
function Alumni({ navigation }) {
    const [alumniData, setAlumniData] = useState([]);

    useEffect(() => {
        fetchAlumi()
    }, [])
    const fetchAlumi = () => {
        function json(response) {
            return response.json()
        }
        var url = `${apiUrl}GetourAlumni`;
        fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            }
        })
            .then(json)
            .then(function (response) {
                console.log(response);
                if (response.status == 'success') {
                    setAlumniData(response.alumniList)
                } else {
                    Alert.alert(response.message)
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    const sendWhatsApp = (whatsappNo) => {
        let msg = "Message from Alumni...";
        let phoneWithCountryCode = `+91${whatsappNo}`;

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

    const sendEmail = async (emailAddress, comment) => {
        const url = `mailto:${emailAddress}?body=${comment}`;
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        }
    }

    return (
        <View contentContainerStyle={styles.parent}>
            <TopBar />
            <MidContent title={
                {
                    img: require('./../../assets/we_are_hiring.png'),
                    heading: 'Our Alumni',
                    subHeading: ''
                }
            } />
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                <FlatList
                    data={alumniData}
                    style={{ height: '72%'}}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.postBox}>
                            <View style={styles.profile}>
                                <Image source={{uri:item.profile_pics}} style={styles.profilePic} />
                                
                            </View>
                            <View style={styles.name}>
                                <Text style={{ color: '#333', fontWeight: 'bold' }}>{item.full_name}</Text>
                                <Text style={{ color: '#666', fontSize: 13 }}>Batch: ({item.batch_name})</Text>
                                <Text style={{ color: '#666', fontSize: 13 }}>{item.current_specializatoin}</Text>
                            </View>
                            <View style={styles.contact}>
                                {
                                    item.whatsapp_number !='' ?
                                    <TouchableOpacity activeOpacity={0.8} onPress={()=>sendWhatsApp(item.whatsapp_number)}>
                                        <Image source={require('./../../assets/whatsapp.jpg')} style={styles.contactIcon} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity activeOpacity={0.8} onPress={()=>sendEmail(item.email_id, 'Email from Alumni..')}>
                                        <Image source={require('./../../assets/message.jpg')} style={styles.contactIcon} />
                                    </TouchableOpacity>
                                }
                                
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    parent: {
        backgroundColor: '#fafbff',
        minHeight: '100%',
    },
    profile: {
        width: '19%',
    },
    contact: {
        width: '17%',
    },
    name: {
        width: '64%',
        justifyContent: 'center'
    },
    contactIcon: {
        width: 55,
        height: 55,
    },
    profilePic: {
        width: 55,
        height: 55,
        borderRadius:55/2
    },
    blueBtn: {
        marginTop: 20,
        backgroundColor: '#0866A6',
        padding: 8,
        borderRadius: 8,
        width: '100%'
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
    input: {
        height: 42,
        borderWidth: 1,
        padding: 8,
        borderColor: '#DDD',
        borderRadius: 20,
        marginTop: 10,
        placeholderTextColor: '#666',
        paddingLeft: 15,
        backgroundColor: '#FFF',
        width: '90%',
        textAlign: 'left'
    },
    inputImg: {
        width: 22,
        height: 25,
        marginTop: -34,
        marginLeft: 5,
    },
    textArea: {
        borderWidth: 1,
        padding: 8,
        borderColor: '#DDD',
        borderRadius: 5,
        marginTop: 10,
        placeholderTextColor: '#666',
        backgroundColor: '#FFF'
    },
    postBox: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderColor: '#ddd',
        marginTop: 8,
        borderBottomWidth: 1,
        paddingBottom: 8,
        paddingTop: 8,
        paddingLeft:5,
        paddingRight:5
    },
});
export default Alumni;