import styled from 'styled-components';
import { StudyQuestionCardIcon } from '../../../assets/images/icons/study-question-card-icon';
import { testSessionMock } from '../../../assets/shared/data/test-session';
import { topicDetailsMock } from '../../../assets/shared/data/topic';
import { COLORS } from '../../../assets/styles/colors';
import { CardTitle, TextBody } from '../../../assets/styles/typography';
import { QuestionCardBlock } from '../../../components/question-card';
import { LinkTitle } from '../../../components/title-section';
import { LabelValue, LabelValueStyle } from '../../../components/topic-details-content';
import AppLayout from '../../../components/widgets/app/layout';
import { BodyTable } from '../study-plan';
import { getColorByPercentage } from '../../../assets/shared/utils/color';
import { testQuizSession } from '../../../assets/shared/data/test-session-result';
import { DoneIcon } from '../../../assets/images/icons/done-icon';
import { StageCard, StageInfo } from '../topics/details';
import { Button } from '../../../components/button';
import { CalendarIcon } from '../../../assets/images/icons/calendar-icon';
import { BasicBlock, basicShadow } from '../../../components/blocks';
import { CancelIcon } from '../../../assets/images/icons/cancel-icon';
import ErrorItem from '../../../components/error-result-item';
import { BREAKPOINTS, media } from '../../../assets/styles/breakpoints';

export default function StudyingResult() {
  return (
    <AppLayout>
      <LinkTitle firstTitle={topicDetailsMock.title[0]} secondTitle={topicDetailsMock.title[1]} />
      <BodyTable className="gap-md-4 gap-3" $gap={24}>
        <QuestionCardBlock className="flex-grow-1" $gap={24}>
          <CardTitle>Сесію завершено!</CardTitle>
          <CardBody className="">
            <LabelValue label="Етап:">
              <TextBody $label $color={COLORS.accent}>
                {testSessionMock.stage}
              </TextBody>
            </LabelValue>
            <span className="d-flex gap-2 align-items-center ">
              <StudyQuestionCardIcon size={28} color={COLORS.secondaryDark} />
              <TextBody $color={COLORS.text}>{testSessionMock.moduleTitle}</TextBody>
            </span>
          </CardBody>
          <CardBody className="flex-column">
            <LabelValue label="Ваш результат:">
              <span className="d-flex gap-2 align-items-center">
                <TextBody
                  $medium
                  $color={getColorByPercentage(testQuizSession.results.scorePercentage)}
                >
                  {testQuizSession.results.scorePercentage}% правильних відповідей
                </TextBody>
                {testQuizSession.results.scorePercentage === 100 && (
                  <DoneIcon size={28} color={COLORS.status.success} />
                )}
              </span>
            </LabelValue>
            <LabelValue label="Правильних відповідей:">
              <span className="d-flex gap-2 align-items-center">
                <TextBody $medium>
                  {testQuizSession.results.correctAnswers}/{testQuizSession.results.totalQuestions}
                </TextBody>
                {testQuizSession.results.scorePercentage === 100 && (
                  <DoneIcon size={28} color={COLORS.status.success} />
                )}
              </span>
            </LabelValue>
            <LabelValue label="Помилки:">
              <span className="d-flex gap-2 align-items-center">
                <TextBody $medium>{testQuizSession.results.errorsCount}</TextBody>
                {testQuizSession.results.errorsCount === 0 && (
                  <DoneIcon size={28} color={COLORS.status.success} />
                )}
              </span>
            </LabelValue>
            <LabelValue label="Пропущено:">
              <span className="d-flex gap-2 align-items-center">
                <TextBody $medium>{testQuizSession.results.skippedCount}</TextBody>
                {testQuizSession.results.errorsCount === 0 && (
                  <DoneIcon size={28} color={COLORS.status.success} />
                )}
              </span>
            </LabelValue>
          </CardBody>
          <StageCard>
            <StageInfo>
              <TextBody $label>{testQuizSession.nextStage.title}</TextBody>

              <span>
                <TextBody>{testQuizSession.nextStage.module}</TextBody>
                <TextBody>—</TextBody>
                <TextBody $medium>{testQuizSession.nextStage.type}</TextBody>
              </span>
            </StageInfo>

            <Button
              type="large"
              width=""
              $bgColor={'transparent'}
              $txtColor={COLORS.secondary}
              $brColor={COLORS.secondary}
              $brWidth={'2'}
              $iconSize={20}
              //   onClick={() => {
              //     if (item.status === StudyStatusEnum.IN_PROGRESS)
              //       navigate('/student/study-session/studying');
              //   }}
            >
              <span className="d-flex gap-2 align-items-center">
                <CalendarIcon color={COLORS.secondary} />
                <TextBody $medium>{testQuizSession.nextStage.schedule}</TextBody>
              </span>
            </Button>
          </StageCard>
        </QuestionCardBlock>
        <ErrorsBlock $bgColor={COLORS.lighterBg}>
          <span className="d-flex gap-2 align-items-end">
            <CancelIcon color={COLORS.status.error} />
            <CardTitle>Ваші помилки</CardTitle>
          </span>
          <div data-class="error-items" className="d-flex">
            {testQuizSession.errors.map((item, i) => (
              <ErrorItem key={i} {...item} />
            ))}
          </div>
        </ErrorsBlock>
      </BodyTable>
    </AppLayout>
  );
}

export const ErrorsBlock = styled(BasicBlock)<{ $titleColor?: string }>`
  width: 35%;
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
