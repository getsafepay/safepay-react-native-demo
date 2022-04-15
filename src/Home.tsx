import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import SafepayCheckout, {environment, theme} from 'safepay-react-native-sdk';

const Home: React.FC = () => {
  return (
    <>
      <SafepayCheckout
        amount={455}
        clientKey="sec_1d7a51e2-85b6-46fb-bbaf-8e2b612bf73b"
        currency="PKR"
        environment={environment.SANDBOX}
        order_id="12345"
        buttonStyle={styles.button}
        buttonTheme={theme.LIGHT}
        onPaymentCancelled={() => Alert.alert('Payment Cancelled!')}
        onPaymentComplete={() => Alert.alert('Payment Successfull')}
        onErrorFetchingTracker={() => Alert.alert('error fetching tracker id')}
      />
    </>
  );
};
export default Home;

const styles = StyleSheet.create({
  button: {
    marginTop: 400,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
