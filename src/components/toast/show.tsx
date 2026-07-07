import toast from 'react-hot-toast';
import type { ToastTypeEnum } from '../../assets/shared/constants/custom-toast';
import CustomToast from './custom';

const showToast = (type: ToastTypeEnum, title: string, text?: string, duration?: number) => {
  toast((t) => <CustomToast t={t} type={type} title={title} text={text} />, {
    duration: duration ?? 2500,
  });
};

export default showToast;
