import React from 'react';
import {Text} from '../UI/Text/text.component';
import {PrecioVenta} from '../../types/user';
import {CardProductBase} from './product.base';
import {useTheme} from 'styled-components/native';

export function CardPrecioVenta({item}: {item: PrecioVenta}) {
  const theme = useTheme();
  return (
    <CardProductBase
      item={item.producto}
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