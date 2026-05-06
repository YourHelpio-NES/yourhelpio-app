import styled from 'styled-components';

export const BasicBlock = styled.div<{ width?: string }>`
  //d-flex flex-column gap-3
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: ${({ width }) => width ?? '100%'};
`;
