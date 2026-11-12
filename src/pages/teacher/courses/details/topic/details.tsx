import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import { BlocksElementIcon } from '../../../../../assets/images/icons/blocks-element-icon';
import { COLORS } from '../../../../../assets/styles/colors';
import { CardTitle, TextBody } from '../../../../../assets/styles/typography';
import { BasicBlock } from '../../../../../components/blocks';
import { Button } from '../../../../../components/button';
import { StatusTopicButton } from '../../../../../components/row-table-action';
import {
  GeneralKeywords,
  ResultStudyingBlock,
  TextBlock,
} from '../../../../../components/topic-details-content';
import styled from 'styled-components';
import { BREAKPOINTS, media } from '../../../../../assets/styles/breakpoints';
import { useEffect, useState } from 'react';
import type { TopicListItem } from '../../../../../api/courses/courses.types';
import { coursesApi } from '../../../../../api/courses/courses.api';
import type { TopicDetailsStatusEnum } from '../../../../../assets/shared/constants/details-course';

export default function TopicDetailsMainPageCourseTab() {
  const courseId = useOutletContext<number>();
  const [searchParams] = useSearchParams();
  const topicId = Number(searchParams.get('id'));

  const navigate = useNavigate();

  const [topic, setTopic] = useState<TopicListItem | null>(null);

  useEffect(() => {
    coursesApi.getTopicById(topicId).then(({ data }) => setTopic(data));
  }, [topicId]);

  if (!topic) return <TextBody>Завантаження...</TextBody>;

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
            <CardTitle>Тема «{topic.title}»</CardTitle>
          </span>
          <StatusTopicButton status={topic.status as TopicDetailsStatusEnum} width="auto" />
        </span>

        {topic.status === 'PROCESSING' ? (
          <TextBody>
            AI ще формує опис, результати навчання та ключові терміни цієї теми...
          </TextBody>
        ) : (
          <>
            <TextBlock>{topic.passport?.summary}</TextBlock>
            <ResultStudyingBlock learningOutcomesArr={topic.passport?.outcomes ?? []} />
            <GeneralKeywords keywordsArr={topic.passport?.keywords ?? []} />
          </>
        )}
      </BasicBlock>

      <BasicBlock $gap={12} className="flex-grow-1" $bgColor={COLORS.lighterBg} width="35%">
        <Button
          className="text-nowrap"
          $type="large"
          width="auto"
          $bgColor="transparent"
          $txtColor={COLORS.accent}
          $brColor={COLORS.accent}
          $brWidth="2"
          onClick={() => navigate(`/teacher/courses/${courseId}/topics/update?id=${topicId}`)}
        >
          <TextBody $medium>Редагувати</TextBody>
        </Button>
      </BasicBlock>
    </DetailsBlock>
  );
}

export const DetailsBlock = styled(BasicBlock)`
  ${media(BREAKPOINTS.ml)} {
    flex-direction: column;
  }
`;
