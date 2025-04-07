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
  label: string;
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
  const [isFocused, setIsFocused] = useState(
    (control?._getWatch(name) ?? '') !== '',
  );
  const [isPasswordVisible, setIsPasswordVisible] = useState(password);

  const hasError = name in errors;

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
              !value && setIsFocused(false);
            }}
            value={value}
            onChangeText={onChange}
            secureTextEntry={isPasswordVisible}
          />
        )}
      />
      <LabelText isFocused={isFocused}>{label}</LabelText>
      {password && (
        <Icon
          isFocused={isFocused}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        />
      )}
      <ErrorMessage>{errors[name] && errors[name].message}</ErrorMessage>
    </Container>
  );
};

const Container = styled.View`
  position: relative;
  display: inherit;
  margin-vertical: 15px;
`;
const TextInput = styled.TextInput<{
  isFocused: boolean;
  left: boolean;
  hasError: boolean;
}>`
  color: ${({theme}) => theme.primary};
  flex-direction: row;
  border: solid 1.5px
    ${({theme, isFocused, hasError}) =>
      isFocused
        ? theme.textPrimary
        : hasError
        ? theme.error
        : theme.textSecondary};
  border-radius: 10px;
  font-size: 1rem;
  margin-top: 15px;
  padding-left: ${({left}) => (left ? '40' : '0')}px;
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
  color: ${({theme, isFocused}) =>
    isFocused ? theme.textPrimary : theme.textSecondary};
`;
const ErrorMessage = styled.Text`
  position: absolute;
  color: ${({theme}) => theme.error};
  left: 20px;
  bottom: -20px;
`;
const LeftComponent = styled.View<{isFocused: boolean}>`
  position: absolute;
  left: 20px;
  bottom: 10px;
  aling-self: center;
  color: ${({theme, isFocused}) =>
    isFocused ? theme.textPrimary : theme.textSecondary};
`;
const Icon = styled(IconEye)<{isFocused: boolean}>`
  position: absolute;
  right: 20px;
  bottom: 10px;
  aling-self: center;
  color: ${({theme, isFocused}) =>
    isFocused ? theme.textPrimary : theme.textSecondary};
`;
