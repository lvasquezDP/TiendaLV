import React, {useContext} from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Login from '../views/Login';
import Toast from 'react-native-toast-message';
import {AuthContex} from '../context/authContext';
import {Store} from '../views/tienda/Store';
import {Platform} from 'react-native';
import TabRutes from './Tab';
import styled, {useTheme} from 'styled-components/native';
import {HVentas} from '../views/ventas/Historial';
import {NewProduct} from '../views/productos/NewProduct';
import { PrecioVenta, Tienda } from '../types/user';
import { EditStore } from '../views/tienda/EditStore';

export type RootStackParamList = {
  Login?: {};
  TabRutes?: {};
  Store?: {};
  HVentas?: {};
  NewProduct?: {};
  Product: PrecioVenta;
  EditStore: Tienda;
};

export type PropsStack<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthRutes = () => {
  const {user} = useContext(AuthContex);
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName={'correo' in user ? 'TabRutes' : 'Login'}
      // initialRouteName="TabRutes"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: theme.textTertiary,
        headerStyle: {backgroundColor: theme.primary},
        statusBarBackgroundColor: theme.primary,
        statusBarStyle: Platform.OS == 'android' ? 'auto' : undefined,
        contentStyle: {backgroundColor: theme.background},
        // statusBarTranslucent: true,
      }}
      layout={p => (
        <>
          {p.children}
          <Toast />
        </>
      )}>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TabRutes" component={TabRutes} />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen
          options={{headerTitle: 'Historial'}}
          name="HVentas"
          component={HVentas}
        />
        <Stack.Screen
          options={{headerTitle: 'Nuevo Producto'}}
          name="NewProduct"
          component={NewProduct}
        />
        <Stack.Screen
          options={{headerTitle: 'Producto'}}
          name="Product"
          component={NewProduct}
        />
        <Stack.Screen
          options={{headerTitle: 'Editar Tienda'}}
          name="EditStore"
          component={EditStore}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AuthRutes;
