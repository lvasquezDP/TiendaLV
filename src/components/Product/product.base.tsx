import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Image} from '../UI/Image/image.component';
import {Text} from '../UI/Text/text.component';
import {Producto} from '../../types/user';
import {useTheme} from 'styled-components/native';
import {CardBase} from '../Card/Card.base';

export interface PropsCard {
  item: Producto;
  rigth?: React.ReactElement;
  body?: React.ReactElement;
  onPress?: () => void;
}
export function CardProductBase({item, rigth, body, onPress}: PropsCard) {
  const theme = useTheme();
  return (
    <Pressable onPress={onPress}>
      <CardBase style={styles.card}>
        <Image style={styles.cardImage} uri={item.img} />
        <View style={styles.cardBody}>
          <Text style={[styles.textHeader]}>{item.nombrePublico}</Text>
          {body}
        </View>
        {rigth}
      </CardBase>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 5,
    gap: 15,
  },
  cardBody: {
    justifyContent: 'center',
    textAlign: 'center',
    flex: 1,
    gap: 15,
  },
  cardImage: {
    borderRadius: 10,
  },
  textHeader: {
    fontWeight: 'bold',
  },
});
