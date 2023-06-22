import * as yup from 'yup';

export const taskValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  status: yup.string().required(),
  assignee_id: yup.string().nullable(),
  organization_id: yup.string().nullable(),
});
