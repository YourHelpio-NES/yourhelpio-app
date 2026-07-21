import styled, { css } from 'styled-components';
import { BlocksElementIcon } from '../assets/images/icons/blocks-element-icon';
import { DoneIcon } from '../assets/images/icons/done-icon';
import { PasswordIcon } from '../assets/images/icons/password-icon';
import {
  DifficultyEnum,
  difficultyTypeData,
  type WeakTopic,
} from '../assets/shared/constants/course';
import { getColorByPercentage } from '../assets/shared/utils/color';
import { COLORS } from '../assets/styles/colors';
import { CardTitle, SmallText, TextBody } from '../assets/styles/typography';
import { TableBlock } from '../pages/student/dashboard';
import { BasicBlock } from './blocks';
import { Button } from './button';
import { StatusItem, StatusTypeItem } from './status-items';
import { BREAKPOINTS, media } from '../assets/styles/breakpoints';
import { AnimatePresence, motion } from 'framer-motion';
import {
  TopicMaterialEnum,
  type LearningOutcome,
  type TopicDetailTeacher,
  type TopicMaterial,
} from '../assets/shared/constants/details-course';
import { StatusTopicButton } from './row-table-action';
import { CloseIcon } from '../assets/images/icons/close-icon';
import { LoadProgressIcon } from '../assets/images/icons/load-progress-icon';
import { CancelIcon } from '../assets/images/icons/cancel-icon';
import type { CourseTopicProgress } from '../api/courses/details.types';
import { StudyDayEnum, studyDayLabels } from '../assets/shared/constants/topicDays';
import { useEffect } from 'react';
import { useTopicDetailsStudent } from '../assets/shared/hooks/useTopicDetailsStudent';
import { useNavigate } from 'react-router-dom';

export default function TopicDetailsContent({
  activeRow,
}: {
  activeRow: CourseTopicProgress | undefined;
}) {
  const { topic, fetchTopic } = useTopicDetailsStudent();
  const navigate = useNavigate();

  useEffect(() => {
    if (activeRow) {
      void fetchTopic(activeRow.topic_id);
    }
  }, [activeRow, fetchTopic]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeRow?.topic_id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.2 }}
      >
        {activeRow && topic ? (
          <TableBlock
            className="align-items-start"
            $padding="28px"
            $gap={24}
            $bgColor={COLORS.lighterBg}
          >
            <span className="d-flex gap-2 align-items-start">
              <BlocksElementIcon size={28} />
              <CardTitle>Тема «{activeRow.title}»</CardTitle>
            </span>
            <span className="w-100 d-flex flex-column align-items-start  gap-md-2 gap-sm-1">
              <LabelValue label="Етап:">
                <TextBody $medium>
                  {activeRow.stage ? studyDayLabels[activeRow.stage as StudyDayEnum] : '—'}
                </TextBody>
              </LabelValue>
              <LabelValue label="Прогрес:">
                {activeRow.progress_pct !== 0 ? (
                  <span className="d-flex gap-2 align-items-center">
                    <TextBody>{activeRow.progress_pct}%</TextBody>
                    {activeRow.progress_pct === 100 && <DoneIcon color={COLORS.status.success} />}
                  </span>
                ) : (
                  <PasswordIcon size={22} />
                )}
              </LabelValue>
            </span>
            <ResultStudyingBlock learningOutcomesArr={topic.passport.outcomes} />
            <GeneralKeywords keywordsArr={topic.passport.keywords} />
            <Button
              className="mt-3"
              $type="large"
              width="auto"
              $txtColor={COLORS.background}
              $brWidth={'1'}
              onClick={() =>
                navigate(`/student/study-session/topics/details?id=${activeRow.topic_id}`)
              }
            >
              <TextBody $medium>Перейти до теми</TextBody>
            </Button>
          </TableBlock>
        ) : (
          <TableBlock
            className="align-items-start"
            $padding="28px"
            $gap={24}
            $bgColor={COLORS.lighterBg}
          >
            <TextBody>Тему не обрано</TextBody>
          </TableBlock>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export function TopicTeacherLargeDetailsContent({
  activeRow,
  clickNavigate,
  clickNavigateEdit,
}: {
  activeRow: TopicDetailTeacher;
  clickNavigate: () => void;
  clickNavigateEdit: () => void;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeRow?.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.2 }}
      >
        <TableBlock
          className="align-items-start"
          $padding="28px"
          $gap={24}
          $bgColor={COLORS.lighterBg}
        >
          <span className="d-flex w-100 gap-3 align-items-start justify-content-between">
            <span className="d-flex gap-2 align-items-start">
              <BlocksElementIcon size={28} />
              <CardTitle>Тема «{activeRow.topicName}»</CardTitle>
            </span>
            <StatusTopicButton status={activeRow.status} width="auto" />
          </span>
          <TextBlock>{activeRow.description}</TextBlock>

          <ResultStudyingBlock
            learningOutcomesArr={activeRow.learningOutcomes.map((item): string => item.text)}
          />
          <GeneralKeywords keywordsArr={activeRow.keyTerms} />

          <span className="d-flex w-100 gap-1 align-items-center">
            <Button
              className="mt-3"
              $type="large"
              width="auto"
              $txtColor={COLORS.background}
              $brWidth={'1'}
              onClick={clickNavigate}
            >
              <TextBody $medium>Перейти до теми</TextBody>
            </Button>
            <Button
              className="mt-3"
              $type="large"
              width="auto"
              $bgColor={'transparent'}
              $txtColor={COLORS.accent}
              $brColor={COLORS.accent}
              $brWidth={'2'}
              onClick={clickNavigateEdit}
            >
              <TextBody $medium>Редагувати</TextBody>
            </Button>
          </span>
        </TableBlock>
      </motion.div>
    </AnimatePresence>
  );
}

