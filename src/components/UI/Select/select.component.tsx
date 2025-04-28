import React, {FC} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {PickerSelectProps} from 'react-native-picker-select';
import RNPickerSelect from 'react-native-picker-select';
import styled from 'styled-components/native';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import {get} from 'lodash';

interface PropsSelect extends PickerSelectProps {
  label?: string;
  styleContainer?: StyleProp<ViewStyle>;
  name?: string;
  control?: Control<FieldValues, any>;
  errors?: Record<string, any>;
  rules?: Omit<
    RegisterOptions<any, any>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}

export const Select: FC<PropsSelect> = ({
  label,
  control,
  name = '',
  errors = {},
  rules,
  styleContainer,
  ...p
}) => {
  const error = get(errors, name);
  const hasError = !!error;
  return (
    <Container style={styleContainer}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field: {onChange, value}}) => (
          <SelectInput
            {...p}
            hasError={hasError}
            value={value}
            onValueChange={onChange}
          />
        )}
      />

      {label && <LabelText isFocused={false}>{label}{rules?.required&&' * '}</LabelText>}
      <ErrorMessage>{hasError && error.message}</ErrorMessage>
    </Container>
  );
};

const Container = styled.View`
  position: relative;
  display: inherit;
  margin-vertical: 15px;
`;
const SelectInput = styled(RNPickerSelect).attrs(({}) => ({}))<{
  hasError: boolean;
}>`
  border: solid 1.5px
    ${({theme, hasError}) => (hasError ? theme.error : theme.textPrimary)};
  border-radius: 10px;
  font-size: 10px;
  margin-top: 15px;
  padding-left: 10px;
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