import TopBar from "./topBar";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import MidContent from "../components/midContent";
import { useEffect, useState } from "react";
import { apiUrl } from "../constant";
function WallOfFame({ navigation }) {
    const [fameData, setFameData] = useState([]);
    useEffect(() => {
        fetchFameData()
    },[])
    const fetchFameData = () => {
        function json(response) {
            return response.json()
        }
        var url = `${apiUrl}GetWallfameList`;
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
                    setFameData(response.FameList)
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    return (
        <View contentContainerStyle={styles.parent}>
            <TopBar />
            <MidContent title={
                {
                    img: require('./../../assets/wall_of_fame/wall_of_fame.png'),
                    heading: 'Wall of Fame',
                    subHeading: "Exciting News!! We have launched Wall of Fame exclusively for our Alumni's. \n Share your achievement's with us and get a chance to be highlighted in the Wall of Fame."
                }
            } />
            <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                <TouchableOpacity style={styles.blueBtn} onPress={() => navigation.navigate('Apply Wall Of Fame')}>
                    <Text style={styles.btnText}>Apply Now</Text>
                </TouchableOpacity>

                <FlatList
                    data={fameData}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ height: '72%' }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.postBox}>
                            <View style={{ width: '20%'}}>
                                <Image source={{uri:item.profile_pics}} style={{ width: 55, height: 55, borderRadius:55/2 }} />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center' }}>
                                <Text style={{ fontWeight: 'bold' }}>{item.full_name}</Text>
                                <Text style={{ color: '#999' }}>Batch: ({item.batch_name})</Text>
                                <Text style={{ color: '#999' }}>{item.current_specializatoin}</Text>
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
        height: '100%',
    },
    blueBtn: {
        backgroundColor: '#0866A6',
        padding: 8,
        borderRadius: 8,
        width: '100%',
        marginBottom: 20
    },
    btnText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    input: {
        height: 42,
        borderWidth: 1,
        padding: 8,
        borderColor: '#DDD',
        borderRadius: 5,
        marginTop: 10,
        placeholderTextColor: '#666',
        paddingLeft: 30,
        backgroundColor: '#FFF'
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
        marginTop: 10,
        placeholderTextColor: '#666',
        backgroundColor: '#FFF'
    },
    postBox: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        marginTop: 8,
        padding:5
    },
});
export default WallOfFame;