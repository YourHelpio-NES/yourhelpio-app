import { useForm } from 'react-hook-form';
import { filterSchema, type FilterFormData } from '../../schemas/filter.schema';
import { zodResolver } from '@hookform/resolvers/zod';

export const useFilterForm = (defaultItem?: string) => {
  const form = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: { item: defaultItem ?? '' },
    mode: 'onTouched',
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log('Filter:', data);
  });

  return { form, onSubmit };
};
