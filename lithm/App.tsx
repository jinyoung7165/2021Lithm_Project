import React, {useEffect} from 'react';
import { Alert , StyleSheet, SafeAreaView,View,Text} from 'react-native';
import Loading from './src/screen/Loading';
import AuthScreen from './src/screen/AuthScreen';
import NoStudy from './src/screen/NoStudy';
import MakeStudy from './src/screen/MakeStudy';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


export default class extends React.Component { //class로 바꾼모습 뉘신지..?
  state={
    isLoading:true
  };


  
  componentDidMount = async() => {
    // 1000 = 1s
    setTimeout(() => {this.setState({isLoading : false})}, 3000);
  }
  render(){
    if(this.state.isLoading){
      return <Loading></Loading>
    }else{
      return( <SafeAreaView>
        <AuthScreen></AuthScreen>
        </SafeAreaView>)

      /*const Stack = createStackNavigator();
      return (
        <NavigationContainer>
          <SafeAreaView style={styles.safeAreaView}>
                <Stack.Navigator initialRouteName="NoStudy">
                  <Stack.Screen name="NoStudy" component={NoStudy}/>
                  <Stack.Screen name="MakeStudy" component={MakeStudy}/>
                </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>)
  */
    }

  }
};

const styles = StyleSheet.create({
  safeAreaView: {flex: 1}
})