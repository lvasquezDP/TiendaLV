import {TouchableOpacityProps} from 'react-native';
import React, {FC} from 'react';
import styled from 'styled-components/native';

interface props extends TouchableOpacityProps {
  // secondary?: boolean;
}

export const Button: FC<props> = props => <TouchableOpacity {...props} />;

const TouchableOpacity = styled.TouchableOpacity`
  margin: 5px;
  backgroundColor: ${({theme}) => theme.primary};
  paddingVertical: 10px;
  paddingHorizontal: 20px;
  borderRadius: 10px;
  alignItems: center;
`;