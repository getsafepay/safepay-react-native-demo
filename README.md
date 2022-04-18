### Safepay React Native Demo

This project aims to be the easiest way for our merchants to consume safepay-checkout in their React Native applications.

### Installation

`npm:`

> #### $ npm install

`ios:`

> #### $ pod install

#### `npm start`

Runs your app in development mode.

#### `npm run ios`

Like npm start, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like npm start, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native](https://reactnative.dev/docs/getting-started) docs for detailed setup).  

#### Usage

#### SafepayCheckout

`SafepayCheckout` component is the main component which wraps everything and provides a couple of props (see Config below).

#### Example

``` ts
import React from 'react';
import SafepayCheckout from 'safepay-react-native';
import {StyleSheet} from 'react-native';

const Home: React.FC = () => {
  return (
    <>
      <SafepayCheckout
        amount={455}
        clientKey="sec_xxxx-yourkey"
        currency="PKR"
        environment={environment.SANDBOX}
        order_id="12345"
        buttonStyle={styles.button}
        buttonTheme={theme.DEFAULT}
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
```

#### Props Configuration

| Property | Type | Description |
| :---         |     :---:      |          :---: |
| amount       | number         | use this to specify amount    |
| clientKey     | string       | use your client key      |
| currency     | string       | specify currency for your transactions |
| environment     | enum | use this to specify environment  |
| order_id     | string       | use this for your order id  |
| buttonTheme     | enum       | use this to specify theme to your button|
| buttonStyle     | string      | use this to give styles to your button|
| onPaymentComplete() | function | use this to notify merchants if payment is complete |
| onErrorFetchingTracker() | function | use this to notify merchants if there is an error in fetching tracker id|
| onPaymentCancelled() | function | use this to notify merchants if customer is cancelling the payment|
