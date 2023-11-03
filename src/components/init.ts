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
        if (
          form.default_value &&
          (typeof form.default_value === "number" ||
            typeof form.default_value === "string")
        ) {
          initialFormValues.number = Number(form.default_value);
        }
        break;
      case "text":
        if (
          form.default_value &&
          (typeof form.default_value === "string" ||
            typeof form.default_value === "number")
        ) {
          initialFormValues.text = String(form.default_value);
        }
        break;
      case "dropdown":
        if (
          form.default_value &&
          (typeof form.default_value === "string" ||
            typeof form.default_value === "number")
        ) {
          initialFormValues.select = String(form.default_value);
        } else if (Array.isArray(form.options) && form.options.length > 0) {
          initialFormValues.select = String(form.options[0]);
        }
        break;
      case "textarea":
        if (
          form.default_value &&
          (typeof form.default_value === "string" ||
            typeof form.default_value === "number")
        ) {
          initialFormValues.textArea = String(form.default_value);
        }
        break;
      default:
        break;
    }
  });

  return initialFormValues;
};
