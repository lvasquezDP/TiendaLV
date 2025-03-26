import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React, {FC} from 'react';
import { Colors } from '../../colors';

interface props extends TouchableOpacityProps {
  // secondary?: boolean;
}

export const Button: FC<props> = props => (
  <TouchableOpacity {...props} style={[styles.body, props.style]} />
);

const styles = StyleSheet.create({
  body: {
    margin: 5,
    backgroundColor: Colors.button,
    borderColor: Colors.button,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 3,
    alignItems: 'center',
  },
});
