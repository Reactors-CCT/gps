import React, { useState, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as Location from 'expo-location';
import { MapView } from 'expo';

export default function Findme() {
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setlongitude] = useState(null);
  const [postcode, setpostcode] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [country, setCountry] = useState(' Your Country here');
  const [district, setDistrict] = useState('Your District here');
  const [county, setCounty] = useState(' Your county here');

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    opencage();
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000
    }).start();

  };

  let opencage = () => {
    fetch('https://api.opencagedata.com/geocode/v1/json?key=2e98cc940e59428184be10136e65bc1b&q=' + latitude + '+' + longitude)
      .then((response) => { return response.json() })
      .then((json) => {
        console.log(json);
        console.log(setCountry(json.results[0].components.country));
        console.log(setDistrict(json.results[0].components.city_district));
        console.log(setCounty(json.results[0].components.county));
        console.log(setpostcode(json.results[0].components.postcode));
      });
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setlongitude(location.coords.longitude);



    })();
  }, []);
  let text1, text2;
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (latitude) {
    text1 = JSON.stringify(latitude);
    text2 = JSON.stringify(longitude);
  }
  return (
    <View style={styles.container}>
      <View style={styles.fadingContainer}>
        <Text>Latitude: {text1}</Text>
        <Text>Longitude: {text2}</Text>
      </View>
      <View style={styles.buttonRow}>
        <Button color="grey" title="Where am I?" onPress={fadeIn} />
      </View>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            opacity: fadeAnim // Bind opacity to animated value
          }
        ]}
      >
        <Text>Country: {country}</Text>
        <Text>District: {district}</Text>
        <Text>County: {county}</Text>
        <Text>Postcode: {postcode}</Text>
      </Animated.View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#02b2e8',
  },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "powderblue"
  },
  fadingText: {
    fontSize: 28,
    textAlign: "center",
    margin: 10
  },
  buttonRow: {
    flexDirection: "row",
    marginVertical: 16
  }
});