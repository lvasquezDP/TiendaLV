import {TextProps} from 'react-native';
import React, {FC} from 'react';
import styled from 'styled-components/native';

interface PropsText extends TextProps {}

export const Text: FC<PropsText> = props => <Texto {...props} />;

const Texto = styled.Text`
  color: ${({theme}) => theme.textPrimary};
`;
