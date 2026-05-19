/* eslint-disable react-hooks/incompatible-library */
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type RowData,
} from '@tanstack/react-table';
import { TextBody } from '../assets/styles/typography';
import styled, { css } from 'styled-components';
import { COLORS } from '../assets/styles/colors';
import { BREAKPOINTS, media } from '../assets/styles/breakpoints';

interface SimpleTableProps<TData extends RowData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  showHeader?: boolean;
  getRowId?: (row: TData) => number;
  activeRowId?: number;
  onRowClick?: (row: TData) => void;
  isRowDisabled?: (row: TData) => boolean;
}

export function SimpleTable<TData extends RowData>({
  data,
  columns,
  showHeader = false,
  getRowId,
  activeRowId,
  onRowClick,
  isRowDisabled,
}: SimpleTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer $isHeader={showHeader}>
      <TableWrapper>
        {showHeader && (
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHeadCell key={header.id}>
                    <TextBody $color={COLORS.text}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TextBody>
                  </TableHeadCell>
                ))}
              </tr>
            ))}
          </thead>
        )}
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow
                key={row.id}
                $clickable={!!onRowClick}
                $active={activeRowId !== undefined && getRowId?.(row.original) === activeRowId}
                $disabled={isRowDisabled?.(row.original) ?? false}
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </tbody>
      </TableWrapper>
    </TableContainer>
  );
}

const TableContainer = styled.div<{ $isHeader?: boolean }>`
  /* display: block; */
  width: 100%;

  overflow-x: auto;
  /* overflow-y: hidden; */

  /* max-width: 100%; */
  scrollbar-width: thin;

  ${({ $isHeader }) =>
    $isHeader &&
    css`
      ${TableRow} {
        transition: box-shadow 0.2s ease;

        &:hover {
          box-shadow: inset 0 -3.5px 0 ${COLORS.accent};
        }
      }
    `}
`;

const TableWrapper = styled.table`
  width: 100%;
  min-width: 100%;
  /* max-width: 650px; */
  border-collapse: collapse;

  ${media(BREAKPOINTS.ml)} {
    /* min-width: 100%; */
  }

  th {
  }
`;

const TableHeadCell = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid ${COLORS.text};

  &:last-child {
    /* padding-left: 0; */
    padding-right: 0;
  }
`;

const TableRow = styled.tr<{ $clickable?: boolean; $disabled?: boolean; $active?: boolean }>`
  border-bottom: 1px solid ${COLORS.secondary};
  transition: background-color 0.2s ease;
  background-color: transparent;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${COLORS.background};
    opacity: 0.8;
    cursor: pointer;
  }

  &:focus-visible {
    outline: none;
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
    `}

  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
    `}

    ${({ $active }) =>
    $active &&
    css`
      box-shadow: inset 0 -3.5px 0 ${COLORS.accent};
    `}
`;

const TableCell = styled.td`
  padding: 16px 12px;
  vertical-align: middle;
  white-space: nowrap;

  &:first-child {
    padding-left: 16px;
    max-width: 300px;
    p {
      &:last-of-type {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  &:last-child {
    /* padding-left: 0; */
    padding-right: 0;
  }

  ${media(BREAKPOINTS.ml)} {
    padding: 16px 8px;
  }

  ${media(BREAKPOINTS.sm)} {
    white-space: nowrap;
  }
`;
