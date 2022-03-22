import React, {useState, useEffect} from 'react';
import {Modal, Alert, Button, View, Text, StyleSheet} from 'react-native';
import queryString from 'query-string';
import WebView from 'react-native-webview';

const baseURL =
  process.env.ENVIRONMENT === 'PRODUCTION'
    ? 'https://api.getsafepay.com/components'
    : 'https://sandbox.api.getsafepay.com/components';

const Checkout: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [Token, setToken] = useState('');
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(
          'https://sandbox.api.getsafepay.com/order/v1/init',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              client: 'sec_1d7a51e2-85b6-46fb-bbaf-8e2b612bf73b',
              amount: 455,
              currency: 'PKR',
              environment: 'sandbox',
            }),
          },
        );
        const json = await response.json();
        setToken(json.data.token);
      } catch (error) {
        console.error(error);
      }
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
    <>
      <View style={styles.view}>
        <Text style={styles.text}>Checkout page SafePay</Text>
        <Button
          title="Checkout"
          onPress={() => setModalVisible(!modalVisible)}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
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
              setTimeout(() => {
                Alert.alert('Payment Cancelled!');
                setModalVisible(!modalVisible);
              }, 3000);
            }
            if (parsed.action === 'complete') {
              setTimeout(() => {
                Alert.alert('Payment Successfull');
                setModalVisible(!modalVisible);
              }, 3000);
            }
          }}
        />
      </Modal>
    </>
  );
};
export default Checkout;

const styles = StyleSheet.create({
  view: {
    marginTop: '10%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    textAlign: 'center',
    marginTop: '50%',
    marginBottom: '10%',
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
