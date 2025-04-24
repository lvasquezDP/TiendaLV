import {FlatList, View} from 'react-native';
import React from 'react';
import {Button, CardPrecioVenta, Text} from '../../components';
import {useTheme} from 'styled-components/native';
import {PropsTab} from '../../routers/Tab';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../routers/Auth';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PrecioVenta} from '../../types/user';
import {usePagination} from '../../hooks/usePagination';

export const Productos = (p: PropsTab<'Productos'>) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const theme = useTheme();
  const {data, isFetching, status, error} = usePagination<
    PrecioVenta,
    'productos'
  >('/store/product');
  return (
    <View style={{flex: 1}}>
      <Button onPress={() => navigation.navigate('NewProduct')}>
        <Text style={{color: theme.textTertiary, fontWeight: 'bold'}}>
          Agregar producto +
        </Text>
      </Button>

      {status === 'pending' ? (
        <Text>Loading...</Text>
      ) : status === 'error' ? (
        <Text>Error: {error.message}</Text>
      ) : (
        <FlatList
          data={data?.productos}
          renderItem={({item}) => (
            <CardPrecioVenta
              item={item}
              onPress={() => {
                navigation.navigate('Product', item);
              }}
            />
          )}
          style={{paddingHorizontal: 4}}
        />
      )}
      {isFetching ? <Text> Loading...</Text> : null}
    </View>
  );
};
