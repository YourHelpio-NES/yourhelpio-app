import type React from 'react';
import styled from 'styled-components';
import { BasicBlock, basicShadow } from './blocks';
import { LangIcon } from '../assets/images/icons/lang-icon';
import { ThemeIcon } from '../assets/images/icons/theme-icon';
import { MailBoxIcon } from '../assets/images/icons/mail-box-icon';
import type { JSX } from 'react';
import type { ImageType } from '../assets/shared/constants/image';
import { COLORS } from '../assets/styles/colors';
import { TextBody } from '../assets/styles/typography';
import { Button } from './button';
import { media } from '../assets/styles/breakpoints';

interface SettingItemProps {
  title: string;
  desc: string;
  icon: string;
}

const icons: Record<string, ({ color, size }: ImageType) => JSX.Element> = {
  lang: LangIcon,
  theme: ThemeIcon,
  email: MailBoxIcon,
};

export const SettingItem = ({
  title,
  desc,
  icon,
  children,
}: React.PropsWithChildren<SettingItemProps>) => {
  return (
    <BaseBlock
      width="auto"
      $direction="row"
      className={`${icon === 'lang' ? 'align-items-center' : ''} ${icon === 'email' ? 'flex-nowrap' : ''}`}
      $gap={32}
    >
      <div className={`d-flex gap-3 ${icon === 'email' ? 'flex-grow-1 w-auto ' : ''}`}>
        {icons[icon]({ color: COLORS.text })}
        <span>
          <TextBody $label>{title}</TextBody>
          <TextBody>{desc}</TextBody>
        </span>
      </div>
      <BasicBlock
        className={`align-items-start ${icon === 'email' ? 'w-auto ' : ''}`}
        $direction="row"
      >
        {children}
      </BasicBlock>
    </BaseBlock>
  );
};

const BaseBlock = styled(BasicBlock)`
  padding: 24px;
  border-radius: 24px;
  ${basicShadow};
  svg {
    flex-shrink: 0;
  }
  background-color: ${COLORS.lighterBg};
  ${BasicBlock} {
    background-color: ${COLORS.lighterBg};
    display: flex;

    ${Button} {
      flex-grow: 1;
    }
  }
  span[data-type='theme-type'] {
    display: flex;
    align-items: flex-end;
    width: 250px;
    height: 150px;
    border: 3px solid ${COLORS.secondary};
    border-radius: 24px;
    background-repeat: no-repeat;
    background-size: 110%;
    transition: border 0.15s ease-in;
  }

  span[data-type='theme-type-active'] {
    display: block;
    width: 20px;
    height: 20px;
    border: 4px solid ${COLORS.primary};
    border-radius: 50%;
    margin: 8px;
    transition:
      opacity 0.15s ease-in,
      transform 0.15s ease-in;
  }

  ${media(895)} {
    flex-wrap: wrap;
    span[data-type='theme-type'] {
      width: 300px;
      height: 170px;
    }
  }
  ${media(680)} {
    span[data-type='theme-type'] {
      height: 140px;
      width: 50%;
    }
  }
`;
