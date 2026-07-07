import AppLayout from '../../components/widgets/app/layout';
import { CardTitle, SmallText, TextBody } from '../../assets/styles/typography';
import { actionEffect, BasicBlock, basicShadow } from '../../components/blocks';
import { COLORS } from '../../assets/styles/colors';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../components/button';
import { extremelyRepeating } from '../../assets/shared/data/courses';
import { BREAKPOINTS, media } from '../../assets/styles/breakpoints';
import { difficultyTypeData } from '../../assets/shared/constants/course';
import { StatusItem, StatusTypeItem } from '../../components/status-items';
import { getColorByPercentage } from '../../assets/shared/utils/color';
import { useFilterForm } from '../../assets/shared/hooks/validators/useFilterDropdown';
import { Controller } from 'react-hook-form';
import { Select } from '../../components/dropdown';
import { StudentsIcon } from '../../assets/images/icons/students-icon';
import { Divider } from '../notification';
import { LabelValue } from '../../components/topic-details-content';

import graphicIcon from '../../assets/images/icons/graphics-icon.png';
import { WarningTriangleIcon } from '../../assets/images/icons/warning-triangle-icon';
import { ArrowIcon } from '../../assets/images/icons/arrow-icon';
import { ProgressBar } from '../../components/progress-bar';
import { TableBlock } from '../student/dashboard';

