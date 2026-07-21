import { useNavigate, useSearchParams } from 'react-router-dom';
import { TOPIC_DETAILS_TEACHER } from '../../../../../assets/shared/data/topics-teacher-data';
import { BasicBlock } from '../../../../../components/blocks';
import { COLORS } from '../../../../../assets/styles/colors';
import { BlocksElementIcon } from '../../../../../assets/images/icons/blocks-element-icon';
import { CardTitle, SmallText, TextBody } from '../../../../../assets/styles/typography';
import Input, { Textarea } from '../../../../../components/input';
import { InputTypeEnum } from '../../../../../assets/shared/constants/input';
import {
  ButtonStyleSpan,
  GeneralKeywords,
  getVerifiedStatusItem,
  ResultStudyingBlock,
} from '../../../../../components/topic-details-content';
import { Button } from '../../../../../components/button';
import {
  type LearningOutcome,
  type TopicDetailTeacher,
} from '../../../../../assets/shared/constants/details-course';
import { useState } from 'react';
import { DetailsBlock } from './details';
import { FileUpload } from '../../../../../components/upload-file/component';
import { CloseIcon } from '../../../../../assets/images/icons/close-icon';

export default function TopicUpdateMainPageCourseTab() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [isEditFiles, setIsEditFiles] = useState<boolean>(false);

  const id = searchParams.get('id');
  const [activeRow, setActiveRow] = useState<TopicDetailTeacher>(
    TOPIC_DETAILS_TEACHER[Number.parseInt(id ?? '1') - 1]
  );

  return (
    <DetailsBlock width="100%" $direction="row" $gap={40} $bgColor={COLORS.lighterBg}>
      <BasicBlock
        className="align-items-start flex-grow-1"
        width="65%"
        $gap={24}
        $bgColor={COLORS.lighterBg}
      >
        <span className="d-flex w-100 gap-3 align-items-start justify-content-between">
          <span className="d-flex gap-2 align-items-center w-100">
            <BlocksElementIcon size={28} />
            <CardTitle>Тема</CardTitle>
            <Input
              value={activeRow.topicName}
              setValue={(e) =>
                setActiveRow((prev) => ({
                  ...prev,
                  topicName: e.toString(),
                }))
              }
              type={InputTypeEnum.TEXT}
            />
          </span>
        </span>
        <Textarea value={activeRow.description} setValue={() => {}} />

        <ResultStudyingBlock
          mode="edit"
          learningOutcomesArr={activeRow.learningOutcomes}
          onChange={(item, status) =>
            setActiveRow({
              ...activeRow,
              learningOutcomes: activeRow.learningOutcomes.map((outcome) =>
                outcome.id === item.id
                  ? {
                      ...outcome,
                      isVerified: status,
                    }
                  : outcome
              ),
            })
          }
        />
        <GeneralKeywords
          mode="edit"
          isVerifiedStatus={activeRow.keyTermsVerified}
          keywordsArr={activeRow.keyTerms}
          keywordsArrOriginal={TOPIC_DETAILS_TEACHER[Number.parseInt(id ?? '1') - 1].keyTerms}
          onChange={(targetItem, status) => {
            setActiveRow((prev) => ({
              ...prev,
              keyTerms: status
                ? prev.keyTerms.includes(targetItem)
                  ? prev.keyTerms
                  : [...prev.keyTerms, targetItem]
                : prev.keyTerms.filter((item) => item !== targetItem),
            }));
          }}
        />
      </BasicBlock>
      <BasicBlock $gap={12} className="flex-grow-1" $bgColor={COLORS.lighterBg} width="35%">
        <span className="d-flex flex-column gap-2 align-items-start">
          <TextBody $medium>Матеріали:</TextBody>
          <div className="d-flex flex-wrap gap-3">
            {activeRow.materials.map((item) =>
              isEditFiles ? (
                <ButtonStyleSpan key={JSON.stringify(item)} $bgColor={COLORS.secondary}>
                  <SmallText>– {item.fileName}</SmallText>
                  <Button
                    $bgColor={COLORS.lighterBg}
                    $brColor={COLORS.lighterBg}
                    width="auto"
                    $brRadius={'24'}
                    $iconSize={20}
                    $type={'small'}
                    className="p-0"
                    onClick={() =>
                      setActiveRow((prev) => ({
                        ...prev,
                        materials: prev.materials.filter((targetItem) => item !== targetItem),
                      }))
                    }
                  >
                    <CloseIcon color={COLORS.status.error} size={20} />
                  </Button>
                </ButtonStyleSpan>
              ) : (
                <span key={JSON.stringify(item)} className="d-flex gap-2 align-items-center">
                  <SmallText>– {item.fileName}</SmallText> {getVerifiedStatusItem(item.verified)}
                </span>
              )
            )}
          </div>
          {isEditFiles && <FileUpload />}
          {!isEditFiles && (
            <Button
              className=""
              $type="small"
              width="100%"
              $bgColor={COLORS.primary}
              $brColor={COLORS.primary}
              $txtColor={COLORS.lighterBg}
              $brWidth={'2'}
              onClick={() => setIsEditFiles(true)}
            >
              <TextBody $medium>Редагувати файли</TextBody>
            </Button>
          )}
        </span>
        <Button
          className="text-nowrap mt-auto"
          $type="large"
          width="auto"
          $bgColor={COLORS.accent}
          $txtColor={COLORS.lighterBg}
          $brColor={COLORS.accent}
          $brWidth={'2'}
          disabled={activeRow == TOPIC_DETAILS_TEACHER[Number.parseInt(id ?? '1') - 1]}
          onClick={() => navigate(`/teacher/courses/details/topics/details?id=${activeRow.id}`)}
        >
          <TextBody $medium>Зберегти зміни</TextBody>
        </Button>

        {(activeRow.keyTerms.length < 3 ||
          activeRow.learningOutcomes.filter((item: LearningOutcome) => item.isVerified).length <
            3) && (
          <span className="w-100 d-flex flex-column gap-2 pt-lg-0 pt-md-3">
            <Button
              $bgColor={'transparent'}
              $txtColor={COLORS.accent}
              $brColor={COLORS.accent}
              width="auto"
              className="text-nowrap"
              $type={'large'}
            >
              <SmallText $medium>Згенерувати результати ще раз</SmallText>
            </Button>
            <SmallText $color={COLORS.secondaryDark}>
              Поточних результатів недостатньо. Ви можете згенерувати їх повторно, щоб отримати
              інший варіант з урахуванням внесених змін.
            </SmallText>
          </span>
        )}
      </BasicBlock>
    </DetailsBlock>
  );
}
