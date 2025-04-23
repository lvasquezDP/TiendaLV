import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Image} from '../UI/Image/image.component';
import {Text} from '../UI/Text/text.component';
import {Producto} from '../../types/user';
import {useTheme} from 'styled-components/native';

export function CardProductBase({
  item,
  rigth,
  body,
}: {
  item: Producto;
  rigth?: React.ReactElement;
  body?: React.ReactElement;
}) {
  const theme = useTheme();
  return (
    <View style={[styles.card, {backgroundColor: theme.secondary}]}>
      <Image style={styles.cardImage} uri={item.img} />
      <View style={styles.cardBody}>
        <Text style={[styles.textHeader]}>{item.nombrePublico}</Text>
        {body}
      </View>
      {rigth}
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
