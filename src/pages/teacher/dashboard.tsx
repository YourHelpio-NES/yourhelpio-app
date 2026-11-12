import AppLayout from '../../components/widgets/app/layout';
import { CardTitle, SmallText, TextBody } from '../../assets/styles/typography';
import { actionEffect, BasicBlock, basicShadow } from '../../components/blocks';
import { COLORS } from '../../assets/styles/colors';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../components/button';
import { BREAKPOINTS, media } from '../../assets/styles/breakpoints';
import { getColorByPercentage } from '../../assets/shared/utils/color';
import { Select } from '../../components/dropdown';
import { StudentsIcon } from '../../assets/images/icons/students-icon';
import { Divider } from '../notification';

import graphicIcon from '../../assets/images/icons/graphics-icon.png';
import { WarningTriangleIcon } from '../../assets/images/icons/warning-triangle-icon';
import { ArrowIcon } from '../../assets/images/icons/arrow-icon';
import { TableBlock } from '../student/dashboard';
import { useState } from 'react';
import {
  useTeacherCourses,
  useTeacherDashboard,
  RANK_LABELS,
} from '../../assets/shared/hooks/useTeacherDashboard';

export default function DashboardPageTeacher() {
  const navigate = useNavigate();

  const { courses, isLoading: coursesLoading } = useTeacherCourses();
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const activeCourseId = selectedCourseId ?? courses[0]?.id ?? null;

  const {
    isLoading: analyticsLoading,
    studentsCount,
    averageGrade,
    rankDistribution,
    weakestTopics,
    topFailingQuestions,
    strugglingStudents,
    suspiciousStudents,
  } = useTeacherDashboard(activeCourseId);

  if (courses.length === 0) {
    return (
      <AppLayout loadingState={coursesLoading || (analyticsLoading && !studentsCount)}>
        <TextBody>У вас ще немає створених курсів та статистики</TextBody>
      </AppLayout>
    );
  }

  const dominantRank =
    Object.entries(rankDistribution).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'NOVICE';

  return (
    <AppLayout loadingState={coursesLoading || (analyticsLoading && !studentsCount)}>
      <span className="w-100 d-flex align-items-center gap-3">
        <TextBody $medium>Курс:</TextBody>
        <Select
          value={activeCourseId?.toString() ?? ''}
          onChange={(value) => {
            setSelectedCourseId(Number(value));
          }}
          options={courses.map((course) => ({
            label: course.title,
            value: course.id.toString(),
          }))}
          errorText={courses.length === 0 ? 'Немає доступних курсів' : undefined}
        />
      </span>

      <BasicBlock
        $direction="row"
        className="flex-md-wrap flex-sm-wrap flex-wrap gap-md-3 gap-sm-2"
        width={'100%'}
      >
        <CardItem>
          <span className="d-flex gap-2 align-items-center">
            <StudentsIcon />
            <CardTitle>Студенти</CardTitle>
          </span>
          <TextBody $medium $color={COLORS.accent}>
            {studentsCount} записано
          </TextBody>
          <Divider />
          <TextBody>
            Середня оцінка:{' '}
            <TextBody as="span" $medium>
              {averageGrade} / 5
            </TextBody>
          </TextBody>
        </CardItem>

        <CardItem>
          <span className="d-flex gap-2 align-items-center">
            <img src={graphicIcon} alt="graphic-icon" />
            <CardTitle>Розподіл рангів</CardTitle>
          </span>
          <span className="d-flex gap-1 flex-column align-items-start w-100">
            {Object.entries(rankDistribution).map(([rank, count]) => (
              <span key={rank} className="d-flex justify-content-between w-100">
                <TextBody>{RANK_LABELS[rank]}</TextBody>
                <TextBody $medium>{count}</TextBody>
              </span>
            ))}
          </span>
          <TextBody>
            Переважний рівень:{' '}
            <TextBody as="span" $medium>
              {RANK_LABELS[dominantRank]}
            </TextBody>
          </TextBody>
        </CardItem>

        <CardItem>
          <span className="d-flex gap-2 align-items-center">
            <WarningTriangleIcon color={COLORS.secondary} />
            <CardTitle>Проблемні теми</CardTitle>
          </span>
          <CardTitle>{weakestTopics.filter((t) => t.avgProgress < 60).length}</CardTitle>
          <Divider />
          {weakestTopics[0] && (
            <span data-type="footer" className="d-flex gap-1 flex-column align-items-start">
              <TextBody>Найбільше труднощів:</TextBody>
              <span className="d-flex gap-2 align-items-center">
                <TextBody $medium>{weakestTopics[0].title} –</TextBody>
                <TextBody $medium $color={COLORS.status.error}>
                  {weakestTopics[0].avgProgress}%
                </TextBody>
              </span>
            </span>
          )}
        </CardItem>
      </BasicBlock>

      <BasicBlock
        $direction="row"
        className="flex-md-wrap flex-sm-wrap flex-wrap gap-md-3 gap-sm-2"
        width={'100%'}
      >
        <TableBlock
          $titleColor={COLORS.text}
          $bgColor={'transparent'}
          $brColor={COLORS.secondary}
          $gap={24}
          width="auto"
          className={'align-items-start flex-grow-1'}
        >
          <CardTitle>Теми з низьким засвоєнням</CardTitle>

          <span className="d-flex flex-column gap-2 w-100">
            {weakestTopics.slice(0, 5).map((item) => (
              <LineCard
                className="d-flex justify-content-between align-items-center w-100"
                key={item.topicId}
              >
                <TextBody className="text-nowrap" $medium $color={COLORS.text}>
                  {item.title}
                </TextBody>
                <span className="w-auto d-flex align-items-center flex-grow-1">
                  <TextBody $label $color={getColorByPercentage(item.avgProgress)}>
                    {item.avgProgress}%
                  </TextBody>
                </span>
                <Button
                  $bgColor={'transparent'}
                  $txtColor={COLORS.secondaryDark}
                  $brColor={COLORS.secondaryDark}
                  width="auto"
                  $type={'small'}
                  onClick={() =>
                    navigate(`/teacher/courses/${selectedCourseId}/topics/${item.topicId}`)
                  }
                >
                  <SmallText>Деталі</SmallText>
                </Button>
              </LineCard>
            ))}
          </span>
          <Button
            $type="large"
            width="auto"
            $bgColor={'transparent'}
            $txtColor={COLORS.accent}
            $brWidth={'2'}
            onClick={() => navigate(`/teacher/courses/${selectedCourseId}`)}
          >
            <TextBody $medium>Переглянути всі</TextBody>
            <ArrowIcon direction="right" color={COLORS.accent} />
          </Button>
        </TableBlock>

        <TableBlock
          className="flex-grow-1 align-items-start"
          width={'auto'}
          $gap={16}
          $bgColor={COLORS.lighterBg}
          $titleColor={COLORS.primary}
        >
          <CardTitle>Найпроблемніші питання</CardTitle>
          <span className="d-flex flex-column gap-2 w-100">
            {topFailingQuestions.map((q) => (
              <LineCard key={q.task_id} className="flex-column align-items-start">
                <TextBody $medium $color={COLORS.text}>
                  {q.question}
                </TextBody>
                <span className="d-flex gap-2 align-items-center">
                  <TextBody $color={COLORS.status.error} $medium>
                    {q.wrong_rate_pct}% помилок
                  </TextBody>
                  <SmallText>({q.total_attempts} спроб)</SmallText>
                  {q.difficulty_level === 'L1' && q.wrong_rate_pct > 40 && (
                    <SmallText $color={COLORS.status.warning}>
                      ⚠ можливо, погане формулювання
                    </SmallText>
                  )}
                </span>
              </LineCard>
            ))}
          </span>
        </TableBlock>
      </BasicBlock>

      <BasicBlock
        $direction="row"
        className="flex-md-wrap flex-sm-wrap flex-wrap gap-md-3 gap-sm-2"
        width={'100%'}
      >
        <TableBlock
          $gap={16}
          $bgColor={COLORS.lighterBg}
          $titleColor={COLORS.primary}
          width="auto"
          className="flex-grow-1"
        >
          <CardTitle>Потребують уваги</CardTitle>
          <span className="d-flex flex-column gap-2 w-100">
            {strugglingStudents.map((s) => (
              <span key={s.student_id} className="d-flex justify-content-between w-100">
                <TextBody>{s.student_name}</TextBody>
                <TextBody $medium $color={COLORS.status.error}>
                  {s.grade}/5
                </TextBody>
              </span>
            ))}
          </span>
        </TableBlock>

        {suspiciousStudents.length > 0 && (
          <TableBlock
            $gap={16}
            $bgColor={COLORS.lighterBg}
            $titleColor={COLORS.status.warning}
            width="auto"
            className="flex-grow-1"
          >
            <CardTitle>⚠ Потребує перевірки</CardTitle>
            <TextBody>Багато перемикань вкладки при високій оцінці</TextBody>
            <span className="d-flex flex-column gap-2 w-100">
              {suspiciousStudents.map((s) => (
                <span key={s.student_id} className="d-flex justify-content-between w-100">
                  <TextBody>{s.student_name}</TextBody>
                  <TextBody $medium>
                    {s.tab_switches} перемикань, {s.grade}/5
                  </TextBody>
                </span>
              ))}
            </span>
          </TableBlock>
        )}
      </BasicBlock>
    </AppLayout>
  );
}

