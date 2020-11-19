import React from 'react';
import { CustomForm, IValues, minLength, required } from '../components/CustomForm';
import { InputField } from '../components/InputField';
import { Page } from '../components/Page';
import { createPost } from '../data/seed';

const AskPage = () => {
  const handleSubmit = async (values: IValues) => {
    const question = await createPost({
      title: values.title,
      content: values.content,
      op: 'Fred',
      created: new Date(),
    });

    return { success: question ? true : false };
  };
  return (
    <Page title="Ask a Question">
      <CustomForm
        caption="Submit Your Question"
        validationRules={{
          title: [{ validator: required }, { validator: minLength, arg: 10 }],
          content: [{ validator: required }, { validator: minLength, arg: 50 }],
        }}
        onSubmit={handleSubmit}
        failureMessage="There was a problem with your question"
        successMessage="Your question was successfully submitted"
      >
        <InputField name="title" label="Title" />
        <InputField name="content" label="Content" type="TextArea" />
      </CustomForm>
    </Page>
  );
};

export default AskPage;
