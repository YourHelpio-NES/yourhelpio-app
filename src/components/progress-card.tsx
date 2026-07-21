import styled from 'styled-components';
import { BREAKPOINTS, media } from '../assets/styles/breakpoints';
import { COLORS } from '../assets/styles/colors';
import { SmallText, TextBody } from '../assets/styles/typography';
import { actionEffect, basicShadow } from './blocks';
import type { CourseEntity } from '../api/courses/courses.types';
import { BlocksElementIcon } from '../assets/images/icons/blocks-element-icon';
import { useCourseDetailsStudent } from '../assets/shared/hooks/useCourseDetailsStudent';
import { useEffect, useState } from 'react';
import { getColorByPercentage } from '../assets/shared/utils/color';
import type { CourseProgressResponse } from '../api/courses/details.types';
import { Link } from 'react-router-dom';

export default function ProgressCardItem({ item }: { item: CourseEntity }) {
  const { fetchCourse } = useCourseDetailsStudent();

  const [details, setDetails] = useState<CourseProgressResponse>();

  useEffect(() => {
    const load = async () => {
      const data = await fetchCourse(item.id);
      setDetails(data);
    };

    void load();
  }, [item.id, fetchCourse]);

  return (
    <ProgressCard>
      <span className="flex-nowrap align-items-start">
        <BlocksElementIcon size={22} />
        <Link
          style={{ ...dotsTextStyle, color: COLORS.text, textDecoration: 'none' }}
          to={`/student/study-plan?course=${item.id}`}
        >
          <TextBody
            style={dotsTextStyle}
            $label
            // onClick={() => navigate(`/student/study-plan?course=${item.id}`)}
          >
            {item.title}
          </TextBody>
        </Link>
      </span>
      <span>
        <SmallText>Прогрес:</SmallText>
        <TextBody $label>{item.target_score}%</TextBody>
      </span>
      <span>
        <SmallText>Тем завершено:</SmallText>
        <TextBody $label>
          {details?.certificate_progress.completed_topics} /{' '}
          {details?.certificate_progress.total_topics}
        </TextBody>
      </span>
      <span>
        <SmallText>Середній результат:</SmallText>
        <TextBody
          $label
          $color={getColorByPercentage(details?.certificate_progress.completion_pct ?? 0)}
        >
          {details?.certificate_progress.completion_pct}%
        </TextBody>
      </span>
    </ProgressCard>
  );
}

export const dotsTextStyle = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };

export const ProgressCard = styled.div`
  flex: 0 1 calc(50% - 8px);
  min-width: 0;
  max-width: calc(50% - 8px);

  background-color: ${COLORS.lighterBg};
  ${basicShadow};

  border-radius: 12px;
  padding: 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;

  ${actionEffect};

  ${SmallText} {
    font-size: 0.94rem;
    line-height: 1;
  }

  span {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    row-gap: 6px;
    align-items: center;
    width: 100%;

    svg {
      flex-shrink: 0;
    }

    &:first-child {
      padding-bottom: 4px;
      gap: 8px;
    }
  }

  ${media(BREAKPOINTS.lg)} {
    flex: 1 1 100%;
    max-width: 100%;
  }

  ${media(BREAKPOINTS.ml)} {
    flex: 0 1 calc(50% - 8px);
    max-width: calc(50% - 8px);
  }
`;
