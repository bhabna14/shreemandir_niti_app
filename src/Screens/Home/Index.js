import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ScrollView, Modal, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { base_url } from '../../../App';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const Index = () => {

  const isFocused = useIsFocused();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [spinner, setSpinner] = useState(false);
  const [allNiti, setAllNiti] = useState([]);
  const [completedNiti, setCompletedNiti] = useState([]);
  const [specialNiti, setSpecialNiti] = useState([]);
  const [timers, setTimers] = useState({});
  const [elapsedTime, setElapsedTime] = useState({});

  const getAllNiti = async () => {
    try {
      setSpinner(true);
      const response = await fetch(base_url + 'api/manageniti', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();
      if (responseData.status === 200) {
        setSpinner(false);
        const nonCompletedNiti = responseData.data.filter(item => item.niti_status !== 'completed');
        setAllNiti(nonCompletedNiti);

        const completedNiti = responseData.data.filter(item => item.niti_status === 'completed');
        setCompletedNiti(completedNiti);

        const specialNiti = responseData.data.filter(item => item.niti_type === 'special');
        setSpecialNiti(specialNiti);
      }
    } catch (error) {
      console.log(error);
      setSpinner(false);
    }
  };

  const startNiti = async (id) => {
    try {
      const response = await fetch(base_url + 'api/niti-start', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          niti_id: id,
        }),
      });
      const responseData = await response.json();
      if (responseData.status === 200) {
        getAllNiti();
        const startTime = Date.now();
        setTimers(prevTimers => ({ ...prevTimers, [id]: setInterval(() => updateElapsedTime(id, startTime), 1000) }));
        setElapsedTime(prevElapsedTime => ({ ...prevElapsedTime, [id]: 0 }));
      } else {
        console.log("Error", responseData.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pauseNiti = async (id) => {
    try {
      const response = await fetch(base_url + 'api/niti-pause', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          niti_id: id
        }),
      });
      const responseData = await response.json();
      if (responseData.status === 200) {
        getAllNiti();
        clearInterval(timers[id]);
      } else {
        console.log("Error", responseData.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resumeNiti = async (id) => {
    try {
      const response = await fetch(base_url + 'api/niti-resume', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          niti_id: id
        }),
      });
      const responseData = await response.json();
      if (responseData.status === 200) {
        getAllNiti();
        const startTime = Date.now() - elapsedTime[id];
        setTimers(prevTimers => ({ ...prevTimers, [id]: setInterval(() => updateElapsedTime(id, startTime), 1000) }));
      } else {
        console.log("Error", responseData.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const stopNiti = async (id) => {
    try {
      const duration = elapsedTime[id];
      const response = await fetch(base_url + 'api/niti-end', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          niti_id: id,
          duration: duration
        }),
      });
      const responseData = await response.json();
      if (responseData.status === 200) {
        getAllNiti();
        clearInterval(timers[id]);
        setElapsedTime(prevElapsedTime => ({ ...prevElapsedTime, [id]: 0 }));
      } else {
        console.log("Error", responseData.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateElapsedTime = (id, startTime) => {
    setElapsedTime(prevElapsedTime => ({ ...prevElapsedTime, [id]: Date.now() - startTime }));
  };

  const handleSubmitSpecialNiti = () => {
    const selectedNiti = specialNiti.find(item => item.id === selectedItem);

    if (selectedNiti) {
      // Update the allNiti state with the selected special Niti
      setAllNiti(prevAllNiti => [...prevAllNiti, selectedNiti]);
      // Close the modal
      setIsModalVisible(false);
      // Clear the selected item
      setSelectedItem(null);
    } else {
      Alert.alert("Error", "No Niti selected.");
    }
  };

  useEffect(() => {
    if (isFocused) {
      getAllNiti();
    }

    return () => {
      Object.values(timers).forEach(clearInterval);
    };
  }, [isFocused]);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFBE00', opacity: isModalVisible ? 0.8 : 1 }}>
      <View style={styles.headerPart}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600', marginLeft: 10 }}>Daily Neeti</Text>
        </View>
        <View style={{ marginRight: 10 }}>
          <TouchableOpacity onPress={() => setIsModalVisible(true)} style={{ backgroundColor: 'green', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6 }}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 1 }}>Special Neeti</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/3rathas.jpg')} style={styles.image} />
      </View>
      <View style={{ backgroundColor: '#FFBE00', paddingTop: 1 }}>
        <View style={{ backgroundColor: '#B7070A', paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>{moment().format("MMMM Do YYYY, dddd")}</Text>
        </View>
      </View>
      <View style={{ backgroundColor: '#FFBE00', width: '100%', flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => setActiveTab('upcoming')} style={{ width: '50%', alignItems: 'center', padding: 10 }}>
          <Text style={{ color: activeTab === 'upcoming' ? '#B7070A' : '#444545', fontSize: activeTab === 'upcoming' ? 16 : 15, fontWeight: 'bold' }}>Upcoming Neeti</Text>
          <View style={{ backgroundColor: activeTab === 'upcoming' ? '#B7070A' : '#444545', width: '100%', height: activeTab === 'upcoming' ? 2 : 1, marginTop: 5 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('complete')} style={{ width: '50%', alignItems: 'center', padding: 10 }}>
          <Text style={{ color: activeTab === 'complete' ? '#B7070A' : '#444545', fontSize: activeTab === 'complete' ? 16 : 15, fontWeight: 'bold' }}>Completed Neeti</Text>
          <View style={{ backgroundColor: activeTab === 'complete' ? '#B7070A' : '#444545', width: '100%', height: activeTab === 'complete' ? 2 : 1, marginTop: 5 }} />
        </TouchableOpacity>
      </View>
      {activeTab === 'upcoming' ? (
        <ScrollView style={styles.cell}>
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            data={allNiti}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.smallCell1}>
                <View style={{ width: '60%' }}>
                  {item.niti_status === null ? (
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: '600', textTransform: 'capitalize' }}>
                      {item.niti_name}
                    </Text>
                  ) : (
                    <View style={{ width: '100%' }}>
                      <Text style={{ color: '#000', fontSize: 16, fontWeight: '600', textTransform: 'capitalize' }}>{item.niti_name}</Text>
                      <Text style={{ color: '#000', fontSize: 14, fontWeight: '400' }}>Start Time: {moment(item.start_time).format("h:mm:ss a")}</Text>
                      {/* <Text style={{ color: '#000', fontSize: 14, fontWeight: '400' }}>Running Time: {moment.utc(elapsedTime[item.id]).format("HH:mm:ss")}</Text> */}
                    </View>
                  )}
                </View>
                <View style={{ width: '40%', alignItems: 'center' }}>
                  {item.niti_status === null ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'green',
                        paddingVertical: 7,
                        paddingHorizontal: 10,
                        borderRadius: 5
                      }}
                      onPress={() => startNiti(item.id)}
                    >
                      <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Start</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                      {item.niti_status === 'paused' ? (
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#11dcf2',
                            paddingVertical: 7,
                            paddingHorizontal: 7,
                            borderRadius: 5
                          }}
                          onPress={() => resumeNiti(item.id)}
                        >
                          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Resume</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#11dcf2',
                            paddingVertical: 7,
                            paddingHorizontal: 7,
                            borderRadius: 5
                          }}
                          onPress={() => pauseNiti(item.id)}
                        >
                          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Pause</Text>
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        style={{
                          backgroundColor: 'red',
                          paddingVertical: 7,
                          paddingHorizontal: 10,
                          borderRadius: 5
                        }}
                        onPress={() => stopNiti(item.id)}
                      >
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Stop</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            )}
          />
        </ScrollView>
      ) : (
        <ScrollView style={styles.cell}>
          {/* Add content for completed Neeti here */}
        </ScrollView>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => { setIsModalVisible(false); }}>
            <Ionicons name="close" color={'#000'} size={30} />
          </TouchableOpacity>
          <View style={{ flex: 1, justifyContent: 'flex-start', marginTop: 10 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={specialNiti}
              scrollEnabled={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}
                  onPress={() => setSelectedItem(item.id)}
                >
                  <FontAwesome
                    name={selectedItem === item.id ? "dot-circle-o" : "circle-o"}
                    color={selectedItem === item.id ? '#B7070A' : '#000'}
                    size={20}
                    marginRight={7}
                  />
                  <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: selectedItem === item.id ? '#B7070A' : '#000', fontSize: 17, fontWeight: '500' }}>{item.niti_name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            {selectedItem ?
              <TouchableOpacity onPress={handleSubmitSpecialNiti} style={{ backgroundColor: 'red', paddingVertical: 7, paddingHorizontal: 10, borderRadius: 5 }}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600', textAlign: 'center' }}>Submit</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity disabled style={{ backgroundColor: 'gray', paddingVertical: 7, paddingHorizontal: 10, borderRadius: 5 }}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600', textAlign: 'center' }}>Submit</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFBE00'
  },
  headerPart: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#B7070A',
    paddingVertical: 13,
    paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 13,
    elevation: 5
  },
  imageContainer: {
    backgroundColor: '#FFBE00',
    height: 250,
    width: '100%'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  cell: {
    flex: 1,
    marginHorizontal: 10,
    padding: 10,
    borderTopLeftRadius: 20,
    borderBottomEndRadius: 20,
    shadowColor: '#FFBE00',
    shadowOffset: { width: 6, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 9
  },
  smallCell1: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '90%',
    height: 350,
    alignSelf: 'center',
    top: 250,
    borderRadius: 10,
    padding: 15
  }
});
