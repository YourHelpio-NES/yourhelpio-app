import styled from 'styled-components';
import { BlocksElementIcon } from '../assets/images/icons/blocks-element-icon';
import { DoneIcon } from '../assets/images/icons/done-icon';
import { PasswordIcon } from '../assets/images/icons/password-icon';
import {
  DifficultyEnum,
  difficultyTypeData,
  type WeakTopic,
} from '../assets/shared/constants/course';
import { keywordsTheme, learningOutcomesTheme } from '../assets/shared/data/courses';
import { getColorByPercentage } from '../assets/shared/utils/color';
import type { ThemeTableRow } from '../assets/shared/utils/table/row-type';
import { COLORS } from '../assets/styles/colors';
import { CardTitle, SmallText, TextBody } from '../assets/styles/typography';
import { TableBlock } from '../pages/student/dashboard';
import { BasicBlock } from './blocks';
import { Button } from './button';
import { StatusItem, StatusTypeItem } from './status-items';
import { BREAKPOINTS, media } from '../assets/styles/breakpoints';
import { AnimatePresence, motion } from 'framer-motion';
import type { TopicDetailTeacher } from '../assets/shared/constants/details-course';
import { StatusTopicButton } from './row-table-action';

export default function TopicDetailsContent({ activeRow }: { activeRow: ThemeTableRow }) {
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
          <span className="d-flex gap-2 align-items-start">
            <BlocksElementIcon size={28} />
            <CardTitle>Тема «{activeRow.topicName}»</CardTitle>
          </span>
          <span className="w-100 d-flex flex-column align-items-start  gap-md-2 gap-sm-1">
            <LabelValue label="Етап:">
              <TextBody $medium>{activeRow.stage ?? '—'}</TextBody>
            </LabelValue>
            <LabelValue label="Прогрес:">
              {activeRow.progress ? (
                <span className="d-flex gap-2 align-items-center">
                  <TextBody
                    $medium
                    $color={getColorByPercentage(Number.parseInt(activeRow.progress))}
                  >
                    {activeRow.progress}%
                  </TextBody>
                  {activeRow.progress === '100' && (
                    <DoneIcon size={28} color={COLORS.status.success} />
                  )}
                </span>
              ) : (
                <PasswordIcon size={24} />
              )}
            </LabelValue>
          </span>
          <ResultStudyingBlock learningOutcomesArr={learningOutcomesTheme} />
          <GeneralKeywords keywordsArr={keywordsTheme} />
          <Button
            className="mt-3"
            type="large"
            width="auto"
            $txtColor={COLORS.background}
            $brWidth={'1'}
          >
            <TextBody $medium>Перейти до теми</TextBody>
          </Button>
        </TableBlock>
      </motion.div>
    </AnimatePresence>
  );
}

export function TopicTeacherLargeDetailsContent({ activeRow }: { activeRow: TopicDetailTeacher }) {
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
              type="large"
              width="auto"
              $txtColor={COLORS.background}
              $brWidth={'1'}
            >
              <TextBody $medium>Перейти до теми</TextBody>
            </Button>
            <Button
              className="mt-3"
              type="large"
              width="auto"
              $bgColor={'transparent'}
              $txtColor={COLORS.accent}
              $brColor={COLORS.accent}
              $brWidth={'2'}
            >
              <TextBody $medium>Перейти до теми</TextBody>
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
              type={'small'}
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
          <Button type="large" width="auto" $txtColor={COLORS.background} $brWidth={'1'}>
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

const LabelSectionStyle = styled.span`
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

const TextBlock = styled(TextBody)`
  padding: 16px;
  border-radius: 16px;
  background-color: ${COLORS.background};
`;

export function ResultStudyingBlock({ learningOutcomesArr }: { learningOutcomesArr: string[] }) {
  return (
    <LabelSection label="Результати навчання:">
      <BasicBlock $bgColor="transparent">
        {learningOutcomesArr.map((item, index) => {
          const status =
            index === 0
              ? DifficultyEnum.HIGH
              : index === 1 || index === 2
                ? DifficultyEnum.MEDIUM
                : DifficultyEnum.LOW;
          return (
            <span key={item} className="d-flex gap-2">
              <StatusItem
                key={JSON.stringify(item)}
                $type={StatusTypeItem.CIRCLE}
                $color={difficultyTypeData[status as DifficultyEnum].color}
                $isBackground
              />
              <TextBody>{item}</TextBody>
            </span>
          );
        })}
      </BasicBlock>
    </LabelSection>
  );
}

export function GeneralKeywords({ keywordsArr }: { keywordsArr: string[] }) {
  return (
    <LabelSection label="Ключові терміни:">
      <BasicBlock className="flex-wrap" $direction={'row'} $gap={10} $bgColor="transparent">
        {keywordsArr.map((item, index) => (
          <Button
            key={item}
            type="small"
            width="auto"
            $bgColor={index % 2 === 0 ? COLORS.primary : COLORS.secondary}
            $brColor={index % 2 === 0 ? COLORS.primary : COLORS.secondary}
            $txtColor={COLORS.background}
            $brWidth={'1'}
            $brRadius="16"
          >
            <TextBody>{item}</TextBody>
          </Button>
        ))}
      </BasicBlock>
    </LabelSection>
  );
}
