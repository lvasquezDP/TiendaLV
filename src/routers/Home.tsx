import React, {useContext} from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Login from '../views/Login';
import {Colors} from '../components/colors';
import Toast from 'react-native-toast-message';
import {Home} from '../views/Home';
import {AuthContex} from '../context/authContext';
import {Store} from '../views/Store';
import {Platform} from 'react-native';
import { createBottomTabNavigator,BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootTabParamList = {
  Login?: {};
  Home?: {};
  Store?: {};
};

export type PropsTab<T extends keyof RootTabParamList> =
BottomTabScreenProps<RootTabParamList, T>;

const Tab = createBottomTabNavigator<RootTabParamList>();
const AuthRutes = () => {
  const {user} = useContext(AuthContex);

  return (
    <Tab.Navigator
      initialRouteName={false ? 'Home' : 'Login'}
      // initialRouteName={'correo' in user ? 'Home' : 'Login'}
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: Colors.text,
        headerStyle: {backgroundColor: Colors.backgroundColor},
      }}
      layout={p => (
        <>
          {p.children}
          <Toast />
        </>
      )}>
      <Tab.Screen
        options={{headerShown: false}}
        name="Login"
        component={Login}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{headerTitle: user?.tienda?.nombre ?? ''}}
        name="Store"
        component={Store}
      />
    </Tab.Navigator>
  );
};

export default AuthRutes;
