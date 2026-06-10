import { useNavigate } from 'react-router-dom';
import { BasicBlock, ButtonsRow } from '../components/blocks';
import { CardTitle, MainTitle, TextBody } from '../assets/styles/typography';
import AppLayout from '../components/widgets/app/layout';
import { Button } from '../components/button';
import { COLORS } from '../assets/styles/colors';
import { ArrowIcon } from '../assets/images/icons/arrow-icon';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <BasicBlock className="align-items-center" $gap={12}>
        <MainTitle>
          4<span className="fst-italic pe-1">0</span>4
        </MainTitle>

        <TextBody $medium>page not found</TextBody>
        <CardTitle>Схоже, цієї сторінки не існує</CardTitle>
        <TextBody>Можливо, посилання застаріле або сторінку було переміщено.</TextBody>

        <ButtonsRow>
          <Button
            className="gap-2"
            $bgColor={COLORS.secondary}
            $brColor={COLORS.secondaryDark}
            $iconSize={24}
            $txtColor={COLORS.background}
            onClick={() => navigate(-1)}
          >
            <ArrowIcon direction="left" color={COLORS.background} />
            <TextBody $medium>Назад</TextBody>
          </Button>
          <Button
            className="gap-2"
            $bgColor={'transparent'}
            $iconSize={32}
            $txtColor={COLORS.accent}
            $brColor={COLORS.accent}
            $brWidth={'2'}
            onClick={() => navigate('/')}
          >
            <TextBody $medium>На головну</TextBody>
          </Button>
        </ButtonsRow>
      </BasicBlock>
    </AppLayout>
  );
}
