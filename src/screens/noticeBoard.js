import TopBar from "./topBar";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, FlatList } from 'react-native'
import MidContent from "../components/midContent";
import { apiUrl } from "../constant";
import { useEffect, useState } from "react";

function NoticeBoard({ navigation }) {
    const [noticeList, setNoticeData] = useState([]);
    useEffect(() => {
        fetchNotice()
    }, [])
    const fetchNotice = () => {
        function json(response) {
            return response.json()
        }
        var url = `${apiUrl}GetNoticeBoard`;
        fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            }
        })
            .then(json)
            .then(function (response) {
                console.log(response);
                if (response.status == 'success') {
                    setNoticeData(response.noticeboardList)
                } else {
                    Alert.alert(response.message)
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    return (
        <View style={styles.parent}>
            <TopBar />
            <MidContent title={
                {
                    img: require('./../../assets/notice_board.png'),
                    heading: 'Notice Board',
                    subHeading: ''
                }
            } />
            <View style={{ padding: 10 }}>
                <FlatList
                    data={noticeList}
                    numColumns={1}
                    style={{height:'72%'}}
                    showsVerticalScrollIndicator={false} 
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.postBox} activeOpacity={0.8}
                            onPress={() => navigation.navigate('Notice Board Detail', { noticeId: item.id })}
                        >
                            <View style={{ width: '100%' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize' }}>
                                    {item.title}
                                </Text>
                                <Text numberOfLines={2} ellipsizeMode='tail' style={{ marginTop: 5, color: '#666', fontSize: 13 }}>
                                    {item.description}
                                </Text>
                                <Text style={{ marginTop: 5, color: '#666', fontSize: 13 }}>
                                    <Image source={require('./../../assets/calnder.png')} style={{ width: 20, height: 18 }} />&nbsp;
                                    {item.notice_date}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    parent: {
        backgroundColor: '#fafbff',
        height: '100%',
    },
    postBox: {
        backgroundColor: '#FFF',
        padding: 8,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        marginTop: 8,
    },
});
export default NoticeBoard;