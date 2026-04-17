import { ref, watch } from 'vue';
import { type TToastMessageMap, ToastMessageMap, type TToastAction } from '@/types/TToast.ts';
import { useToast } from 'primevue/usetoast';

export function useNotify() {
  const isVisibleInfoPopup = ref(false);
  const toastMessage = ref<TToastMessageMap>(null);

  const toast = useToast();

  function showInfoPopup() {
    isVisibleInfoPopup.value = true;
  }

  function closeInfoPopup() {
    isVisibleInfoPopup.value = false;
  }

  const show = (type: TToastAction) => {
    if (!type || !ToastMessageMap) return;
    const config = ToastMessageMap[type];
    toast.add(config);
  };

  return {
    isVisibleInfoPopup,
    toastMessage,
    show
  };
}
