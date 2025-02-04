import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {Text} from '../components';
import {IconAPP} from '../asset/icons/icons';
import {PropsStack} from '../routers/Auth';

export const Home = (props: PropsStack<'Home'>) => {

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
        Home
      </Text>
    </KeyboardAvoidingView>
  );
};