export function TopicTeacherSmallDetailsContent({ activeRow }: { activeRow: WeakTopic }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeRow?.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.2 }}
      >
        <TableBlock
          className="align-items-start"
          $padding="28px"
          $gap={12}
          $bgColor={COLORS.lighterBg}
        >
          <span className="d-flex gap-2 align-items-start">
            <BlocksElementIcon size={28} />
            <CardTitle>Тема «{activeRow.title}»</CardTitle>
          </span>
          <span className="w-100 d-flex align-items-center ">
            <LabelValue label="% засвоєння:">
              <TextBody $medium $color={getColorByPercentage(activeRow.masteryPercent)}>
                {activeRow.masteryPercent ?? '—'}%
              </TextBody>
            </LabelValue>
            <Button
              $bgColor={'transparent'}
              $txtColor={COLORS.secondary}
              $brWidth={'2'}
              $brColor={COLORS.secondary}
              width="auto"
              $type={'small'}
            >
              <SmallText className="text-nowrap" $medium>
                {activeRow.course}
              </SmallText>
            </Button>
          </span>
          <LabelValue label="Кількість студентів:">
            <TextBody $medium>{activeRow.studentCount}</TextBody>
          </LabelValue>
          <TextBlock>{activeRow.description}</TextBlock>
          <Button $type="large" width="auto" $txtColor={COLORS.background} $brWidth={'1'}>
            <TextBody $medium>Перейти до теми</TextBody>
          </Button>
        </TableBlock>
      </motion.div>
    </AnimatePresence>
  );
}

export const LabelSection = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <LabelSectionStyle className="w-100 d-flex flex-column align-items-start">
    <TextBody $medium>{label}</TextBody>
    {children}
  </LabelSectionStyle>
);

export const LabelSectionStyle = styled.span`
  gap: 12px;
  ${Button} {
    padding: 6px 12px;
  }

  ${media(BREAKPOINTS.ml)} {
    gap: 8px;
  }
`;

interface LabelValueProps {
  label: string;
  children: React.ReactNode;
}

export const LabelValue = ({ label, children }: LabelValueProps) => (
  <LabelValueStyle className={`w-100 d-flex align-items-center`}>
    <TextBody>{label}</TextBody>
    {children}
  </LabelValueStyle>
);

export const LabelValueStyle = styled.span`
  gap: 16px;
  ${media(BREAKPOINTS.ml)} {
    gap: 8px;
  }
`;

export const TextBlock = styled(TextBody)`
  padding: 16px;
  border-radius: 16px;
  background-color: ${COLORS.background};
`;

