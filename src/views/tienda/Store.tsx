import React, {useContext} from 'react';
import {Button, CardBase, Image, Text} from '../../components';
import {PropsTab} from '../../routers/Tab';
import {View} from 'react-native';
import {useTheme} from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routers/Auth';
import {AuthContex} from '../../context/authContext';

export const Store = (props: PropsTab<'Tienda'>) => {
  const theme = useTheme();
  const {user} = useContext(AuthContex);
  const store = user.tienda;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={{padding: 10, gap: 10}}>
      <CardBase
        style={{
          gap: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          uri={store.img}
          onPress={() => props.navigation.goBack()}
          contentContainerStyle={{borderRadius: 100}}
        />
        <View style={{flex: 1}}>
          <Text style={{fontSize: 20}}>{store.nombre}</Text>
          <Text style={{color: theme.textSecondary}}>{store.contacto}</Text>
          <Text style={{color: theme.textSecondary}}>{store.direccion}</Text>
        </View>
        <Button onPress={() => navigation.navigate('EditStore', user.tienda)}>
          <Text style={{color: theme.textTertiary}}>Editar</Text>
        </Button>
      </CardBase>
      <CardBase style={{gap: 20}}>
        <View style={{gap: 10}}>
          <Button style={{alignItems: 'flex-start', paddingVertical: 20}}>
            <Text style={{color: theme.textTertiary}}>
              Información personal
            </Text>
          </Button>
          <Button style={{alignItems: 'flex-start', paddingVertical: 20}}>
            <Text style={{color: theme.textTertiary}}>Colores</Text>
          </Button>
        </View>
        <Button>
          <Text style={{color: theme.textTertiary}}>Descargar base</Text>
        </Button>
      </CardBase>
    </View>
  );
};
