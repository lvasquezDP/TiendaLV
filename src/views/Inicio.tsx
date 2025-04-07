import React from 'react';
import {View} from 'react-native';
import {CardProduct} from '../components/Product/product.component';
import {PropsTab} from '../routers/Tab';
import {Button, Input} from '../components';
import Toast from 'react-native-toast-message';
import { useFormulario } from '../hooks/useFormulario';

export const Inicio = ({navigation}: PropsTab<'Inicio'>) => {
  const{useForm:{control}}=useFormulario()
  return (
    <View style={{justifyContent: 'center', height: '100%'}}>
      <CardProduct
        item={{
          id: 0,
          nombre: 'Tienda ABC',
          contacto: 'lvasques59@gmail.com',
          direccion: 'Parque el ocotal #303',
          fechaCreacion: new Date(),
        }}
      />

      <Input
        label="CORREO"
        name="correo"
        errors={{}}
        control={control}
        rules={{required: 'Campo requerido'}}
        // leftComponent={<IconPerson />}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input
        label="CONTRASEÑA"
        name="contraseña"
        errors={{}}
        control={control}
        rules={{required: 'Campo requerido'}}
        password
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Button onPress={() => Toast.show({text1: 'prueba'})} />
    </View>
  );
};
