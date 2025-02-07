import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Image} from '../UI/Image/image.component';
import {Text} from '../UI/Text/text.component';
import {Proveedor} from '../../types/user';

export function CardProveedor({item}: {item: Proveedor}) {
  return (
    <View style={styles.card}>
      <Image uri={item.img} />
      <View style={styles.cardBody}>
        <Text style={styles.textHeader}>{item.nombre}</Text>
        <Text style={styles.textDesc}>{item.contacto}</Text>
        {/* <View style={styles.footer}>
          {item.inform?.map(x => (
            <Inf key={x.header + x.value} {...x} />
          ))}
        </View> */}
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
    paddingVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 5,
    padding:5,

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
  cardBody: {
    // flex: 0.8,
    alignItems: 'center',
  },
  footer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },
  inf: {
    alignItems: 'center',
  },
  textHeader: {
    fontWeight: 'bold',
  },
  textDesc: {
    flexWrap: 'wrap',
    fontWeight: '300',
  },
  textValue: {
    fontWeight: '300',
  },
});
