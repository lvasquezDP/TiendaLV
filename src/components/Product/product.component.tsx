import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '../UI/Text/text.component';
import {venta} from '../../types/user';
import {CardProductBase} from './product.base';
import styled from 'styled-components/native';
import {Control, Controller, FieldValues} from 'react-hook-form';

export function CardProduct({
  item,
  control,
  name,
}: {
  item: venta;
  control?: Control<FieldValues, any>;
  name: string;
}) {
  return (
    <CardProductBase
      item={item.producto}
      body={
        <>
          <Text>
            Unidad: <Precios>${item.precioVenta}</Precios>
          </Text>
          <Text>
            Total: <Precios>${item.cantidad * item.precioVenta}</Precios>
          </Text>
        </>
      }
      rigth={
        <View style={styles.stock}>
          <Controller
            control={control}
            name={name}
            render={({field: {onChange, value}}) => (
              <>
                <TouchableHighlight
                  onPress={() =>
                    item.cantidad > 1 && onChange(item.cantidad - 1)
                  }>
                  <Text>{` - `}</Text>
                </TouchableHighlight>
                <Text style={{fontSize: 16, flex: 1, textAlign: 'center'}}>
                  {value}
                </Text>
                <TouchableHighlight onPress={() => onChange(item.cantidad + 1)}>
                  <Text>+</Text>
                </TouchableHighlight>
              </>
            )}
          />
        </View>
      }
    />
  );
}
const TouchableHighlight = styled.TouchableHighlight`
  backgroundColor: ${({theme}) => theme.tertiary};
  paddingVertical: 9px;
  paddingHorizontal: 14px;
  borderRadius: 50px;
  alignItems: center;
`;
const Precios = styled.Text`
  fontWeight: 400;
  color: ${({theme}) => theme.textSecondary};
`;
const styles = StyleSheet.create({
  stock: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textDesc: {
    fontWeight: '400',
  },
});