export default function DashboardPageTeacher() {
  const navigate = useNavigate();

  const { form } = useFilterForm(extremelyRepeating[0].id.toString());
  const {
    control,
    formState: { errors },
  } = form;

  const sortedExtremelyRepeating = [...extremelyRepeating].sort(
    (a, b) =>
      difficultyTypeData[a.stateRepeating].order - difficultyTypeData[b.stateRepeating].order
  );

  return (
    <AppLayout className="">
      <span className="w-100 d-flex align-items-center gap-3">
        <TextBody $medium>Курс:</TextBody>
        <Controller
          name="item"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onChange={(val) => {
                field.onChange(val);
                field.onBlur();
              }}
              options={extremelyRepeating.map((item) => {
                return {
                  label: item.course,
                  value: item.id.toString(),
                };
              })}
              errorText={
                extremelyRepeating.length === 0 ? 'Немає доступних елементів' : errors.item?.message
              }
            />
          )}
        />
      </span>
      <BasicBlock
        $direction="row"
        className="flex-md-wrap flex-sm-wrap flex-wrap gap-md-3 gap-sm-2"
        width={'100%'}
      >
        <CardItem>
          <span className="d-flex gap-2 align-items-center">
            <StudentsIcon />
            <CardTitle>Студенти</CardTitle>
          </span>
          <TextBody $medium $color={COLORS.accent}>
            120 приєдналось
          </TextBody>
          <TextBody>із 130 запрошених</TextBody>
          <Divider />
          <span className="d-flex gap-3 flex-xl-nowrap flex-lg-wrap flex-md-nowrap row-gap-1 align-items-center">
            <LabelValue label="Активні:">
              <TextBody $medium>98</TextBody>
            </LabelValue>
            <LabelValue label="Неактивні:">
              <TextBody $medium>22</TextBody>
            </LabelValue>
          </span>
        </CardItem>

        <CardItem>
          <span className="d-flex gap-2 align-items-center">
            <img src={graphicIcon} alt="graphic-icon" />
            <CardTitle>Середній прогрес</CardTitle>
          </span>
          <span className="d-flex gap-1 flex-column align-items-start">
            <span className="d-flex gap-2 align-items-center">
              <CardTitle>75%</CardTitle>
              <TextBody>пройдених тем</TextBody>
            </span>
            <SmallText $medium $color={COLORS.secondary}>
              (+5% за тиждень)
            </SmallText>
          </span>
          <span className="d-flex gap-2 align-items-center">
            <StatusItem $type={StatusTypeItem.CIRCLE} $color={COLORS.status.warning} />
            <TextBody>Більшість студентів на середньому рівні</TextBody>
          </span>
        </CardItem>

        <CardItem>
          <span className="d-flex gap-2 align-items-center">
            <WarningTriangleIcon color={COLORS.secondary} />
            <CardTitle>Проблемні теми</CardTitle>
          </span>
          <span className="d-flex gap-2 align-items-center">
            <CardTitle>12</CardTitle>
            <SmallText $medium $color={COLORS.secondary}>
              (+3 нові за останні дні)
            </SmallText>
          </span>
          <Divider />
          <span data-type="footer" className="d-flex gap-1 flex-column  align-items-start">
            <TextBody>Найбільше труднощів:</TextBody>
            <span className="d-flex gap-2 align-items-center">
              <TextBody $medium>Boolean –</TextBody>
              <TextBody $medium $color={COLORS.status.error}>
                45%
              </TextBody>
            </span>
          </span>
        </CardItem>
      </BasicBlock>

      <BasicBlock
        $direction="row"
        className="flex-md-wrap flex-sm-wrap flex-wrap gap-md-3 gap-sm-2"
        width={'100%'}
      >
        <TableBlock
          $titleColor={COLORS.text}
          $bgColor={'transparent'}
          $brColor={COLORS.secondary}
          $gap={24}
          width="auto"
          className={'align-items-start flex-grow-1'}
        >
          <CardTitle>Теми з низьким засвоєнням</CardTitle>

          <span className="d-flex flex-column gap-2 w-100">
            {sortedExtremelyRepeating.map((item, index) => (
              <LineCard
                className="d-flex justify-content-between align-items-center w-100"
                key={item.id}
              >
                <TextBody className="text-nowrap" $medium $color={COLORS.text}>
                  {item.topic}
                </TextBody>
                <span className="w-auto d-flex align-items-center flex-grow-1">
                  <TextBody $label $color={getColorByPercentage(item.learning)}>
                    {item.learning}%
                  </TextBody>
                  {index === 0 && (
                    <SmallText $color={getColorByPercentage(item.learning)}>
                      ↓ -10% за тиждень
                    </SmallText>
                  )}
                </span>
                <Button
                  $bgColor={'transparent'}
                  $txtColor={COLORS.secondaryDark}
                  $brColor={COLORS.secondaryDark}
                  width="auto"
                  type={'small'}
                >
                  <SmallText>Деталі</SmallText>
                </Button>
              </LineCard>
            ))}
          </span>
          <Button
            type="large"
            width="auto"
            $bgColor={'transparent'}
            $txtColor={COLORS.accent}
            $brWidth={'2'}
            onClick={() => navigate('/student/knowledge-tree')}
          >
            <TextBody $medium>Переглянути всі</TextBody>
            <ArrowIcon direction="right" color={COLORS.accent} />
          </Button>
        </TableBlock>

        <BasicBlock
          className="flex-grow-1 align-items-start"
          width={'auto'}
          style={{ maxHeight: '100%' }}
          $gap={16}
        >
          <TableBlock
            width={'100%'}
            style={{ maxHeight: '100%' }}
            className="h-100"
            $gap={16}
            $bgColor={COLORS.lighterBg}
            $titleColor={COLORS.primary}
          >
            <CardTitle>Активність студентів</CardTitle>
            <ProgressBar
              value={96}
              label="52% активні цього тижня"
              delta="+10% порівняно з минулим"
              deltaPositive={true}
            />
            <span className="d-flex flex-column gap-1">
              <LabelValue label="Сьогодні:">
                <TextBody $medium>64</TextBody>
              </LabelValue>
              <LabelValue label="Вчора:">
                <TextBody $medium>58</TextBody>
              </LabelValue>
            </span>
            <LabelValue label="Пік активності:">
              <TextBody $medium>Вівторок</TextBody>
            </LabelValue>
          </TableBlock>
          <Button
            type="large"
            width="auto"
            $bgColor={COLORS.accent}
            $txtColor={COLORS.lighterBg}
            $brWidth={'2'}
            onClick={() => navigate('/student/knowledge-tree')}
          >
            <TextBody $medium>Переглянути детальніше про курс</TextBody>
          </Button>
        </BasicBlock>
      </BasicBlock>

      {/* <TableBlock $bgColor={COLORS.lighterBg} $gap={8} $titleColor={COLORS.primary}>
        <span className="d-flex gap-3 align-items-center">
          <FaqIcon size={24} color={COLORS.primary} />
          <CardTitle>Рекомендація системи</CardTitle>
        </span>
        <CardCarousel
          items={extremelyRepeating}
          renderCard={(card) => (
            <CarouselCardItem className="">
              <span>
                <TextBody>{card.id}. Повторити тему</TextBody>
                <TextBody $medium>"{card.topic}"</TextBody>
              </span>
              <TextBody>Ваш рівень засвоєння: {card.learning}%</TextBody>
              <Button
                type="small"
                width="auto"
                $bgColor={COLORS.background}
                $brColor={COLORS.secondary}
                $txtColor={COLORS.secondary}
                $brWidth={'2'}
                onClick={() => navigate('/student/knowledge-tree')}
              >
                <TextBody $medium>Перейти</TextBody>
              </Button>
            </CarouselCardItem>
          )}
        />
      </TableBlock> */}
    </AppLayout>
  );
}

const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 25%;
  width: auto;
  gap: 12px;
  padding: 24px;
  background-color: ${COLORS.lighterBg};
  border-radius: 24px;
  ${basicShadow};
  svg,
  img {
    width: 26px;
    height: 26px;
  }

  ${Divider} {
    margin: 8px 0;
  }

  ${media(BREAKPOINTS.xl)} {
    max-width: 30%;
  }
  ${media(BREAKPOINTS.lg)} {
    max-width: 33%;
  }
  ${media(BREAKPOINTS.md)} {
    max-width: 49%;
    padding: 20px;
    svg,
    img {
      width: 20px;
      height: 20px;
    }
  }
  ${media(657)} {
    max-width: 100%;
    width: 100%;

    span[data-type='footer'] {
      flex-direction: row !important;
      gap: 16px !important;
    }
  }
`;

const LineCard = styled.div`
  width: 100%;
  padding: 14px 24px;
  display: flex;
  min-width: 0;
  overflow: hidden;
  gap: 12px;
  ${basicShadow};
  border-radius: 12px;
  background-color: ${COLORS.lighterBg};

  ${actionEffect};

  div {
    margin-top: 1px;
  }

  span {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 12px;
    row-gap: 6px;
  }

  ${media(BREAKPOINTS.ml)} {
    padding: 14px 16px;
  }
`;
