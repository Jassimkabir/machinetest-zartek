import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const StyledNavLink = styled(NavLink)`
  &.active {
    border-bottom-width: 2px;
    border-color: rgb(220 38 38);
    color: rgb(220 38 38);
  }
`;
