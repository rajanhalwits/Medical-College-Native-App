import { AsyncStorage, ActivityIndicator, StyleSheet, View, Alert, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Login from './src/screens/login'
import Register from './src/screens/register';
import Getstarted from './src/screens/getStarted';
import WeAreHiring from './src/screens/weHiring';
import JobDescription from './src/screens/jobDescription';
import NoticeBoard from './src/screens/noticeBoard';
import NoticeBoardDetail from './src/screens/noticeBoardDetail';
import Feedback from './src/screens/feedback';
import WallOfFame from './src/screens/wallOfFame';
import ApplyWallOfFame from './src/screens/applyWallOfFame';
import ChangePassword from './src/screens/changePassword';
import Event from './src/screens/event';
import Gallery from './src/screens/gallery';
import GalleryDetail from './src/screens/galleryDetail';
import FeedbackThankyou from './src/screens/feedbackThankyou';
import ChangePasswordThankYou from './src/screens/changePasswordThankyou';
import WallOfFameThankyou from './src/screens/wallOfFameThankyou';
import AlumniThankyou from './src/screens/alumniThankyou';
import Alumni from './src/screens/alumni';
import JobDetail from './src/screens/jobDetail';
import ForgotPassword from './src/screens/forgotPassword';
import Carousel from './src/screens/carousel';
import EditProfile from './src/screens/editProfile';
import DeleteProfile from './src/screens/deleteProfile';
import { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigationRef } from './RootNavigation';
import * as RootNavigation from './RootNavigation.js';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [auth, setAuth] = useState(null)
  const notificationListener = useRef();
  const responseListener = useRef();

  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  useEffect(() => {
    console.log(lastNotificationResponse)
    retrieveData();
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      //setTextRec(JSON.stringify(notification)); 
      const notify = notification.request.trigger.remoteMessage.data;
      //Alert.alert('__ ',JSON.stringify(notify));
      checkLogin(notify.link, notify.id);
      
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      
      const notifyData = response.notification.request.trigger.remoteMessage.data; 
      //setText(JSON.stringify(notifyData));      
      checkLogin(notifyData.link, notifyData.id);

    });
    console.log('token--> ', expoPushToken)
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
    
  }, []);
  const checkLogin = async (name, id) => {
    try {
      const value = await AsyncStorage.getItem('user-info');
      if (value !== null && name !='') {
        if(name =='Gallery Detail'){
          RootNavigation.navigate(name, { galleryId : id });
        } 
        else if(name =='Notice Board Detail'){
          RootNavigation.navigate(name, { noticeId : id });
        } 
        else if(name =='JobDetail'){
          RootNavigation.navigate(name, { jobId : id });
        }
         else if(name =='Event'|| name =='Wall Of Fame'){
          RootNavigation.navigate(name);
        }
        
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user-info');
      if (value !== null) {
        setAuth(true)
      }else{
        setAuth(false)
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  const Stack = createNativeStackNavigator();
  {
    auth == null && <ActivityIndicator size="large" color="#0000ff" />
    
  }
  return (
    <SafeAreaView style={{flex:1}}>
      <Text style={{padding:10, backgroundColor:'pink'}} selectable={true}>{text}</Text>
      <Text style={{padding:10, backgroundColor:'orange'}} selectable={true}>{textRec}</Text>
    <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName='Alumni'>
          <Stack.Screen name='Alumni' component={Alumni}  options={{ headerShown: false }} />
          <Stack.Screen name='MMCH' component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name='Forgot Password' component={ForgotPassword} options={{ headerShown: false }}/>
          <Stack.Screen name='SignUp' component={Register}  options={{ headerShown: false }} />
          <Stack.Screen name='GetStarted' component={Getstarted}  options={{ headerShown: false }} />
          <Stack.Screen name='JobDetail' component={JobDetail} options={{ headerShown: false }}/>
          <Stack.Screen name='WeAreHiring' component={WeAreHiring}  options={{ headerShown: false }} />
          <Stack.Screen name='JobDescription' component={JobDescription}  options={{ headerShown: false }} />
          <Stack.Screen name='Notice Board' component={NoticeBoard}  options={{ headerShown: false }} />
          <Stack.Screen name='Notice Board Detail' component={NoticeBoardDetail}  options={{ headerShown: false }} />
          <Stack.Screen name='Feedback' component={Feedback}  options={{ headerShown: false }} />
          <Stack.Screen name='Wall Of Fame' component={WallOfFame}  options={{ headerShown: false }} />
          <Stack.Screen name='Apply Wall Of Fame' component={ApplyWallOfFame}  options={{ headerShown: false }} />
          <Stack.Screen name='Change Password' component={ChangePassword}  options={{ headerShown: false }} />
          <Stack.Screen name='Event' component={Event}  options={{ headerShown: false }} />
          <Stack.Screen name='Gallery' component={Gallery}  options={{ headerShown: false }} />
          <Stack.Screen name='Gallery Detail' component={GalleryDetail}  options={{ headerShown: false }} />
          <Stack.Screen name='Feedback Thankyou' component={FeedbackThankyou}  options={{ headerShown: false }} />
          <Stack.Screen name='Change Password Thankyou' component={ChangePasswordThankYou}  options={{ headerShown: false }} />
          <Stack.Screen name='Wall of Fame Thankyou' component={WallOfFameThankyou}  options={{ headerShown: false }} />
          <Stack.Screen name='Alumni Thankyou' component={AlumniThankyou}  options={{ headerShown: false }} />
          <Stack.Screen name='Carousel' component={Carousel}  options={{ headerShown: false }} />
          <Stack.Screen name='Edit Profile' component={EditProfile}  options={{ headerShown: false }} />
          <Stack.Screen name='Delete Profile' component={DeleteProfile}  options={{ headerShown: false }} />
        </Stack.Navigator>        
      </NavigationContainer>
      </SafeAreaView>
  );
}
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    //Alert.alert('existingStatus '+ existingStatus)

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }
    //token = (await Notifications.getExpoPushTokenAsync()).data;
    const token = (await Notifications.getDevicePushTokenAsync()).data;
    console.log('token on register ',token);
    //Alert.alert('token on register '+ token)
    AsyncStorage.setItem('DeviceToken', token);
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
export default App;
