import { IOption } from './IOption';
import { IQAnswer } from './IQAnswer';


export interface IQuestion {
  id ?: number | string;
  question_type ?: { question_type: string | number, status: boolean };
  order ?: number;
  question ?: string;
  options ?: IOption[] | null;
  answer?: IQAnswer;
  component_id?: string;
}
