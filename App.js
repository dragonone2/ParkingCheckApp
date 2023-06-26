import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

// Geocoder 초기화
Geocoder.init('AIzaSyCCcFfMBgps-r_umaTWbK5N7Ru1r_sQ_60'); // Google Maps Geocoding API 키를 입력하세요

const App = () => {
  const [searchText, setSearchText] = useState('');
  const mapRef = useRef(null); // MapView의 ref

  const handleSearch = async () => {
    try {
      // 주소를 좌표로 변환하여 지도 이동
      const response = await Geocoder.from(searchText);
      const { lat, lng } = response.results[0].geometry.location;
      const newRegion = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      mapRef.current.animateToRegion(newRegion);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="주소를 입력하세요"
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
      <Button title="검색" onPress={handleSearch} />
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 36.7921,
          longitude: 127.0704,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 100,
  },
  searchInput: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop:130,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default App;
