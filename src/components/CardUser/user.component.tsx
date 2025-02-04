import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import { Image } from '../UI/Image/image.component';
import { Text } from '../UI/Text/text.component';
// import AntDesign from 'react-native-vector-icons/AntDesign';

export function CardUser({
  name,
  onPress,
  email,
}: {
  name?: string;
  email?: string;
  onPress?: () => void;
}) {
  return (
    <View style={Styles.card}>
      <Image />
      <View style={Styles.cardBody}>
        <Text style={Styles.textHeader}>{name}</Text>
        <Text style={Styles.textDesc}>{email}</Text>
      </View>
      {/* <AntDesign
        name="rightcircleo"
        size={25}
        style={Styles.icon}
        onPress={onPress}
      /> */}
    </View>
  );
}

const Styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 10,
    paddingVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
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
  cardBody: {
    flex: 0.8,
  },
  textHeader: {
    fontWeight: 'bold',
  },
  textDesc: {
    flexWrap: 'wrap',
    fontWeight: '300',
  },
  icon: {
    // color: secondary,
  },
});
