import { IQuestion } from './IQuestion';

export interface IPage {
  id?: number | string;
  title ?: string;
  order ?: number;
  questions ?: IQuestion[];
  component_id?: string;
}
