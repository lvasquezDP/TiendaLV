import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Login from '../views/Login';
import {ImageBackground, View} from 'react-native';
import {Colors} from '../components/colors';
import Toast from 'react-native-toast-message';
import {Home} from '../views/Home';
import {useQuery} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from '../components';

export type RootStackParamList = {
  Login?: {};
  Home?: {};
};

export type PropsStack<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthRutes = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['getToken'],
    queryFn: () => AsyncStorage.getItem('token'),
  });
  if (isLoading) return <Text>Loading</Text>;
  return (
    <Stack.Navigator
      initialRouteName={data ? 'Home' : 'Login'}
      screenOptions={{
        headerShown: false,
        statusBarBackgroundColor: 'transparent',
        statusBarTranslucent: true,
        contentStyle: {backgroundColor: Colors.backgroundColor},
      }}
      // screenLayout={p => (
      //   <ImageBackground
      //     // blurRadius={1}
      //     style={{flex: 1}}
      //     source={require('../asset/background.jpg')}
      //   >
      //     {p.children}
      //     <Toast />
      //   </ImageBackground>
      // )}
      screenLayout={p => (
        <>
          {p.children}
          <Toast />
        </>
      )}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default AuthRutes;
