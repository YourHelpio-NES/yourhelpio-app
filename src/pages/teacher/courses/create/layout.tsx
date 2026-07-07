import { Outlet, useNavigate } from 'react-router-dom';
import { STEPS_CREATE_COURSE } from '../../../../assets/shared/create-steps/steps-route';
import { StepStatusEnum, type StepCreating } from '../../../../assets/shared/create-steps/type';
import { useEffect, useState } from 'react';
import { Stepper } from '../../../../components/stepper';
import AppLayout from '../../../../components/widgets/app/layout';
import { CardTitle, SubTitle, TextBody } from '../../../../assets/styles/typography';
import { BasicBlock } from '../../../../components/blocks';
import { COLORS } from '../../../../assets/styles/colors';
import { Button } from '../../../../components/button';
import { useCourseCreate } from '../../../../assets/shared/hooks/useCourseCreate';
import styled from 'styled-components';
import { BREAKPOINTS, media } from '../../../../assets/styles/breakpoints';

export default function CourseCreateLayout() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const navigate = useNavigate();
  const { isStepValid, resetForm } = useCourseCreate();

  const currentStepItem = STEPS_CREATE_COURSE[currentStep];
  const isLast = currentStep === STEPS_CREATE_COURSE.length - 1;
  const canProceed = isStepValid(currentStep);

  const steps = STEPS_CREATE_COURSE.map((s, i) => ({
    ...s,
    status:
      i < currentStep
        ? StepStatusEnum.DONE
        : i === currentStep
          ? StepStatusEnum.ACTIVE
          : StepStatusEnum.PENDING,
  })) satisfies StepCreating[];

  useEffect(() => {
    navigate(`/teacher/courses/create/${currentStepItem.path}`);
  }, [currentStepItem, navigate]);

  const handleNext = () => {
    if (!canProceed) return;
    if (isLast) {
      navigate(`/teacher/courses/main`);
      resetForm();
      return;
    }
    setCurrentStep((s) => s + 1);
  };

  const handleBack = () => setCurrentStep((s) => s - 1);

  return (
    <AppLayout>
      <span className="d-flex flex-column gap-2 pb-2">
        <SubTitle>Створення курсу</SubTitle>
        <CardTitle className="pt-2" style={{ color: COLORS.accent }}>
          {currentStepItem.title}
        </CardTitle>
        <TextBody>{currentStepItem.subTitle}</TextBody>
      </span>
      <StepperBlock $direction="row" $gap={44}>
        <aside style={{ width: 300, flexShrink: 0 }}>
          <Stepper steps={steps} />
        </aside>
        <main className="d-flex flex-column align-items-end gap-3 flex-grow-1">
          <Outlet />
          <span
            className={`d-flex ${currentStep === 0 ? 'justify-content-end' : 'justify-content-between'} w-100`}
          >
            {currentStep !== 0 && (
              <Button
                $bgColor="transparent"
                $txtColor={COLORS.accent}
                $brWidth="2"
                onClick={handleBack}
              >
                <TextBody $medium>Назад</TextBody>
              </Button>
            )}

            <Button
              $brWidth="2"
              onClick={handleNext}
              disabled={!canProceed}
              style={{
                opacity: canProceed ? 1 : 0.45,
                cursor: canProceed ? 'pointer' : 'not-allowed',
              }}
              title={!canProceed ? "Заповніть обов'язкові поля" : undefined}
            >
              <TextBody $medium>{isLast ? 'Створити курс' : 'Продовжити'}</TextBody>
            </Button>
          </span>
        </main>
      </StepperBlock>
    </AppLayout>
  );
}

const StepperBlock = styled(BasicBlock)`
  ${media(BREAKPOINTS.md)} {
    gap: 32px;
  }
  ${media(812)} {
    flex-direction: column;
    gap: 16px;
  }
`;
