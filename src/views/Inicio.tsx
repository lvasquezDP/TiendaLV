import React from 'react';
import {View} from 'react-native';
import {CardProduct} from '../components/Product/product.component';
import {PropsTab} from '../routers/Tab';
import {Button, Input, Text} from '../components';
import Toast from 'react-native-toast-message';
import {useFormulario} from '../hooks/useFormulario';
let render = 0;
export const Inicio = ({navigation}: PropsTab<'Inicio'>) => {
  const {
    useForm: {control},
  } = useFormulario();
  render++;
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
      <Text>{render}</Text>
      <Input
        name="correo"
        placeholder="Correo"
        errors={{}}
        control={control}
        rules={{required: 'Campo requerido'}}
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
