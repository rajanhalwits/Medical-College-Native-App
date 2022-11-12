import { useEffect, useState, useCallback } from "react";
import {View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, AsyncStorage} from "react-native";
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
function TopBar(){
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('')
  const navigation = useNavigation();
  const route = useRoute();
  useEffect(()=>{
    retrieveData();
    setIsOpen(false)
  },[])

  useFocusEffect(
    useCallback(() => {;
      setIsOpen(false)
    }, [])
)

  const redirect = (path)=>{
    setIsOpen(false);
    navigation.navigate(path)
  }
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user-info');
      if (value !== null) {
        setName(JSON.parse(value).full_name);
        setEmail(JSON.parse(value).email_id);
        setProfilePicture(JSON.parse(value).profile_pics);
      }else{
        navigation.navigate('MMCH')
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  const logout = () => {    
    console.log('in logout')
    AsyncStorage.clear();
    navigation.replace('MMCH');
  }
  const goTOPrevScreen = () =>{
    if(navigation.canGoBack()){
      navigation.goBack();
    }
  
  }
    return(
      <View style={{position:'absolute', top:0}}>
      <View style={styles.TopBar} >
        <View style={{width:'50%'}}>
          <TouchableOpacity onPress={() => goTOPrevScreen()}>
          <Image source={require('./../../assets/back_arrow.png')} style={styles.menuBar} />
          </TouchableOpacity>
        </View>
        <View style={{width:'50%', flexDirection: 'row-reverse'}}>
          <TouchableOpacity onPress={()=>setIsOpen(!isOpen)}>
            <Image source={require('./../../assets/menubar.png')} style={styles.menuBar} />
          </TouchableOpacity>
        </View>
      </View>
      {
        isOpen ?
        <View>
        <ScrollView style={styles.menuDraw}>
          <View style={{flexDirection:'row', padding:10}}>
            <View style={{width:'30%'}}>
            
              <Image source={{uri:profilePicture}} style={{width:70, height:70, borderRadius:35}} />
            </View>
            <View style={{width:'70%', paddingTop:15}}>
              <Text style={{fontWeight:'bold', color:'#666', textTransform:'capitalize'}}>
                {name}
              </Text>
              <Text style={{color:'#0866A6'}}>{email}</Text>
            </View>
          </View>
          <View>
             
            <TouchableOpacity onPress={()=>redirect('Alumni')} style={route.name =='Alumni' ? styles.active : styles.menuLink}>
              <Text style={route.name =='Alumni' ? styles.activeLink : styles.linkText}>
                {
                  route.name =='Alumni' ?
                  <Image source={require('./../../assets/menu/alumni_white.png')} style={styles.menuIcon} />
                  :
                  <Image source={require('./../../assets/menu/alumni_grey.png')} style={styles.menuIcon} />
                }
                
                Alumni
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>navigation.navigate('Wall Of Fame')} style={route.name =='Wall Of Fame' || route.name =='Wall of Fame Thankyou' || route.name =='Apply Wall Of Fame' ? styles.active : styles.menuLink}>
              <Text style={route.name =='Wall Of Fame' || route.name =='Apply Wall Of Fame' || route.name =='Wall of Fame Thankyou' ? styles.activeLink : styles.linkText}>
                {
                  route.name =='Wall Of Fame' || route.name =='Apply Wall Of Fame' || route.name =='Wall of Fame Thankyou' ?
                  <Image source={require('./../../assets/menu/wall_of_fame_white.png')} style={styles.menuIcon} />
                  :
                  <Image source={require('./../../assets/menu/wall_of_fame_grey.png')} style={styles.menuIcon} />
                }
                Wall of Fame
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('Gallery')} style={route.name =='Gallery' || route.name =='Gallery Detail' ? styles.active : styles.menuLink}>
              <Text style={route.name =='Gallery' || route.name =='Gallery Detail' ? styles.activeLink : styles.linkText}>
              {
                  route.name =='Gallery' || route.name =='Gallery Detail' ?
                  <Image source={require('./../../assets/menu/gallery_white.png')} style={styles.menuIcon} />
                  :
                  <Image source={require('./../../assets/menu/gallery_grey.png')} style={styles.menuIcon} />
                }
                Gallery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Event')} style={route.name =='Event' ? styles.active : styles.menuLink}>
              <Text style={route.name =='Event' ? styles.activeLink : styles.linkText}>
                {
                  route.name =='Event' ?
                  <Image source={require('./../../assets/menu/event_white.png')} style={styles.menuIcon} />
                  :
                  <Image source={require('./../../assets/menu/event_grey.png')} style={styles.menuIcon} />
                }
                Event
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Notice Board')} style={route.name =='Notice Board' || route.name =='Notice Board Detail' ? styles.active : styles.menuLink}>
              <Text style={route.name =='Notice Board' || route.name =='Notice Board Detail' ? styles.activeLink : styles.linkText}>
                {
                  route.name =='Notice Board' || route.name =='Notice Board Detail' ?
                  <Image source={require('./../../assets/menu/notice_board_white.png')} style={styles.menuIcon} />
                  :
                  <Image source={require('./../../assets/menu/notice_board_grey.png')} style={styles.menuIcon} />
                }
                Notice Board
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('WeAreHiring')} style={route.name =='WeAreHiring' || route.name =='JobDetail' ? styles.active : styles.menuLink}>
              <Text style={route.name =='WeAreHiring' || route.name =='JobDetail' ? styles.activeLink : styles.linkText}>
                {
                  route.name =='WeAreHiring' || route.name =='JobDetail' ?
                  <Image source={require('./../../assets/menu/jobs_grey_white.png')} style={styles.menuIcon} />
                  :
                  <Image source={require('./../../assets/menu/jobs_grey.png')} style={styles.menuIcon} />
                }
                Jobs
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Feedback')} style={route.name =='Feedback' || route.name =='Feedback Thankyou' ? styles.active : styles.menuLink}>
              <Text style={route.name =='Feedback' || route.name =='Feedback Thankyou' ? styles.activeLink : styles.linkText}>
                
                {
                  route.name =='Feedback' || route.name =='Feedback Thankyou' ?
                  <Image source={require('./../../assets/menu/feedback_white.png')} style={styles.menuIcon} />
                  :
                  <Image source={require('./../../assets/menu/feedback_grey.png')} style={styles.menuIcon} />
                }
                Feedback
              </Text>
            </TouchableOpacity>
            <Text style={styles.menuTitle}>Account</Text>

            <TouchableOpacity onPress={()=>navigation.navigate('Edit Profile')} 
            style={route.name =='Edit Profile' ? styles.active : styles.menuLink}>
              <Text style={route.name =='Edit Profile' ? styles.activeLink : styles.linkText}>
              {
                  route.name =='Edit Profile' ?
                  <Image source={require('./../../assets/menu/edit_profile_white.png')} style={styles.menuIcon} />
                  :
                  <Image source={require('./../../assets/menu/edit_profile_grey.png')} style={styles.menuIcon} />
                }
              Edit Profile
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>logout()} style={styles.menuLink}>
              <Text style={styles.linkText}>
              <Image source={require('./../../assets/menu/logout_grey.png')} style={styles.menuIcon} />
              Logout
              </Text>

            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>navigation.navigate('Change Password')} 
            style={route.name =='Change Password' ? styles.active : styles.menuLink}>
              <Text style={route.name =='Change Password' ? styles.activeLink : styles.linkText}>
              {
                  route.name =='Change Password' ?
                  <Image source={require('./../../assets/menu/change_password_white.png')} style={styles.menuIcon} />
                  :
                  <Image source={require('./../../assets/menu/change_password_grey.png')} style={styles.menuIcon} />
              }
              Change Password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Delete Profile')} 
            style={route.name =='Delete Profile' ? styles.active : styles.menuLink}>
              <Text style={route.name =='Delete Profile' ? styles.activeLink : styles.linkText}>
              {
                  route.name =='Delete Profile' ?
                  <Image source={require('./../../assets/menu/delete_white.png')} style={styles.menuIcon} />
                  :
                  <Image source={require('./../../assets/menu/delete_grey.png')} style={styles.menuIcon} />
              }
              Delete Account
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TouchableOpacity activeOpacity={1} onPress={()=>setIsOpen(!isOpen)} style={styles.overLay}></TouchableOpacity>
        </View>
      : null
      }
      
      </View>
    )
}
const styles = StyleSheet.create({
  overLay:{
    flex:1, 
    position:'absolute', 
    backgroundColor:'rgba(0,0,0,0.8)', 
    width:'100%', 
    height:900, 
    zIndex:2
  },
    menuDraw:{
      position:'absolute', 
      zIndex:9, 
      backgroundColor:'#FFF', 
      top:0, 
      width:'80%',
      height:900,
    },
    menuTitle:{
      fontSize:18,
      fontWeight:'bold',
      marginTop:15,
      paddingLeft:8,
      color:'#333'
    },
    activeLink:{
      color:'#FFF'
    },
    linkText:{
      color:'#666'
    },
    menuLink:{
      padding:8,
      borderBottomWidth:1,
      borderBottomColor:'#DDD',
      color:'#666'
    },
    active:{
      padding:8,
      borderBottomWidth:1,
      borderBottomColor:'#DDD',
      backgroundColor:'#0866A6'
    },
    menuIcon:{
      width:22,
      height:22,
      marginRight:15,
    },
    TopBar: {
      backgroundColor: '#0866A6',
      paddingTop:10,
      paddingBottom: 10,
      flexDirection: 'row',
      paddingLeft:15,
      paddingRight:15,
      marginTop:28
    },
    menuBar:{
      width:24,
      height:24,
    },
    menu:{
      width:'80%',
      backgroundColor:'#FFF',
      position:'fixed',
      top:0,
      height:'100%',
      zIndex: 99,
      elevation: 99,
      backgroundColor:'#FFF',
    }
  });
export default TopBar;