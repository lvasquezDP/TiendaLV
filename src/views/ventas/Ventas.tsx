import {FlatList, Text, View} from 'react-native';
import React from 'react';
import {PropsTab} from '../../routers/Tab';
import {useTheme} from 'styled-components/native';
import {Button, Card, CardProduct, Input} from '../../components';
import Toast from 'react-native-toast-message';
import {useFormulario} from '../../hooks/useFormulario';

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
      <Card title="Detalles" bottom={10} left={10} right={10}>
        <Input
          name="codigo"
          placeholder="Codigo"
          errors={{}}
          control={control}
          style={{marginTop: 0, marginHorizontal: 0}}
          styleContainer={{marginVertical: 0}}
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 0.5,
            paddingVertical: 10,
          }}>
          <Text>No. de Productos</Text>
          <Text>00</Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 0.5,
            paddingVertical: 10,
          }}>
          <Text>Total</Text>
          <Text>$0.00</Text>
        </View>

        <Button onPress={() => Toast.show({text1: 'prueba'})}>
          <Text style={{fontWeight: 'bold', color: theme.textTertiary}}>
            Pagar
          </Text>
        </Button>
      </Card>
    </View>
  );
};
