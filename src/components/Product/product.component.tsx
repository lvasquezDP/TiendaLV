import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Image} from '../UI/Image/image.component';
import {Text} from '../UI/Text/text.component';
import {Tienda} from '../../types/user';
import { useTheme } from 'styled-components/native';

export function CardProduct({item}: {item: Tienda}) {
  const theme = useTheme();
  return (
    <View style={[styles.card, {backgroundColor: theme.secondary}]}>
      <Image style={styles.cardImage} uri={item.img} />
      <View style={styles.cardBody}>
        <Text style={[styles.textHeader]}>{item.nombre}</Text>
        <Text style={[styles.textDesc, {color: theme.textSecondary}]}>
          {item.contacto}
        </Text>
      </View>
      <View style={styles.stock}>
        <Text>-</Text>
        <Text>0</Text>
        <Text>+</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    gap: 15,
  },
  cardBody: {
    justifyContent: 'center',
    textAlign: 'center',
    flex: .6,
    gap: 15,
  },
  stock: {
    flex:.5,
    alignItems:'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cardImage: {
    borderRadius: 10,
  },
  textHeader: {
    fontWeight: 'bold',
  },
  textDesc: {
    fontWeight: '400',
  },
});
