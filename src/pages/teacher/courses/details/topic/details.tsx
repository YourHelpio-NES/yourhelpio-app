import { useNavigate, useSearchParams } from 'react-router-dom';
import { BlocksElementIcon } from '../../../../../assets/images/icons/blocks-element-icon';
import { TOPIC_DETAILS_TEACHER } from '../../../../../assets/shared/data/topics-teacher-data';
import { COLORS } from '../../../../../assets/styles/colors';
import { CardTitle, SmallText, TextBody } from '../../../../../assets/styles/typography';
import { BasicBlock } from '../../../../../components/blocks';
import { Button } from '../../../../../components/button';
import { StatusTopicButton } from '../../../../../components/row-table-action';
import {
  GeneralKeywords,
  getMaterialsGroupMessage,
  getVerifiedStatusItem,
  ResultStudyingBlock,
  TextBlock,
} from '../../../../../components/topic-details-content';
import styled from 'styled-components';
import { BREAKPOINTS, media } from '../../../../../assets/styles/breakpoints';
import ModalWindow from '../../../../../components/modal-window';
import { useState } from 'react';

export default function TopicDetailsMainPageCourseTab() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const id = searchParams.get('id');
  const activeRow = TOPIC_DETAILS_TEACHER[Number.parseInt(id ?? '1') - 1];

  return (
    <DetailsBlock width="100%" $direction="row" $gap={40} $bgColor={COLORS.lighterBg}>
      <BasicBlock
        className="align-items-start flex-grow-1"
        width="65%"
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

        <ResultStudyingBlock isVerified learningOutcomesArr={activeRow.learningOutcomes} />
        <GeneralKeywords
          isVerifiedStatus={activeRow.keyTermsVerified}
          keywordsArr={activeRow.keyTerms}
        />
      </BasicBlock>
      <BasicBlock $gap={12} className="flex-grow-1" $bgColor={COLORS.lighterBg} width="35%">
        <span className="d-flex flex-column gap-2 align-items-start">
          <TextBody $medium>Матеріали:</TextBody>
          <div className="d-flex flex-wrap gap-3">
            {activeRow.materials.map((item) => (
              <span className="d-flex gap-2 align-items-center">
                <SmallText>– {item.fileName}</SmallText> {getVerifiedStatusItem(item.verified)}
                {/* {item.verified === TopicMaterialEnum.CANCEL && (
                  <Button
                    $bgColor={COLORS.lighterBg}
                    $txtColor={COLORS.status.error}
                    $brWidth={'2'}
                    $brColor={COLORS.status.error}
                    width="auto"
                    className="p-0 pe-2"
                    type={'small'}
                    $iconSize={32}
                  >
                    <CancelIcon color={COLORS.status.error} size={28} withBorder={false} />
                    <SmallText $medium>Відмінити</SmallText>
                  </Button>
                )} */}
              </span>
            ))}
          </div>
          <SmallText>{getMaterialsGroupMessage(activeRow.materials)}</SmallText>
        </span>
        <span className="d-flex w-100 gap-2 align-items-center mt-auto pt-3">
          <Button
            className="text-nowrap flex-grow-1"
            type="large"
            width="auto"
            $bgColor={'transparent'}
            $txtColor={COLORS.accent}
            $brColor={COLORS.accent}
            $brWidth={'2'}
            onClick={() => navigate(`/teacher/courses/details/topics/update?id=${activeRow.id}`)}
          >
            <TextBody $medium>Редагувати</TextBody>
          </Button>
          <Button
            className="flex-grow-1"
            type="large"
            width="auto"
            $bgColor={'transparent'}
            $txtColor={COLORS.status.error}
            $brColor={COLORS.status.error}
            $brWidth={'2'}
            onClick={() => setIsOpen(true)}
          >
            <TextBody $medium>Видалити</TextBody>
          </Button>
        </span>
      </BasicBlock>
      <ModalWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Видалення"
        size="md"
        footer={
          <>
            <Button
              type="small"
              width="auto"
              $bgColor="transparent"
              $brColor={COLORS.secondary}
              $txtColor={COLORS.secondary}
              $brWidth="2"
              onClick={() => setIsOpen(false)}
            >
              <TextBody $medium>Скасувати</TextBody>
            </Button>

            <Button
              type="small"
              $bgColor={COLORS.status.error}
              $brColor={COLORS.status.error}
              width="auto"
              onClick={() => {}}
            >
              <TextBody $medium $color={COLORS.secondary}>
                Видалити
              </TextBody>
            </Button>
          </>
        }
      >
        {' '}
        <TextBody>
          Ви справді хочете видалити тему <b>«{activeRow.topicName}»</b> з курсу «Алгоритми
          проєктування» ?{' '}
        </TextBody>{' '}
      </ModalWindow>
    </DetailsBlock>
  );
}

export const DetailsBlock = styled(BasicBlock)`
  ${media(BREAKPOINTS.ml)} {
    flex-direction: column;
  }
`;
