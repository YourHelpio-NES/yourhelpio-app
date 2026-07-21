import { BlocksElementIcon } from '../../../../assets/images/icons/blocks-element-icon';
import { COLORS } from '../../../../assets/styles/colors';
import { CardTitle, TextBody } from '../../../../assets/styles/typography';
import { BasicBlock } from '../../../../components/blocks';
import { Button } from '../../../../components/button';
import { ProgressBar } from '../../../../components/progress-bar';
import { LabelValue } from '../../../../components/topic-details-content';
import { TableBlock } from '../../../student/dashboard';

import graphIcon from '../../../../assets/images/icons/graph-grow.png';
import { ArrowIcon } from '../../../../assets/images/icons/arrow-icon';

export default function OverviewDetailsCourseTab() {
  return (
    <>
      <BasicBlock
        $direction={'row'}
        $gap={24}
        className="align-items-start"
        $bgColor={COLORS.lighterBg}
      >
        <span className="d-flex flex-column gap-3 align-items-start">
          <span className="d-flex gap-2 align-items-start">
            <BlocksElementIcon size={28} />
            <CardTitle>Алгоритми проєктування</CardTitle>
          </span>
          <TextBody>
            Курс для студентів допоможе визначити тему тип даних, теорія, як їх використовувати на
            практиці та вміти вільно пояснити всі терміни по темі.
          </TextBody>
        </span>
        <Button $type="large" width="auto" $txtColor={COLORS.background} $brWidth={'1'}>
          <TextBody $medium>Редагувати</TextBody>
        </Button>
      </BasicBlock>

      <BasicBlock
        $direction={'row'}
        $gap={24}
        className="justify-content-between"
        $bgColor={COLORS.lighterBg}
        width="100%"
      >
        <BasicBlock className="flex-grow-1" width="auto" $gap={24} $bgColor={COLORS.lighterBg}>
          <span className="d-flex flex-column gap-2">
            <LabelValue label="Дата створення:">
              <TextBody $medium>30.03.2026</TextBody>
            </LabelValue>
            <LabelValue label="Кількість тем:">
              <TextBody $medium>12</TextBody>
            </LabelValue>
            <span className="d-flex gap-1 pt-1">
              <Button
                $type="small"
                width="auto"
                $bgColor={'transparent'}
                $txtColor={COLORS.accent}
                $brColor={COLORS.accent}
                $brWidth={'2'}
              >
                <TextBody $medium>Перейти до тем</TextBody>
              </Button>
              <Button $type="small" width="auto" $txtColor={COLORS.background} $brWidth={'2'}>
                <TextBody $medium>Додати тему</TextBody>
              </Button>
            </span>
          </span>
          <span className="d-flex flex-column gap-2">
            <LabelValue label="Запрошено студентів:">
              <TextBody $medium>105</TextBody>
            </LabelValue>
            <LabelValue label="Прийняли запрошення:">
              <TextBody $medium>90</TextBody>
            </LabelValue>
            <span className="d-flex gap-1 pt-1">
              <Button
                $type="small"
                width="auto"
                $bgColor={'transparent'}
                $txtColor={COLORS.text}
                $brColor={COLORS.text}
                $brWidth={'2'}
              >
                <TextBody $medium>Пошук студентів</TextBody>
              </Button>
              <Button
                $type="small"
                width="auto"
                $bgColor={'transparent'}
                $txtColor={COLORS.accent}
                $brColor={COLORS.accent}
                $brWidth={'2'}
              >
                <TextBody $medium>Запросити студента</TextBody>
              </Button>
            </span>
          </span>
        </BasicBlock>
        <BasicBlock
          className="flex-grow-1 align-items-start"
          width={'auto'}
          style={{ maxHeight: '100%' }}
          $gap={16}
          $bgColor={COLORS.lighterBg}
        >
          <TableBlock
            width={'100%'}
            style={{ maxHeight: '100%' }}
            className="h-100"
            $gap={16}
            $bgColor={COLORS.lighterBg}
            $brColor={COLORS.secondary}
            $titleColor={COLORS.primary}
          >
            <span className="d-flex gap-2 align-items-center">
              <img src={graphIcon} alt="graph-grow-icon" width={28} height={28} />
              <TextBody $medium>Середній прогрес</TextBody>
              <CardTitle className="ms-auto" style={{ color: COLORS.primary }}>
                68%
              </CardTitle>
            </span>
            <ProgressBar value={68} deltaPositive={true} showPercent={false} />
            <span className="d-flex flex-column gap-1">
              <LabelValue label="Завершили курс:">
                <TextBody $medium>25%</TextBody>
              </LabelValue>
              <LabelValue label="Активні:">
                <TextBody $medium>60%</TextBody>
              </LabelValue>
            </span>
          </TableBlock>
          <Button
            $type="text"
            width="auto"
            $bgColor={'transparent'}
            $txtColor={COLORS.text}
            $brWidth={'2'}
          >
            <TextBody $medium>Переглянути більше</TextBody>
            <ArrowIcon color={COLORS.text} direction="right" />
          </Button>
        </BasicBlock>
      </BasicBlock>
    </>
  );
}
