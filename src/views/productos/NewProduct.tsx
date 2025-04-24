import React from 'react';
import {Button, Input, Select, Text} from '../../components';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useTheme} from 'styled-components/native';
import {useFormulario} from '../../hooks/useFormulario';
import {PropsStack} from '../../routers/Auth';

export const NewProduct = (p: PropsStack<'NewProduct' | 'Product'>) => {
  const {
    useForm: {
      control,
      formState: {errors},
      watch
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
  watch(console.log)
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : -25}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 10,
          }}
          keyboardShouldPersistTaps="handled">
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
          <Input
            label="Codigo de barras"
            name="producto.codigo"
            errors={errors}
            control={control}
            rules={{
              required: 'Campo requerido',
            }}
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

          <Button style={{marginTop:15}}>
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

          <Button style={{marginTop:15}} onPress={onSubmit}>
            <Text style={{fontWeight: 'bold', color: theme.textTertiary}}>
              Guardar
            </Text>
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
