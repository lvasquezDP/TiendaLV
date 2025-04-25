import React from 'react';
import {Button, CardBase, Image, Text} from '../../components';
import {View} from 'react-native';
import {useTheme} from 'styled-components/native';
import {PropsStack} from '../../routers/Auth';

export const EditStore = (props: PropsStack<'EditStore'>) => {
  const theme = useTheme();
  const store = props.route.params;
  return (
    <View>
      <CardBase style={{margin: 10, gap: 20}}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <Image
            uri={store.img}
            onPress={() => props.navigation.goBack()}
            contentContainerStyle={{borderRadius: 100}}
          />
          <View style={{justifyContent: 'center'}}>
            <Text style={{fontSize: 20}}>{store.nombre}</Text>
            <Text style={{color: theme.textSecondary}}>{store.contacto}</Text>
            <Text style={{color: theme.textSecondary}}>{store.direccion}</Text>
          </View>
        </View>
      </CardBase>
      <CardBase style={{margin: 10, gap: 20}}>
        <Text style={{fontSize: 20}}>{store.direccion}</Text>
        <Text style={{color: theme.textSecondary}}>Dirección de la tienda</Text>
      </CardBase>
    </View>
  );
};
