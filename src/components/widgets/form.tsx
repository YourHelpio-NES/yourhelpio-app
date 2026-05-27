import styled from 'styled-components';
import { COLORS } from '../../assets/styles/colors';
import { BREAKPOINTS, media } from '../../assets/styles/breakpoints';

export const AuthForm = styled.div`
  width: 45%;
  border: 3px solid ${COLORS.secondary};
  border-radius: 24px;
  padding: 60px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  transition: width 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);

  ${media(BREAKPOINTS.lg)} {
    width: 55%;
  }

  ${media(BREAKPOINTS.ml)} {
    width: 65%;
    padding: 40px;
  }

  ${media(BREAKPOINTS.md)} {
    width: 75%;
    padding: 32px;
  }

  ${media(BREAKPOINTS.sm)} {
    width: 85%;
    padding: 24px;
    gap: 24px;
  }
`;

export const InputsLineBlock = styled.span`
  display: flex;
  width: 100%;
  gap: 24px;

  & > * {
    flex-grow: 1;
  }

  ${media(BREAKPOINTS.sm)} {
    flex-wrap: wrap;
    gap: 16px;
  }
`;
