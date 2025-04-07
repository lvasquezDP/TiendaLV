import React, {useContext} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {Button, Image, Text} from '../components';
import {PropsStack} from '../routers/Auth';
import {AuthContex} from '../context/authContext';
import {Colors} from '../components/colors';

export const Store = (props: PropsStack<'Store'>) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS ? 'height' : 'padding'}
      style={{
        flex: 1,
      }}>
      <Image
        onPress={() => props.navigation.goBack()}
        contentContainerStyle={{minHeight: 300}}
      />
      <Text
        style={{
          alignSelf: 'center',
          fontWeight: 'bold',
          fontSize: 20,
          marginVertical: 20,
        }}>
        Luis
      </Text>
      <Button>
        <Text style={{color: Colors.text2, fontSize: 20}}>Editar</Text>
      </Button>
    </KeyboardAvoidingView>
  );
};
