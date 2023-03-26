import {View, Text} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import {StackActions} from '@react-navigation/native';

class Splash extends React.Component {
  constructor(props) {
    super(props);

    // Initializing the state
    this.state = {color: 'lightgreen'};
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.dispatch(StackActions.replace('Welcome'));
    }, 3000);
  }
  render() {
    return (
      <View className="w-full h-full flex  bg-emerald-50 ">
        <Lottie
          className="shadow-2xl h-72 w-72 flex-row m-auto shadow-emerald-500"
          source={require('../assets/images/loading.json')}
          autoPlay
          loop
        />
      </View>
    );
  }
}
export default Splash;
