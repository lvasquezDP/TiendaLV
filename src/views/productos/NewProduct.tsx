import React, {useCallback, useState} from 'react';
import {Button, CardBase, Input, Select, Text} from '../../components';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import {useTheme} from 'styled-components/native';
import {useFormulario} from '../../hooks/useFormulario';
import {PropsStack} from '../../routers/Auth';
import {debounce} from 'lodash';
import {useMutation} from '@tanstack/react-query';
import api from '../../lib/api';
import {Producto} from '../../types/user';

export const NewProduct = (p: PropsStack<'NewProduct' | 'Product'>) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [sumitEdit, setSumitEdit] = useState(true);
  const [data, setData] = useState<Producto[]>([]);
  const {
    useForm: {
      control,
      formState: {errors},
      setValue,
    },
    onSubmit,
  } = useFormulario(
    {
      mutationFn: data => {
        ['precioCompra', 'precioVenta', 'stock', 'minStock'].forEach(
          x => (data[x] = Number(data[x])),
        );
        return new Promise(() => {});
      },
    },
    {defaultValues: p.route.params},
  );
  const theme = useTheme();
  const {mutate} = useMutation({
    mutationFn: c => api.get(`/product/find/5/${c}`),
    onSuccess: ({data}) => {
      if (data.productos) {
        if (sumitEdit && data.productos.length > 0) {
          setData(data.productos);
          setDropdownVisible(true);
        } else if (!sumitEdit && data.productos.length == 1) {
          console.log(data.productos);
          setValue('producto', data.productos[0]);
        }
      }
    },
  });
  const handler = useCallback(
    debounce(e => mutate(e.target.value), 800),
    [],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : -25}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 10,
        }}
        onScroll={() => setDropdownVisible(false)}
        keyboardShouldPersistTaps="handled">
        <Input
          label="Codigo de barras"
          name="producto.codigo"
          errors={errors}
          control={control}
          // onSubmitEditing={()=>}<--- no mostrar sugerencias y si se encontro almenos una agregarla directamente
          onSubmitEditing={() => {
            // sumitEdit = false;
            setSumitEdit(false);
          }}
          rules={{
            required: 'Campo requerido',
            onChange: handler,
          }}
          onBlur={() => setDropdownVisible(false)}
        />
        {dropdownVisible && sumitEdit && (
          <View style={{height: 0}}>
            <CardBase
              style={{
                top: -10,
                position: 'absolute',
                width: '100%',
                zIndex: 1,
              }}>
              <FlatList
                keyboardShouldPersistTaps="handled"
                scrollEnabled={false}
                data={data}
                renderItem={({item}) => (
                  <Button onPress={() => setDropdownVisible(false)}>
                    <Text>
                      {item.nombre} - {item.proveedor.nombre}
                    </Text>
                  </Button>
                )}
              />
            </CardBase>
          </View>
        )}
        <Input
          label="Nombre del Producto"
          name="producto.nombre"
          errors={errors}
          control={control}
          rules={{required: 'Campo requerido'}}
        />
        <Input
          label="Nombre Comercial"
          name="producto.nombrePublico"
          errors={errors}
          control={control}
          rules={{required: 'Campo requerido'}}
        />
        <Select
          control={control}
          name="id_proveedor"
          label="Proveedor"
          items={[]}
          onValueChange={() => console.log('')}
        />
        <Select
          control={control}
          name="id_categorias"
          label="Categoria"
          items={[]}
          onValueChange={() => console.log('')}
        />
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Input
            label="Costo"
            name="precioCompra"
            styleContainer={{width: '50%'}}
            errors={errors}
            control={control}
            keyboardType="decimal-pad"
            rules={{
              required: 'Campo requerido',
              validate: value =>
                !isNaN(Number(value)) || 'Debe ser un número válido',
            }}
          />
          <Input
            label="Precio"
            name="precioVenta"
            styleContainer={{width: '50%'}}
            errors={errors}
            control={control}
            keyboardType="decimal-pad"
            rules={{
              required: 'Campo requerido',
              validate: value =>
                !isNaN(Number(value)) || 'Debe ser un número válido',
            }}
          />
        </View>

        <View style={{flexDirection: 'row', width: '100%'}}>
          <Input
            label="Stock"
            name="stock"
            styleContainer={{width: '50%'}}
            errors={errors}
            control={control}
            keyboardType="decimal-pad"
            rules={{
              required: 'Campo requerido',
              validate: value =>
                !isNaN(Number(value)) || 'Debe ser un número válido',
            }}
          />
          <Input
            label="Stock minimo"
            name="minStock"
            styleContainer={{width: '50%'}}
            errors={errors}
            control={control}
            keyboardType="decimal-pad"
            rules={{
              required: 'Campo requerido',
              validate: value =>
                !isNaN(Number(value)) || 'Debe ser un número válido',
            }}
          />
        </View>

        <Button style={{marginTop: 15}}>
          <Text style={{fontWeight: 'bold', color: theme.textTertiary}}>
            Imagen
          </Text>
        </Button>
        <Input
          multiline={true}
          numberOfLines={4}
          label="Descripción"
          name="producto.descripcion"
          errors={errors}
          control={control}
          rules={{required: 'Campo requerido'}}
        />

        <Button style={{marginTop: 15}} onPress={onSubmit}>
          <Text style={{fontWeight: 'bold', color: theme.textTertiary}}>
            Guardar
          </Text>
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
