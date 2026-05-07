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
import googleIcon from '../../assets/images/icons/google-icon.svg';
import { InputTypeEnum } from '../../assets/shared/constants/input';
import Input from '../../components/input';
import { Checkbox } from '../../components/checkbox';

export default function SignUpPage() {
  const [selectedRole, setSelectedRole] = useState<RolesEnum | null>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmRules, setConfirmRules] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <MainLayout>
      <AuthForm>
        <TitleSection
          title={
            selectedRole == RolesEnum.TEACHER
              ? 'Реєстрація викладача'
              : selectedRole == RolesEnum.STUDENT
                ? 'Реєстрація студента'
                : 'Створіть обліковий запис'
          }
          subtitle="Навчальна платформа з адаптивними завданнями, що формуються відповідно до вашого навчального плану"
          captionText="Реєстрація доступна лише для закладів-партнерів."
        />
        <RadioBlock>
          <TextBody $medium $color={COLORS.text}>
            Я реєструюсь як:
          </TextBody>
          {Object.values(RolesEnum).map((role) => (
            <RadioButton
              key={role}
              value={role}
              selected={selectedRole}
              setSelected={setSelectedRole}
            />
          ))}
        </RadioBlock>
        {selectedRole && (
          <AuthBodyBlock>
            {selectedRole === RolesEnum.TEACHER && (
              <TextBody>
                Після реєстрації ви отримаєте доступ до панелі викладача, де зможете завантажувати
                курси, створювати навчальні плани та контролювати прогрес студентів.
              </TextBody>
            )}
            <BasicBlock $gap="24px">
              <span className="d-flex gap-4">
                <Input
                  type={InputTypeEnum.TEXT}
                  label="Ім’я"
                  placeholder="Введіть ім’я"
                  value={firstName}
                  setValue={setFirstName}
                />
                <Input
                  type={InputTypeEnum.TEXT}
                  label="Прізвище"
                  placeholder="Введіть прізвище"
                  value={lastName}
                  setValue={setLastName}
                />
              </span>
              <Input
                type={InputTypeEnum.EMAIL}
                label="Електронна пошта"
                placeholder="Email@university.edu.ua"
                value={email}
                setValue={setEmail}
              />
              <span className="d-flex gap-4">
                <Input
                  type={InputTypeEnum.PASSWORD}
                  label="Пароль"
                  placeholder="Створіть пароль"
                  value={password}
                  setValue={setPassword}
                />
                <Input
                  type={InputTypeEnum.PASSWORD}
                  label="Підтвердження пароля"
                  placeholder="Повторіть пароль"
                  value={confirmPassword}
                  setValue={setConfirmPassword}
                />
              </span>
              <Checkbox checked={confirmRules} setChecked={setConfirmRules}>
                <TextBody
                  className="w-100 d-flex flex-wrap align-items-center justify-content-start gap-0"
                  $label
                  $color={COLORS.secondary}
                >
                  Реєструючись, ви погоджуєтесь з
                  <Button
                    type="text"
                    width="auto"
                    $bgColor={'transparent'}
                    $txtColor={COLORS.accent}
                    className="py-0"
                    // onClick={() => navigate('/')}
                  >
                    <TextBody $label $underline>
                      Умовами використання
                    </TextBody>
                  </Button>{' '}
                  та
                  <Button
                    type="text"
                    width="auto"
                    $bgColor={'transparent'}
                    $txtColor={COLORS.accent}
                    className="p-0"
                    // onClick={() => navigate('/')}
                  >
                    <TextBody $label $underline>
                      Політикою конфіденційності
                    </TextBody>
                  </Button>
                </TextBody>
              </Checkbox>
            </BasicBlock>
            <BasicBlock width="100%" className="align-items-center">
              <Button type="large" width="65%" $brColor={COLORS.accent} $brWidth={'2'}>
                <TextBody $label>Зареєструватися</TextBody>
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
            </BasicBlock>
          </AuthBodyBlock>
        )}
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

const AuthBodyBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
