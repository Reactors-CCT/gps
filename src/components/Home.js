import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home({ navigation }) {
    
    return (
        <View style={styles.container}>
            <Text style={styles.team}>Reactors</Text>
            <Image style={styles.logo} source={require('../../assets/logo.png')} />
            
            <Button color="grey" variant="contained"
                onPress={() =>{
                    navigation.navigate('Findme')
                }}
                title='Find me'
                />
            </View>
);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#02b2e8',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
        width: 200, 
        height: 150,
    },
    team: {
        color: '#ffffff',
        fontFamily: "notoserif",
        fontSize: 40,
        fontWeight: "bold"
        
    },

  });