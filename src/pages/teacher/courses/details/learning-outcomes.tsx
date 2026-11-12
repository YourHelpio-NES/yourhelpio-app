import { useMemo, useState } from 'react';
import { COLORS } from '../../../../assets/styles/colors';
import { BasicBlock } from '../../../../components/blocks';
import Input from '../../../../components/input';
import { InputTypeEnum } from '../../../../assets/shared/constants/input';
import { TextBody } from '../../../../assets/styles/typography';
import { TopicOutcomesIcon } from '../../../../assets/images/icons/topic-outcomes-icon';
import { CourseCard } from '../main';
import { useParams } from 'react-router-dom';
import { useCourseTopicsList } from '../../../../assets/shared/hooks/useCourseTopicsList';

export default function LearningOutcomesDetailsCourseTab() {
  const { courseId } = useParams<{ courseId: string }>();
  const id = Number(courseId);

  const { topics, isLoading } = useCourseTopicsList(id); // GET /courses/{id}/topics
  const [searchValue, setSearchValue] = useState('');

  const allOutcomes = useMemo(() => {
    return topics.flatMap((topic) =>
      (topic.passport?.outcomes ?? []).map((outcome) => ({
        topicTitle: topic.title,
        text: outcome,
      }))
    );
  }, [topics]);

  const filtered = useMemo(() => {
    if (!searchValue.trim()) return allOutcomes;
    return allOutcomes.filter((o) => o.text.toLowerCase().includes(searchValue.toLowerCase()));
  }, [allOutcomes, searchValue]);

  if (isLoading) return <TextBody>Завантаження...</TextBody>;

  return (
    <>
      <BasicBlock
        $direction={'row'}
        $gap={12}
        className="justify-content-between"
        $bgColor={COLORS.lighterBg}
      >
        <span className="d-flex flex-column gap-2 align-items-start w-100">
          <span className="d-flex gap-2 align-items-center">
            <TopicOutcomesIcon color={COLORS.text} size={28} />
            <TextBody $medium>{allOutcomes.length} результатів навчання</TextBody>
          </span>
          <TextBody>Сформовані на основі тем курсу та навчальних матеріалів</TextBody>
        </span>
        <span className="d-flex gap-2 w-100">
          <Input
            value={searchValue}
            setValue={setSearchValue}
            type={InputTypeEnum.TEXT}
            placeholder="Пошук..."
          />
        </span>
      </BasicBlock>

      <BasicBlock $gap={12} className="flex-wrap" $bgColor="transparent" $direction={'row'}>
        {filtered.length === 0 ? (
          <TextBody>Нічого не знайдено</TextBody>
        ) : (
          filtered.map((item, i) => (
            <CourseCard key={i} className="gap-1 justify-content-start">
              <TextBody $medium>{item.text}</TextBody>
              <TextBody>Тема: {item.topicTitle}</TextBody>
            </CourseCard>
          ))
        )}
      </BasicBlock>
    </>
  );
}
