import React, { useState } from "react";
import type { AutoFormTypes, FormTypes, FormDataTypes } from "./types";
import { getInitialFormValues } from "./init";

export default function AutoForm({ forms, handleSubmit }: AutoFormTypes) {
  const initialFormValues = getInitialFormValues(forms);

  const [number, setNumber] = useState(initialFormValues.number);
  const [textArea, setTextArea] = useState(initialFormValues.textArea);
  const [text, setText] = useState(initialFormValues.text);
  const [select, setSelect] = useState(initialFormValues.select);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData: FormDataTypes = {};

    if (forms.find((form) => form.type === "number")) {
      formData["number"] = number;
    }

    if (forms.find((form) => form.type === "text")) {
      formData["text"] = text;
    }

    if (forms.find((form) => form.type === "dropdown")) {
      formData["select"] = select;
    }

    if (forms.find((form) => form.type === "textarea")) {
      formData["textArea"] = textArea;
    }
    handleSubmit(formData);
  };

  const validateRegex = (value: string, regex: string): boolean => {
    try {
      const pattern = new RegExp(regex);
      return pattern.test(value);
    } catch (error) {
      return false;
    }
  };

  const handleValueChange = (
    value: string,
    type: string,
    regex?: string
  ): string | number => {
    if (type === "text" || type === "textarea") {
      if (!regex || validateRegex(value, regex)) {
        return value;
      }
    } else if (type === "number") {
      const numericValue = parseFloat(value);
      if (
        !isNaN(numericValue) &&
        (!regex || validateRegex(numericValue.toString(), regex))
      ) {
        return numericValue;
      }
    }
    return type === "text" || type === "textarea" ? "" : 0;
  };

  function renderFormField(form: FormTypes): JSX.Element | null {
    const { type, default_value, options, validation } = form;

    if (
      type !== "number" &&
      type !== "text" &&
      type !== "textarea" &&
      type !== "dropdown"
    ) {
      return null;
    }

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const newValue = handleValueChange(e.target.value, type, validation);
      if (type === "number") {
        setNumber(Number(newValue));
      } else if (type === "textarea") {
        setTextArea(String(newValue));
      } else {
        setText(String(newValue));
      }
    };

    if (type === "dropdown") {
      return (
        <select
          value={select}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSelect(e.target.value)
          }
        >
          {default_value &&
          (typeof default_value === "string" ||
            typeof default_value === "number") ? (
            <option defaultValue={default_value}>{default_value}</option>
          ) : null}

          {options &&
            options.length > 0 &&
            options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
        </select>
      );
    }

    if (type === "number") {
      return (
        <input
          type="number"
          value={number}
          min={form?.min_value}
          max={form?.max_value}
          onChange={(e) => handleInputChange(e)}
        />
      );
    }

    if (type === "textarea") {
      const textareaProps = {
        placeholder: "textarea",
        value: textArea,
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
          handleInputChange(e),
      };

      return <textarea {...textareaProps} />;
    }

    const inputProps = {
      placeholder: type,
      value: text,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleInputChange(e),
    };

    return <input type="text" {...inputProps} />;
  }

  return (
    <form onSubmit={handleFormSubmit}>
      {forms.map((form, index) => (
        <div key={index}>{renderFormField(form)}</div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
