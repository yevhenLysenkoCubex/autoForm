import React, { useState } from "react";
import "./App.css";
import AutoForm from "./components/auto-form";
import type { FormTypes } from "./components/types";

function App() {
  const [formData, setFormData] = useState<
    Record<string, string | number | boolean | string[] | number[]>
  >({});
  const [formData1, setFormData1] = useState<
    Record<string, string | number | boolean | string[] | number[]>
  >({});

  const forms = [
    {
      type: "text",
    },
    {
      type: "textarea",
      default_value: "Hello",
    },
    {
      type: "dropdown",
      options: ["hello", "world", "choose", "mee"],
      default_value: "Select default value",
    },
  ] as FormTypes[];

  const handleSubmit = (
    data: Record<string, string | number | boolean | string[] | number[]>
  ) => {
    setFormData(data);
  };

  const forms1 = [
    {
      type: "text",
      default_value: "TExt Default Value",
    },
    {
      type: "textarea",
    },
    {
      type: "dropdown",
      options: ["hello", "world", "choose", "mee"],
    },
    {
      type: "number",
      default_value: 15,
    },
  ] as FormTypes[];

  const handleSubmit1 = (
    data: Record<string, string | number | boolean | string[] | number[]>
  ) => {
    setFormData1(data);
  };

  return (
    <main>
      <AutoForm forms={forms} handleSubmit={handleSubmit} />
      <pre>{JSON.stringify(formData, null, 2)}</pre>
      <AutoForm forms={forms1} handleSubmit={handleSubmit1} />
      <pre>{JSON.stringify(formData1, null, 2)}</pre>
    </main>
  );
}

export default App;
