import {FlatList, Text, View} from 'react-native';
import React from 'react';
import {PropsTab} from '../../routers/Tab';
import {CardProduct} from '../../components/Product/product.component';
import {useTheme} from 'styled-components/native';
import {Button, Input} from '../../components';
import Toast from 'react-native-toast-message';
import {useFormulario} from '../../hooks/useFormulario';
import {Card} from '../../components/Card/Card';

export const Ventas = (props: PropsTab<'Ventas'>) => {
  const {
    useForm: {control},
  } = useFormulario();
  const theme = useTheme();
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={[]}
        renderItem={({item}) => <CardProduct item={item} />}
      />
      <Card>
        <Input
          name="codigo"
          placeholder="Codigo"
          errors={{}}
          control={control}
          style={{marginTop: 0, marginHorizontal: 0}}
          styleContainer={{marginTop: 0}}
        />
        <Text>No. de Productos</Text>
        <Text>Total</Text>

        <Button onPress={() => Toast.show({text1: 'prueba'})}>
          <Text style={{fontWeight: 'bold', color: theme.textTertiary}}>
            Pagar
          </Text>
        </Button>
      </Card>
    </View>
  );
};
