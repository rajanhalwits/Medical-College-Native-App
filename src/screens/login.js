import { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, ScrollView, AsyncStorage, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import AppLoading from 'expo-app-loading';
import { useFocusEffect } from '@react-navigation/native';
import { apiUrl } from '../constant';
function Login({ navigation }) {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [deviceToken, setDeviceToken] = useState('');

    if (isLoading) {
        return <AppLoading />
    }
    useFocusEffect(
        useCallback(() => {
            retrieveData();
            
        }, [])
    )

    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('user-info');
            if (value !== null) {
                navigation.replace('Alumni')
            } else {
                console.log('not logged in');
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    const getToken = async () => {
        try {
            const devToken = await AsyncStorage.getItem('DeviceToken');
            if (devToken !== null) {
                console.log('token on login screen'+ devToken);
                Alert.alert('token on login screen '+ devToken)
                userLogin(devToken)
            }else{
                Alert.alert('token not found')
                userLogin('')
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    const userLogin = (devToken) => {
        console.log(devToken);
        let token = '257341a3-feea-4ba6-96e2-34b698072790';
        function json(response) {
            return response.json()
        }
        var url = `${apiUrl}login`
        fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Authorization": "Bearer " + token
            },
            body: "user_name=" + userId + "&password=" + password + "&device_token=" + devToken
        })
        .then(json)
        .then(function (response) {
            setErrorMsg('');
            console.log(response);
            if (response.status == 'success') {
                AsyncStorage.setItem('user-info', JSON.stringify(response.user_list))
                navigation.replace('Alumni');
            } else {
                setErrorMsg(response.message)
            }
        })
        .catch(function (error) {
            console.error(error);
        });
    }

    const toggleCheckbox = () => {
        setSelection(!isSelected)
    }
    return (
        <ScrollView style={{ backgroundColor: '#fafbff' }}>
            <Image source={require('./../../assets/logo.png')} style={styles.midImg} />
            <Text style={styles.midTitle}>Sign In</Text>
            <Text style={styles.midSubTitle}>Please fill in the credentials</Text>
            <View style={{ alignSelf: 'center' }}>
                {
                    errorMsg != '' ?
                        <Text style={styles.error}>{errorMsg}</Text>
                        : null
                }
            </View>
            <View style={{ paddingLeft: 15, paddingRight: 15, marginTop: 10 }}>
                <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false} placeholder="User Name"
                    value={userId}
                    onChangeText={(loginId) => setUserId(loginId)}
                />
                <Image source={require('./../../assets/mobile_number.png')} style={{ width: 20, height: 24, marginTop: -35 }} />
                {
                    userNameError != '' ?
                        <Text style={styles.error}>{userNameError}</Text>
                        : null
                }
                <TextInput style={styles.input} secureTextEntry={true} autoCapitalize="none" autoCorrect={false} placeholder="Password"
                    onChangeText={(pass) => setPassword(pass)}
                    value={password}
                />
                <Image source={require('./../../assets/password.png')} style={{ width: 16, height: 24, marginTop: -38, marginLeft: 5 }} />
                {
                    passwordError != '' ?
                        <Text style={styles.error}>{passwordError}</Text>
                        : null
                }
                <View style={{ flexDirection: 'row', marginTop: 25, marginBottom: 20 }}>
                    <View style={{ width: '60%', flexDirection: 'row' }}>
                        {/* <Checkbox value={isSelected} style={{ alignSelf: 'center' }} onValueChange={toggleCheckbox} />
                        <TouchableOpacity activeOpacity={0.8} onPress={toggleCheckbox}>
                            <Text style={{ color: '#666', paddingLeft: 5 }}> Remember Me</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={{ width: '40%' }}>
                        <Text style={{ color: '#0866A6', textAlign: 'right' }} onPress={() => navigation.navigate('Forgot Password')}>Forgot Password?</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={() => getToken()}>
                    <Text style={styles.btnText}>Sign In</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginTop: 20, textAlign: 'center' }}>
                    <Text style={{ color: '#333' }}> Don't have an account ?</Text>
                    <Text style={{ color: '#0866A6', paddingLeft: 5 }} onPress={() => navigation.navigate('GetStarted')}> SignUp</Text>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    error: {
        color: 'red',
        fontSize: 12,
        marginBottom: -20,
        marginTop: 15
    },
    midTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2F2F31',
        marginBottom: 10,
        marginTop: 10,
    },
    midSubTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#525252',
    },
    midImg: {
        alignSelf: 'center',
        marginTop: 50,
        width: 109,
        height: 152,
    },
    input: {
        height: 45,
        borderWidth: 1,
        padding: 8,
        borderColor: '#DDD',
        borderRadius: 5,
        marginTop: 35,
        placeholderTextColor: '#666',
        paddingLeft: 25,
        backgroundColor: '#FFF'
    },
    loginBtn: {
        marginTop: 15,
        backgroundColor: '#0866A6',
        padding: 8,
        borderRadius: 8,
    },
    btnText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    }
});
export default Login;