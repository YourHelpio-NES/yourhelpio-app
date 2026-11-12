import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import { BasicBlock } from '../../../../../components/blocks';
import { COLORS } from '../../../../../assets/styles/colors';
import { CardTitle, TextBody } from '../../../../../assets/styles/typography';
import { Textarea } from '../../../../../components/input';
import { useEffect, useState } from 'react';
import { DetailsBlock } from './details';
import type { TopicListItem } from '../../../../../api/courses/courses.types';
import { axiosInstance } from '../../../../../api/axios-instance';
import { getErrorMessage } from '../../../../../assets/shared/utils/getErrorMessage';
import showToast from '../../../../../components/toast/show';
import { coursesApi } from '../../../../../api/courses/courses.api';
import { ToastTypeEnum } from '../../../../../assets/shared/constants/custom-toast';
import { Button } from '../../../../../components/button';

export default function TopicUpdateMainPageCourseTab() {
  const courseId = useOutletContext<number>();
  const [searchParams] = useSearchParams();
  const topicId = Number(searchParams.get('id'));

  const navigate = useNavigate();

  const [topic, setTopic] = useState<TopicListItem | null>(null);
  const [summary, setSummary] = useState('');
  const [outcomes, setOutcomes] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    coursesApi.getTopicById(topicId).then(({ data }) => {
      setTopic(data);
      setSummary(data.passport?.summary ?? '');
      setOutcomes(data.passport?.outcomes ?? []);
      setKeywords(data.passport?.keywords ?? []);
    });
  }, [topicId]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await axiosInstance.put(`/topics/${topicId}/passport`, {
        passport: { ...topic?.passport, summary, outcomes, keywords },
      });
      showToast(ToastTypeEnum.SUCCESS, 'Збережено', 'Зміни успішно збережено');
      navigate(`/teacher/courses/${courseId}/topics/details?id=${topicId}`);
    } catch (err: unknown) {
      showToast(ToastTypeEnum.ERROR, 'Помилка', getErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  };

  if (!topic) return <TextBody>Завантаження...</TextBody>;

  return (
    <DetailsBlock width="100%" $direction="row" $gap={40} $bgColor={COLORS.lighterBg}>
      <BasicBlock
        className="align-items-start flex-grow-1"
        width="65%"
        $gap={24}
        $bgColor={COLORS.lighterBg}
      >
        <CardTitle>{topic.title}</CardTitle>
        <Textarea value={summary} setValue={setSummary} />
        {/* редагування outcomes/keywords як простих текстових списків, без isVerified */}
      </BasicBlock>
      <BasicBlock $gap={12} className="flex-grow-1" $bgColor={COLORS.lighterBg} width="35%">
        <Button
          $type="large"
          width="auto"
          $bgColor={COLORS.accent}
          $txtColor={COLORS.lighterBg}
          onClick={handleSave}
          disabled={isSaving}
        >
          <TextBody $medium>{isSaving ? 'Зберігаємо...' : 'Зберегти зміни'}</TextBody>
        </Button>
      </BasicBlock>
    </DetailsBlock>
  );
}
