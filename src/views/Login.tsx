import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        // behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : -25}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-evenly',
            paddingHorizontal: 10,
          }}
          keyboardShouldPersistTaps="handled">
          <View>
            <View style={{height: 200}}>
              <IconAPP style={{flex: 1}} />
              <Text
                style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 20}}>
                INICIAR SESION
              </Text>
            </View>

            <Input
              label="CORREO"
              name="correo"
              placeholder='Correo@domain.com'
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
              placeholder='***************'
              errors={errors}
              control={control}
              rules={{required: 'Campo requerido'}}
              leftComponent={<IconLock />}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
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

          <Text
            style={{
              fontWeight: 'bold',
              color: theme.tertiary,
              marginTop: 20,
              alignSelf: 'center',
            }}>
            Terminos y condiciones
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
