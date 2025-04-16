import React from 'react';
import {Button, CardBase, Image, Text} from '../../components';
import {PropsTab} from '../../routers/Tab';
import {View} from 'react-native';
import {useTheme} from 'styled-components/native';

export const Store = (props: PropsTab<'Tienda'>) => {
  const theme = useTheme();
  return (
    <CardBase style={{margin: 10, gap: 20}}>
      <View style={{flexDirection: 'row', gap: 10}}>
        <Image
          onPress={() => props.navigation.goBack()}
          contentContainerStyle={{borderRadius: 100}}
        />
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontSize: 20}}>Nombre de la tienda</Text>
          <Text style={{color: theme.textSecondary}}>Dirección de la tienda</Text>
        </View>
      </View>
      <View style={{gap: 10}}>
        <Button style={{alignItems: 'flex-start',paddingVertical:20}}>
          <Text style={{color: theme.textTertiary}}>
            Información de la tienda
          </Text>
        </Button>
        <Button style={{alignItems: 'flex-start',paddingVertical:20}}>
          <Text style={{color: theme.textTertiary}}>Información personal</Text>
        </Button>
        <Button style={{alignItems: 'flex-start',paddingVertical:20}}>
          <Text style={{color: theme.textTertiary}}>Colores</Text>
        </Button>
      </View>
      <Button>
        <Text style={{color: theme.textTertiary}}>Descargar base</Text>
      </Button>
    </CardBase>
  );
};
