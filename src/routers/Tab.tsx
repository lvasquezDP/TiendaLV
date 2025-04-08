import React, {useContext} from 'react';
import {AuthContex} from '../context/authContext';
import {Store} from '../views/Store';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {PropsStack} from './Auth';
import {Inicio} from '../views/Inicio';
import { useTheme } from 'styled-components/native';

export type RootTabParamList = {
  Inicio?: {};
  Store?: {};
};

export type PropsTab<T extends keyof RootTabParamList> = BottomTabScreenProps<
  RootTabParamList,
  T
>;

const Tab = createBottomTabNavigator<RootTabParamList>();
const TabRutes = ({navigation}: PropsStack<'TabRutes'>) => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        // headerShown: false,
        headerTitleAlign: 'center',
        headerTintColor: theme.textTertiary,
        headerStyle: {backgroundColor: theme.primary},
        sceneStyle: {backgroundColor: 'transparent'},
      }}>
      <Tab.Screen name="Inicio" component={Inicio} />
      <Tab.Screen name="Store" component={Store} />
    </Tab.Navigator>
  );
};

export default TabRutes;
