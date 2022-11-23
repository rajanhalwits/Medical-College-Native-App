import TopBar from "./topBar";
import { View, Text, StyleSheet, Image, FlatList, Linking, TouchableOpacity, Platform, TextInput } from 'react-native'
import FlatListHeader from "../components/flatListHeader";
import { useEffect, useState } from "react";
import { apiUrl } from "../constant";
import { Picker } from '@react-native-picker/picker';


function Alumni({ navigation }) {
    const [alumniData, setAlumniData] = useState([]);
    const [name, setName] = useState('');
    const [selectedBatch, setSelectedBatch] = useState('');
    const [selectedEntry, setSelectedEntry] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');

    const [batchList, setBatchData] = useState([]);
    const [yearList, setyearData] = useState([]);
    const [courseList, setCourseData] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const [countryList, setCountryData] = useState([]);
    const [stateList, setStateData] = useState([]);
    const [cityList, setCityData] = useState([]);

    const [isFilter, setFilter] = useState(false)
    useEffect(() => {
        fetchAlumi();
        fetchYear();
        fetchCourse();
        fetchCountry();
    }, [name])
    const fetchAlumi = () => {
        function json(response) {
            return response.json()
        }
        var url = `${apiUrl}GetourAlumni`;
        fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: "name=" + name + "&courses_id=" + selectedCourse + "&year_of_entry=" + selectedEntry +
                "&batch_id=" + selectedBatch + "&country_id=" + selectedCountry + "&states_id=" + selectedState +
                "&city_id=" + selectedCity
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
    const sendWhatsApp = (whatsappNo, msg) => {
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

    const fetchCountry = () => {
        function json(response) {
            return response.json()
        }
        var url = `${apiUrl}GetCountry`
        fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            }
        })
            .then(json)
            .then(function (response) {
                if (response.status == 'success') {
                    setCountryData(response.countryList)
                } else {
                    console.log(response);
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    const fetchState = (countryId) => {
        setSelectedCountry(countryId);
        function json(response) {
            return response.json()
        }
        var url = `${apiUrl}GetState`;
        fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: "country_code=" + countryId
        })
            .then(json)
            .then(function (response) {
                if (response.status == 'success') {
                    setStateData(response.stateList)
                }
                //console.log(response);
            })
            .catch(function (error) {
                console.error(error);
            });

    }
    const fetchCity = (stateId) => {
        setSelectedState(stateId)
        function json(response) {
            return response.json()
        }
        var url = `${apiUrl}GetCity`
        fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: "state_id=" + stateId
        })
            .then(json)
            .then(function (response) {
                if (response.status == 'success') {
                    setCityData(response.cityList)
                }
                //console.log(response);
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    const fetchBatch = (courseId) => {
        function json(response) {
            return response.json()
        }
        var url = `${apiUrl}GetBatch`;
        fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: "course_id=" + courseId
        })
            .then(json)
            .then(function (response) {
                if (response.status == 'success') {
                    setBatchData(response.batchList)
                } else {
                    console.log(response);
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    const fetchYear = () => {
        function json(response) {
            return response.json()
        }
        var url = `${apiUrl}GetYear`;
        fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            }
        })
            .then(json)
            .then(function (response) {
                if (response.status == 'success') {
                    setyearData(response.yearList)
                } else {
                    console.log(response);
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    const fetchCourse = () => {
        function json(response) {
            return response.json()
        }
        var url = `${apiUrl}GetCourse`
        fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            }
        })
            .then(json)
            .then(function (response) {
                if (response.status == 'success') {
                    setCourseData(response.courseList)
                } else {
                    console.log(response);
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    const getBatch = (courseId) => {
        fetchBatch(courseId);
        setSelectedCourse(courseId);
    }
    const applyFilter = () => {
        fetchAlumi();
        setFilter(!isFilter);
    }
    const resetFilter = () => {
        setSelectedBatch('');
        setSelectedEntry('');
        setSelectedCourse('');
        setSelectedCountry('');
        setSelectedState('');
        setSelectedCity('');
    }
    return (
        <View contentContainerStyle={styles.parent}>
            <TopBar />
            {
                isFilter ?
                    <View style={styles.filterForm}>
                        <Text style={styles.formLabel}>Year of Entry</Text>
                        <View style={styles.selectBox}>
                            <Picker selectedValue={selectedEntry} style={styles.pickerItem}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedEntry(itemValue)
                                }>
                                <Picker.Item label='Select Year' value='' />
                                {
                                    yearList.length > 0 ?
                                        yearList.map((item) =>
                                            <Picker.Item label={item.year} key={item.year} value={item.year} />
                                        )
                                        : null
                                }
                            </Picker>
                        </View>
                        <Image source={require(`./../../assets/get_started/year.png`)} style={styles.inputImg} />

                        <Text style={styles.formLabel}>Select Course</Text>
                        <View style={styles.selectBox}>
                            <Picker selectedValue={selectedCourse} style={styles.pickerItem}
                                onValueChange={(itemValue) => getBatch(itemValue)
                                }>
                                <Picker.Item label='Select Course' value='' />
                                {
                                    courseList.length > 0 ?
                                        courseList.map((item) =>
                                            <Picker.Item label={item.name} key={item.id} value={item.id} />
                                        )
                                        : null
                                }
                            </Picker>
                        </View>
                        <Image source={require(`./../../assets/get_started/course.png`)} style={styles.inputImg} />

                        <Text style={styles.formLabel}>Select Batch</Text>
                        <View style={styles.selectBox}>
                            <Picker selectedValue={selectedBatch} style={styles.pickerItem}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedBatch(itemValue)
                                }>
                                <Picker.Item label='Select Batch' value='' />
                                {
                                    batchList.length > 0 ?
                                        batchList.map((item) =>
                                            <Picker.Item label={item.batch_year} key={'Batch' + item.batch_id} value={item.batch_id} />
                                        )
                                        : null
                                }
                            </Picker>
                        </View>
                        <Image source={require(`./../../assets/get_started/batch.png`)} style={styles.inputImg} />

                        <View style={styles.selectBoxBtm}>
                            <Picker selectedValue={selectedCountry} style={styles.pickerItem}
                                onValueChange={(itemValue) =>
                                    fetchState(itemValue)
                                }>
                                <Picker.Item label='Select Country' value='' />
                                {
                                    countryList.length > 0 ?
                                        countryList.map((country) =>
                                            <Picker.Item label={country.name} value={country.code} key={country.code} />
                                        )
                                        : null
                                }
                            </Picker>
                        </View>
                        <Image source={require('./../../assets/country.png')} style={styles.inputImg} />


                        {
                            selectedCountry == 'IN' || selectedCountry == '' ?
                                <View style={styles.selectBoxBtm}>
                                    <Picker selectedValue={selectedState} style={styles.pickerItem}
                                        onValueChange={(itemValue) =>
                                            fetchCity(itemValue)
                                        }>
                                        <Picker.Item label='Select State' value='' />
                                        {
                                            stateList.length > 0 ?
                                                stateList.map((state) =>
                                                    <Picker.Item label={state.name} value={state.id} key={state.name} />
                                                )
                                                : null
                                        }
                                    </Picker>
                                </View>
                                :
                                null
                        }
                        {
                            selectedCountry == 'IN' || selectedCountry == '' ?
                                <Image source={require('./../../assets/state.png')} style={styles.inputImg} />
                                : null
                        }
                        {
                            selectedCountry == 'IN' || selectedCountry == '' ?
                                <View style={styles.selectBoxBtm}>
                                    <Picker selectedValue={selectedCity} style={styles.pickerItem}
                                        onValueChange={(itemValue) =>
                                            setSelectedCity(itemValue)
                                        }>
                                        <Picker.Item label='Select City' value='' />
                                        {
                                            cityList.length > 0 ?
                                                cityList.map((city) =>
                                                    <Picker.Item label={city.name} value={city.id} key={city.name} />
                                                )
                                                : null
                                        }
                                    </Picker>
                                </View>
                                :
                                null
                        }
                        {
                            selectedCountry == 'IN' || selectedCountry == '' ?
                                <Image source={require('./../../assets/country.png')} style={styles.inputImg} />
                                : null
                        }

                    </View>
                    : null
            }
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                {isFilter &&( selectedBatch !='' || selectedEntry !='' || selectedCourse !='' || selectedCountry !='' ||
                selectedState !='' || selectedCity !='') ?
                    <TouchableOpacity activeOpacity={0.8} style={styles.filterReset}
                        onPress={() => resetFilter()}>
                        <Text style={styles.resetText}>Clear All</Text>
                    </TouchableOpacity> : null}
                {
                    !isFilter ?
                        <TouchableOpacity activeOpacity={0.8} style={styles.filterButton}
                            onPress={() => setFilter(true)}>
                            <Image source={require('./../../assets/filter.png')} style={styles.filterIcon} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity activeOpacity={0.8} style={styles.filterApply}
                            onPress={() => applyFilter()}>
                            <Text style={styles.resetText}>Apply</Text>
                        </TouchableOpacity>
                }

                <FlatList
                    data={alumniData}
                    style={{ height: '89%', marginTop: 72 }}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={<View style={styles.postBox}>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Image source={require('./../../assets/empty-box.png')} style={{ width: 100, height: 100, marginBottom: 10 }} />
                            <Text style={{ fontWeight: 'bold', color: '#333' }}>No Record Found</Text>
                        </View>
                    </View>}
                    ListHeaderComponent={
                        <View>
                            <FlatListHeader title={
                                {
                                    img: require('./../../assets/we_are_hiring.png'),
                                    heading: 'Our Alumni',
                                    subHeading: ''
                                }
                            } />
                            <TextInput style={styles.input} placeholder="Search by name..." onChangeText={(query) => setName(query)} />
                        </View>
                    }
                    renderItem={({ item }) => (
                        <View style={styles.postBox}>
                            <View style={styles.profile}>
                                <Image source={{ uri: item.profile_pics }} style={styles.profilePic} />

                            </View>
                            <View style={styles.name}>
                                <Text style={{ color: '#333', fontWeight: 'bold' }}>{item.full_name}</Text>
                                <Text style={{ color: '#666', fontSize: 13 }}>{item.course} ({item.batch_name})</Text>
                                <Text style={{ color: '#666', fontSize: 13 }}>{item.current_specializatoin}</Text>
                            </View>
                            <View style={styles.contact}>
                                {
                                    item.whatsapp_number != '' ?
                                        <TouchableOpacity activeOpacity={0.8} onPress={() => sendWhatsApp(item.whatsapp_number, item.whatsappmsg)}>
                                            <Image source={require('./../../assets/whatsapp.png')} style={styles.contactIcon} />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity activeOpacity={0.8} onPress={() => sendEmail(item.email_id, 'Email from Alumni..')}>
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
    filterIcon: {
        width: 30,
        height: 30,
    },
    filterButton: {
        position: 'absolute',
        bottom: -10,
        zIndex: 9,
        right: 15,
        backgroundColor: '#0866A6',
        borderRadius: 25,
        padding: 8,
    },
    filterReset: {
        position: 'absolute',
        bottom: 0,
        zIndex: 9,
        left: 15,
        backgroundColor: '#0866A6',
        borderRadius: 3,
        padding: 8,
        width: '45%',
    },
    filterApply:{
        position: 'absolute',
        bottom: 0,
        zIndex: 9,
        right: 15,
        backgroundColor: '#0866A6',
        borderRadius: 3,
        padding: 8,
        width: '45%',  
    },
    resetText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        fontSize:18
    },
    filterForm: {
        position: 'absolute',
        backgroundColor: '#FFF',
        top: 72,
        bottom: -15,
        left: 0,
        width: '100%',
        zIndex: 8,
        padding: 15
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
        borderRadius: 55 / 2
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
        placeholderTextColor: '#666',
        backgroundColor: '#FFF',
        width: '100%',
        textAlign: 'left',
    },
    postBox: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderColor: '#ddd',
        marginTop: 8,
        borderBottomWidth: 1,
        paddingBottom: 8,
        paddingTop: 8,
        paddingLeft: 5,
        paddingRight: 5
    },
    pickerItem: {
        color: '#FFF',
        height: 36,
        color: '#666',
        marginTop: -5
    },
    selectBoxBtm: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        paddingLeft: 23,
        borderRadius: 5,
        height: 42,
        marginTop: 25
    },
    selectBox: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        paddingLeft: 23,
        borderRadius: 5,
        height: 42
    },
    formLabel: {
        color: '#333',
        marginTop: 25,
        marginBottom: 5
    }, inputImg: {
        width: 22,
        height: 25,
        marginTop: -34,
        marginLeft: 5,
    },
});
export default Alumni;