import React, {useState, useEffect} from 'react';
import {Modal, Alert} from 'react-native';
import axios from 'axios';
import queryString from 'query-string';
import WebView from 'react-native-webview';
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
const baseURL =
  process.env.ENVIRONMENT === 'PRODUCTION'
    ? 'https://api.getsafepay.com/components'
    : 'https://sandbox.api.getsafepay.com/components';

const Checkout: React.FC<Props<'Checkout'>> = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [Token, setToken] = useState('');
  useEffect(() => {
    const fetchToken = async () => {
      const response = await axios.post(
        'https://sandbox.api.getsafepay.com/order/v1/init',
        {
          client: 'sec_xxx',
          amount: 455,
          currency: 'PKR',
          environment: 'sandbox',
        },
      );
      setToken(response.data.data.token);
    };

    fetchToken();
  }, []);

  const params = {
    beacon: `${Token}`,
    order_id: '12345',
    source: 'mobile',
    env: 'sandbox',
  };

  const qs = queryString.stringify(params);

  const checkoutUrl = `${baseURL}?${qs}`;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
        navigation.navigate('Home');
      }}>
      <WebView
        source={{uri: checkoutUrl}}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        javaScriptEnabledAndroid={true}
        style={{flex: 1}}
        onNavigationStateChange={event => {
          const url = event.url;
          const Params = url.split('?')[1];
          const parsed = queryString.parse(Params);
          if (parsed.action === 'cancelled') {
            Alert.alert('Payment Cancelled!');
            setModalVisible(!modalVisible);
            navigation.navigate('Home');
          }
          if (parsed.action === 'complete') {
            Alert.alert('Payment Successfull');
            setModalVisible(!modalVisible);
            navigation.navigate('Home');
          }
        }}
      />
    </Modal>
  );
};
export default Checkout;
