import React from 'react';
import {Text} from '../UI/Text/text.component';
import {PrecioVenta} from '../../types/user';
import {CardProductBase, PropsCard} from './product.base';
import {useTheme} from 'styled-components/native';

export function CardPrecioVenta({
  item,
  onPress,
}: {
  item: PrecioVenta;
  onPress?: () => void;
}) {
  const theme = useTheme();
  return (
    <CardProductBase
      item={item.producto}
      onPress={onPress}
      body={
        <>
          <Text style={{fontWeight: '400', color: theme.textSecondary}}>
            {item.producto.proveedor.nombre}
          </Text>
          <Text>
            Existencias:{' '}
            <Text style={{fontWeight: '400', color: theme.textSecondary}}>
              {item.stock}
            </Text>
          </Text>
        </>
      }
    />
  );
}
