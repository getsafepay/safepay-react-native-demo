import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import {RouteProp} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

type ScreenNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
type Props<T extends keyof RootStackParamList> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};
const Home: React.FC<Props<'Home'>> = ({navigation}) => {
  return (
    <>
      <View style={styles.view}>
        <Text style={styles.text}>Checkout page SafePay</Text>
        <Button
          icon={
            <FontAwesomeIcon
              icon={faCartShopping}
              style={styles.icons_checkout}
            />
          }
          title="Checkout"
          buttonStyle={styles.checkout}
          onPress={() => navigation.navigate('Checkout')}
        />
      </View>
    </>
  );
};
export default Home;

const styles = StyleSheet.create({
  view: {
    marginTop: '10%',
  },
  text: {
    textAlign: 'center',
    marginTop: '50%',
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
  icons_checkout: {
    color: 'white',
  },
  checkout: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '100%',
    marginBottom: '0%',
    padding: '3%',
    width: '50%',
    fontSize: 18,
    justifyContent: 'space-evenly',
  },
});
