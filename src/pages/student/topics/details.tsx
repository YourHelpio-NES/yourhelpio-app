import styled from 'styled-components';
import { topicDetailsMock } from '../../../assets/shared/data/topic';
import { CardTitle, TextBody } from '../../../assets/styles/typography';
import { BasicBlock, basicShadow } from '../../../components/blocks';
import AppLayout from '../../../components/widgets/app/layout';
import { COLORS } from '../../../assets/styles/colors';
import { useNavigate } from 'react-router-dom';
import {
  GeneralKeywords,
  LabelValue,
  ResultStudyingBlock,
} from '../../../components/topic-details-content';
import { getColorByPercentage } from '../../../assets/shared/utils/color';
import { DoneIcon } from '../../../assets/images/icons/done-icon';
import { PasswordIcon } from '../../../assets/images/icons/password-icon';
import { SparklesIcon } from '../../../assets/images/icons/sparkles-icon';
import { StatusItem, StatusTypeItem } from '../../../components/status-items';
import { Button } from '../../../components/button';
import { BREAKPOINTS, media } from '../../../assets/styles/breakpoints';
import { studyDayLabels, StudyStatusEnum } from '../../../assets/shared/constants/topicDays';
import { LinkTitle } from '../../../components/title-section';

export default function TopicsDetailsStudentPage() {
  //   const { id } = useSearchParams();
  const navigate = useNavigate();

  return (
    <AppLayout>
      <WrapBlock>
        <DetailsBlock $gap={24} className="p-0">
          <LinkTitle
            firstTitle={topicDetailsMock.title[0]}
            secondTitle={topicDetailsMock.title[1]}
          />
          <LabelValue label="Прогрес:">
            {topicDetailsMock.progress ? (
              <span className="d-flex gap-2 align-items-center">
                <TextBody $medium $color={getColorByPercentage(topicDetailsMock.progress)}>
                  {topicDetailsMock.progress}%
                </TextBody>
                {topicDetailsMock.progress === 100 && (
                  <DoneIcon size={28} color={COLORS.status.success} />
                )}
              </span>
            ) : (
              <PasswordIcon size={24} />
            )}
          </LabelValue>
          <ResultStudyingBlock learningOutcomesArr={topicDetailsMock.learningOutcomes} />
          <GeneralKeywords keywordsArr={topicDetailsMock.keywords} />
        </DetailsBlock>
        <DetailsBlock
          className="align-items-start"
          $bgColor={COLORS.lighterBg}
          $gap={24}
          $titleColor={COLORS.accent}
        >
          <span className="d-flex gap-2 align-items-center">
            <SparklesIcon />
            <CardTitle>Коротко про тему</CardTitle>
          </span>
          <BasicBlock $bgColor={'transparent'} $gap={8}>
            <TextBody>{topicDetailsMock.shortInfo.description}</TextBody>
            <span>
              {topicDetailsMock.shortInfo.items.map((item) => (
                <span className="d-flex gap-2 align-items-center" key={item}>
                  <StatusItem
                    $size={12}
                    $type={StatusTypeItem.CIRCLE}
                    $color={COLORS.secondaryDark}
                  />
                  <TextBody>{item}</TextBody>
                </span>
              ))}
            </span>
          </BasicBlock>
          <TextBody $medium>{topicDetailsMock.shortInfo.conclusion}</TextBody>
          <Button
            type="large"
            width="auto"
            $bgColor={'transparent'}
            $txtColor={COLORS.accent}
            $brColor={COLORS.accent}
            $brWidth={'2'}
            onClick={() => navigate(`/student/study-session/topics/materials?id=1`)}
          >
            <TextBody $medium>Читати повністю матеріал</TextBody>
          </Button>
        </DetailsBlock>
      </WrapBlock>
      <DetailsBlock $gap={24} $titleColor={COLORS.accent} className="px-0">
        <CardTitle>Етапи навчання</CardTitle>
        <StageList>
          {topicDetailsMock.stages.map((item) => (
            <StageCard>
              <StageInfo>
                <TextBody $label>{studyDayLabels[item.day]}</TextBody>

                <span>
                  <TextBody>{item.module}</TextBody>
                  <TextBody>—</TextBody>
                  <TextBody $medium>{item.type}</TextBody>
                </span>
              </StageInfo>

              <Button
                type="large"
                width=""
                $bgColor={
                  item.status === StudyStatusEnum.COMPLETED
                    ? COLORS.secondary
                    : item.status === StudyStatusEnum.IN_PROGRESS
                      ? COLORS.accent
                      : 'transparent'
                }
                $txtColor={
                  item.status === StudyStatusEnum.COMPLETED ||
                  item.status === StudyStatusEnum.IN_PROGRESS
                    ? COLORS.background
                    : COLORS.secondary
                }
                $brColor={
                  item.status === StudyStatusEnum.IN_PROGRESS ? COLORS.accent : COLORS.secondary
                }
                disabled={item.status === StudyStatusEnum.COMPLETED}
                $brWidth={'2'}
                onClick={() => {
                  if (item.status === StudyStatusEnum.IN_PROGRESS)
                    navigate('/student/study-session/studying');
                }}
              >
                <span className="d-flex gap-2 align-items-center">
                  <TextBody $medium>{item.status}</TextBody>
                  {item.status === StudyStatusEnum.COMPLETED && (
                    <DoneIcon size={24} color={COLORS.text} />
                  )}
                </span>
              </Button>
            </StageCard>
          ))}
        </StageList>
      </DetailsBlock>
    </AppLayout>
  );
}

const StageList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
`;

const StageInfo = styled.div`
  flex: 1;
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 6px;

  span {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;

    overflow-wrap: anywhere;
    word-break: break-word;
  }
`;

const StageCard = styled.div`
  flex: 0 1 calc(50% - 8px);
  min-width: 0;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;

  padding: 20px 24px;

  border-radius: 16px;
  border: 1px solid ${COLORS.secondary};

  ${basicShadow};

  ${media(BREAKPOINTS.ml)} {
    flex-direction: column;
    align-items: stretch;
  }

  ${media(BREAKPOINTS.xs)} {
    flex-basis: 100%;
    flex-direction: column;
    align-items: stretch;
  }

  ${Button} {
    padding: 9px 20px;
    flex-shrink: 0;

    ${media(BREAKPOINTS.sm)} {
      width: 100%;
      padding: 6px 16px;
    }
  }

  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;

    width: 5px;
    height: 100%;

    background: ${COLORS.accent};

    transform: scaleY(0);
    transform-origin: top;

    transition: transform 0.4s ease;
  }

  &:hover::before {
    transform: scaleY(1);
  }
`;

const DetailsBlock = styled(BasicBlock)<{ $titleColor?: string }>`
  border-radius: 12px;
  ${CardTitle} {
    color: ${({ $titleColor }) => $titleColor ?? COLORS.text};
  }
  padding: 24px;
`;

const WrapBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 24px;

  ${DetailsBlock} {
    flex-grow: 1;
  }

  ${media(BREAKPOINTS.sm)} {
    flex-wrap: wrap;
  }
`;
