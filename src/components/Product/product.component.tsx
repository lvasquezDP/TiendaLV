import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '../UI/Text/text.component';
import {Producto} from '../../types/user';
import {CardProductBase} from './product.base';
import {useTheme} from 'styled-components/native';

export function CardProduct({item}: {item: Producto}) {
  const theme = useTheme();
  return (
    <CardProductBase
      item={item}
      body={
        <Text style={[styles.textDesc, {color: theme.textSecondary}]}>
          {item.descripcion}
        </Text>
      }
      rigth={
        <View style={styles.stock}>
          <Text>-</Text>
          <Text>0</Text>
          <Text>+</Text>
        </View>
      }
    />
  );
}
const styles = StyleSheet.create({
  stock: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textDesc: {
    fontWeight: '400',
  },
});
