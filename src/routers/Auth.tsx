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
import {Image} from '../components';
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
      initialRouteName={'correo' in user ? 'Home' : 'Login'}
      screenOptions={{
        headerShown: false,
        headerTitle: user?.tienda?.nombre ?? '',
        headerTitleAlign: 'center',
        headerTintColor: Colors.text,
        headerStyle: {backgroundColor: Colors.backgroundColor},
        headerLeft: () => (
          <Image
            contentContainerStyle={{
              borderRadius: 50,
              minHeight: 50,
              minWidth: 50,
            }}
            uri={user?.tienda?.img}
          />
        ),
        statusBarBackgroundColor: 'transparent',
        statusBarTranslucent: true,
        statusBarStyle: Platform.OS == 'android' ? 'dark' : undefined,
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
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Store" component={Store} />
    </Stack.Navigator>
  );
};

export default AuthRutes;