export function ResultStudyingBlock({
  learningOutcomesArr,
  isVerified = undefined,
  mode = 'view',
  onChange,
}: {
  learningOutcomesArr: string[] | LearningOutcome[];
  isVerified?: boolean;
  mode?: 'view' | 'edit';
  onChange?: (item: LearningOutcome, newVerifiedStatus: boolean) => void;
}) {
  const verifiedCount = (learningOutcomesArr as LearningOutcome[]).filter(
    (item: LearningOutcome) => item.isVerified
  ).length;
  return (
    <LabelSectionStyle className="w-100 d-flex flex-column align-items-start">
      <span className="d-flex align-items-center gap-2 flex-wrap">
        <TextBody $medium>Результати навчання:</TextBody>
        {mode === 'edit' && (
          <SmallText
            $medium
            $underline
            $color={verifiedCount < 3 ? COLORS.status.warning : COLORS.status.success}
          >
            має бути обрано мінімум 3 елементи
          </SmallText>
        )}
      </span>

      <BasicBlock $bgColor="transparent">
        {learningOutcomesArr.map((item, index) => {
          const status =
            index === 0
              ? DifficultyEnum.HIGH
              : index === 1 || index === 2
                ? DifficultyEnum.MEDIUM
                : DifficultyEnum.LOW;

          return (
            <span
              key={JSON.stringify(item)}
              className={`d-flex gap-3 row-gap-2 ${mode === 'edit' ? ' align-items-start' : 'align-items-start'} `}
            >
              <StatusItem
                key={JSON.stringify(item)}
                $type={StatusTypeItem.CIRCLE}
                $color={difficultyTypeData[status as DifficultyEnum].color}
                $isBackground
              />
              <TextBody>
                {(item as LearningOutcome).text ?? item}{' '}
                {isVerified !== undefined &&
                  ((item as LearningOutcome).isVerified ? (
                    <DoneIcon color={COLORS.status.success} />
                  ) : (
                    <CloseIcon color={COLORS.secondaryDark} />
                  ))}
              </TextBody>

              {mode === 'edit' && (
                <span className="d-flex gap-1 align-items-start">
                  <Button
                    $bgColor={
                      (item as LearningOutcome).isVerified ? COLORS.status.success : 'transparent'
                    }
                    $txtColor={
                      (item as LearningOutcome).isVerified
                        ? COLORS.lighterBg
                        : COLORS.status.success
                    }
                    $brColor={COLORS.status.success}
                    width="auto"
                    $type={'small'}
                    onClick={() => onChange!(item as LearningOutcome, true)}
                  >
                    <DoneIcon
                      color={
                        (item as LearningOutcome).isVerified
                          ? COLORS.lighterBg
                          : COLORS.status.success
                      }
                    />
                    <SmallText $medium>Підтвердити</SmallText>
                  </Button>
                  <Button
                    $bgColor={
                      (item as LearningOutcome).isVerified === false
                        ? COLORS.status.error
                        : 'transparent'
                    }
                    $txtColor={
                      (item as LearningOutcome).isVerified === false
                        ? COLORS.lighterBg
                        : COLORS.status.error
                    }
                    $brColor={COLORS.status.error}
                    width="auto"
                    $type={'small'}
                    onClick={() => onChange!(item as LearningOutcome, false)}
                  >
                    <CloseIcon
                      color={
                        (item as LearningOutcome).isVerified === false
                          ? COLORS.lighterBg
                          : COLORS.status.error
                      }
                    />
                    <SmallText $medium>Відмінити</SmallText>
                  </Button>
                </span>
              )}
            </span>
          );
        })}
      </BasicBlock>
    </LabelSectionStyle>
  );
}

