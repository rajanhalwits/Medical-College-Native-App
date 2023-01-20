import { useEffect, useState } from 'react';
import {
  View, StyleSheet, Text, Image, TextInput,
  TouchableOpacity, ScrollView, Platform, Pressable, Alert, AsyncStorage, ActivityIndicator, Button
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import { apiUrl } from '../constant';
import Loader from '../components/loader';
import { Appearance } from 'react-native-web';
function Getstarted({ navigation }) {
  const [isSelected, setSelection] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('1');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedEntry, setSelectedEntry] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [mobile, setMobile] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [batchList, setBatchData] = useState([]);
  const [yearList, setyearData] = useState([]);
  const [courseList, setCourseData] = useState([]);
  const [specialization, setSpecialization] = useState('');
  const [isLoading, setLoading] = useState(true);

  const [state, setState] = useState(false)
  useEffect(() => {
    fetchYear();
    fetchCourse();
  }, []);
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
        console.log(response);
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
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    //setDate(tempDate.getDate() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getFullYear());
    setText(fDate)
  }
  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }
  const toggleCheckbox = () => {
    setSelection(!isSelected)
    if (!isSelected) {
      setWhatsApp(mobile)
    }else{
      setWhatsApp('')
    }
  }
  const registerStepOne = () => {
    let token = '257341a3-feea-4ba6-96e2-34b698072790';
    console.log('DOB', date);
    setLoading(true)
    function json(response) {
      return response.json()
    }
    var url = `${apiUrl}signup`
    fetch(url, {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Authorization": "Bearer " + token
      },

      body: "full_name=" + name + "&dob=" + date + "&gender=" + gender + "&admissionbatch=" + selectedBatch
        + "&admission_year=" + selectedEntry + "&course_id=" + selectedCourse + "&mobile_number=" + mobile
        + "&whatsapp_number=" + whatsApp + "&email_id=" + email + "&password=" + password
        + "&comf_password=" + confirmPassword + "&current_specializatoin=" + specialization
    })
      .then(json)
      .then(function (response) {
        console.log(response);
        setLoading(false)
        if (response.status == 'success') {
          navigation.navigate('SignUp',{signupId:response.signup_aid});
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
  
  const colorScheme = Appearance.getColorScheme();
  console.log('___',colorScheme)
  return (
    
    <ScrollView style={{ backgroundColor: '#FAFBFF' }}>
      { isLoading ? <Loader /> : null}
      <Image source={require('./../../assets/logo.png')} style={styles.midImg} />
      <Text style={styles.midTitle}>Let's Get Started</Text>
      <Text style={styles.midSubTitle}>Create an account to get all features</Text>
      
      <View style={Platform.OS =='ios' ? styles.iosContainer : styles.androidContainer}>
        <Text style={styles.formLabel}>Enter Your Name</Text>
        <TextInput style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(fullName) => setName(fullName)}
          value={name} />
        <Image source={require(`./../../assets/get_started/name.png`)} style={styles.inputImg} />

        <Text style={styles.formLabel}>Date of Birth</Text>
        { Platform.OS !='ios' ?

          <View>
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
        </View>
        :
        <View style={{borderWidth:0.5, borderColor:'#ddd'}}>        
          <DateTimePicker style={{height:110, fontSize:12}} 
            value={date}
            mode='date'
            display='spinner'
            onChange={onChange} />
        
        </View>
        }
        
        <View style={{ flexDirection: 'row', marginTop: 25, marginBottom: 25 }}>
          <View style={{ width: '35%' }}>
            <TouchableOpacity onPress={() => setGender('1')} style={gender == '1' ? styles.uploadBtn : styles.genderBtn}>
              <Text style={gender == '1' ? styles.btnTextActive : styles.btnText}>
                {
                  gender == '1' ?
                    <View>
                      <Image source={require(`./../../assets/get_started/male_white.png`)} style={{ width: 20, height: 17 }} />
                    </View>
                    :
                    <View>
                      <Image source={require(`./../../assets/get_started/male.png`)} style={{ width: 20, height: 17 }} />
                    </View>
                }
                Male</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '35%', marginLeft: '2%' }}>
            <TouchableOpacity onPress={() => setGender('2')} style={gender == '2' ? styles.uploadBtn : styles.genderBtn}>
              <Text style={gender == '2' ? styles.btnTextActive : styles.btnText}>
                {
                  gender == '2' ?
                  <View>
                    <Image source={require(`./../../assets/get_started/female.png`)} style={{ width: 20, height: 17 }} />
                    </View>
                    :
                    <View>
                    <Image source={require(`./../../assets/get_started/female_grey.png`)} style={{ width: 20, height: 17 }} />
                    </View>
                }
                Female</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ borderBottomWidth: 2, borderColor: '#DDD' }}></View>        
        {
          Platform.OS =='ios' ?
          <View>
            <Text style={styles.formLabel}>Year of Entry</Text>
            <Picker selectedValue={selectedEntry} style={styles.pickerStyle} itemStyle={styles.pickerOpt}
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
        :
        <View>
          <Text style={styles.formLabel}>Year of Entry</Text>
          <View style={styles.selectBox}>
            <Picker selectedValue={selectedEntry} style={styles.pickerItem} itemStyle={styles.pickerOpt}
            onValueChange={(itemValue, itemIndex) =>setSelectedEntry(itemValue)}>
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
        </View>
        }
        
        {
          Platform.OS =='ios' ?
          <View>
          <Text style={styles.formLabel}>Select Course</Text>
          <Picker selectedValue={selectedCourse} style={styles.pickerStyle}  itemStyle={styles.pickerOpt}
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
          : 
          <View>
              <Text style={styles.formLabel}>Select Course</Text>
              <View style={styles.selectBox}>
                <Picker selectedValue={selectedCourse} style={styles.pickerItem}  itemStyle={styles.pickerOpt}
                  onValueChange={(itemValue) => getBatch(itemValue)
                  }>
                  <Picker.Item label='Select Course' value='' />
                  {
                    courseList.length > 0 ?
                      courseList.map((item) =>
                        <Picker.Item label={item.name} key={item.id}  value={item.id} />
                      )
                      : null
                  }
                </Picker>
              </View>
              <Image source={require(`./../../assets/get_started/course.png`)} style={styles.inputImg} />
          </View>
        }
        
        {
          Platform.OS =='ios' ? 
          <View>
          <Text style={styles.formLabel}>Select Batch</Text>
          <Picker selectedValue={selectedBatch}  style={styles.pickerStyle} itemStyle={styles.pickerOpt}
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
          :
          <View>
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
          </View>
        }
        
        
        <Text style={styles.formLabel}>Current Specialization</Text>
        <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false}
          onChangeText={(spec) => setSpecialization(spec)}
          value={specialization}
        />
        <Image source={require(`./../../assets/get_started/course.png`)} style={styles.inputImg} />
        <View style={{ borderBottomWidth: 2, borderColor: '#DDD', marginTop: 30 }}></View>

        <Text style={styles.formLabel}>Enter Mobile Number</Text>
        <TextInput style={styles.input} autoCapitalize="none" keyboardType='numeric' autoCorrect={false}
          onChangeText={(mob) => setMobile(mob)}
          value={mobile}
        />
        <Image source={require(`./../../assets/get_started/mobile_numer.png`)} style={styles.inputImg} />

        <Text style={styles.formLabel}>Enter WhatsApp Number</Text>
        <TextInput style={styles.input} autoCapitalize="none" keyboardType='numeric' autoCorrect={false}
          onChangeText={(whatsapp) => setWhatsApp(whatsapp)}
          value={whatsApp} />

        <Image source={require(`./../../assets/get_started/whatsapp.png`)} style={styles.inputImg} />

        <View style={{ flexDirection: 'row', marginTop: 20, }}>
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <Checkbox value={isSelected} onValueChange={toggleCheckbox} />
            <TouchableOpacity activeOpacity={0.8} onPress={toggleCheckbox}>
              <Text style={{ color: '#666', paddingLeft: 5 }}>Same as mobile number</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.formLabel}>Enter Email ID</Text>
        <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false}
          onChangeText={(emailID) => setEmail(emailID)}
          value={email} />
        <Image source={require(`./../../assets/get_started/email_id.png`)} style={styles.inputImg} />

        <Text style={styles.formLabel}>Enter Password</Text>
        <TextInput style={styles.input} autoCapitalize="none" secureTextEntry={true} autoCorrect={false}
          onChangeText={(pass) => setPassword(pass)}
          value={password} />

        <Image source={require(`./../../assets/password.png`)} style={styles.passwordIcon} />
        <Text style={styles.formLabel}>Enter Confirm Password</Text>
        <TextInput style={styles.input} autoCapitalize="none" secureTextEntry={true} autoCorrect={false}
          onChangeText={(conPass) => setConfirmPassword(conPass)} />

        <Image source={require(`./../../assets/password.png`)} style={styles.passwordIcon} />
        <TouchableOpacity style={styles.loginBtn} onPress={() => registerStepOne()}>
          <Text style={styles.nextBtnTxt}>Next</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  androidContainer:{
    paddingHorizontal:15,
    marginTop: 10
  },
  iosContainer:{
    paddingHorizontal:15,
    marginTop: 10,
    paddingBottom:150,
  },
  passwordIcon: {
    width: 18,
    height: 27,
    marginTop: -37,
    marginLeft: 5,
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
    marginTop: 20,
    backgroundColor: '#0866A6',
    padding: 8,
    borderRadius: 8,
    marginBottom: 80,
  },
  uploadBtn: {
    backgroundColor: '#0866A6',
    padding: 5,
    borderRadius: 8,
    alignItems:'center'
  },

  genderBtn: {
    backgroundColor: '#CCC',
    padding: 5,
    borderRadius: 8,
    color: '#333',
    alignItems:'center'
  },
  nextBtnTxt: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  btnText: {
    color: '#999',
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
  },
  textStyle:{  
    margin: 24,  
    fontSize: 25,  
    fontWeight: 'bold',  
    textAlign: 'center',  
},  
pickerStyle:{  
    height: 100,  
    width: "60%",   
    justifyContent: 'center',  
    overflow:'scroll',
    borderWidth:0.5,
    borderColor:'#DDD',
    marginLeft:'19%'
},
pickerOpt:{
  fontSize:13,
  color: '#344953', 
}  
});
export default Getstarted;