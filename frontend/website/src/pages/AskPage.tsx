import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { CustomForm, IValues, minLength, required, SubmitResult } from '../components/CustomForm';
import { InputField } from '../components/InputField';
import { Page } from '../components/Page';
import { IPost } from '../models/post';
import { IQuestion } from '../models/question';
import { AppState, clearPostedQuestionActionCreator, postQuestionActionCreator } from '../store';

interface IProps {
  createPost: (post: IPost) => Promise<void>;
  createPostResult?: IQuestion;
  clearPost: () => void;
}

const mapStateToProps = (store: AppState) => {
  return {
    createPostResult: store.questions.postedResult,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    createPost: (post: IPost) => dispatch(postQuestionActionCreator(post)),
    clearPost: () => dispatch(clearPostedQuestionActionCreator()),
  };
};

const AskPage: React.FC<IProps> = ({ createPost, createPostResult, clearPost }) => {
  useEffect(() => {
    return function cleanUp() {
      clearPost();
    };
  }, [clearPost]);

  const handleSubmit = (values: IValues) => {
    createPost({
      title: values.title,
      content: values.content,
      op: 'Fred',
      created: new Date(),
    });
  };

  let submitResult: SubmitResult | undefined;

  if (createPostResult) {
    submitResult = { success: createPostResult !== undefined };
  }

  return (
    <Page title="Ask a Question">
      <CustomForm
        caption="Submit Your Question"
        validationRules={{
          title: [{ validator: required }, { validator: minLength, arg: 10 }],
          content: [{ validator: required }, { validator: minLength, arg: 50 }],
        }}
        onSubmit={handleSubmit}
        submitResult={submitResult}
        failureMessage="There was a problem with your question"
        successMessage="Your question was successfully submitted"
      >
        <InputField name="title" label="Title" />
        <InputField name="content" label="Content" type="TextArea" />
      </CustomForm>
    </Page>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AskPage);
