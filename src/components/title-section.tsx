import styled from 'styled-components';
import { MainTitle, SubTitle, TextBody } from '../assets/styles/typography';
import { COLORS } from '../assets/styles/colors';
import { Link } from 'react-router-dom';

export const TitleSection = ({
  title,
  subtitle,
  captionText,
  captionColor = COLORS.primary,
}: {
  title: string;
  subtitle?: string;
  captionText?: string;
  captionColor?: string;
}) => {
  return (
    <SectionStyle>
      <MainTitle>{title}</MainTitle>
      {subtitle && <TextBody $color={COLORS.text}>{subtitle}</TextBody>}
      {captionText && <TextBody $color={captionColor}>{captionText}</TextBody>}
    </SectionStyle>
  );
};

const SectionStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  ${MainTitle} {
    color: ${COLORS.text};
  }
`;

export const LinkTitle = ({
  firstTitle,
  secondTitle,
  linkTo,
}: {
  firstTitle: string;
  secondTitle: string;
  linkTo?: string;
}) => {
  return (
    <LinkTitleStyle>
      <SubTitle>{firstTitle}</SubTitle>
      <Link to={linkTo ?? ''}>
        <SubTitle>({secondTitle})</SubTitle>
      </Link>
    </LinkTitleStyle>
  );
};

export const LinkTitleStyle = styled.span`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  & > * {
    white-space: break-spaces;
  }
  ${SubTitle} {
    color: ${COLORS.text};
  }

  a {
    color: inherit;
    text-decoration: none;
    border-bottom: 3px solid transparent;

    transition: border-color 0.3s ease;
    &:hover {
      border-bottom-color: ${COLORS.primary};
    }
  }
`;
