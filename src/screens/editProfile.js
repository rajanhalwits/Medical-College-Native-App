import { useEffect, useState } from 'react';
import {
  View, StyleSheet, Text, Image, TextInput,
  TouchableOpacity, ScrollView, Platform, Pressable, Alert, AsyncStorage, ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { apiUrl } from '../constant';
import Loader from '../components/loader';
import TopBar from './topBar';
import MidContent from '../components/midContent';
import * as ImagePicker from 'expo-image-picker';


function EditProfile({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');

  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedEntry, setSelectedEntry] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  
  const [batchList, setBatchData] = useState([]);
  const [yearList, setyearData] = useState([]);
  const [courseList, setCourseData] = useState([]);
  const [specialization, setSpecialization] = useState('');
  const [isLoading, setLoading] = useState(true);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [otherState, setOtherState] = useState('');
  const [otherCity, setOtherCity] = useState('');
  const [image, setImage] = useState('');
  const [address, setAddress] = useState('');
  
  const [countryList, setCountryData] = useState([]);
  const [stateList, setStateData] = useState([]);
  const [cityList, setCityData] = useState([]);
  const [userId, setUserId] = useState('');
  useEffect(() => {
    fetchYear();
    fetchCourse();
    retrieveData();
    fetchCountry();
  }, []);
  const retrieveData = async () => {
    try {
        const value = await AsyncStorage.getItem('user-info');
        if (value !== null) {
            console.log(JSON.parse(value));
            setUserId(JSON.parse(value).signup_aid);
            setName(JSON.parse(value).full_name);
            fromattedDate(new Date(JSON.parse(value).dob));
            console.log('Date-->', new Date(JSON.parse(value).dob))
            setDate(new Date(JSON.parse(value).dob));
            setGender(JSON.parse(value).gender);
            setSelectedCourse(JSON.parse(value).course_id);
            getBatch(JSON.parse(value).course_id);
            setSelectedBatch(JSON.parse(value).admissionbatch)
            setSelectedEntry(JSON.parse(value).admission_year);
            setSpecialization(JSON.parse(value).current_specializatoin);
            
            setWhatsApp(JSON.parse(value).whatsapp_number);
            
            setSelectedCountry(JSON.parse(value).country_id);
            fetchState(JSON.parse(value).country_id);
            setSelectedState(JSON.parse(value).states_id);
            fetchCity(JSON.parse(value).states_id);
            setSelectedCity(JSON.parse(value).city_id)
            setOtherState(JSON.parse(value).other_state);
            setOtherCity(JSON.parse(value).other_city);
            setAddress(JSON.parse(value).address);
            setImage(JSON.parse(value).profile_pics)
        }
    } catch (error) {
        // Error retrieving data
    }
}
const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage('data:image/jpeg;base64,' + result.base64); 
    }
  };
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
        setLoading(false)
        if (response.status == 'success') {
          setCountryData(response.countryList)
        }else{
          console.log(response);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  const fetchState = (countryId) => {
    setLoading(true)
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
        setLoading(false)
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
    setLoading(true)
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
        setLoading(false)
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
        setLoading(false);
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
  const fromattedDate =(currentDate)=>{
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    //setDate(tempDate.getDate() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getFullYear());
    let fTime = 'Hours:' + tempDate.getHours() + ' | Minute:' + tempDate.getMinutes();
    setText(fDate)
  }
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    setDate(tempDate);
    let fTime = 'Hours:' + tempDate.getHours() + ' | Minute:' + tempDate.getMinutes();
    setText(fDate)
  }
  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }
  
  function sendXmlHttpRequest(data) {
    const xhr = new XMLHttpRequest();
  
    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = e => {
        if (xhr.readyState !== 4) {
          return;
        }
  
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject("Request Failed");
        }
      };
      xhr.open("POST", `${apiUrl}updateProfile`);
      xhr.send(data);
    });
  }

  const registerStepOne = () => {
    let photo = '';
    if(image !=null || image !=''){
      if(image.includes('data:image')){
        photo = image;
      }
    }
    var frm = new FormData();
    frm.append('full_name', name);
    console.log('Dob___ ',typeof(date));
    let customDate = '';
    customDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
    console.log('customDate', customDate)
    frm.append('dob', customDate);
    frm.append('gender', gender);
    frm.append('admissionbatch', selectedBatch);
    frm.append('admission_year', selectedEntry);
    frm.append('course_id', selectedCourse);
    frm.append('whatsapp_number', whatsApp);
    frm.append('current_specializatoin', specialization);
    frm.append('user_id', userId);
    frm.append('country_id', selectedCountry);
    frm.append('states_id', selectedState);
    frm.append('city_id', selectedCity);
    frm.append('address', address);
    frm.append('other_state', otherState);
    frm.append('other_city', otherCity);
    frm.append('profile_pics', photo);
    
    setLoading(true);
    function json(response) {
      return response.json()
    }
    var url = `${apiUrl}updateProfile`;
    fetch(url, { 
      method: 'post',
      body: frm
    })
      .then(json)
      .then(function (response) {
        console.log(response);
        setLoading(false)
        if(response.status == 'success') {
            AsyncStorage.setItem('user-info', JSON.stringify(response.user_list))
            Alert.alert(response.message);
            navigation.replace('Alumni');
        } else {
          Alert.alert(response.message);
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
  return (
    
    <ScrollView style={{ backgroundColor: '#FAFBFF' }}>
        <TopBar/>
      <MidContent title={
            {
                img: require('./../../assets/change_password.png'),
                heading : 'Edit Profile',
                subHeading :''
            }
        }  />
      { isLoading ? <Loader /> : null}
      
      <View style={{ paddingLeft: 15, paddingRight: 15}}>
        {/* <Text selectable={true}>{image}</Text> */}
        <Text style={styles.formLabel}>Enter Your Name</Text>
        <TextInput style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(fullName) => setName(fullName)}
          value={name} />
        <Image source={require(`./../../assets/get_started/name.png`)} style={styles.inputImg} />

        <Text style={styles.formLabel}>Date of Birth</Text>
        <View>
          <Pressable style={styles.dob} onPress={() => showMode('date')} >
            <Text style={styles.dobText}>{text}</Text>
          </Pressable>
        </View>
        {
          show && (
            <DateTimePicker
              value={date}
              mode={mode}
              display='default'
              onChange={onChange}
            />
          )
        }
        <Image source={require(`./../../assets/get_started/year.png`)} style={styles.inputImg} />
        <View style={{ flexDirection: 'row', marginTop: 25, marginBottom: 25 }}>
          <View style={{ width: '35%' }}>
            <TouchableOpacity onPress={() => setGender('1')} style={gender == '1' ? styles.uploadBtn : styles.genderBtn}>
              <Text style={gender == '1' ? styles.btnTextActive : styles.genderText}>
                {
                  gender == '1' ?
                    <Image source={require(`./../../assets/get_started/male_white.png`)} style={{ width: 20, height: 17 }} />
                    :
                    <Image source={require(`./../../assets/get_started/male.png`)} style={{ width: 20, height: 17 }} />
                }
                Male</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '35%', marginLeft: '2%' }}>
            <TouchableOpacity onPress={() => setGender('2')} style={gender == '2' ? styles.uploadBtn : styles.genderBtn}>
              <Text style={gender == '2' ? styles.btnTextActive : styles.genderText}>
                {
                  gender == '2' ?
                    <Image source={require(`./../../assets/get_started/female.png`)} style={{ width: 20, height: 17 }} />
                    :
                    <Image source={require(`./../../assets/get_started/female_grey.png`)} style={{ width: 20, height: 17 }} />
                }
                Female</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ borderBottomWidth: 2, borderColor: '#DDD' }}></View>
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

        <Text style={styles.formLabel}>Current Specialization</Text>
        <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false}
          onChangeText={(spec) => setSpecialization(spec)}
          value={specialization}
        />
        <Image source={require(`./../../assets/get_started/course.png`)} style={styles.inputImg} />
        <View style={{ borderBottomWidth: 2, borderColor: '#DDD', marginTop: 30 }}></View>

        <Text style={styles.formLabel}>Enter WhatsApp Number</Text>
        <TextInput style={styles.input} autoCapitalize="none" keyboardType='numeric' autoCorrect={false}
          onChangeText={(whatsapp) => setWhatsApp(whatsapp)}
          value={whatsApp} />

        <Image source={require(`./../../assets/get_started/whatsapp.png`)} style={styles.inputImg} />
        
        
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
              <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false} placeholder='Enter State'
                onChangeText={(otrState) => setOtherState(otrState)} value={otherState} />
          }
          <Image source={require('./../../assets/state.png')} style={styles.inputImg} />
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
              <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false} placeholder='Enter City'
                onChangeText={(otrCity) => setOtherCity(otrCity)} value={otherCity} />
          }

          <Image source={require('./../../assets/country.png')} style={styles.inputImg} />
          <TextInput style={styles.textArea} placeholder='Enter Address'
            multiline={true}
            numberOfLines={4}
            onChangeText={(add) => setAddress(add)}
            value={address}
          />
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            {
              image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginBottom: 5 }} />
            }
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.uploadBtn} onPress={pickImage}>
            <Text style={styles.btnText}><Image source={require('./../../assets/upload.png')} 
            style={{ width: 20, height: 17 }} /> Change Profile Picture</Text>
          </TouchableOpacity>
        
        <TouchableOpacity style={styles.loginBtn} onPress={() => registerStepOne()}>
          <Text style={styles.nextBtnTxt}>Update Profile</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  passwordIcon: {
    width: 18,
    height: 27,
    marginTop: -40,
    marginLeft: 5,
  },
  pickerItem: {
    color: '#FFF',
    height: 36,
    color: '#666',
    marginTop: -5
  },
  textArea: {
    borderWidth: 1,
    padding: 8,
    borderColor: '#DDD',
    borderRadius: 5,
    marginTop: 25,
    placeholderTextColor: '#666',
    backgroundColor: '#FFF',
    textAlignVertical: 'top',
    marginBottom:25
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
  dob: {
    height: 42,
    borderWidth: 1,
    padding: 8,
    borderColor: '#DDD',
    borderRadius: 5,
    placeholderTextColor: '#666',
    paddingLeft: 30,
    backgroundColor: '#FFF',
  },
  dobText: {
    marginTop: 4
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
    height: 42,
    borderWidth: 1,
    padding: 8,
    borderColor: '#DDD',
    borderRadius: 5,
    placeholderTextColor: '#666',
    paddingLeft: 30,
    backgroundColor: '#FFF',
  },
  inputImg: {
    width: 22,
    height: 25,
    marginTop: -34,
    marginLeft: 5,
  },
  loginBtn: {
    marginTop: 30,
    backgroundColor: '#0866A6',
    padding: 8,
    borderRadius: 8,
    marginBottom: 50,
  },
  uploadBtn: {
    backgroundColor: '#90C8EE',
    padding: 5,
    borderRadius: 8,
  },
  btnText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },

  genderBtn: {
    backgroundColor: '#CCC',
    padding: 5,
    borderRadius: 8,
    color: '#333'
  },
  nextBtnTxt: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  genderText:{
    color: '#333',
    textAlign: 'center',
    fontSize: 15,
  },
  btnTextActive: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 15,
  },
  formLabel: {
    color: '#333',
    marginTop: 25,
    marginBottom: 5
  }
});
export default EditProfile;