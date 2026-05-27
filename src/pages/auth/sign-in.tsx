import MainLayout from '../../components/widgets/layout';
import { COLORS } from '../../assets/styles/colors';
import { TitleSection } from '../../components/title-section';
import { SmallText, TextBody } from '../../assets/styles/typography';
import Input from '../../components/input';
import { InputTypeEnum } from '../../assets/shared/constants/input';
import { Button } from '../../components/button';
import { BasicBlock } from '../../components/blocks';
import googleIcon from '../../assets/images/icons/google-icon.svg';
import { useNavigate } from 'react-router-dom';
import { useSignInForm } from '../../assets/shared/hooks/validators/useSignInForm';
import { Controller } from 'react-hook-form';
import { AuthForm } from '../../components/widgets/form';

export default function SignInPage() {
  const { form, onSubmit } = useSignInForm();
  const {
    control,
    formState: { errors },
  } = form;

  const navigate = useNavigate();

  return (
    <MainLayout className="">
      <AuthForm>
        <TitleSection
          title="Увійдіть до акаунту"
          subtitle="Продовжуйте навчання за персоналізованим планом, сформованим за допомогою штучного інтелекту"
        />
        <BasicBlock>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                type={InputTypeEnum.EMAIL}
                value={field.value}
                setValue={field.onChange}
                label="Електронна пошта"
                placeholder="Example@university.edu.ua"
                errorText={errors.email?.message}
                onBlur={field.onBlur}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                type={InputTypeEnum.PASSWORD}
                value={field.value}
                setValue={field.onChange}
                label="Пароль"
                placeholder="Введіть пароль"
                errorText={errors.password?.message}
                onBlur={field.onBlur}
              />
            )}
          />
          <Button
            type="text"
            width="auto"
            $bgColor={'transparent'}
            $txtColor={COLORS.accent}
            onClick={() => navigate('/forgot-password')}
            className={'ms-auto'}
          >
            <TextBody $label $color={COLORS.accent}>
              Забули пароль?
            </TextBody>
          </Button>
        </BasicBlock>
        <BasicBlock width="100%" className="align-items-center">
          <Button
            type="large"
            width="65%"
            $brColor={COLORS.accent}
            $brWidth={'2'}
            onClick={onSubmit}
          >
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
          <span className="w-100 d-flex flex-wrap align-items-center justify-content-center gap-1">
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
