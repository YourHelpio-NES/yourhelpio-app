import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { COLORS } from '../assets/styles/colors';
import { fontType } from '../assets/styles/typography';

export const MarkdownRenderer = ({ content }: { content: string }) => (
  <MarkdownWrapper>
    <ReactMarkdown>{content}</ReactMarkdown>
  </MarkdownWrapper>
);

const MarkdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  h1,
  h2,
  h3 {
    color: ${COLORS.text};
    font-weight: 700;
    ${fontType};
  }

  h1 {
    font-size: 17px;
  }
  h2 {
    font-size: 17px;
  }
  h3 {
    font-size: 15px;
    font-style: italic;
  }

  p {
    color: ${COLORS.text};
    ${fontType};
    font-size: 15px;
    line-height: 1.5;
  }

  ul,
  ol {
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  li {
    color: ${COLORS.text};
    line-height: 1.5;
  }

  strong {
    font-weight: 600;
    color: ${COLORS.text};
  }

  em {
    font-style: italic;
  }
`;
