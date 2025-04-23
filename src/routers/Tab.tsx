import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {PropsStack} from './Auth';
import {Inicio} from '../views/Inicio';
import {useTheme} from 'styled-components/native';
import {Ventas} from '../views/ventas/Ventas';
import {IconCart, IconHistory, IconSettings} from '../asset/icons/icons';
import {Productos} from '../views/productos/Productos';
import {Inventario} from '../views/inventarios/Inventarios';
import {Store} from '../views/tienda/Store';
import {TouchableHighlight} from 'react-native';

export type RootTabParamList = {
  Inicio?: {};
  Ventas?: {};
  Inventario?: {};
  Inventarios?: {};
  Productos?: {};
  Tienda?: {};
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
        headerTitleAlign: 'center',
        headerTintColor: theme.textTertiary,
        headerStyle: {backgroundColor: theme.primary},
        sceneStyle: {backgroundColor: 'transparent'},
        // tabBarHideOnKeyboard:true,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: () => <IconSettings style={{height: 55, width: 55}} />,
          headerSearchBarOptions: {},
        }}
        name="Inicio"
        component={Inicio}
      />
      <Tab.Screen
        options={{
          headerRight: () => (
            <IconHistory
              onPress={() => navigation?.navigate('HVentas')}
              style={{
                marginRight: 15,
              }}
            />
          ),
          tabBarIcon: () => <IconCart style={{height: 45, width: 45}} />,
        }}
        name="Ventas"
        component={Ventas}
      />
      <Tab.Screen
        options={{
          headerSearchBarOptions: {},
          tabBarIcon: () => <IconCart style={{height: 45, width: 45}} />,
        }}
        name="Productos"
        component={Productos}
      />
      <Tab.Screen
        options={{
          headerTitle: 'Inventarios',
          headerSearchBarOptions: {},
          tabBarIcon: () => <IconCart style={{height: 45, width: 45}} />,
        }}
        name="Inventario"
        component={Inventario}
      />
      <Tab.Screen
        options={{
          headerTitle: 'Tienda',
          headerRight: () => (
            <TouchableHighlight style={{height: 55, width: 55}}>
              <IconSettings style={{flex: 1}} />
            </TouchableHighlight>
          ),
          tabBarIcon: () => <IconCart style={{height: 45, width: 45}} />,
        }}
        name="Tienda"
        component={Store}
      />
    </Tab.Navigator>
  );
};

export default TabRutes;
