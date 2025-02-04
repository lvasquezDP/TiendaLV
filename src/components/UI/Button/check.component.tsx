import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../../colors';
import {IconCheck} from '../../../asset/icons/icons';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

interface props extends TouchableOpacityProps {
  name?: string;
  control?: Control<FieldValues, any>;
  rules?: Omit<
    RegisterOptions<any, any>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  onChange?: (e: boolean) => void;
}

export const Check: FC<props> = ({control, rules, name = '', ...props}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {onChange, value = false}}) => (
        <TouchableOpacity
          {...props}
          style={[styles.body, props.style]}
          onPress={e => {
            onChange(!value);
            props.onPress && props.onPress(e);
            props.onChange && props.onChange(!value);
          }}>
          <IconCheck color={value ? undefined : 'transparent'} />
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  body: {
    margin: 5,
    padding: 2,
    paddingLeft: 1,
    borderRadius: 5,
    borderWidth: 3,
    backgroundColor: Colors.check,
    borderColor: Colors.checkBorder,
  },
});
