import type { FormTypes } from "./types";

export const getInitialFormValues = (forms: FormTypes[]) => {
  const initialFormValues = {
    number: 0,
    textArea: "",
    text: "",
    select: "",
  };

  forms.forEach((form) => {
    switch (form.type) {
      case "number":
        if (typeof form.default_value === "number") {
          initialFormValues.number = form.default_value;
        }
        break;
      case "text":
        if (typeof form.default_value === "string") {
          initialFormValues.text = form.default_value;
        }
        break;
      case "dropdown":
        if (typeof form.default_value === "string") {
          initialFormValues.select = form.default_value;
        }
        break;
      case "textarea":
        if (typeof form.default_value === "string") {
          initialFormValues.textArea = form.default_value;
        }
        break;
      default:
        break;
    }
  });

  return initialFormValues;
};
