import {AxiosError, isAxiosError} from 'axios';
import {FieldValues, UseFormSetError} from 'react-hook-form';
import Toast from 'react-native-toast-message';

export const onError = (error: AxiosError, setError: UseFormSetError<FieldValues>) => {
  console.error({...error});
  if (isAxiosError(error)) {
    const errors = error.response?.data as any;
    Object.keys(errors ?? {}).forEach(x =>
      setError(x, {type: 'custom', message: errors[x].toString()}),
    );
    if ('error' in errors)
      Toast.show({type: 'error', text1: errors.error.toString()});
  }
};
