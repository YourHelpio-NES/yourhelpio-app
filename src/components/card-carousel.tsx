import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowIcon } from '../assets/images/icons/arrow-icon';
import { COLORS } from '../assets/styles/colors';
import { Button } from './button';
import styled from 'styled-components';
import { BREAKPOINTS, media } from '../assets/styles/breakpoints';

type CardCarouselProps<T> = {
  items: T[];
  renderCard: (item: T, index: number) => React.ReactNode;
};

export const CardCarousel = <T,>({ items, renderCard }: CardCarouselProps<T>) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = (i: number, dir: number) => {
    const newIndex = ((i % items.length) + items.length) % items.length;
    setDirection(dir);
    setIndex(newIndex);
  };

  const next = () => goTo(index + 1, 1);
  const prev = () => goTo(index - 1, -1);

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (info.offset.x < -100 || info.velocity.x < -500) next();
    else if (info.offset.x > 100 || info.velocity.x > 500) prev();
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  if (!items.length) return null;

  return (
    <CarouselBlock>
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          style={{ width: '100%' }}
        >
          {renderCard(items[index], index)}
        </motion.div>
      </AnimatePresence>

      <ArrowButton
        $type={'text'}
        $bgColor={COLORS.primaryShadow}
        onClick={prev}
        $iconSize={20}
        $direction="left"
      >
        <ArrowIcon size={20} direction="left" color={COLORS.secondaryDark} />
      </ArrowButton>

      <ArrowButton
        $type={'text'}
        $bgColor={COLORS.primaryShadow}
        onClick={next}
        $iconSize={20}
        $direction="right"
      >
        <ArrowIcon direction="right" color={COLORS.secondaryDark} />
      </ArrowButton>

      <DotsBlock>
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > index ? 1 : -1)}
            style={{
              opacity: i === index ? 1 : 0.4,
              transform: i === index ? 'scale(0.9)' : 'scale(0.7)',
            }}
          />
        ))}
      </DotsBlock>
    </CarouselBlock>
  );
};

const CarouselBlock = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const DotsBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding-top: 4px;

  button {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${COLORS.accent};
    transition: all 0.3s ease;
    border: none;
    padding: 0;
  }
  ${media(BREAKPOINTS.xs)} {
    button {
      width: 12px;
      height: 12px;
    }
    gap: 6px;
  }
`;

const ArrowButton = styled(Button)<{ $direction?: 'right' | 'left' }>`
  position: absolute;
  ${({ $direction }) => ($direction === 'left' ? 'left: 0' : 'right: 0')};
  top: 40%;
  transform: translateY(-40%);
`;