const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 25%;
  width: auto;
  gap: 12px;
  padding: 24px;
  background-color: ${COLORS.lighterBg};
  border-radius: 24px;
  ${basicShadow};
  svg,
  img {
    width: 26px;
    height: 26px;
  }
  ${Divider} {
    margin: 8px 0;
  }

  ${media(BREAKPOINTS.xl)} {
    max-width: 30%;
  }
  ${media(BREAKPOINTS.lg)} {
    max-width: 33%;
  }
  ${media(BREAKPOINTS.md)} {
    max-width: 49%;
    padding: 20px;
    svg,
    img {
      width: 20px;
      height: 20px;
    }
  }
  ${media(657)} {
    max-width: 100%;
    width: 100%;
    span[data-type='footer'] {
      flex-direction: row !important;
      gap: 16px !important;
    }
  }
`;

const LineCard = styled.div`
  width: 100%;
  padding: 14px 24px;
  display: flex;
  min-width: 0;
  overflow: hidden;
  gap: 12px;
  ${basicShadow};
  border-radius: 12px;
  background-color: ${COLORS.lighterBg};
  ${actionEffect};
  div {
    margin-top: 1px;
  }
  span {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 12px;
    row-gap: 6px;
  }
  ${media(BREAKPOINTS.ml)} {
    padding: 14px 16px;
  }
`;
