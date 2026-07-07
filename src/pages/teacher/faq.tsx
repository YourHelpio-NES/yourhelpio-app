import { useState } from 'react';
import { FilterTypesFaq } from '../../assets/shared/constants/faq-types';
import { COLORS } from '../../assets/styles/colors';
import { SmallText, TextBody } from '../../assets/styles/typography';
import { BasicBlock } from '../../components/blocks';
import { Button } from '../../components/button';
import { LinkTitle } from '../../components/title-section';
import AppLayout from '../../components/widgets/app/layout';
import { extremelyRepeating } from '../../assets/shared/data/courses';
import { QuestionsAccordion } from '../../components/faq-accordion';
import Input from '../../components/input';
import { InputTypeEnum } from '../../assets/shared/constants/input';

export default function FaqTeacherPage() {
  const [filterType, setFilterType] = useState<string>(FilterTypesFaq.ALL);
  const [selectCourse, setSelectCourse] = useState<string>(extremelyRepeating[0].course);

  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <AppLayout>
      <BasicBlock
        $direction={'column'}
        width="100%"
        className="flex-column w-100 gap-md-4 gap-3 align-items-start"
        $gap={24}
      >
        <span className="d-flex flex-column gap-2">
          <LinkTitle firstTitle="Часті запитання (FAQ)" />
          <TextBody>Допоможіть студентам вирішити їх питання щодо курсів</TextBody>
        </span>
        <BasicBlock width="100%" $gap={12}>
          <span className="d-flex gap-2 pb-2">
            <Input
              value={searchValue}
              setValue={setSearchValue}
              type={InputTypeEnum.TEXT}
              placeholder="Пошук питання..."
            />
            <Button>
              <TextBody>Пошук</TextBody>
            </Button>
          </span>
          <span className="d-flex flex-wrap gap-1">
            {Object.entries(FilterTypesFaq).map((item, key) => (
              <Button
                $bgColor={filterType === item[1] ? COLORS.secondary : 'transparent'}
                $txtColor={filterType === item[1] ? COLORS.lighterBg : COLORS.text}
                $brColor={filterType === item[1] ? COLORS.secondary : COLORS.text}
                width="auto"
                type={'small'}
                key={key}
                onClick={() => setFilterType(item[1])}
              >
                <SmallText>{item[1]}</SmallText>
              </Button>
            ))}
          </span>
          <span className="d-flex flex-wrap gap-1">
            {extremelyRepeating.map((item, key) => (
              <Button
                $bgColor={COLORS.lighterBg}
                $txtColor={selectCourse === item.course ? COLORS.secondary : COLORS.text}
                $brWidth={selectCourse === item.course ? '2' : '1'}
                $brColor={COLORS.secondary}
                width="auto"
                type={'small'}
                key={key}
                onClick={() => setSelectCourse(item.course)}
              >
                <SmallText $medium={selectCourse === item.course}>{item.course}</SmallText>
              </Button>
            ))}
          </span>
        </BasicBlock>

        <QuestionsAccordion isTeacherMode />
      </BasicBlock>
    </AppLayout>
  );
}
