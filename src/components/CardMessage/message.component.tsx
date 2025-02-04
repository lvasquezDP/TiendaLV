import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {StyleSheet} from 'react-native';
import Image from '../UI/Image/image.component';

export interface MessageInterface {
  emisor: string;
  receptor: string;
  message?: string;
  img?: any[];
  entregado: string;
  visto: string;
  created_at: string;
}

export function CardMessage({
  item,
  onPress,
  owner = false,
}: {
  item: MessageInterface;
  horizontal?: boolean;
  onPress?: () => void;
  owner?: boolean;
}) {

  return (
    <View style={styles.row}>
      <View style={styles.card}>
        <FlatList
          data={item.img}
          renderItem={({item: x}) => <Image uri={x.Media} />}
          numColumns={2}
        />
        {item.message && <Text style={styles.textHeader}>{item.message}</Text>}
        <View style={styles.status}>
          <Text style={styles.hora}>{item.created_at.split('T')[0]}</Text>
          {/* {owner && (
            <>
              <AntDesign
                name="check"
                size={12}
                style={styles.icon}
                onPress={onPress}
              />
              {item.visto && (
                <AntDesign
                  name="check"
                  size={12}
                  style={styles.icon}
                  onPress={onPress}
                />
              )}
            </>
          )} */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 10,
    // backgroundColor: primary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignItems: 'flex-end',
  },
  row: {
    width: '100%',
    // alignItems: owner ? 'flex-end' : 'flex-start',
    padding: 2,
  },
  textHeader: {
    // alignSelf: owner ? 'flex-end' : 'flex-start',
    flexWrap: 'wrap',
    fontWeight: '300',
    // color: secondary,
  },
  hora: {
    fontSize: 11,
    fontWeight: '100',
    // color: secondary,
  },
  icon: {
    // color: secondary,
  },
  status: {
    flexDirection: 'row',
  },
  image: {
    padding: 2,
    overflow: 'hidden',
    borderRadius: 10,
  },
});
