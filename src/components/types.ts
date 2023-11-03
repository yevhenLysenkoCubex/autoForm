export interface AutoFormTypes {
  forms: FormTypes[];
  handleSubmit: (formData: Record<string, string | number | boolean>) => void;
}

export interface FormTypes {
  default_value?: string | number | boolean;
  value?: string | number | boolean;
  validation?: string;
  min_value?: number;
  max_value?: number;
  options?: string[] | number[];
  type: "text" | "textarea" | "dropdown" | "number";
}

export type FormDataTypes = {
  number?: number;
  text?: string;
  select?: string;
  textArea?: string;
};
