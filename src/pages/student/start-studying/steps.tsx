import { useSearchParams } from 'react-router-dom';
import { StudyQuestionCardIcon } from '../../../assets/images/icons/study-question-card-icon';
import { useTestSession } from '../../../assets/shared/hooks/useSession';
import { COLORS } from '../../../assets/styles/colors';
import { TextBody } from '../../../assets/styles/typography';
import { BasicBlock } from '../../../components/blocks';
import { QuestionCard } from '../../../components/question-card';
import { LinkTitle } from '../../../components/title-section';
import AppLayout from '../../../components/widgets/app/layout';

export default function StudyingStep() {
  const [searchParams] = useSearchParams();
  const topicId = searchParams.get('topicId');

  const {
    isLoading,
    isEmpty,
    nextReviewAt,
    questions,
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
  } = useTestSession(Number(topicId));

  if (isEmpty) {
    return (
      <AppLayout>
        <BasicBlock>
          <TextBody>
            {nextReviewAt
              ? `Сесія на сьогодні вже пройдена. Наступна — ${new Date(nextReviewAt).toLocaleString('uk-UA')}`
              : 'На сьогодні завдань немає'}
          </TextBody>
        </BasicBlock>
      </AppLayout>
    );
  }

  return (
    <AppLayout loadingState={isLoading}>
      <BasicBlock width="100%">
        <BasicBlock $bgColor="transparent" $gap={12}>
          <LinkTitle firstTitle={'Тема'} secondTitle={'Навчальна сесія'} />
          <span className="d-flex gap-2 align-items-center">
            <StudyQuestionCardIcon size={28} color={COLORS.secondaryDark} />
            <TextBody $color={COLORS.text}>
              Питання {currentIndex + 1} з {totalQuestions}
            </TextBody>
          </span>
        </BasicBlock>

        <QuestionCard
          question={currentQuestion}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          totalQuestions={totalQuestions}
          answer={currentAnswer}
          setAnswer={setCurrentAnswer}
          statuses={questions.map((q) => getQuestionStatus(q.id))}
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
