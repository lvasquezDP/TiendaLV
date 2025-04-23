import {FlatList, Text, View} from 'react-native';
import React from 'react';
import {PropsTab} from '../../routers/Tab';
import {useTheme} from 'styled-components/native';
import {Button, Card, CardProduct, Input} from '../../components';
import {useFormulario} from '../../hooks/useFormulario';
import api from '../../lib/api';
import Toast from 'react-native-toast-message';
import {AxiosResponse} from 'axios';
import {venta} from '../../types/user';

export const Ventas = (props: PropsTab<'Ventas'>) => {
  const {
    useForm: {watch, control, setValue, getValues},
    onSubmit,
  } = useFormulario(
    {
      mutationFn: data => {
        console.log(data);
        // api.get(`/api/store/venta`)
        return new Promise(resolve => {
          resolve({} as AxiosResponse);
        });
      },
      onSuccess: ({data}) => {
        setValue('productos', []);
        Toast.show({text1: 'Venta registrada con exito'});
      },
    },
    {
      defaultValues: {productos: []},
    },
  );

  const {
    useForm: {
      control: control1,
      formState: {errors},
      setValue: setSearch,
    },
    onSubmit: onSearch,
  } = useFormulario({
    mutationFn: data => api.get(`/store/product/${data.codigo}`),
    onSuccess: ({data}) => {
      const productoNuevo = data.producto;
      const productosActuales: venta[] = getValues('productos') || [];

      let nuevosProductos: venta[];
      if (productosActuales.find(p => p.id === productoNuevo.id)) {
        nuevosProductos = productosActuales.map(p =>
          p.id === productoNuevo.id ? {...p, cantidad: p.cantidad + 1} : p,
        );
      } else {
        nuevosProductos = [
          ...productosActuales,
          {...productoNuevo, cantidad: 1},
        ];
      }

      setValue('productos', nuevosProductos);
      setSearch('codigo', '');
    },
  });

  const theme = useTheme();
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={watch('productos')}
        renderItem={({item, index}) => (
          <CardProduct
            control={control}
            item={item}
            name={`productos.${index}.cantidad`}
          />
        )}
        style={{flex: 1, paddingHorizontal: 4}}
      />
      <Card title="Detalles" bottom={10} left={10} right={10}>
        <Input
          name="codigo"
          placeholder="Codigo"
          errors={errors}
          control={control1}
          style={{marginTop: 0, marginHorizontal: 0}}
          styleContainer={{marginVertical: 0}}
          onSubmitEditing={onSearch}
          rules={{required: 'Campo requerido'}}
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
          <Text>
            {getValues('productos').reduce(
              (acc: number, p: venta) => acc + p.cantidad,
              0,
            )}
          </Text>
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
          <Text>
            $
            {getValues('productos').reduce(
              (acc: number, p: venta) => acc + p.precioVenta * p.cantidad,
              0,
            )}
          </Text>
        </View>

        <Button onPress={onSubmit}>
          <Text style={{fontWeight: 'bold', color: theme.textTertiary}}>
            Pagar
          </Text>
        </Button>
      </Card>
    </View>
  );
};
