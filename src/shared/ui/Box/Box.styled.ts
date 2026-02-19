import styled from 'styled-components';

export const Box = styled.div<{$m?: string; $p?: string}>`
  margin: ${({$m}) => $m || '0'};
  padding: ${({$p}) => $p || '0'};
`;
