import { useState } from "react";
import {View, StyleSheet, Image, Text, TouchableOpacity} from "react-native"

function TopBar(){
  const [isOpen, setIsOpen] = useState(false)
    return(
      <View>
      <View style={styles.TopBar} >
        <View style={{width:'50%'}}>
          <Image source={require('./../../assets/back_arrow.png')} style={styles.menuBar} />
        </View>
        <View style={{width:'50%', flexDirection: 'row-reverse'}}>
          <TouchableOpacity onPress={()=>setIsOpen(!isOpen)}>
            <Image source={require('./../../assets/menubar.png')} style={styles.menuBar} />
          </TouchableOpacity>
        </View>
      </View>
      {
        isOpen ?
        <View style={styles.menu}>
          <View style={{flexDirection:'row', padding:10}}>
            <View style={{width:'30%'}}>
              <Image source={require('./../../assets/menu/profile_pic.png')} style={{width:70, height:70}} />
            </View>
            <View style={{width:'70%', paddingTop:15}}>
              <Text style={{fontWeight:'bold', color:'#666'}}>Anjani Kumar Verma</Text>
              <Text style={{color:'#0866A6'}}>anjani@mmchonline.com</Text>
            </View>
          </View>
          <View>
            <Text style={styles.menuLink}><Image source={require('./../../assets/menu/alumini.png')} style={styles.menuIcon} /> Alumni</Text>
            <Text style={styles.menuLink}><Image source={require('./../../assets/menu/wall_of_fame.png')} style={styles.menuIcon} /> Wall of Fame</Text>
            <Text style={styles.menuLink}><Image source={require('./../../assets/menu/gallery.png')} style={styles.menuIcon} /> Gallery</Text>
            <Text style={styles.menuLink}><Image source={require('./../../assets/menu/event.png')} style={styles.menuIcon} /> Event</Text>
            <Text style={styles.menuLink}><Image source={require('./../../assets/menu/notive_board.png')} style={styles.menuIcon} /> Notice Board</Text>
            <Text style={styles.menuLink}><Image source={require('./../../assets/menu/jobs.png')} style={styles.menuIcon} /> Jobs</Text>
            <Text style={styles.menuLink}><Image source={require('./../../assets/menu/feedback.png')} style={styles.menuIcon} /> Feedback</Text>
            {/* <View style={{borderBottomColor:'#DDD', borderBottomWidth:1, marginTop:10}}></View> */}
            <Text style={styles.menuTitle}>Account</Text>
            <Text style={styles.menuLink}><Image source={require('./../../assets/menu/edit_profile.png')} style={styles.menuIcon} /> Edit Profile</Text>
            <Text style={styles.menuLink}><Image source={require('./../../assets/menu/logout.png')} style={styles.menuIcon} /> Logout</Text>
            <Text style={styles.menuLink}><Image source={require('./../../assets/menu/change_password.png')} style={styles.menuIcon} /> Change Password</Text>
          </View>
      </View>
      :
      null
      }
      
      </View>
    )
}
const styles = StyleSheet.create({
    menuTitle:{
      fontSize:18,
      fontWeight:'bold',
      marginTop:15,
      paddingLeft:8,
      color:'#333'
    },
    menuLink:{
      color:'#666',
      padding:8,
      borderBottomWidth:1,
      borderBottomColor:'#DDD',
    },
    menuIcon:{
      width:24,
      height:24,
      marginRight:10,
    },
    TopBar: {
      backgroundColor: '#0866A6',
      paddingTop:10,
      paddingBottom: 10,
      flexDirection: 'row',
      paddingLeft:15,
      paddingRight:15,
      marginTop:50
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