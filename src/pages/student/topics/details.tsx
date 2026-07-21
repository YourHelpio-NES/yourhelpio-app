import styled from 'styled-components';
import { CardTitle, SmallText, TextBody } from '../../../assets/styles/typography';
import { BasicBlock, basicShadow } from '../../../components/blocks';
import AppLayout from '../../../components/widgets/app/layout';
import { COLORS } from '../../../assets/styles/colors';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  GeneralKeywords,
  LabelValue,
  ResultStudyingBlock,
} from '../../../components/topic-details-content';
import { getColorByPercentage } from '../../../assets/shared/utils/color';
import { DoneIcon } from '../../../assets/images/icons/done-icon';
import { SparklesIcon } from '../../../assets/images/icons/sparkles-icon';
import { Button } from '../../../components/button';
import { BREAKPOINTS, media } from '../../../assets/styles/breakpoints';
import { LinkTitle } from '../../../components/title-section';
import { useTopicDetailsStudent } from '../../../assets/shared/hooks/useTopicDetailsStudent';
import { useEffect } from 'react';
import { useCourseDetailsStudent } from '../../../assets/shared/hooks/useCourseDetailsStudent';
import { useLearningStages } from '../../../assets/shared/hooks/useLearningStages';
import {
  studyDayLabels,
  StudyStatusEnumCode,
  StudyTypeEnumCode,
} from '../../../assets/shared/constants/topicDays';
import { StudyStatusEnum } from '../../../api/courses/learning-stages.types';
import { useCourseMaterials } from '../../../assets/shared/hooks/useCourseMaterials';
import { useDownloadMaterial } from '../../../assets/shared/hooks/useDownloadCourseMaterial';
import {
  FileIconWrap,
  FileInfo,
  FileList,
  FileTop,
} from '../../../components/upload-file/component';
import { getFileIconByText } from '../../../components/upload-file/functionality';

import pdfIcon from '../../../assets/images/icons/pdf-file.png';
import docsIcon from '../../../assets/images/icons/docs-file.png';
import attachIcon from '../../../assets/images/icons/attach-icon.png';
import imageIcon from '../../../assets/images/icons/image-icon.png';
import linkIcon from '../../../assets/images/icons/link-icon.png';
import { FileUploadIcon } from '../../../assets/images/icons/file-upload-icon';
import { TableBlock } from '../dashboard';

