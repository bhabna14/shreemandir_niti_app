import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity, TextInput, StyleSheet, ToastAndroid, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { base_url } from '../../../App';

const Index = () => {
    const [hundiList, setHundiList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [hundiData, setHundiData] = useState({ rupees: '', gold: '', silver: '' });
    const [hundiDate, setHundiDate] = useState(new Date());
    const [openDatePicker, setOpenDatePicker] = useState(false);

    const [isEditMode, setIsEditMode] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const getHundiCollection = async () => {
        try {
            const response = await fetch(`${base_url}api/get-hundi-collections`);
            const result = await response.json();
            if (result.status) setHundiList(result.data);
        } catch (error) {
            console.log("Error fetching hundi collection", error);
        }
    };

    useEffect(() => { getHundiCollection(); }, []);

    const handleSaveHundi = async () => {
        try {
            const payload = {
                date: moment(hundiDate).format('YYYY-MM-DD'),
                rupees: hundiData.rupees,
                gold: `${hundiData.gold} grams`,
                silver: `${hundiData.silver} grams`,
            };

            const url = isEditMode
                ? `${base_url}api/update-hundi-collection/${editingItem.id}`
                : `${base_url}api/save-hundi-collection`;

            const method = isEditMode ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (result.status) {
                ToastAndroid.show(isEditMode ? 'Updated!' : 'Saved!', ToastAndroid.SHORT);
                setHundiData({ rupees: '', gold: '', silver: '' });
                setIsModalVisible(false);
                setIsEditMode(false);
                setEditingItem(null);
                getHundiCollection();
            } else {
                ToastAndroid.show('Failed to save.', ToastAndroid.SHORT);
            }
        } catch (error) {
            ToastAndroid.show('Error occurred!', ToastAndroid.SHORT);
            console.error("Save Hundi Error:", error);
        }
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.card}>
            <View style={styles.cardTop}>
                <Text style={styles.cardDate}>{moment(item.date).format('DD MMM YYYY')}</Text>
                {index === 0 && (
                    <TouchableOpacity
                        onPress={() => {
                            setIsModalVisible(true);
                            setIsEditMode(true);
                            setEditingItem(item);
                            setHundiData({
                                rupees: item.rupees.toString(),
                                gold: parseInt(item.gold),
                                silver: parseInt(item.silver)
                            });
                            setHundiDate(new Date(item.date));
                        }}
                    >
                        <Ionicons name="create-outline" size={20} color="#B7070A" />
                    </TouchableOpacity>
                )}
            </View>
            <Text style={styles.cardText}>💰 ₹{item.rupees}</Text>
            <Text style={styles.cardText}>🥇 {item.gold}</Text>
            <Text style={styles.cardText}>🥈 {item.silver}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>🪙 Hundi Collection</Text>
                <TouchableOpacity
                    onPress={() => {
                        setIsModalVisible(true);
                        setIsEditMode(false);
                        setHundiData({ rupees: '', gold: '', silver: '' });
                        setHundiDate(new Date());
                    }}>
                    <Ionicons name="add-circle" size={30} color="#fff" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={hundiList}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />

            <Modal visible={isModalVisible} transparent animationType="slide" onRequestClose={() => setIsModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <ScrollView contentContainerStyle={styles.modalBox}>
                        <Text style={styles.modalTitle}>{isEditMode ? '✏️ Edit Hundi Collection' : '📅 Save Hundi Collection'}</Text>

                        <Text style={styles.label}>Rupees</Text>
                        <TextInput
                            placeholder="Enter rupees"
                            keyboardType="numeric"
                            value={hundiData.rupees}
                            onChangeText={(val) => setHundiData({ ...hundiData, rupees: val })}
                            style={styles.input}
                        />

                        <Text style={styles.label}>Gold (grams)</Text>
                        <TextInput
                            placeholder="Enter gold"
                            keyboardType="numeric"
                            value={hundiData.gold.toString()}
                            onChangeText={(val) => setHundiData({ ...hundiData, gold: val })}
                            style={styles.input}
                        />

                        <Text style={styles.label}>Silver (grams)</Text>
                        <TextInput
                            placeholder="Enter silver"
                            keyboardType="numeric"
                            value={hundiData.silver.toString()}
                            onChangeText={(val) => setHundiData({ ...hundiData, silver: val })}
                            style={styles.input}
                        />

                        <TouchableOpacity onPress={() => setOpenDatePicker(true)} style={styles.dateBtn}>
                            <Text style={{ color: '#333' }}>{moment(hundiDate).format("DD MMM YYYY")}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleSaveHundi} style={styles.saveBtn}>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{isEditMode ? 'Update' : 'Save'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.cancelBtn}>
                            <Text style={{ color: '#B7070A' }}>Cancel</Text>
                        </TouchableOpacity>
                    </ScrollView>

                    <DatePicker
                        modal
                        open={openDatePicker}
                        date={hundiDate}
                        mode="date"
                        onConfirm={(date) => {
                            setOpenDatePicker(false);
                            setHundiDate(date);
                        }}
                        onCancel={() => setOpenDatePicker(false)}
                    />
                </View>
            </Modal>
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 15
    },
    header: {
        backgroundColor: '#B7070A',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 12
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 10,
        elevation: 3
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    cardDate: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#444'
    },
    cardText: {
        fontSize: 14,
        color: '#666',
        marginTop: 3
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalBox: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginTop: 80,
        borderRadius: 14,
        padding: 20
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#B7070A'
    },
    label: {
        fontWeight: '600',
        marginBottom: 5,
        color: '#333'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        fontSize: 15,
        color: '#333'
    },
    dateBtn: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        marginBottom: 20,
        backgroundColor: '#f1f1f1',
        alignItems: 'center'
    },
    saveBtn: {
        backgroundColor: '#B7070A',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10
    },
    cancelBtn: {
        alignItems: 'center',
        padding: 8
    }
});
