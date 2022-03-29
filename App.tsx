import React from 'react';
import Home from './src/screens/Home';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Checkout: undefined;
};

const App: React.FC = () => {
  return (
    <>
      <Home />
    </>
  );
};

export default App;
