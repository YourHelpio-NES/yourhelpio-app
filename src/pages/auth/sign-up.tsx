import styled from 'styled-components';
import MainLayout from '../../components/widgets/layout';
import { COLORS } from '../../assets/styles/colors';
import { TitleSection } from '../../components/title-section';
import { TextBody } from '../../assets/styles/typography';
import { useState } from 'react';
import { Button } from '../../components/button';
import { BasicBlock } from '../../components/blocks';
import { RolesEnum } from '../../assets/shared/constants/roles';
import RadioButton from '../../components/radio';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const [selectedRole, setSelectedRole] = useState<RolesEnum | null>(null);
  const navigate = useNavigate();

  return (
    <MainLayout>
      <AuthForm>
        <TitleSection
          title="Створіть обліковий запис"
          subtitle="Навчальна платформа з адаптивними завданнями, що формуються відповідно до вашого навчального плану"
          captionText="Реєстрація доступна лише для закладів-партнерів."
        />
        <RadioBlock>
          <TextBody $medium $color={COLORS.text}>
            Я реєструюсь як:
          </TextBody>
          {Object.keys(RolesEnum).map((role) => (
            <RadioButton
              key={role}
              value={role}
              label={RolesEnum[role as keyof typeof RolesEnum]}
              selected={selectedRole}
              setSelected={setSelectedRole}
            />
          ))}
        </RadioBlock>
        <span className="w-100 d-flex align-items-center justify-content-center gap-1">
          <TextBody $label $color={COLORS.secondary}>
            Уже маєте акаунт?
          </TextBody>
          <Button
            type="text"
            width="auto"
            $bgColor={'transparent'}
            $txtColor={COLORS.accent}
            onClick={() => navigate('/sign-in')}
          >
            <TextBody $label $underline>
              Увійти
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

const RadioBlock = styled(BasicBlock)`
  width: 100%;
  border-radius: 24px;
  border: 1px solid ${COLORS.secondary};
  padding: 32px;
  div {
    cursor: pointer;
    outline: none;
    &:focus-visible {
    }
  }
`;
