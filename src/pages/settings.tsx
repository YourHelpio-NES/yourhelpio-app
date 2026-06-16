import { TextBody } from '../assets/styles/typography';
import { SettingItem } from '../components/settings-item';
import AppLayout from '../components/widgets/app/layout';

import darkPhoto from '../assets/images/dark-theme.png';
import lightPhoto from '../assets/images/light-theme.png';
import { useState } from 'react';
import { LangEnum, ThemeEnum } from '../assets/shared/utils/settings';
import { COLORS } from '../assets/styles/colors';
import { Button } from '../components/button';
import { BasicBlock } from '../components/blocks';
import { Switch } from '../components/switch';

export default function SettingsPage() {
  const [theme, setTheme] = useState<ThemeEnum>(ThemeEnum.LIGHT);
  const [lang, setLang] = useState<LangEnum>(LangEnum.UA);
  const [getEmail, setGetEmail] = useState<boolean>(false);

  return (
    <AppLayout>
      <TextBody $medium>Керуйте персональними параметрами та поведінкою системи</TextBody>
      <BasicBlock width="auto">
        <SettingItem
          title="Тема оформлення"
          desc="Налаштуйте зовнішній вигляд інтерфейсу"
          icon="theme"
        >
          {Object.entries(ThemeEnum).map((item, key) => {
            const isActiveTheme = theme === item[1];
            return (
              <span
                key={key}
                data-type="theme-type"
                onClick={() => setTheme(item[1])}
                style={{
                  backgroundImage: `url(${item[1] === ThemeEnum.DARK ? darkPhoto : lightPhoto})`,
                  borderColor: isActiveTheme ? COLORS.primary : COLORS.secondary,
                }}
              >
                <span
                  data-type="theme-type-active"
                  style={{ opacity: isActiveTheme ? 1 : 0 }}
                ></span>
              </span>
            );
          })}
        </SettingItem>

        <SettingItem
          title="Мова інтерфейсу"
          desc="Оберіть основну мову для роботи із системою"
          icon="lang"
        >
          {Object.entries(LangEnum).map((item, key) => {
            const isActiveLang = lang === item[1];
            return (
              <Button
                key={key}
                $bgColor={isActiveLang ? COLORS.primary : 'transparent'}
                $txtColor={isActiveLang ? COLORS.lighterBg : COLORS.primary}
                $brColor={COLORS.primary}
                width="100%"
                onClick={() => setLang(item[1])}
              >
                <TextBody $medium>{item[1]}</TextBody>
              </Button>
            );
          })}
        </SettingItem>

        <SettingItem
          title="Email-сповіщення"
          desc="Отримувати повідомлення на електронну пошту"
          icon="email"
        >
          <Switch checked={getEmail} onChange={setGetEmail} />
        </SettingItem>
      </BasicBlock>
    </AppLayout>
  );
}
