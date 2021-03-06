import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }
`;

export const Bg = styled.div`
  ${({ theme }) => theme.flex(null, 'center', null)};
  height: 100vh;
`;
