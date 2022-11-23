import TopBar from "./topBar";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, AsyncStorage, Alert } from 'react-native'
import MidContent from "../components/midContent";
import { useEffect, useState } from "react";
import { apiUrl } from "../constant";

function ApplyWallOfFame({ navigation }) {
    const [description, setDescription] = useState('');
    const [userData, setUserData] = useState([])
    useEffect(() => {
        retrieveData()
    }, []);

    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('user-info');
            if (value !== null) {
                console.log(JSON.parse(value));
                setUserData(JSON.parse(value))
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    const saveWallFame = () => {
        let userId = userData.signup_aid
        function json(response) {
            return response.json()
        }
        var url = `${apiUrl}GetWallfame`
        fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "user_id=" + userId + "&description=" + description
        })
            .then(json)
            .then(function (response) {
                console.log(response);
                if (response.status == 'success') {
                    setDescription('')
                    navigation.navigate('Wall of Fame Thankyou',{msg: response.message});
                } else {
                    Alert.alert(response.message)
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    return (
        <ScrollView contentContainerStyle={styles.parent}>
            <TopBar />
            <MidContent title={
                {
                    img: require('./../../assets/wall_of_fame/wall_of_fame.png'),
                    heading: 'Wall of Fame',
                    subHeading: "Exciting News!! We have launched Wall of Fame exclusively for our Alumni's. \n Share your achievement's with us and get a chance to be highlighted in the Wall of Fame."
                }
            } />
            <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                <View style={styles.postBox}>
                    <View style={{ width: '20%' }}>
                        <Image source={{uri:userData.profile_pics}} style={{ width: 55, height: 55, borderRadius:55/2 }} />
                    </View>
                    <View style={{ width: '80%', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: '#666', textTransform: 'capitalize' }}>{userData.full_name}</Text>
                        <Text style={{ color: '#999' }}>{userData.course} ({userData.batch_name})</Text>
                        <Text style={{ color: '#999' }}>{userData.current_specializatoin}</Text>
                    </View>
                </View>
                <Text style={{ marginTop: 15, fontSize: 16, fontWeight: 'bold', color: '#666' }}>Please describe your achivements</Text>
                <TextInput style={styles.textArea}
                    multiline={true}
                    numberOfLines={14}
                    onChangeText={(desc) => setDescription(desc)}
                    value={description}
                />
                <TouchableOpacity style={styles.blueBtn} onPress={() => saveWallFame()}>
                    <Text style={styles.btnText}>Apply Now</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    parent: {
        backgroundColor: '#fafbff',
        minHeight: '100%',
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
        fontWeight: 'bold'
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
        borderRadius: 5,
        marginTop: 10,
        placeholderTextColor: '#666',
        paddingLeft: 30,
        backgroundColor: '#FFF'
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
        backgroundColor: '#FFF',
        textAlignVertical: 'top'
    },
    postBox: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        marginTop: 20,
        padding:5
    },
});
export default ApplyWallOfFame;