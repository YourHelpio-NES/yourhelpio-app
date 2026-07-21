import styled from 'styled-components';
import { COLORS } from '../../../assets/styles/colors';
import { CardTitle, TextBody } from '../../../assets/styles/typography';
import { QuestionCardBlock } from '../../../components/question-card';
import { LinkTitle } from '../../../components/title-section';
import { LabelValue, LabelValueStyle } from '../../../components/topic-details-content';
import AppLayout from '../../../components/widgets/app/layout';
import { BodyTable } from '../study-plan';
import { getColorByPercentage } from '../../../assets/shared/utils/color';
import { DoneIcon } from '../../../assets/images/icons/done-icon';
import { BasicBlock, basicShadow } from '../../../components/blocks';
import { CancelIcon } from '../../../assets/images/icons/cancel-icon';
import ErrorItem from '../../../components/error-result-item';
import { BREAKPOINTS, media } from '../../../assets/styles/breakpoints';
import { buildSessionStats } from '../../../assets/shared/utils/mapTaskToQuestion';
import type {
  QuestionAnswer,
  StudentProgressResponse,
} from '../../../assets/shared/constants/questions';
import { Navigate, useLocation } from 'react-router-dom';
import { useLearningStages } from '../../../assets/shared/hooks/useLearningStages';
import { StudyStatusEnum } from '../../../api/courses/learning-stages.types';
import { StageCard, StageInfo } from '../topics/details';
import { useEffect, useRef, useState } from 'react';

interface LocationState {
  answers: QuestionAnswer[];
  progress: StudentProgressResponse | null;
}

export default function StudyingResult() {
  const location = useLocation();
  const state = location.state as LocationState | null;

  const stages = useLearningStages({
    currentStage: state?.progress?.stage ?? 0,
    inRemediation: state?.progress?.in_remediation ?? false,
  });

  const questionCardRef = useRef<HTMLDivElement>(null);
  const [matchedHeight, setMatchedHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!questionCardRef.current) return;

    const observer = new ResizeObserver(() => {
      if (questionCardRef.current) {
        setMatchedHeight(questionCardRef.current.offsetHeight);
      }
    });

    observer.observe(questionCardRef.current);
    return () => observer.disconnect();
  }, []);

  if (!state?.answers) {
    return <Navigate to="/student/dashboard" replace />;
  }

  const stats = buildSessionStats(state.answers);

  const nextStage =
    stages.find((s) => s.status === StudyStatusEnum.PLANNED) ??
    stages.find((s) => s.status === StudyStatusEnum.IN_PROGRESS);

  return (
    <AppLayout>
      <LinkTitle firstTitle={'Тема'} secondTitle={'Результати сесії'} />
      <BodyTable className="gap-md-4 gap-3" $gap={24}>
        <QuestionCardBlock ref={questionCardRef} className="flex-grow-1" $gap={24}>
          <CardTitle>Сесію завершено!</CardTitle>

          <CardBody className="flex-column">
            <LabelValue label="Ваш результат:">
              <span className="d-flex gap-2 align-items-center">
                <TextBody $medium $color={getColorByPercentage(stats.scorePercentage)}>
                  {stats.scorePercentage}% правильних відповідей
                </TextBody>
                {stats.scorePercentage === 100 && (
                  <DoneIcon size={28} color={COLORS.status.success} />
                )}
              </span>
            </LabelValue>
            <LabelValue label="Правильних відповідей:">
              <TextBody $medium>
                {stats.correctAnswers}/{stats.totalQuestions}
              </TextBody>
            </LabelValue>
            <LabelValue label="Помилки:">
              <span className="d-flex gap-2 align-items-center">
                <TextBody $medium>{stats.errorsCount}</TextBody>
                {stats.errorsCount === 0 && <DoneIcon size={28} color={COLORS.status.success} />}
              </span>
            </LabelValue>
            <LabelValue label="Пропущено:">
              <TextBody $medium>{stats.skippedCount}</TextBody>
            </LabelValue>
          </CardBody>

          {nextStage && (
            <StageCard>
              <StageInfo>
                <TextBody $label>День {nextStage.day}</TextBody>
                <span>
                  <TextBody>{nextStage.module}</TextBody>
                  <TextBody>—</TextBody>
                  <TextBody $medium>{nextStage.type}</TextBody>
                </span>
              </StageInfo>
            </StageCard>
          )}
        </QuestionCardBlock>

        {stats.errors.length > 0 && (
          <ErrorsBlock
            $bgColor={COLORS.lighterBg}
            style={{ height: matchedHeight, paddingRight: '8px' }}
          >
            <span className="d-flex gap-2 align-items-end">
              <CancelIcon color={COLORS.status.error} />
              <CardTitle>Ваші помилки</CardTitle>
            </span>
            <div data-class="error-items" className="d-flex">
              {stats.errors.map((item, i) => (
                <ErrorItem key={i} {...item} />
              ))}
            </div>
          </ErrorsBlock>
        )}
      </BodyTable>
    </AppLayout>
  );
}

export const ErrorsBlock = styled(BasicBlock)<{ $titleColor?: string }>`
  width: 35%;
  min-height: 0;
  overflow: hidden;
  background-color: ${COLORS.lighterBg};
  border-radius: 24px;
  ${basicShadow};
  padding: 24px;
  gap: 24px;

  ${CardTitle} {
    color: ${({ $titleColor }) => ($titleColor ? $titleColor : COLORS.status.error)};
  }

  div[data-class='error-items'] {
    flex-direction: column;
    gap: 24px;
    overflow-y: auto;
    min-height: 0;
    flex: 1;
    padding-right: 12px;
  }

  ${media(1250)} {
    &[data-type='add-faq-block'] {
      flex-grow: 1;
    }
  }

  ${media(BREAKPOINTS.ml)} {
    width: 100%;

    div[data-class='error-items'] {
      flex-direction: row;
      flex-wrap: wrap;
      flex: 1 0 45%;
      padding: 8px;
    }
  }

  @media (max-width: 815px) {
    div[data-class='error-items'] {
      flex-direction: column;
      flex-wrap: wrap;
      flex: 1 0 100%;
      padding: 8px;
    }
  }

  ${media(BREAKPOINTS.sm)} {
    gap: 12px;
    padding: 16px;
    div[data-class='error-items'] {
      padding: 4px;
    }
  }
`;

const CardBody = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  width: 100%;
  ${LabelValueStyle} {
    width: auto !important;

    & > * {
      white-space: nowrap;
    }
  }
`;
