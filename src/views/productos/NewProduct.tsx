import React from 'react';
import {Button, Input, Text} from '../../components';
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

export const NewProduct = () => {
  const {
    useForm: {
      control,
      formState: {errors},
    },
    onSubmit,
  } = useFormulario();
  const theme = useTheme();
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
            name="correo"
            errors={errors}
            control={control}
            rules={{required: 'Campo requerido'}}
          />
          <Input
            label="Nombre Comercial"
            name="correo"
            errors={errors}
            control={control}
            rules={{required: 'Campo requerido'}}
          />
          <Input
            label="Codigo de barras"
            name="contraseña"
            placeholder="***************"
            errors={errors}
            control={control}
            rules={{required: 'Campo requerido'}}
          />
          <View style={{flexDirection: 'row', width: '100%'}}>
            <Input
              label="Costo"
              name="contraseña"
              placeholder="***************"
              styleContainer={{width: '50%'}}
              errors={errors}
              control={control}
              rules={{required: 'Campo requerido'}}
            />
            <Input
              label="Precio"
              name="correo"
              styleContainer={{width: '50%'}}
              errors={errors}
              control={control}
              rules={{required: 'Campo requerido'}}
            />
          </View>

          <View style={{flexDirection: 'row', width: '100%'}}>
            <Input
              label="Stock"
              name="contraseña"
              placeholder="***************"
              styleContainer={{width: '50%'}}
              errors={errors}
              control={control}
              rules={{required: 'Campo requerido'}}
            />
            <Input
              label="Stock minimo"
              name="correo"
              styleContainer={{width: '50%'}}
              errors={errors}
              control={control}
              rules={{required: 'Campo requerido'}}
            />
          </View>

          <Button>
            <Text style={{fontWeight: 'bold', color: theme.textTertiary}}>
              Imagen
            </Text>
          </Button>
          <Input
            label="Descripción"
            name="correo"
            errors={errors}
            control={control}
            rules={{required: 'Campo requerido'}}
          />

          <Button onPress={onSubmit}>
            <Text style={{fontWeight: 'bold', color: theme.textTertiary}}>
              Guardar
            </Text>
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
