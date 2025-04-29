import React, {useCallback, useState} from 'react';
import {Button, CardBase, Image, Input, Select, Text} from '../../components';
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
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import api from '../../lib/api';
import {Producto, Proveedor} from '../../types/user';
import ImagePicker from '../../utils/imagePicker';
import formdata from '../../utils/formdata';
import Toast from 'react-native-toast-message';

export const NewProduct = (p: PropsStack<'NewProduct' | 'Product'>) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [sumitEdit, setSumitEdit] = useState(true);
  const [data, setData] = useState<Producto[]>([]);
  const theme = useTheme();
  const queryClient = useQueryClient();

  const {
    useForm: {
      control,
      formState: {errors},
      setValue,
      getValues,
      watch,
    },
    onSubmit,
  } = useFormulario(
    {
      mutationFn: data => {
        if (!!data.productoId) delete data.producto;
        else data.producto.precio = data.precioCompra;

        return api.post(`/store/product/register`, formdata(data), {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      },
      onSuccess(data) {
        Toast.show({
          text1: `Producto ${
            Object.keys(p.route.params).length > 1 ? 'guardado' : ' registrado'
          } exitosamente`,
        });
        queryClient.invalidateQueries({ queryKey: ["/store/product"] });
        p.navigation.goBack();

      },
    },
    {defaultValues: p.route.params},
  );

  const {mutate} = useMutation({
    mutationFn: c => api.get(`/product/find/5/${c}`),
    onSuccess: ({data}) => {
      if (data.productos) {
        if (sumitEdit) {
          if (data.productos.length > 0) setData(data.productos);
          setDropdownVisible(data.productos.length > 0);
        } else if (data.productos.length == 1) {
          setValue('producto', data.productos[0]);
          setValue('productoId', data.productos[0].id);
        }
      }
    },
  });

  const {data: dataP, status} = useQuery({
    queryKey: ['/proveedor/'],
    queryFn: () => api.get('/proveedor/'),
    select: data => {
      return data.data?.data?.map((x: Proveedor) => ({
        label: x.nombre,
        value: x.id,
        // key: String(x.id),
      }));
    },
  });

  const handler = useCallback(
    debounce(e => mutate(e.target.value), 800),
    [],
  );

  const selectImage = async () => {
    const {assets} = await ImagePicker.launchImageLibrary({mediaType: 'photo'});
    if (assets) setValue('img', assets[0]);
  };

  const edit = !getValues('producto.id');
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
          // editable={edit}
          errors={errors}
          control={control}
          onFocus={() => setSumitEdit(true)}
          onSubmitEditing={() => {
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
                  <Button
                    onPress={() => {
                      setDropdownVisible(false);
                      setValue('producto', item);
                    }}>
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
          editable={edit}
          errors={errors}
          control={control}
          rules={{required: 'Campo requerido'}}
        />
        <Input
          label="Nombre Comercial"
          name="producto.nombrePublico"
          editable={edit}
          errors={errors}
          control={control}
          rules={{required: 'Campo requerido'}}
        />
        {status == 'success' && (
          <Select
            control={control}
            name="producto.proveedorId"
            label="Proveedor"
            items={dataP}
            errors={errors}
            disabled={!edit}
            rules={{required: 'Campo requerido'}}
          />
        )}
        {/* <Select
          control={control}
          name="id_categorias"
          label="Categoria"
          items={[]}
        /> */}
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
        {typeof watch('producto.img') == 'undefined' &&
        typeof watch('img') == 'undefined' ? (
          <Button style={{marginTop: 15}} onPress={selectImage}>
            <Text style={{fontWeight: 'bold', color: theme.textTertiary}}>
              Imagen
            </Text>
          </Button>
        ) : typeof watch('producto.img') == 'string' ? (
          <Image uri={getValues('producto.img')} />
        ) : (
          <Image uri={getValues('img.uri')} />
        )}
        <Input
          multiline={true}
          numberOfLines={4}
          label="Descripción"
          name="producto.descripcion"
          editable={edit}
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
