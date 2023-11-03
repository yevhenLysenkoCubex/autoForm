import React, { useState } from "react";
import type { AutoFormTypes, FormTypes } from "./types";
import { getInitialFormValues } from "./init";

export default function AutoForm({ forms, handleSubmit }: AutoFormTypes) {
  const initialFormValues = getInitialFormValues(forms);

  const [number, setNumber] = useState(initialFormValues.number);
  const [textArea, setTextArea] = useState(initialFormValues.textArea);
  const [text, setText] = useState(initialFormValues.text);
  const [select, setSelect] = useState(initialFormValues.select);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      number,
      textArea,
      text,
      select,
    };
    handleSubmit(formData);
  };

  function renderFormField(form: FormTypes) {
    const { type, default_value, options } = form;

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
          onChange={(e) => setNumber(Number(e.target.value))}
        />
      );
    }

    if (type === "textarea") {
      const textareaProps = {
        placeholder: "textarea",
        value:
          typeof default_value === "string" || typeof default_value === "number"
            ? default_value
            : textArea,
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setTextArea(e.target.value),
      };

      return <textarea {...textareaProps} />;
    }

    const inputProps = {
      placeholder: type,
      value:
        typeof default_value === "string" || typeof default_value === "number"
          ? default_value
          : text,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setText(e.target.value),
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
