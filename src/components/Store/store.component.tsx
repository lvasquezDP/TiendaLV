import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Image } from '../UI/Image/image.component';
import { Text } from '../UI/Text/text.component';

interface item {
  image?: string;
  avatar?: string;
  header: string;
  description: string;
  inform: {
    header: string;
    value: number;
  }[];
}

export function CardStore({item}: {item: item}) {
  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} />
      <View style={styles.cardBody}>
        <Text style={styles.textHeader}>{item.header}</Text>
        <Text style={styles.textDesc}>{item.description}</Text>
      </View>
      <View style={styles.footer}>
        {item.inform?.map(x => (
          <Inf key={x.header + x.value} {...x} />
        ))}
      </View>
    </View>
  );
}

const Inf = ({header, value}: {header: string; value: number}) => {
  return (
    <View style={styles.inf}>
      <Text style={styles.textHeader}>{header}</Text>
      <Text style={styles.textValue}>{value} M</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: 10,
    padding: 10,
    margin:5,

    boxShadow: [
      {
        offsetX: 0,
        offsetY: 0,
        inset: true,
        color: 'rgba(200,200,200,.35)',
        blurRadius: 40,
      },
      {
        offsetX: 0,
        offsetY: 10,
        blurRadius: 20,
      },
    ],
  },
  cardImage: {
    borderRadius: 10,
  },
  cardBody: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    textAlign: 'center',
  },
  footer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inf: {
    alignItems: 'center',
    margin: 10,
  },
  textHeader: {
    fontWeight: 'bold',
  },
  textDesc: {
    fontWeight: '300',
    textAlign: 'center',
  },
  textValue: {
    fontWeight: '200',
  },
});
