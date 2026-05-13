import styled, { css } from 'styled-components';
import { COLORS } from './colors';

export const fontType = css`
  font-family: var(--main-font);
`;

type BaseTextProps = {
  $color?: string;
  $underline?: boolean;
  $lineThrough?: boolean;
  $italic?: boolean;
  $align?: 'left' | 'center' | 'right';
};

export const BaseText = styled.p<BaseTextProps>`
  margin: 0;
  ${fontType}

  color: ${({ $color }) => $color || COLORS.text};
  font-style: ${({ $italic }) => ($italic ? 'italic' : 'normal')};
  text-align: ${({ $align }) => $align || 'left'};

  ${({ $underline, $lineThrough, $color }) => [
    $underline &&
      css`
        text-decoration: underline 1px ${$color};
        /* text-decoration: line-through; */
        text-underline-offset: 3px;
      `,
    $lineThrough &&
      css`
        text-decoration: line-through 1px ${$color};
      `,
  ]}
`;

export const MainTitle = styled.h1`
  ${fontType}
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.2;
`;

export const SubTitle = styled.h2`
  ${fontType}
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.3;
`;

export const CardTitle = styled.h3`
  ${fontType}
  font-size: 1.375rem;
  font-weight: 600;
  line-height: 1.4;
`;

/**
 * Основний текст сторінки.
 *
 * @prop $medium - font-weight: 600
 * @prop $label  - font-weight: 700
 *
 * @example
 * <TextBody>Body текст</TextBody>
 * <TextBody $medium>Medium текст</TextBody>
 * <TextBody $label>Label текст</TextBody>
 */
export const TextBody = styled(BaseText)<{ $medium?: boolean; $label?: boolean }>`
  font-size: 1rem;
  font-weight: ${({ $medium, $label }) => ($label ? 700 : $medium ? 600 : 400)};
  line-height: 1.5;
`;

export const SmallText = styled(BaseText)<{ $medium?: boolean }>`
  font-size: 0.875rem;
  font-weight: ${({ $medium }) => ($medium ? 600 : 400)};
  line-height: 1.5;
`;
