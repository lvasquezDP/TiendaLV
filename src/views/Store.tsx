import React, {useContext} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {Button, Image, Text} from '../components';
import {PropsStack} from '../routers/Auth';
import {AuthContex} from '../context/authContext';
import {Colors} from '../components/colors';

export const Store = (props: PropsStack<'Store'>) => {
  const {user} = useContext(AuthContex);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS ? 'height' : 'padding'}
      style={{
        flex: 1,
      }}>
      <Image
        onPress={() => props.navigation.goBack()}
        contentContainerStyle={{minHeight: 300}}
        uri={user.tienda.img}
      />
      <Text
        style={{
          alignSelf: 'center',
          fontWeight: 'bold',
          fontSize: 20,
          marginVertical: 20,
        }}>
        {user.correo}
      </Text>
      <Button>
        <Text style={{color: Colors.text2, fontSize: 20}}>Editar</Text>
      </Button>
    </KeyboardAvoidingView>
  );
};
