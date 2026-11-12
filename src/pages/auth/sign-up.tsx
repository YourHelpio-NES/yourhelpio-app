import styled, { css } from 'styled-components';
import MainLayout from '../../components/widgets/layout';
import { COLORS } from '../../assets/styles/colors';
import { TitleSection } from '../../components/title-section';
import { TextBody } from '../../assets/styles/typography';
import { useEffect } from 'react';
import { Button } from '../../components/button';
import { BasicBlock } from '../../components/blocks';
import { RolesEnum } from '../../assets/shared/constants/roles';
import RadioButton from '../../components/radio';
import { useLocation, useNavigate } from 'react-router-dom';
import googleIcon from '../../assets/images/icons/google-icon.svg';
import { InputTypeEnum } from '../../assets/shared/constants/input';
import Input from '../../components/input';
import { Checkbox } from '../../components/checkbox';
import { useSignUpForm } from '../../assets/shared/hooks/validators/useSignUpForm';
import { Controller } from 'react-hook-form';
import showToast from '../../components/toast/show';
import { ToastTypeEnum } from '../../assets/shared/constants/custom-toast';
import { AuthForm, InputsLineBlock } from '../../components/widgets/form';
import { signUpSchema } from '../../assets/shared/schemas/auth.schema';

export default function SignUpPage() {
  const { form, onSubmit } = useSignUpForm();
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;
  const navigate = useNavigate();
  const location = useLocation();
  const courseInfo = new URLSearchParams(location.search).get('course');

  const selectedRole = watch('role');

  useEffect(() => {
    if (courseInfo) {
      setValue('role', RolesEnum.STUDENT);
    }
  }, [courseInfo, setValue]);

  return (
    <MainLayout>
      <AuthForm>
        <TitleSection
          title={
            courseInfo
              ? `Реєстрація на курс «${courseInfo}»`
              : selectedRole == RolesEnum.TEACHER
                ? 'Реєстрація викладача'
                : selectedRole == RolesEnum.STUDENT
                  ? 'Реєстрація студента'
                  : 'Створіть обліковий запис'
          }
          subtitle="Навчальна платформа з адаптивними завданнями, що формуються відповідно до вашого навчального плану"
          captionText="Реєстрація доступна лише для закладів-партнерів."
        />
        <RadioBlock $disable={!!courseInfo?.length}>
          <TextBody $medium $color={COLORS.text}>
            Я реєструюсь як:
          </TextBody>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <>
                {Object.values(RolesEnum).map((role) => (
                  <RadioButton
                    key={role}
                    value={role}
                    selected={field.value}
                    setSelected={() => field.onChange(role)}
                  />
                ))}
              </>
            )}
          />
        </RadioBlock>
        {selectedRole && (
          <AuthBodyBlock>
            {selectedRole === RolesEnum.TEACHER && (
              <TextBody>
                Після реєстрації ви отримаєте доступ до панелі викладача, де зможете завантажувати
                курси, створювати навчальні плани та контролювати прогрес студентів.
              </TextBody>
            )}
            <BasicBlock $gap={24}>
              <InputsLineBlock>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type={InputTypeEnum.TEXT}
                      label="Ім'я"
                      placeholder="Введіть ім'я"
                      value={field.value}
                      setValue={field.onChange}
                      errorText={errors.firstName?.message}
                      onBlur={field.onBlur}
                    />
                  )}
                />
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type={InputTypeEnum.TEXT}
                      label="Прізвище"
                      placeholder="Введіть прізвище"
                      value={field.value}
                      setValue={field.onChange}
                      errorText={errors.lastName?.message}
                      onBlur={field.onBlur}
                    />
                  )}
                />
              </InputsLineBlock>

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    type={InputTypeEnum.EMAIL}
                    label="Електронна пошта"
                    placeholder="Email@university.edu.ua"
                    value={field.value}
                    setValue={field.onChange}
                    errorText={errors.email?.message}
                    onBlur={field.onBlur}
                  />
                )}
              />

              <InputsLineBlock>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type={InputTypeEnum.PASSWORD}
                      label="Пароль"
                      placeholder="Створіть пароль"
                      value={field.value}
                      setValue={field.onChange}
                      errorText={errors.password?.message}
                      onBlur={field.onBlur}
                    />
                  )}
                />
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type={InputTypeEnum.PASSWORD}
                      label="Підтвердження пароля"
                      placeholder="Повторіть пароль"
                      value={field.value}
                      setValue={field.onChange}
                      errorText={errors.confirmPassword?.message}
                      onBlur={field.onBlur}
                    />
                  )}
                />
              </InputsLineBlock>

              <Controller
                name="confirmRules"
                control={control}
                render={({ field }) => (
                  <Checkbox checked={field.value} setChecked={field.onChange}>
                    <TextBody
                      className="w-100 d-flex flex-wrap justify-content-start column-gap-1"
                      $label
                      $color={COLORS.secondary}
                    >
                      Реєструючись, ви погоджуєтесь з
                      <Button
                        $type="text"
                        width="auto"
                        $bgColor={'transparent'}
                        $txtColor={COLORS.accent}
                        className="p-0"
                        // onClick={() => navigate('/')}
                      >
                        <TextBody $label $underline>
                          Умовами використання
                        </TextBody>
                      </Button>{' '}
                      та
                      <Button
                        $type="text"
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
                )}
              />
            </BasicBlock>
            <BasicBlock width="100%" className="align-items-center">
              <Button
                // disabled={!confirmRules}
                $type="large"
                width="65%"
                $brColor={COLORS.accent}
                $brWidth={'2'}
                onClick={(e) => {
                  console.log(errors);
                  console.log(selectedRole);

                  console.log('role:', selectedRole);
                  console.log('role type:', typeof selectedRole);
                  console.log('role JSON:', JSON.stringify(selectedRole));
                  console.log(signUpSchema.shape.role);

                  if (errors.confirmRules?.message?.length) {
                    showToast(
                      ToastTypeEnum.WARNING,
                      'Щоб продовжити реєстрацію',
                      errors.confirmRules.message
                    );
                    return;
                  }

                  void onSubmit(e);
                }}
              >
                <TextBody $label>Зареєструватися</TextBody>
              </Button>
              <Button
                $type="large"
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
            $type="text"
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

const AuthBodyBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const RadioBlock = styled(BasicBlock)<{ $disable?: boolean }>`
  width: 100%;
  border-radius: 24px;
  border: 1px solid ${COLORS.secondary};
  padding: 32px;

  ${({ $disable }) =>
    $disable &&
    css`
      opacity: 0.6;
      pointer-events: none;
    `}

  div {
    cursor: pointer;
    outline: none;
    &:focus-visible {
    }
  }
`;
