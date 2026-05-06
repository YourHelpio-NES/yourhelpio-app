import styled from 'styled-components';
import { MainTitle, TextBody } from '../assets/styles/typography';
import { COLORS } from '../assets/styles/colors';

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
