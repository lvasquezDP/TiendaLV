import React from 'react';
import {View} from 'react-native';
import {PropsStack} from '../routers/Auth';
import { CardProduct } from '../components/Product/product.component';

export const Home = ({navigation}: PropsStack<'Home'>) => {
  return (
    <View style={{justifyContent:'center', height:'100%'}}>
      <CardProduct
        item={{
          id: 0,
          nombre: 'Tienda ABC',
          contacto: 'lvasques59@gmail.com',
          direccion: 'Parque el ocotal #303',
          fechaCreacion: new Date(),
        }}
      />
    </View>
  );
};
