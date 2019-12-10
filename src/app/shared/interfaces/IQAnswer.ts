import { IValue } from './IValue';

export interface IQAnswer {
  component_id: string;
  name: string;
  values: IValue[];
  order?: number;
}
