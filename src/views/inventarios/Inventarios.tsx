import {FlatList, Text, View} from 'react-native';
import React from 'react';
import {PropsTab} from '../../routers/Tab';
import {CardProduct} from '../../components/Product/product.component';

export const Inventario = (props: PropsTab<'Inventario'>) => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={[]}
        renderItem={({item}) => <CardProduct item={item} />}
      />
      <Text>Inventarios</Text>
    </View>
  );
};