export default function TopicsDetailsStudentPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const navigate = useNavigate();
  const { topic, isLoading: topicLoader, fetchTopic } = useTopicDetailsStudent();
  const { course, fetchCourse, isLoading: courseLoader } = useCourseDetailsStudent();
  const topicCourse = course?.topics.find((x) => x.topic_id === topic?.id);
  const stages = useLearningStages({
    currentStage: topicCourse?.stage ?? 0,
    inRemediation: topicCourse?.in_remediation ?? true,
  });

  const { materials, isLoading: materialLoader, refetch } = useCourseMaterials();
  const { download, isLoading: isDownloading } = useDownloadMaterial();

  useEffect(() => {
    if (id) {
      void fetchTopic(Number(id));
    }
  }, [id, fetchTopic]);

  useEffect(() => {
    if (topic?.course_id) {
      void fetchCourse(topic.course_id);
    }
  }, [topic?.course_id, fetchCourse]);

  useEffect(() => {
    if (course?.course_id) {
      void refetch(course.course_id);
    }
  }, [course?.course_id, refetch]);

  if (!topic) {
    return (
      <AppLayout>
        <TextBody>Не вдалося завантажити тему</TextBody>
      </AppLayout>
    );
  }

  return (
    <AppLayout loadingState={courseLoader || topicLoader || materialLoader || isDownloading}>
      <WrapBlock>
        <DetailsBlock $gap={24} className="p-0">
          <LinkTitle
            firstTitle={topic.title}
            linkTo={`/student/study-plan?course=${course?.course_id}`}
          />
          <LabelValue label="Прогрес:">
            {/* {topicDetailsMock.progress ? ( */}
            <span className="d-flex gap-2 align-items-center">
              <TextBody $medium $color={getColorByPercentage(topicCourse?.progress_pct ?? 0)}>
                {topicCourse?.progress_pct}/100
              </TextBody>
              {topicCourse?.progress_pct === 100 && (
                <DoneIcon size={28} color={COLORS.status.success} />
              )}
            </span>
            {/* ) : (
              <PasswordIcon size={24} />
            )} */}
          </LabelValue>
          <ResultStudyingBlock learningOutcomesArr={topic.passport.outcomes} />
          <GeneralKeywords keywordsArr={topic.passport.keywords} />
        </DetailsBlock>
        <DetailsBlock $gap={24} className="p-0">
          <TableBlock
            className="align-items-start"
            $bgColor={COLORS.lighterBg}
            $gap={24}
            $titleColor={COLORS.accent}
          >
            <span className="d-flex gap-2 align-items-center">
              <SparklesIcon />
              <CardTitle>Коротко про тему</CardTitle>
            </span>
            <TextBody>{topic.passport.summary}</TextBody>
          </TableBlock>

          <TableBlock
            className="align-items-start"
            $bgColor={COLORS.lighterBg}
            $gap={12}
            $titleColor={COLORS.accent}
          >
            <span className="d-flex gap-2 align-items-center">
              <CardTitle>Матеріали курсу</CardTitle>
            </span>
            {materials.length > 0 && (
              <FileList className={'w-100'}>
                {materials.map((f) => {
                  const icon = getFileIconByText(f.file_path);
                  return (
                    <FileTop
                      style={{
                        border: `1px solid ${COLORS.boxShadow}`,
                        padding: '8px',
                        borderRadius: '8px',
                      }}
                    >
                      <FileIconWrap
                        $type={icon}
                        src={
                          icon === 'pdf'
                            ? pdfIcon
                            : icon === 'docs'
                              ? docsIcon
                              : icon === 'image'
                                ? imageIcon
                                : icon === 'link'
                                  ? linkIcon
                                  : attachIcon
                        }
                      />
                      <FileInfo>
                        <SmallText $medium>
                          {f.filename}
                          {f.status === 'indexed' && (
                            <DoneIcon color={COLORS.status.success} size={22} />
                          )}
                        </SmallText>
                        <SmallText $color={COLORS.placeholder}>
                          {new Date(f.uploaded_at).toLocaleDateString('uk-UA')}
                        </SmallText>
                      </FileInfo>
                      {f.status === 'pending' && <SmallText>Завантажується</SmallText>}

                      {!(isDownloading || f.status !== 'indexed') && (
                        <Button
                          $bgColor={'transparent'}
                          $brColor={'transparent'}
                          width="auto"
                          $brRadius={'8'}
                          $iconSize={24}
                          $type={'small'}
                          className="p-0"
                          style={{ transform: 'rotate(180deg)' }}
                          onClick={() => download(course!.course_id, f.id, f.filename)}
                        >
                          <FileUploadIcon color={COLORS.placeholder} size={20} />
                        </Button>
                      )}
                    </FileTop>
                  );
                })}
              </FileList>
            )}
          </TableBlock>
        </DetailsBlock>
      </WrapBlock>
      <DetailsBlock $gap={24} $titleColor={COLORS.accent} className="px-0">
        <CardTitle>Етапи навчання</CardTitle>
        <StageList>
          {stages.map((item, index) => (
            <StageCard key={index}>
              <StageInfo>
                <TextBody $label>{studyDayLabels[item.day]}</TextBody>

                <span>
                  <TextBody>{item.module}</TextBody>
                  <TextBody>—</TextBody>
                  <TextBody $medium>{StudyTypeEnumCode[item.type]}</TextBody>
                </span>
              </StageInfo>

              <Button
                $type="large"
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
                    navigate(`/student/study-session/studying?topicId=${topic.id}`);
                }}
              >
                <span className="d-flex gap-2 align-items-center">
                  <TextBody $medium>{StudyStatusEnumCode[item.status]}</TextBody>
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

export const StageInfo = styled.div`
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

export const StageCard = styled.div`
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
