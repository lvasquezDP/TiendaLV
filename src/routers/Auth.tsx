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

export type RootStackParamList = {
  Login?: {};
  Home?: {};
  Store?: {};
};

export type PropsStack<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthRutes = () => {
  const {user} = useContext(AuthContex);

  return (
    <Stack.Navigator
      initialRouteName={true ? 'Home' : 'Login'}
      // initialRouteName={'correo' in user ? 'Home' : 'Login'}
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: Colors.text,
        headerStyle: {backgroundColor: Colors.backgroundColor},
        statusBarBackgroundColor: 'transparent',
        statusBarTranslucent: true,
        statusBarStyle: Platform.OS == 'android' ? 'dark' : undefined,
        contentStyle: {backgroundColor: Colors.backgroundColor},
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
        name="Home"
        component={Home}
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
