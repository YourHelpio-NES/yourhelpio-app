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

interface SimpleTableProps<TData extends RowData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  showHeader?: boolean;
  onRowClick?: (row: TData) => void;
  isRowDisabled?: (row: TData) => boolean;
}

export function SimpleTable<TData extends RowData>({
  data,
  columns,
  showHeader = false,
  onRowClick,
  isRowDisabled,
}: SimpleTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(table.getRowModel().rows);
  return (
    <TableWrapper>
      {showHeader && (
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <TableHeadCell key={header.id}>
                  <TextBody $label $color={COLORS.secondary}>
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
          console.log(row);
          return (
            <TableRow
              key={row.id}
              $clickable={!!onRowClick}
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
  );
}

const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeadCell = styled.th`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid ${COLORS.text};
`;

const TableRow = styled.tr<{ $clickable?: boolean; $disabled?: boolean }>`
  border-bottom: 1px solid ${COLORS.secondary};
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
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
      &:hover {
        background-color: ${COLORS.lighterBg};
      }
    `}
`;

const TableCell = styled.td`
  padding: 16px;
  vertical-align: middle;
`;
