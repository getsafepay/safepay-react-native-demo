import React from 'react';
import {StyleSheet} from 'react-native';
import SafepayCheckout from 'safepay-react-native';

const Home: React.FC = () => {
  return (
    <>
      <SafepayCheckout
        amount={455}
        clientKey="sec_1d7a51e2-85b6-46fb-bbaf-8e2b612bf73b"
        currency="PKR"
        environment="sandbox"
        order_id="12345"
        buttonTitle="Checkout"
        buttonStyle={styles.button}
        buttonTextStyle={styles.btn_text}
      />
    </>
  );
};
export default Home;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'lightblue',
    padding: 10,
  },
  btn_text: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
