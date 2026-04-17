import type { ToastMessageOptions } from 'primevue/toast';

export type TToastAction = 'T_ERROR' | 'T_TOGGLE' | 'T_CREATE' | 'T_DELETE' | 'T_UPDATE';

export interface TToastConfig {
  severity: ToastMessageOptions['severity'];
  summary: string;
  detail?: string;
  life?: number;
}

export type TToastMessageMap = Record<TToastAction, TToastConfig> | null;

export const ToastMessageMap: TToastMessageMap | null = {
  'T_CREATE': {
    severity: 'success',
    summary: 'Created',
    detail: 'Position created successfully',
    life: 1500
  },
  'T_ERROR': {
    severity: 'error',
    summary: 'Error',
    detail: 'Something went wrong',
    life: 1500
  },
  'T_TOGGLE': {
    severity: 'success',
    summary: 'Toggle',
    detail: 'Position created successfully',
    life: 1500
  },
  'T_DELETE': {
    severity: 'success',
    summary: 'Deleted',
    detail: 'Position delete successfully',
    life: 1500
  },
  'T_UPDATE': {
    severity: 'success',
    summary: 'Updated',
    detail: 'Position update successfully',
    life: 1500
  }
};

