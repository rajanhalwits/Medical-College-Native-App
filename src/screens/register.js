import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';
import { apiUrl } from '../constant';
import Loader from '../components/loader';
function Register({route, navigation }) {
  const { signupId, otherParams } = route.params;

  const [isSelected, setSelection] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [otherState, setOtherState] = useState('');
  const [otherCity, setOtherCity] = useState('');
  const [image, setImage] = useState('');
  const [address, setAddress] = useState('');
  const [prevId, setPrevId] = useState(signupId);
  const [countryList, setCountryData] = useState([]);
  const [stateList, setStateData] = useState([]);
  const [cityList, setCityData] = useState([]);
  const [terms, setTerms] = useState(0);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountry();
  }, []);
  
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

  const signup = () => {
    setLoading(true)
    console.log('rajan ----> ',image);
    
    var frm = new FormData();
    frm.append('country_id', selectedCountry);
    frm.append('states_id', selectedState);
    frm.append('city_id', selectedCity);
    frm.append('address', address);
    frm.append('other_state', otherState);
    frm.append('other_city', otherCity);
    frm.append('profile_pics', image);
    frm.append('user_id', prevId);
    frm.append('term', terms);
    function json(response) {
      return response.json()
    }
    var url = `${apiUrl}signupNext`
    fetch(url, {
      method: 'post',
      body: frm
    })
      .then(json)
      .then(function (response) {
        console.log(response);
        setLoading(false)
        Alert.alert(response.message);
        if(response.status =='success'){
          navigation.navigate('MMCH')
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const toggleCheckbox = () => {
    setSelection(!isSelected);
    if (!isSelected) {
      setTerms(1)
    } else {
      setTerms(0)
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.parent}>
      {isLoading ? <Loader/> : null}
      <View>
        <Image source={require('./../../assets/logo.png')} style={styles.midImg} />
        <Text style={styles.midTitle}>Complete Your Registration</Text>
        <Text style={styles.midSubTitle}>Please provide your current address</Text>
        <View style={{ paddingLeft: 15, paddingRight: 15, marginTop: 10 }}>
          <View style={styles.selectBox}>
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
              <View style={styles.selectBox}>
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
              <View style={styles.selectBox}>
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
          />
          <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 20 }}>
            <View style={{ width: '100%', flexDirection: 'row' }}>
              <Checkbox value={isSelected} onValueChange={toggleCheckbox} />
              <TouchableOpacity activeOpacity={0.8} onPress={toggleCheckbox}>
                <Text style={{ color: '#666', paddingLeft: 5 }}> I agree to the terms & conditions</Text>
              </TouchableOpacity>
            </View>

          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            {
              image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginBottom: 5 }} />
            }
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.uploadBtn} onPress={pickImage}>
            <Text style={styles.btnText}><Image source={require('./../../assets/upload.png')} style={{ width: 20, height: 17 }} /> Upload Profile Picture</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.loginBtn} onPress={() => signup()}>
            <Text style={styles.btnText}>Create</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', marginTop: 20, textAlign: 'center' }}>
            <Text style={{ color: '#333' }}> Already have an account ?</Text>
            <Text style={{ color: '#0866A6', paddingLeft: 5 }} onPress={() => navigation.navigate('MMCH')}> Sign In</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  input: {
    height: 42,
    borderWidth: 1,
    padding: 8,
    borderColor: '#DDD',
    borderRadius: 5,
    placeholderTextColor: '#666',
    paddingLeft: 30,
    backgroundColor: '#FFF',
    marginTop: 25
  },
  pickerItem: {
    color: '#FFF',
    height: 36,
    color: '#666',
    marginTop: -5
  },
  selectBox: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    paddingLeft: 23,
    borderRadius: 5,
    height: 42,
    marginTop: 25
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
  parent: {
    backgroundColor: '#fafbff',
    paddingBottom: 25,
    paddingTop: 25
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
    marginTop: 25,
    placeholderTextColor: '#666',
    backgroundColor: '#FFF',
    textAlignVertical: 'top'
  },
  loginBtn: {
    marginTop: 25,
    backgroundColor: '#0866A6',
    padding: 8,
    borderRadius: 8,
  },
  uploadBtn: {
    backgroundColor: '#90C8EE',
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
export default Register;