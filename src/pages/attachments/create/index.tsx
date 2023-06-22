import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createAttachment } from 'apiSdk/attachments';
import { Error } from 'components/error';
import { attachmentValidationSchema } from 'validationSchema/attachments';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { TaskInterface } from 'interfaces/task';
import { getTasks } from 'apiSdk/tasks';
import { AttachmentInterface } from 'interfaces/attachment';

function AttachmentCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AttachmentInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAttachment(values);
      resetForm();
      router.push('/attachments');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AttachmentInterface>({
    initialValues: {
      file_name: '',
      file_url: '',
      task_id: (router.query.task_id as string) ?? null,
    },
    validationSchema: attachmentValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Attachment
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="file_name" mb="4" isInvalid={!!formik.errors?.file_name}>
            <FormLabel>File Name</FormLabel>
            <Input type="text" name="file_name" value={formik.values?.file_name} onChange={formik.handleChange} />
            {formik.errors.file_name && <FormErrorMessage>{formik.errors?.file_name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="file_url" mb="4" isInvalid={!!formik.errors?.file_url}>
            <FormLabel>File Url</FormLabel>
            <Input type="text" name="file_url" value={formik.values?.file_url} onChange={formik.handleChange} />
            {formik.errors.file_url && <FormErrorMessage>{formik.errors?.file_url}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<TaskInterface>
            formik={formik}
            name={'task_id'}
            label={'Select Task'}
            placeholder={'Select Task'}
            fetcher={getTasks}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'attachment',
  operation: AccessOperationEnum.CREATE,
})(AttachmentCreatePage);
