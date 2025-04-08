import React from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import {Button, Check, Input, Text} from '../components';
import {IconAPP, IconLock, IconPerson} from '../asset/icons/icons';
import {useAuth} from '../hooks/useAuth';
import {PropsStack} from '../routers/Auth';
import {useTheme} from 'styled-components/native';

const Login = (props: PropsStack<'Login'>) => {
  const {
    useForm: {
      control,
      formState: {errors},
    },
    onSubmit,
  } = useAuth(props);

  const theme = useTheme();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS ? 'height' : 'padding'}
      style={{
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      <View
        style={{
          paddingHorizontal: 10,
          width: '100%',
        }}>
        <View style={{height: '40%'}}>
          <IconAPP style={{flex: 1}} />
          <Text
            style={{
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            INICIAR SESION
          </Text>
        </View>

        <Input
          label="CORREO"
          name="correo"
          errors={errors}
          control={control}
          rules={{required: 'Campo requerido'}}
          leftComponent={<IconPerson />}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Input
          password
          label="CONTRASEÑA"
          name="contraseña"
          errors={errors}
          control={control}
          rules={{required: 'Campo requerido'}}
          leftComponent={<IconLock />}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Check control={control} name="save" />
          <Text style={{fontWeight: 'bold'}}>Recordarme</Text>
        </View>
        <Button onPress={onSubmit}>
          <Text style={{fontWeight: 'bold', color: theme.textTertiary}}>
            Entrar
          </Text>
        </Button>
      </View>

      <Text style={{fontWeight: 'bold', color: theme.tertiary}}>
        Terminos y condiciones
      </Text>
    </KeyboardAvoidingView>
  );
};

export default Login;
