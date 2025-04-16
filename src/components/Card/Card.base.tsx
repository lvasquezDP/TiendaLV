import {
  ViewProps,
} from 'react-native';
import React, {FC} from 'react';
import styled from 'styled-components/native';

interface PropsText extends ViewProps {
}
export const CardBase: FC<PropsText> = p => {
  return (
    <Card {...p}>
      {p.children}
    </Card>
  );
};
const Card = styled.View`
  overflow: hidden;
  border-radius: 10px;
  font-size: 10px;
  padding: 10px;
  background: ${({theme}) => theme.secondary};
  color: ${({theme}) => theme.primary};
`;
