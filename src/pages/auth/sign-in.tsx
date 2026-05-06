import styled from 'styled-components';
import MainLayout from '../../components/widgets/layout';
import { COLORS } from '../../assets/styles/colors';
import { TitleSection } from '../../components/title-section';
import { SmallText, TextBody } from '../../assets/styles/typography';
import Input from '../../components/input';
import { useState } from 'react';
import { InputTypeEnum } from '../../assets/shared/constants/input';
import { Button } from '../../components/button';
import { BasicBlock } from '../../components/blocks';
import googleIcon from '../../assets/images/icons/google-icon.svg';
import { useNavigate } from 'react-router-dom';

export default function SignInPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  return (
    <MainLayout className="">
      <AuthForm>
        <TitleSection
          title="Увійдіть до акаунту"
          subtitle="Продовжуйте навчання за персоналізованим планом, сформованим за допомогою штучного інтелекту"
        />
        <BasicBlock className="align-items-end">
          <Input
            type={InputTypeEnum.EMAIL}
            value={email}
            setValue={setEmail}
            label="Електронна пошта"
            placeholder="Example@university.edu.ua"
            // errorText="text of error"
          />
          <Input
            type={InputTypeEnum.PASSWORD}
            value={password}
            setValue={setPassword}
            label="Пароль"
            placeholder="Введіть пароль"
          />
          <Button type="text" width="auto" $bgColor={'transparent'} $txtColor={COLORS.accent}>
            <TextBody $label $color={COLORS.accent}>
              Забули пароль?
            </TextBody>
          </Button>
        </BasicBlock>
        <BasicBlock width="100%" className="align-items-center">
          <Button type="large" width="65%" $brColor={COLORS.accent} $brWidth={'2'}>
            <TextBody $label>Увійти</TextBody>
          </Button>
          <Button
            type="large"
            width="65%"
            $bgColor={'transparent'}
            $txtColor={COLORS.text}
            $brColor={COLORS.secondary}
            $brWidth={'2'}
          >
            <img src={googleIcon} alt="google-icon" />
            <TextBody $label $color={COLORS.background}>
              Продовжити з Google
            </TextBody>
          </Button>
          <span className="w-100 d-flex align-items-center justify-content-center gap-1">
            <TextBody $label $color={COLORS.secondary}>
              Ще не маєте облікового запису?
            </TextBody>
            <Button
              type="text"
              width="auto"
              $bgColor={'transparent'}
              $txtColor={COLORS.primary}
              onClick={() => navigate('/sign-up')}
            >
              <TextBody $label $underline>
                Зареєструватися
              </TextBody>
            </Button>
          </span>
        </BasicBlock>
      </AuthForm>
      <SmallText $color={COLORS.primary}>
        Доступ до платформи мають лише студенти та викладачі закладів-партнерів
      </SmallText>
    </MainLayout>
  );
}

const AuthForm = styled.div`
  width: 45%;
  border: 3px solid ${COLORS.secondary};
  border-radius: 24px;
  padding: 60px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;
