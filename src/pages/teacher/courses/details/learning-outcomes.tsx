import { useMemo, useState } from 'react';
import { COLORS } from '../../../../assets/styles/colors';
import { BasicBlock } from '../../../../components/blocks';
import Input from '../../../../components/input';
import { InputTypeEnum } from '../../../../assets/shared/constants/input';
import { Button } from '../../../../components/button';
import { SmallText, TextBody } from '../../../../assets/styles/typography';
import { TopicOutcomesIcon } from '../../../../assets/images/icons/topic-outcomes-icon';
import {
  LearningOutcomesTypeEnum,
  learningOutcomesTypes,
} from '../../../../assets/shared/constants/details-course';
import { learningOutcomesMock } from '../../../../assets/shared/data/learning-outcomes';
import { CourseCard } from '../main';

export default function LearningOutcomesDetailsCourseTab() {
  const [filterType, setFilterType] = useState<string>(LearningOutcomesTypeEnum.ALL);
  const [searchValue, setSearchValue] = useState<string>('');

  const filteredArr = useMemo(() => {
    if (filterType === LearningOutcomesTypeEnum.ALL) {
      return learningOutcomesMock;
    }

    return learningOutcomesMock.filter((x) => x.type === filterType);
  }, [filterType]);
  return (
    <>
      <BasicBlock
        $direction={'row'}
        $gap={12}
        className="align-items-start justify-content-between flex-lg-row flex-md-column flex-column"
        $bgColor={COLORS.lighterBg}
      >
        <span className="d-flex flex-column gap-2 align-items-start w-100">
          <span className="d-flex gap-2 align-items-center">
            <TopicOutcomesIcon color={COLORS.text} size={28} />
            <TextBody $medium>15 результатів навчання</TextBody>
          </span>
          <TextBody>Сформовані на основі тем курсу та навчальних матеріалів</TextBody>
        </span>
        <span className="d-flex gap-2 w-100 pt-sm-3">
          <Input
            value={searchValue}
            setValue={setSearchValue}
            type={InputTypeEnum.TEXT}
            placeholder="Введіть ключові слова для пошуку..."
          />
          <Button>
            <TextBody>Пошук</TextBody>
          </Button>
        </span>
      </BasicBlock>
      <span className="d-flex flex-wrap gap-1">
        {Object.entries(learningOutcomesTypes).map((item, key) => (
          <Button
            $bgColor={filterType === item[0] ? COLORS.boxShadow : 'transparent'}
            $txtColor={COLORS.text}
            $brColor={filterType === item[0] ? COLORS.boxShadow : COLORS.text}
            width="auto"
            $type={'small'}
            key={key}
            $brRadius={'10'}
            onClick={() => setFilterType(item[0])}
          >
            <SmallText $medium={filterType === item[0]}>{item[1]}</SmallText>
          </Button>
        ))}
      </span>
      <BasicBlock $gap={12} className="flex-wrap" $bgColor={'transparent'} $direction={'row'}>
        {filteredArr.length === 0 ? (
          <TextBody>Для обраного фільтра елементів не знайдено</TextBody>
        ) : (
          filteredArr.map((item) => (
            <CourseCard key={JSON.stringify(item)} className="gap-1 justify-content-start">
              <span className="d-flex justify-content-between">
                <TextBody $medium>{item.title}</TextBody>
                <Button
                  $bgColor={COLORS.background}
                  $txtColor={COLORS.secondaryDark}
                  $brColor={COLORS.secondary}
                  width="auto"
                  $type={'small'}
                  $brRadius={'12'}
                  className="px-2"
                >
                  <SmallText $medium>{learningOutcomesTypes[item.type]}</SmallText>
                </Button>
              </span>
              <TextBody>Тема: {item.topic}</TextBody>
            </CourseCard>
          ))
        )}
      </BasicBlock>
    </>
  );
}
