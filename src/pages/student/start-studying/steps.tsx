import { StudyQuestionCardIcon } from '../../../assets/images/icons/study-question-card-icon';
import { testSessionMock } from '../../../assets/shared/data/test-session';
import { topicDetailsMock } from '../../../assets/shared/data/topic';
import { useTestSession } from '../../../assets/shared/hooks/useSession';
import { COLORS } from '../../../assets/styles/colors';
import { TextBody } from '../../../assets/styles/typography';
import { BasicBlock } from '../../../components/blocks';
import { QuestionCard } from '../../../components/question-card';
import { LinkTitle } from '../../../components/title-section';
import { LabelValue } from '../../../components/topic-details-content';
import AppLayout from '../../../components/widgets/app/layout';

export default function StudyingStep() {
  const {
    currentQuestion,
    currentIndex,
    setCurrentIndex,
    totalQuestions,
    currentAnswer,
    setCurrentAnswer,
    isLast,
    handleSubmit,
    handleSkip,
    handleBack,
    getQuestionStatus,
    pendingAction,
    setPendingAction,
    confirmLastAction,
  } = useTestSession(testSessionMock);

  return (
    <AppLayout>
      <BasicBlock width="100%">
        <BasicBlock $bgColor="transparent" $gap={12}>
          <LinkTitle
            firstTitle={topicDetailsMock.title[0]}
            secondTitle={topicDetailsMock.title[1]}
          />
          <LabelValue label="Етап:">
            <TextBody $label $color={COLORS.accent}>
              {testSessionMock.stage}
            </TextBody>
          </LabelValue>
          <span className="d-flex gap-2 align-items-center">
            <StudyQuestionCardIcon size={28} color={COLORS.secondaryDark} />
            <TextBody $color={COLORS.text}>{testSessionMock.moduleTitle}</TextBody>
          </span>
        </BasicBlock>

        <QuestionCard
          question={currentQuestion}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          totalQuestions={totalQuestions}
          answer={currentAnswer}
          setAnswer={setCurrentAnswer}
          statuses={testSessionMock.questions.map((q) => getQuestionStatus(q.id))}
          onSubmit={handleSubmit}
          onSkip={handleSkip}
          onBack={handleBack}
          isLast={isLast}
          pendingAction={pendingAction}
          setPendingAction={setPendingAction}
          confirmLastAction={confirmLastAction}
        />
      </BasicBlock>
    </AppLayout>
  );
}
