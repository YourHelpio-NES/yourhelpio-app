import { useParams, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { ToastTypeEnum } from '../../../../../assets/shared/constants/custom-toast';
import { COLORS } from '../../../../../assets/styles/colors';
import { CardTitle, TextBody } from '../../../../../assets/styles/typography';
import { BasicBlock } from '../../../../../components/blocks';
import { Button } from '../../../../../components/button';
import showToast from '../../../../../components/toast/show';
import AppLayout from '../../../../../components/widgets/app/layout';

interface LocationState {
  inviteCode: string;
  courseTitle: string;
}

export default function CourseCreatedPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  if (!state?.inviteCode) {
    return <Navigate to={`/teacher/courses/${id}`} replace />;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(state.inviteCode);
    showToast(ToastTypeEnum.SUCCESS, 'Скопійовано', 'Код запрошення скопійовано в буфер обміну');
  };

  return (
    <AppLayout>
      <BasicBlock $gap={24} className="align-items-center">
        <CardTitle>Курс «{state.courseTitle}» створено!</CardTitle>
        <TextBody>
          Поділіться цим кодом зі студентами, щоб вони могли приєднатися до курсу:
        </TextBody>

        <BasicBlock
          $bgColor={COLORS.lighterBg}
          $gap={12}
          className="align-items-center"
          style={{ padding: 24, borderRadius: 16 }}
        >
          <CardTitle style={{ letterSpacing: 4 }}>{state.inviteCode}</CardTitle>
          <Button onClick={handleCopy}>
            <TextBody $medium>Скопіювати код</TextBody>
          </Button>
        </BasicBlock>

        <Button
          $bgColor="transparent"
          $txtColor={COLORS.accent}
          $brWidth="2"
          onClick={() => navigate(`/teacher/courses/${id}/overview`)}
        >
          <TextBody $medium>Перейти до курсу</TextBody>
        </Button>
      </BasicBlock>
    </AppLayout>
  );
}
