import React, {FC, forwardRef, LegacyRef, useState} from 'react';
import {
  StyleProp,
  ViewStyle,
  TextInputProps,
  TextInput as Textin,
} from 'react-native';
import {IconEye} from '../../../asset/icons/icons';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import styled from 'styled-components/native';
import {get} from 'lodash';

interface PropsInput extends TextInputProps {
  ref?: LegacyRef<Textin>;
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

export const Input: FC<PropsInput> = forwardRef(
  (
    {
      label,
      password = false,
      styleContainer,
      errors = {},
      name = '',
      leftComponent,
      control,
      rules,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(password);

    const error = get(errors, name);
    const hasError = !!error;

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
              ref={ref}
              {...props}
              left={!!leftComponent}
              isFocused={isFocused}
              hasError={hasError}
              onFocus={e => {
                props.onFocus && props.onFocus(e);
                setIsFocused(true);
              }}
              onBlur={e => {
                onBlur();
                props.onBlur && props.onBlur(e);
                setIsFocused(false);
              }}
              value={String(value ?? '')}
              onChangeText={onChange}
              secureTextEntry={isPasswordVisible}
            />
          )}
        />
        {label && <LabelText isFocused={isFocused}>{label}{rules?.required&&' * '}</LabelText>}
        {password && (
          <Icon
            isFocused={isFocused}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        )}
        <ErrorMessage>{hasError && error.message}</ErrorMessage>
      </Container>
    );
  },
);

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
      isFocused ? theme.focus : hasError ? theme.error : theme.border};
  border-radius: 10px;
  ${({editable, theme}) =>
    editable !== false ? '' : `backgroundColor:${theme.shadow};`}
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
