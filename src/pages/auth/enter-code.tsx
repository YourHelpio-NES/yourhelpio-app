import styled from 'styled-components';
import MainLayout from '../../components/widgets/layout';
import { COLORS } from '../../assets/styles/colors';
import { TitleSection } from '../../components/title-section';
import { TextBody } from '../../assets/styles/typography';
import Input from '../../components/input';
import { useState } from 'react';
import { InputTypeEnum } from '../../assets/shared/constants/input';
import { Button } from '../../components/button';
import { BasicBlock } from '../../components/blocks';
import { useNavigate } from 'react-router-dom';
import { ArrowIcon } from '../../assets/images/icons/arrow-icon';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>('');

  const navigate = useNavigate();

  return (
    <MainLayout className="">
      <AuthForm>
        <TitleSection
          title="Забули пароль?"
          subtitle="Вкажіть свою електронну пошту для відновлення пароля."
        />
        <BasicBlock>
          <Input
            type={InputTypeEnum.EMAIL}
            value={email}
            setValue={setEmail}
            label="Електронна пошта"
            placeholder="Example@university.edu.ua"
          />
        </BasicBlock>

        <BasicBlock width="100%" className="align-items-center">
          <Button $type="large" width="65%" $brColor={COLORS.accent} $brWidth={'2'}>
            <TextBody $label>Надіслати</TextBody>
          </Button>
        </BasicBlock>

        <span className="w-100 d-flex align-items-center justify-content-between">
          <Button
            $type="text"
            width="auto"
            $bgColor={'transparent'}
            $txtColor={COLORS.text}
            onClick={() => navigate(-1)}
          >
            <ArrowIcon />
            <TextBody $label>Назад</TextBody>
          </Button>
          <Button $type="text" width="auto" $bgColor={'transparent'} $txtColor={COLORS.accent}>
            <TextBody $label $color={COLORS.accent}>
              Надіслати ще раз
            </TextBody>
          </Button>
        </span>
      </AuthForm>
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
