import { StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='MMCH'>
          <Stack.Screen name='MMCH' component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name='Forgot Password' component={ForgotPassword} options={{ headerShown: false }}/>
          <Stack.Screen name='JobDetail' component={JobDetail} options={{ headerShown: false }}/>
          <Stack.Screen name='SignUp' component={Register}  options={{ headerShown: false }} />
          <Stack.Screen name='GetStarted' component={Getstarted}  options={{ headerShown: false }} />
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
          <Stack.Screen name='Alumni' component={Alumni}  options={{ headerShown: false }} />
          <Stack.Screen name='Carousel' component={Carousel}  options={{ headerShown: false }} />
          <Stack.Screen name='Edit Profile' component={EditProfile}  options={{ headerShown: false }} />
          <Stack.Screen name='Delete Profile' component={DeleteProfile}  options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
/* const styles = StyleSheet.create({
  appBody:{
    backgroundColor:'yellow',
    flex:1
  }
}) */

export default App;
