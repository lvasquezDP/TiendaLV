import {FlatList, View} from 'react-native';
import React from 'react';
import {Button, Text} from '../../components';
import {useTheme} from 'styled-components/native';
import {CardProduct} from '../../components/Product/product.component';
import {PropsTab} from '../../routers/Tab';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../routers/Auth';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const Productos = (p: PropsTab<'Productos'>) => {
  const theme = useTheme();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={{flex: 1}}>
      <Button onPress={() => navigation.navigate('NewProduct')}>
        <Text style={{color: theme.textTertiary, fontWeight: 'bold'}}>
          Agregar producto +
        </Text>
      </Button>
      <FlatList
        data={[]}
        renderItem={({item}) => <CardProduct item={item} />}
      />
    </View>
  );
};
