export interface IValue {
  order?: number;
  name: string;
  value: string | number | boolean;
  component_id: string;
  'checkbox-value'?: boolean;
}
