import styled from 'styled-components';
import { QuestionStatusEnum } from '../assets/shared/constants/questions';
import { COLORS } from '../assets/styles/colors';
import type { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import CustomToast from './toast/custom';
import { ToastTypeEnum } from '../assets/shared/constants/custom-toast';

export const ProgressDots = ({
  statuses,
  currentIndex,
  setCurrentIndex,
}: {
  statuses: QuestionStatusEnum[];
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}) => (
  <span className="d-flex gap-1">
    {statuses.map((status, i) => (
      <ProgressDot
        key={i}
        $status={status}
        onClick={() => {
          if (status === QuestionStatusEnum.CORRECT || status === QuestionStatusEnum.INCORRECT) {
            setCurrentIndex(i);
            return;
          }

          toast(
            (t) => (
              <CustomToast
                t={t}
                type={ToastTypeEnum.INFO}
                title="Перехід на наступне питання"
                text="Для того щоб перейти далі, дайте відповідь на поточне запитання."
              />
            ),
            { duration: 10000 }
          );
        }}
        $isCurrent={i === currentIndex}
      />
    ))}
  </span>
);

const ProgressDot = styled.div<{ $status: QuestionStatusEnum; $isCurrent: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid ${({ $status }) => dotColors[$status]};
  background-color: ${({ $status, $isCurrent }) =>
    $isCurrent ? dotColors[$status] : 'transparent'};
  transition: all 0.2s ease;
`;

const dotColors: Record<QuestionStatusEnum, string> = {
  [QuestionStatusEnum.UNANSWERED]: COLORS.secondary,
  [QuestionStatusEnum.CORRECT]: COLORS.status.success,
  [QuestionStatusEnum.INCORRECT]: COLORS.status.error,
  [QuestionStatusEnum.SKIPPED]: COLORS.status.warning,
};
