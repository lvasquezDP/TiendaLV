import React, {useContext, useMemo, useState} from 'react';
import {Button, CardBase, Image, Text} from '../../components';
import {PropsTab} from '../../routers/Tab';
import {FlatList, View} from 'react-native';
import {useTheme} from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routers/Auth';
import {AuthContex} from '../../context/authContext';
import {useQuery} from '@tanstack/react-query';
import api from '../../lib/api';
import {Tienda, User} from '../../types/user';

type store = Tienda & {usuarios: User[]};

export const Store = (props: PropsTab<'Tienda'>) => {
  const theme = useTheme();
  const {user} = useContext(AuthContex);
  // const store = user.tienda;
  const {data} = useQuery({
    queryKey: [''],
    queryFn: () => api.get(`/store/show/${user.tienda.id}`),
    select(data) {
      return data.data.tienda as store;
    },
  });
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={{padding: 10, gap: 10, flex: 1}}>
      <CardBase
        style={{
          gap: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          uri={data?.img}
          onPress={() => props.navigation.goBack()}
          contentContainerStyle={{borderRadius: 100}}
        />
        <View style={{flex: 1}}>
          <Text style={{fontSize: 20}}>{data?.nombre}</Text>
          <Text style={{color: theme.textSecondary}}>{data?.contacto}</Text>
          <Text style={{color: theme.textSecondary}}>{data?.direccion}</Text>
        </View>
        <Button
          onPress={() => navigation.navigate('EditStore', data as Tienda)}>
          <Text style={{color: theme.textTertiary}}>Editar</Text>
        </Button>
      </CardBase>
      <Text style={{fontSize: 20}}>Usuarios</Text>
      <FlatList
        data={data?.usuarios ?? []}
        renderItem={({item}) => (
          <CardBase
            style={{
              gap: 10,
              marginVertical: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              uri={item.img}
              contentContainerStyle={{
                minWidth: 60,
                minHeight: 60,
              }}
              onPress={() => props.navigation.goBack()}
            />
            <View style={{flex: 1}}>
              <Text style={{fontSize: 15}}>{item.nombre}</Text>
              <Text style={{color: theme.textSecondary}}>{item.correo}</Text>
              {item.rol == 'ADMINISTRADOR' && (
                <Text style={{color: theme.textSecondary}}>{item.rol}</Text>
              )}
            </View>
            <Button>
              <Text style={{color: theme.textTertiary}}>
                {user.id == item.id ? 'Editar' : 'Mensaje'}
              </Text>
            </Button>
          </CardBase>
        )}
      />

      <Button style={{bottom: 0}}>
        <Text style={{color: theme.textTertiary}}>Agregar Usuario</Text>
      </Button>
    </View>
  );
};
