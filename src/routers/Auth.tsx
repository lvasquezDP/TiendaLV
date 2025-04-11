import React, {useContext} from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Login from '../views/Login';
import Toast from 'react-native-toast-message';
import {AuthContex} from '../context/authContext';
import {Store} from '../views/Store';
import {Platform} from 'react-native';
import TabRutes from './Tab';
import styled, {useTheme} from 'styled-components/native';

export type RootStackParamList = {
  Login?: {};
  TabRutes?: {};
  Store?: {};
};

export type PropsStack<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthRutes = () => {
  const {user} = useContext(AuthContex);
  const theme = useTheme();
  return (
    <Stack.Navigator
      // initialRouteName={'correo' in user ? 'TabRutes' : 'Login'}
      initialRouteName='TabRutes'
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: theme.textTertiary,
        headerStyle: {backgroundColor: theme.primary},
        statusBarBackgroundColor: 'transparent',
        statusBarTranslucent: true,
        statusBarStyle: Platform.OS == 'android' ? 'dark' : undefined,
        contentStyle: {backgroundColor: theme.background},
      }}
      layout={p => (
        <>
          {p.children}
          <Toast />
        </>
      )}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="TabRutes"
        component={TabRutes}
      />
      <Stack.Screen
        options={{headerTitle: user?.tienda?.nombre ?? ''}}
        name="Store"
        component={Store}
      />
    </Stack.Navigator>
  );
};

export default AuthRutes;
