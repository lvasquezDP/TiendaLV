import React, {useContext} from 'react';
import Toast from 'react-native-toast-message';
import {Home} from '../views/Home';
import {AuthContex} from '../context/authContext';
import {Store} from '../views/Store';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {PropsStack} from './Auth';
import {Colors} from '../components/colors';
import {Inicio} from '../views/Inicio';

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
  const {user} = useContext(AuthContex);

  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
        headerTintColor: Colors.text,
        // headerStyle: {backgroundColor: 'transparent'},
        sceneStyle: {backgroundColor: 'transparent'},
      }}>
      <Tab.Screen name="Inicio" component={Inicio} />
      <Tab.Screen name="Store" component={Store} />
    </Tab.Navigator>
  );
};

export default TabRutes;
