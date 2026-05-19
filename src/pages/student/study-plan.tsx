import { useEffect, useState } from 'react';
import { Select } from '../../components/dropdown';
import AppLayout from '../../components/widgets/app/layout';
import { extremelyRepeating, themesTableData } from '../../assets/shared/data/courses';
import { Controller } from 'react-hook-form';
import { useFilterForm } from '../../assets/shared/hooks/validators/useFilterDropdown';
import { BasicBlock, basicShadow } from '../../components/blocks';
import { TextBody } from '../../assets/styles/typography';
import { getColorByPercentage } from '../../assets/shared/utils/color';
import { SimpleTable } from '../../components/table';
import themesTableCols from '../../assets/shared/utils/table/themes-table-column';
import { TableBlock } from './dashboard';
import { COLORS } from '../../assets/styles/colors';
import type { ThemeTableRow } from '../../assets/shared/utils/table/row-type';
import { StatusItem } from '../../components/status-items';
import styled from 'styled-components';
import { BREAKPOINTS, media } from '../../assets/styles/breakpoints';
import ThemeDetailsContent, { LabelValue } from '../../components/theme-details-content';
import * as Dialog from '@radix-ui/react-dialog';
import { CloseIcon } from '../../assets/images/icons/close-icon';

export default function StudyPlanMainPage() {
  const { form } = useFilterForm(extremelyRepeating[0].id.toString());
  const {
    control,
    formState: { errors },
  } = form;
  const [activeRow, setActiveRow] = useState<ThemeTableRow>(themesTableData[0]);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= BREAKPOINTS.ml);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= BREAKPOINTS.ml);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRowClick = (row: ThemeTableRow) => {
    setActiveRow(themesTableData.find((x) => x.id === row.id) ?? themesTableData[0]);
    if (isMobile) setIsModalOpen(true);
  };
  return (
    <AppLayout>
      <BasicBlock width="55%">
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
                  extremelyRepeating.length === 0
                    ? 'Немає доступних елементів'
                    : errors.item?.message
                }
              />
            )}
          />
        </span>
        <LabelValue label="Прогрес курсу:">
          <TextBody $medium $color={getColorByPercentage(30)}>
            30%
          </TextBody>
          <TextBody>пройдено</TextBody>
        </LabelValue>
        <LabelValue label="Тривалість курсу:">
          <TextBody>12 тем</TextBody>
        </LabelValue>
        <TextBody>
          Курс для студентів допоможе визначити тему тип даних, теорія, як їх використовувати на
          практиці та вміти вільно пояснити всі терміни по темі.
        </TextBody>
      </BasicBlock>

      <BodyTable>
        <BasicBlock>
          <SimpleTable
            data={themesTableData}
            columns={themesTableCols}
            showHeader
            // onRowClick={() => {}}
            // isRowDisabled={(row) => row.completed}
            getRowId={(row) => Number.parseInt(row.id)}
            activeRowId={Number.parseInt(activeRow.id)}
            onRowClick={handleRowClick}
          />
        </BasicBlock>
        {!isMobile && <ThemeDetailsContent activeRow={activeRow} />}

        {/* мобільний — модалка */}
        {isMobile && (
          <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
            <Dialog.Portal>
              <DialogOverlay />
              <DialogContent>
                <Dialog.Close asChild>
                  <CloseButton>
                    <CloseIcon size={22} />
                  </CloseButton>
                </Dialog.Close>
                <ThemeDetailsContent activeRow={activeRow} />
              </DialogContent>
            </Dialog.Portal>
          </Dialog.Root>
        )}
      </BodyTable>
    </AppLayout>
  );
}

const BodyTable = styled(BasicBlock)`
  gap: 60px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;

  ${StatusItem} {
    margin-top: 1px;
  }

  svg {
    flex-shrink: 0;
  }

  & > * {
    width: 45%;
  }

  ${media(BREAKPOINTS.lg)} {
    gap: 44px;
    & > * {
      width: 47%;
      transition:
        width 0.25s cubic-bezier(0.22, 1, 0.36, 1),
        transform 0.25s ease;
    }
  }
  ${media(BREAKPOINTS.ml)} {
    gap: 36px;
  }
  ${media(BREAKPOINTS.ml)} {
    flex-direction: column;
    gap: 24px;
    & > * {
      width: 100%;
    }

    /* &:last-child {
        position: absolute;
    } */
  }
`;

const DialogOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  backdrop-filter: blur(1px);
  background: rgba(0, 0, 0, 0.18);
  z-index: 100;
`;

const DialogContent = styled(Dialog.Content)`
  position: fixed;
  bottom: 0;
  /* left: 0; */
  right: 0;
  z-index: 101;
  background: ${COLORS.background};
  border-radius: 20px 20px 0 0;
  padding: 16px;
  width: 50%;
  max-height: 85vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  scrollbar-width: thin;

  transition:
    width 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    max-height 0.25s ease,
    border-radius 0.25s ease;

  will-change: width, transform;

  ${media(BREAKPOINTS.md)} {
    width: 60%;
  }

  ${media(BREAKPOINTS.sm)} {
    width: 70%;
  }

  @media (max-width: 650px) {
    width: 75%;
  }

  ${media(BREAKPOINTS.xs)} {
    width: 100%;
    max-height: 60vh;
  }

  ${TableBlock} {
    overflow-y: auto;
    scrollbar-width: thin;
    gap: 16px;

    svg {
      flex-shrink: 0;
    }

    ${StatusItem} {
      width: 18px;
      height: 18px;
      margin-top: 3px;
    }
  }

  ${BasicBlock} {
    gap: 12px;
  }

  &[data-state='open'] {
    animation: slideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }
  &[data-state='closed'] {
    animation: slideDown 0.2s ease-in;
  }

  @keyframes slideUp {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
  @keyframes slideDown {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 7px;
  left: 7px;
  background: ${COLORS.lighterBg};
  border: none;
  cursor: pointer;
  padding: 2px;
  margin: 0;
  outline: none;
  border-radius: 8px;
  svg {
    vertical-align: text-top;
  }

  ${basicShadow};
`;
