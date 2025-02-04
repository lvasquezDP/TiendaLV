import {StyleSheet, Text as Texto, TextProps} from 'react-native';
import React, {FC, useContext} from 'react';
import {Colors} from '../../colors';
// import {ThemeContext} from '@react-navigation/native';

interface PropsText extends TextProps {}

export const Text: FC<PropsText> = props => {
  // const {...colos} = useContext(ThemeContext);
  // console.log(colos);

  return <Texto {...props} style={[styles.text, props.style]} />;
};

const styles = StyleSheet.create({
  text: {
    color: Colors.text,
  },
});
