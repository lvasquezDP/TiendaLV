import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Image} from '../UI/Image/image.component';
import {Text} from '../UI/Text/text.component';
import {Tienda} from '../../types/user';

export function CardProduct({item}: {item: Tienda}) {
  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} uri={item.img} />
      <View style={styles.cardBody}>
        <View>
          <Text style={styles.textHeader}>{item.nombre}</Text>
          <Text style={styles.textDesc}>{item.contacto}</Text>
        </View>
        <View style={styles.stock}>
          <Text>-</Text>
          <Text>0</Text>
          <Text>+</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'black',
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
    flex: 1,
    gap: 15,
  },
  stock: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  cardImage: {
    borderRadius: 10,
  },
  textHeader: {
    fontWeight: 'bold',
  },
  textDesc: {
    fontWeight: '300',
  },
});
