import { IQuestion } from './IQuestion';

export interface IQuestionAction {
  surveyId: string | number;
  pageId: string | number;
  questionId: string | number;
  question ?: IQuestion;
}
