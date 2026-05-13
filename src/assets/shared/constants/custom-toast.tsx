import type { Toast } from 'react-hot-toast';
import { COLORS } from '../../styles/colors';
import type { JSX } from 'react';
import { WarningIcon } from '../../images/icons/warning-icon';
import { BlockIcon } from '../../images/icons/block-icon';
import { InfoIcon } from '../../images/icons/info-icon';
import { DoneIcon } from '../../images/icons/done-icon';

export enum ToastTypeEnum {
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
  INFO = 'info',
}

export type ToastProps = {
  t: Toast;
  type: string;
  title: string;
  text?: string;
};

export const toastTypes: Record<ToastTypeEnum, () => JSX.Element> = {
  [ToastTypeEnum.WARNING]: () => <WarningIcon />,
  [ToastTypeEnum.ERROR]: () => <BlockIcon />,
  [ToastTypeEnum.INFO]: () => <InfoIcon />,
  [ToastTypeEnum.SUCCESS]: () => <DoneIcon withCircle backgroundColor={COLORS.status.success} />,
};
