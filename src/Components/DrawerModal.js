import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, TouchableOpacity, Alert, Image, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

const DrawerModal = ({ visible, onClose }) => {

    const navigation = useNavigation()
    const isFocused = useIsFocused()

    const [isHundiModalVisible, setIsHundiModalVisible] = useState(false);
    const [hundiData, setHundiData] = useState({
        rupees: '',
        gold: '',
        silver: ''
    });

    const handleSaveHundi = () => {
        if (hundiData.rupees === '' && hundiData.gold === '' && hundiData.silver === '') {
            Alert.alert('Error', 'Please enter at least one value to save.', [{ text: 'OK' }]);
            return;
        }

        // Here you can handle the saving logic, e.g., sending the data to your backend or updating your state.

        Alert.alert('Success', 'Hundi Collection saved successfully!', [{ text: 'OK' }]);
        setIsHundiModalVisible(false);
    }

    const [isNoticeModalVisible, setIsNoticeModalVisible] = useState(false);
    const [noticeText, setNoticeText] = useState('');

    const handleSaveNotice = () => {
        console.log('Notice Saved:', noticeText);
        // You can call your API here to save the notice
        setIsNoticeModalVisible(false);
        setNoticeText('');
    };

    return (
        <View>
            <Modal
                visible={visible}
                animationType="none"
                transparent={true}
                onRequestClose={onClose}
            >
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={styles.variantModalContainer}>
                            <View style={{ width: '100%', height: 80, backgroundColor: '#B7070A' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, height: '100%' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                                            <Image style={{ height: 50, width: 50, borderRadius: 25 }} source={require('../assets/images/darshan.png')} resizeMode='cover' />
                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff', marginLeft: 10 }}>Madhav Nana</Text>
                                            <Text style={{ fontSize: 12, fontWeight: '400', color: '#fff', marginLeft: 10 }}>Puri Panda</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.drawerCell} onPress={() => { navigation.navigate('Home'), onClose() }}>
                                <View style={{ width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image style={{ height: 24, width: 24, backgroundColor: 'red' }} source={require("../assets/images/panji765.png")} />
                                </View>
                                <Text style={styles.drawerLable}>Niti</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.drawerCell} onPress={() => { navigation.navigate('Darshan'), onClose() }}>
                                <View style={{ width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image style={{ height: 32, width: 32 }} source={require("../assets/images/darshan.png")} />
                                </View>
                                <Text style={styles.drawerLable}>Darshan</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.drawerCell} onPress={() => { navigation.navigate('MahaPrasad'), onClose() }}>
                                <View style={{ width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image style={{ height: 45, width: 45 }} source={require("../assets/images/mahaprasadad32412.png")} />
                                </View>
                                <Text style={styles.drawerLable}>Maha Prasad</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.drawerCell} onPress={() => { setIsHundiModalVisible(true), onClose() }}>
                                <View style={{ width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image style={{ height: 23, width: 23 }} source={require("../assets/images/hundiColection654.png")} />
                                </View>
                                <Text style={styles.drawerLable}>Hundi Collection</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.drawerCell} onPress={() => { setIsNoticeModalVisible(true), onClose() }}>
                                <View style={{ width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <AntDesign name="notification" size={24} color="#FFA726" />
                                </View>
                                <Text style={styles.drawerLable}>Notice</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.drawerCell, { marginTop: 0.5 }]}>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.drawerCell, { marginTop: 0 }]}>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.drawerCell, { marginTop: 0 }]}>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.drawerCell, { marginTop: 0 }]}>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.drawerCell, { marginTop: 0 }]}>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.drawerCell, { marginTop: 0 }]}>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '70%', height: '25%', backgroundColor: '#fff', position: 'absolute', bottom: 0, left: 0 }}>
                            <View style={{ borderTopColor: '#a0a0a0', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-start', paddingBottom: 10 }}>
                                <View style={{ width: '100%', height: 0.5, backgroundColor: '#B7070A', marginBottom: 10 }} />
                                <View style={{ width: '90%', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 12, fontWeight: '500', color: '#000' }}>Current Version 1.0.0</Text>
                                    <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                        <Text style={{ color: '#000', fontSize: 16, fontWeight: '600', opacity: 0.7, marginRight: 7 }}>Update Available  2.0</Text>
                                        <Icon name="file-download" size={20} color={'green'} />
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Hundi Collection Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isHundiModalVisible}
                onRequestClose={() => setIsHundiModalVisible(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '90%', backgroundColor: '#fff', borderRadius: 16, padding: 20, elevation: 10 }}>
                        {/* Header */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <Text style={{ fontSize: 18, fontWeight: '700', color: '#B7070A' }}>Save Hundi Collection</Text>
                            <TouchableOpacity onPress={() => setIsHundiModalVisible(false)}>
                                <Ionicons name="close-circle" size={28} color="#B7070A" />
                            </TouchableOpacity>
                        </View>

                        {/* Input - Rupees */}
                        <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 5, color: '#333' }}>Rupees</Text>
                        <TextInput
                            placeholder="Enter amount in rupees"
                            keyboardType="numeric"
                            value={hundiData.rupees}
                            onChangeText={(val) => setHundiData({ ...hundiData, rupees: val })}
                            style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, marginBottom: 15, color: '#333' }}
                        />

                        {/* Input - Gold */}
                        <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 5, color: '#333' }}>Gold (grams)</Text>
                        <TextInput
                            placeholder="Enter gold in grams"
                            keyboardType="numeric"
                            value={hundiData.gold}
                            onChangeText={(val) => setHundiData({ ...hundiData, gold: val })}
                            style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, marginBottom: 15, color: '#333' }}
                        />

                        {/* Input - Silver */}
                        <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 5, color: '#333' }}>Silver (grams)</Text>
                        <TextInput
                            placeholder="Enter silver in grams"
                            keyboardType="numeric"
                            value={hundiData.silver}
                            onChangeText={(val) => setHundiData({ ...hundiData, silver: val })}
                            style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, marginBottom: 20, color: '#333' }}
                        />

                        {/* Save Button */}
                        <TouchableOpacity onPress={handleSaveHundi} style={{ backgroundColor: '#B7070A', paddingVertical: 12, borderRadius: 10, alignItems: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>Save Collection</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Notice Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isNoticeModalVisible}
                onRequestClose={() => setIsNoticeModalVisible(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '90%', backgroundColor: '#fff', borderRadius: 16, padding: 20, elevation: 10 }}>
                        {/* Header */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                            <Text style={{ fontSize: 18, fontWeight: '700', color: '#B7070A' }}>Add Notice</Text>
                            <TouchableOpacity onPress={() => setIsNoticeModalVisible(false)}>
                                <Ionicons name="close-circle" size={28} color="#B7070A" />
                            </TouchableOpacity>
                        </View>

                        {/* Notice Input Field */}
                        <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 6, color: '#333' }}>Notice Content</Text>
                        <TextInput
                            placeholder="Type your notice here..."
                            value={noticeText}
                            onChangeText={(text) => setNoticeText(text)}
                            multiline
                            numberOfLines={5}
                            textAlignVertical="top"
                            style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 12, fontSize: 15, color: '#333', height: 120, marginBottom: 20 }}
                        />

                        {/* Save Button */}
                        <TouchableOpacity
                            onPress={handleSaveNotice}
                            disabled={noticeText.trim().length < 5}
                            style={{
                                backgroundColor: noticeText.trim().length >= 5 ? '#B7070A' : '#ccc',
                                paddingVertical: 12,
                                borderRadius: 10,
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>Save Notice</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

export default DrawerModal

const styles = StyleSheet.create({
    variantModalContainer: {
        width: '70%',
        height: '75%',
        left: 0,
        top: 0,
        backgroundColor: '#B7070A',
        // bottom: 0,
        position: 'absolute',
        alignSelf: 'center',
    },
    drawerCell: {
        width: '100%',
        height: 58,
        backgroundColor: '#fff',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        marginTop: 0.6,
    },
    drawerLable: {
        color: '#000',
        fontSize: 15,
        fontWeight: '500',
        letterSpacing: 0.6,
        marginLeft: 15
    }
})