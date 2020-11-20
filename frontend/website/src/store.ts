import {
  Action,
  ActionCreator,
  applyMiddleware,
  combineReducers,
  createStore,
  Dispatch,
  Reducer,
  Store,
} from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import {
  answerPost,
  createPost,
  getQuestion,
  getUnansweredQuestions,
  searchQuestions,
} from './data/seed';
import { IAnswer } from './models/answer';
import { IPost } from './models/post';
import { IPostAnswer } from './models/post_answer';
import { IQuestion } from './models/question';

interface QuestionsState {
  readonly loading: boolean;
  readonly unanswered: IQuestion[] | null;
  readonly viewing: IQuestion | null;
  readonly searched: IQuestion[] | null;
  readonly postedResult?: IQuestion;
  readonly postedAnswerResult?: IAnswer;
}

export interface AppState {
  readonly questions: QuestionsState;
}

const initialQuestionState: QuestionsState = {
  loading: false,
  unanswered: null,
  viewing: null,
  searched: null,
};

interface GettingUnansweredQuestionsAction extends Action<'GettingUnansweredQuestions'> {}

export interface GotUnansweredQuestionsAction extends Action<'GotUnansweredQuestions'> {
  questions: IQuestion[];
}

interface GettingQuestionAction extends Action<'GettingQuestion'> {}

export interface GotQuestionAction extends Action<'GotQuestion'> {
  question: IQuestion | null;
}

interface SearchingQuestionsAction extends Action<'SearchingQuestions'> {}

export interface SearchedQuestionsAction extends Action<'SearchedQuestions'> {
  questions: IQuestion[];
}

export interface PostedQuestionAction extends Action<'PostedQuestion'> {
  result: IQuestion | undefined;
}

export interface PostedAnswerAction extends Action<'PostedAnswer'> {
  questionId: number;
  result: IAnswer | undefined;
}

type QuestionsActions =
  | GettingUnansweredQuestionsAction
  | GotUnansweredQuestionsAction
  | GettingQuestionAction
  | GotQuestionAction
  | SearchingQuestionsAction
  | SearchedQuestionsAction
  | PostedQuestionAction
  | PostedAnswerAction;

export const getUnansweredQuestionsActionCreator: ActionCreator<ThunkAction<
  Promise<void>,
  IQuestion[],
  null,
  GotUnansweredQuestionsAction
>> = () => {
  return async (dispatch: Dispatch) => {
    const gettingUnansweredQuestionsAction: GettingUnansweredQuestionsAction = {
      type: 'GettingUnansweredQuestions',
    };
    dispatch(gettingUnansweredQuestionsAction);
    const questions = await getUnansweredQuestions();
    const gotUnansweredQuestionAction: GotUnansweredQuestionsAction = {
      questions,
      type: 'GotUnansweredQuestions',
    };
    dispatch(gotUnansweredQuestionAction);
  };
};

export const getQuestionActionCreator: ActionCreator<ThunkAction<
  Promise<void>,
  IQuestion,
  null,
  GotQuestionAction
>> = (questionId: number) => {
  return async (dispatch: Dispatch) => {
    const gettingQuestionAction: GettingQuestionAction = {
      type: 'GettingQuestion',
    };
    dispatch(gettingQuestionAction);
    const question = await getQuestion(questionId);
    const gotQuestionAction: GotQuestionAction = {
      question,
      type: 'GotQuestion',
    };
    dispatch(gotQuestionAction);
  };
};

export const searchQuestionsActionCreator: ActionCreator<ThunkAction<
  Promise<void>,
  IQuestion[],
  null,
  SearchedQuestionsAction
>> = (criteria: string) => {
  return async (dispatch: Dispatch) => {
    const searchingQuestionsAction: SearchingQuestionsAction = {
      type: 'SearchingQuestions',
    };
    dispatch(searchingQuestionsAction);
    const questions = await searchQuestions(criteria);
    const searchedQuestionAction: SearchedQuestionsAction = {
      questions,
      type: 'SearchedQuestions',
    };
    dispatch(searchedQuestionAction);
  };
};

export const postQuestionActionCreator: ActionCreator<ThunkAction<
  Promise<void>,
  IQuestion,
  IPost,
  PostedQuestionAction
>> = (question: IPost) => {
  return async (dispatch: Dispatch) => {
    const result = await createPost(question);
    const postedQuestionAction: PostedQuestionAction = {
      type: 'PostedQuestion',
      result,
    };
    dispatch(postedQuestionAction);
  };
};

export const clearPostedQuestionActionCreator: ActionCreator<PostedQuestionAction> = () => {
  const postedQuestionAction: PostedQuestionAction = {
    type: 'PostedQuestion',
    result: undefined,
  };
  return postedQuestionAction;
};

export const postAnswerActionCreator: ActionCreator<ThunkAction<
  Promise<void>,
  IAnswer,
  IPostAnswer,
  PostedAnswerAction
>> = (answer: IPostAnswer) => {
  return async (dispatch: Dispatch) => {
    const result = await answerPost(answer);
    const postedAnswerAction: PostedAnswerAction = {
      type: 'PostedAnswer',
      questionId: answer.questionId,
      result,
    };
    dispatch(postedAnswerAction);
  };
};

export const clearPostedAnswerActionCreator: ActionCreator<PostedAnswerAction> = () => {
  const postedAnswerAction: PostedAnswerAction = {
    type: 'PostedAnswer',
    questionId: 0,
    result: undefined,
  };
  return postedAnswerAction;
};

const neverReached = (never: never) => {
  console.log(never);
};

const questionsReducer: Reducer<QuestionsState, QuestionsActions> = (
  state = initialQuestionState,
  action
) => {
  switch (action.type) {
    case 'GettingUnansweredQuestions': {
      return {
        ...state,
        unanswered: null,
        loading: true,
      };
    }
    case 'GotUnansweredQuestions': {
      return {
        ...state,
        unanswered: action.questions,
        loading: false,
      };
    }
    case 'GettingQuestion': {
      return {
        ...state,
        viewing: null,
        loading: true,
      };
    }
    case 'GotQuestion': {
      return {
        ...state,
        viewing: action.question,
        loading: false,
      };
    }
    case 'SearchingQuestions': {
      return {
        ...state,
        searched: null,
        loading: true,
      };
    }
    case 'SearchedQuestions': {
      return {
        ...state,
        searched: action.questions,
        loading: false,
      };
    }
    case 'PostedQuestion': {
      return {
        ...state,
        unanswered: action.result
          ? (state.unanswered || []).concat(action.result)
          : state.unanswered,
        postedResult: action.result,
      };
    }
    case 'PostedAnswer': {
      return {
        ...state,
        unanswered: action.result
          ? (state.unanswered || []).filter((q) => q.id !== action.questionId)
          : state.unanswered,
        postedAnswerResult: action.result,
      };
    }
    default:
      neverReached(action);
  }
  return state;
};

const rootReducer = combineReducers<AppState>({
  questions: questionsReducer,
});

export function configureStore(): Store<AppState> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}
