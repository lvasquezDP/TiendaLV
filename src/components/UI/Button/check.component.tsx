import {TouchableOpacityProps} from 'react-native';
import React, {FC} from 'react';
import {IconCheck} from '../../../asset/icons/icons';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import styled from 'styled-components/native';

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

const TouchableOpacity = styled.TouchableOpacity`
  margin: 5px;
  padding: 2px;
  padding-left: 1px;
  border-radius: 8px;
  border-width: 2px;
  background-color: ${({theme}) => theme.background};
  border-color: ${({theme}) => theme.primary};
`;
