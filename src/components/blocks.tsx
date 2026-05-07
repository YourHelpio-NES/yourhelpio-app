import styled from 'styled-components';

export const BasicBlock = styled.div<{ width?: string; $gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap ?? '16px'};
  width: ${({ width }) => width ?? '100%'};
`;
