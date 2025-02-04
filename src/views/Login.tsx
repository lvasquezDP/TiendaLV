import React from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import {Button, Check, Input, Text} from '../components';
import {IconAPP, IconLock, IconPerson} from '../asset/icons/icons';
import {Colors} from '../components/colors';
import {useAuth} from '../hooks/useAuth';
import {PropsStack} from '../routers/Auth';

const Login = (props: PropsStack<'Login'>) => {
  const {
    useForm: {
      control,
      formState: {errors},
    },
    onSubmit,
  } = useAuth(props);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS ? 'height' : 'padding'}
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <IconAPP />
      <Text
        style={{
          alignSelf: 'center',
          fontWeight: 'bold',
          fontSize: 20,
          marginVertical: 20,
        }}>
        INICIAR SESION
      </Text>
      <View
        style={{
          paddingHorizontal: 10,
          width: '100%',
          marginHorizontal: 20,
          alignSelf: 'center',
        }}>
        <Input
          label="CORREO"
          name="correo"
          errors={errors}
          control={control}
          rules={{required: 'Campo requerido'}}
          leftComponent={<IconPerson />}
          autoCapitalize='none'
          keyboardType='email-address'
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
            marginBottom: 20,
          }}>
          <Check control={control} name="save" />
          <Text style={{fontWeight: 'bold'}}>Recordarme</Text>
        </View>
        <Button onPress={onSubmit}>
          <Text style={{fontWeight: 'bold', color: Colors.text2}}>Entrar</Text>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
