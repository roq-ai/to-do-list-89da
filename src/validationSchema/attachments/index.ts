import * as yup from 'yup';

export const attachmentValidationSchema = yup.object().shape({
  file_name: yup.string().required(),
  file_url: yup.string().required(),
  task_id: yup.string().nullable(),
});
