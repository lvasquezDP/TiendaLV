import React, {useContext} from 'react';
import {KeyboardAvoidingView, Platform, TouchableHighlight} from 'react-native';
import {Text} from '../components';
import {IconAPP} from '../asset/icons/icons';
import {PropsStack} from '../routers/Auth';
import {AuthContex} from '../context/authContext';
import Animated from 'react-native-reanimated';

export const Store = (props: PropsStack<'Store'>) => {
  const {user} = useContext(AuthContex);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS ? 'height' : 'padding'}
      style={{
        flex: 1,
        // justifyContent: 'center',
      }}>
      <TouchableHighlight
        style={{flex: 1/2}}
        onPress={() => props.navigation.goBack()}>
      <Animated.Image
        style={{flex: 1}}
        source={{
          uri:
          user.tienda.img ??
          'https://res.cloudinary.com/dxarbtyux/image/upload/v1703315333/color-contrast-inspector/sample-5-avatar.webp',
        }}
        />
        </TouchableHighlight>
      <IconAPP />
      <Text
        style={{
          alignSelf: 'center',
          fontWeight: 'bold',
          fontSize: 20,
          marginVertical: 20,
        }}>
        {user.correo}
      </Text>
    </KeyboardAvoidingView>
  );
};
