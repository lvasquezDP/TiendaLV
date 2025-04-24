import React, {FC, useState} from 'react';
import {StyleProp, ViewStyle, TextInputProps} from 'react-native';
import {IconEye} from '../../../asset/icons/icons';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import styled from 'styled-components/native';

interface PropsInput extends TextInputProps {
  label?: string;
  password?: boolean;
  style?: StyleProp<ViewStyle>;
  styleContainer?: StyleProp<ViewStyle>;
  errors?: Record<string, any>;
  name?: string;
  leftComponent?: React.ReactElement;
  control?: Control<FieldValues, any>;
  rules?: Omit<
    RegisterOptions<any, any>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}

export const Input: FC<PropsInput> = ({
  label,
  password = false,
  styleContainer,
  errors = {},
  name = '',
  leftComponent,
  control,
  rules,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(password);

  let error = errors;
  Object.keys(errors).length > 0 &&
    name.split('.').forEach(x => (error = error[x] ?? {}));
  const hasError = Object.keys(errors).length > 0;
  // const error = name
  // .split('.')
  // .reduce((acc, part) => (acc && acc[part] ? acc[part] : undefined), errors);
  // const hasError = !!error;
  // const hasError = name in errors;

  return (
    <Container style={styleContainer}>
      {leftComponent && (
        <LeftComponent isFocused={isFocused}>{leftComponent}</LeftComponent>
      )}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            {...props}
            left={!!leftComponent}
            isFocused={isFocused}
            hasError={hasError}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              onBlur();
              setIsFocused(false);
            }}
            value={String(value ?? '')}
            onChangeText={onChange}
            secureTextEntry={isPasswordVisible}
          />
        )}
      />
      {label && <LabelText isFocused={isFocused}>{label}</LabelText>}
      {password && (
        <Icon
          isFocused={isFocused}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        />
      )}
      <ErrorMessage>{hasError && error.message}</ErrorMessage>
    </Container>
  );
};

const Container = styled.View`
  position: relative;
  display: inherit;
  margin-vertical: 15px;
`;
const TextInput = styled.TextInput.attrs(({theme}) => ({
  placeholderTextColor: theme.textSecondary,
}))<{
  isFocused: boolean;
  left: boolean;
  hasError: boolean;
}>`
  border: solid 1.5px
    ${({theme, isFocused, hasError}) =>
      isFocused ? theme.focus : hasError ? theme.error : theme.textPrimary};
  border-radius: 10px;
  font-size: 10px;
  margin-top: 15px;
  padding-left: ${({left}) => (left ? '40' : '10')}px;
  padding-vertical: 13px;
  margin-horizontal: 10px;
  color: ${({theme}) => theme.textPrimary};
`;
const LabelText = styled.Text<{isFocused: boolean}>`
  position: absolute;
  left: 20px;
  top: 7px;
  transform: ${({isFocused}) => (isFocused ? 'scale(1)' : 'scale(0.8)')};
  background-color: ${({theme}) => theme.background};
  color: ${({theme}) => theme.textPrimary};
`;
const ErrorMessage = styled.Text`
  position: absolute;
  color: ${({theme}) => theme.error};
  align-self: center;
  bottom: -20px;
`;
const LeftComponent = styled.View<{isFocused: boolean}>`
  position: absolute;
  left: 20px;
  bottom: 10px;
  aling-self: center;
  color: ${({theme, isFocused}) =>
    isFocused ? theme.focus : theme.textPrimary};
`;
const Icon = styled(IconEye)<{isFocused: boolean}>`
  position: absolute;
  right: 20px;
  bottom: 10px;
  aling-self: center;
  color: ${({theme}) => theme.textPrimary};
`;
