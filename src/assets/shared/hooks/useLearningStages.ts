import { useMemo } from 'react';
import {
  STAGE_DEFINITIONS,
  StudyStatusEnum,
  StudyTypeEnum,
  type StudyDayEnum,
} from '../../../api/courses/learning-stages.types';

export interface StageItem {
  day: StudyDayEnum;
  module: string;
  type: StudyTypeEnum;
  status: StudyStatusEnum;
}

interface UseLearningStagesParams {
  currentStage: number; // з StudentProgress.stage (0-4)
  inRemediation: boolean; // з StudentProgress.in_remediation
}

export const useLearningStages = ({
  currentStage,
  inRemediation,
}: UseLearningStagesParams): StageItem[] => {
  return useMemo(() => {
    const stages: StageItem[] = STAGE_DEFINITIONS.map((def) => {
      let status: StudyStatusEnum;
      if (def.stage < currentStage) {
        status = StudyStatusEnum.COMPLETED;
      } else if (def.stage === currentStage) {
        status = StudyStatusEnum.IN_PROGRESS;
      } else {
        status = StudyStatusEnum.PLANNED;
      }
      return { day: def.day, module: def.module, type: def.type, status };
    });

    // Доробка прогалин — окремий стан, не прив'язаний до конкретного дня.
    // Вставляємо одразу після поточного етапу, тільки якщо студент реально в ремедіації.
    if (inRemediation) {
      const currentDay = STAGE_DEFINITIONS.find((d) => d.stage === currentStage)?.day;
      const insertIndex = stages.findIndex((s) => s.status === StudyStatusEnum.IN_PROGRESS) + 1;

      stages.splice(insertIndex, 0, {
        day: currentDay ?? STAGE_DEFINITIONS[currentStage]?.day,
        module: 'Доробка прогалин',
        type: StudyTypeEnum.FIX_ERRORS,
        status: StudyStatusEnum.IN_PROGRESS,
      });
    }

    return stages;
  }, [currentStage, inRemediation]);
};