export function GeneralKeywords({
  keywordsArr,
  keywordsArrOriginal,
  isVerifiedStatus = undefined,
  mode = 'view',
  onChange,
}: {
  keywordsArr: string[];
  keywordsArrOriginal?: string[];
  isVerifiedStatus?: boolean;
  mode?: 'view' | 'edit';
  onChange?: (item: string, isAdd: boolean) => void;
}) {
  const verifiedCount = keywordsArr.length < 3;
  return (
    <LabelSectionStyle className="w-100 d-flex flex-column align-items-start">
      <span className="d-flex align-items-center gap-2 flex-wrap">
        <TextBody $medium>Ключові терміни:</TextBody>
        {mode === 'view' &&
          isVerifiedStatus !== undefined &&
          (isVerifiedStatus ? (
            <DoneIcon color={COLORS.status.success} />
          ) : (
            <CloseIcon color={COLORS.secondaryDark} />
          ))}

        {mode === 'edit' && (
          <>
            {' '}
            <Button
              $bgColor={'transparent'}
              $txtColor={COLORS.status.success}
              $brColor={COLORS.status.success}
              width="auto"
              $type={'small'}
              className="mx-2"
              disabled={verifiedCount}
            >
              <DoneIcon color={verifiedCount ? COLORS.text : COLORS.status.success} />
              <SmallText $medium>Підтвердити</SmallText>
            </Button>
            <SmallText
              $medium
              $underline
              $color={verifiedCount ? COLORS.status.warning : COLORS.status.success}
            >
              має бути обрано мінімум 3 елементи
            </SmallText>
          </>
        )}
      </span>
      <BasicBlock className="flex-wrap" $direction={'row'} $gap={10} $bgColor="transparent">
        {keywordsArr.map((item, index) => {
          return (
            <ButtonStyleSpan
              key={JSON.stringify(item)}
              $bgColor={index % 2 === 0 ? COLORS.primary : COLORS.secondary}
            >
              <TextBody>{item}</TextBody>
              {mode === 'edit' && (
                <Button
                  $bgColor={COLORS.status.error}
                  $brColor={COLORS.status.error}
                  width="auto"
                  $brRadius={'8'}
                  $iconSize={20}
                  $type={'small'}
                  className="p-0"
                  onClick={() => onChange!(item, false)}
                >
                  <CloseIcon color={COLORS.lighterBg} size={20} />
                </Button>
              )}
            </ButtonStyleSpan>
          );
        })}
        {mode === 'edit' &&
          keywordsArrOriginal &&
          keywordsArrOriginal!
            .filter((item) => !keywordsArr.includes(item))
            .map((item, index) => (
              <ButtonStyleSpan
                key={JSON.stringify(item)}
                $bgColor={index % 2 === 0 ? COLORS.primary : COLORS.secondary}
                $opacity={true}
              >
                <TextBody>{item}</TextBody>
                {mode === 'edit' && (
                  <Button
                    $bgColor={COLORS.status.warning}
                    $brColor={COLORS.status.warning}
                    width="auto"
                    $brRadius={'8'}
                    $iconSize={20}
                    $type={'small'}
                    className="p-0"
                    onClick={() => onChange!(item, true)}
                  >
                    <DoneIcon color={COLORS.lighterBg} />
                  </Button>
                )}
              </ButtonStyleSpan>
            ))}
      </BasicBlock>
    </LabelSectionStyle>
  );
}

export const ButtonStyleSpan = styled.span<{ $bgColor?: string; $opacity?: boolean }>`
  width: auto;
  background-color: ${({ $bgColor }) => $bgColor};
  border: 1px solid ${({ $bgColor }) => $bgColor};
  border-radius: 16px;
  display: flex;
  gap: 6px;
  padding: 6px 8px;
  align-items: center;
  ${({ $opacity }) =>
    $opacity &&
    css`
      opacity: 0.8;
    `}

  ${TextBody} {
    color: ${COLORS.background};
  }

  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
`;

export const getMaterialsGroupMessage = (items: TopicMaterial[]) => {
  const hasCancel = items.some((i) => i.verified === TopicMaterialEnum.CANCEL);
  const hasProcess = items.some((i) => i.verified === TopicMaterialEnum.PROCESS);
  const allDone = items.every((i) => i.verified === TopicMaterialEnum.DONE);

  if (items.length === 0) {
    return 'Завантажте матеріали, щоб згенерувати паспорт теми';
  }

  if (hasCancel) {
    return 'Є файли з помилками – перевірте коректність матеріалів';
  }

  if (hasProcess) {
    return 'Матеріали в процесі перевірки...';
  }

  if (allDone) {
    return 'Файли завантажено успішно, дані згенеровано та підтверджено';
  }

  return 'Завантажте матеріали, щоб згенерувати паспорт теми';
};

export const getVerifiedStatusItem = (status: TopicMaterialEnum) =>
  status === TopicMaterialEnum.DONE ? (
    <DoneIcon color={COLORS.status.success} />
  ) : status === TopicMaterialEnum.PROCESS ? (
    <LoadProgressIcon />
  ) : (
    status === TopicMaterialEnum.CANCEL && (
      <CancelIcon color={COLORS.secondaryDark} withBorder={false} />
    )
  );
