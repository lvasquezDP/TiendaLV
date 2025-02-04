import {useMutation, UseMutationOptions} from '@tanstack/react-query';
import {useForm, UseFormProps} from 'react-hook-form';
import {onError} from '../utils/onError';
import { AxiosError, AxiosResponse } from 'axios';

export const useFormulario = (
  propsMutate?: UseMutationOptions<AxiosResponse, AxiosError, void, unknown>,
  propsForm?: UseFormProps<any, unknown>,
  // mutationFn?: MutationFunction<unknown, unknown>,
) => {
  const {setError, handleSubmit, ...form} = useForm(propsForm);
  const {mutate, ...mutation} = useMutation({
    onError: error => onError(error, setError),
    ...propsMutate,
  });

  return {
    onSubmit: handleSubmit((e: any) => mutate(e)),
    useForm: {
      ...form,
      setError,
      handleSubmit,
    },
    useMutation: {
      mutate,
      ...mutation,
    },
  };
};
