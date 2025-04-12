import React, {useContext} from 'react';
import {AuthContex} from '../context/authContext';
import {Store} from '../views/Store';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {PropsStack} from './Auth';
import {Inicio} from '../views/Inicio';
import {useTheme} from 'styled-components/native';
import {Ventas} from '../views/ventas/Ventas';
import {
  IconCart,
  IconHistory,
  IconInventario,
  IconLock,
  IconSettings,
} from '../asset/icons/icons';
import {Input} from '../components';
import {useFormulario} from '../hooks/useFormulario';

export type RootTabParamList = {
  Inicio?: {};
  Ventas?: {};
  Inventarios?: {};
  Productos?: {};
};

export type PropsTab<T extends keyof RootTabParamList> = BottomTabScreenProps<
  RootTabParamList,
  T
>;

const Tab = createBottomTabNavigator<RootTabParamList>();
const TabRutes = ({navigation}: PropsStack<'TabRutes'>) => {
  const {user} = useContext(AuthContex);
  const theme = useTheme();
  const {
    useForm: {control},
  } = useFormulario();

  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: theme.textTertiary,
        headerStyle: {backgroundColor: theme.primary},
        sceneStyle: {backgroundColor: 'transparent'},
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: () => <IconSettings style={{height: 55, width: 55}} />,
          // header: () => <Input control={control} />,
          headerSearchBarOptions:{}
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
    </Tab.Navigator>
  );
};

export default TabRutes;
