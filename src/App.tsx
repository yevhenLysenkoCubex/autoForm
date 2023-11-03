import React, { useState } from "react";
import "./App.css";
import AutoForm from "./components/auto-form";
import type { FormTypes } from "./components/types";

function App() {
  const [formData, setFormData] = useState<
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
    {
      type: "number",
    },
  ] as FormTypes[];

  const handleSubmit = (
    data: Record<string, string | number | boolean | string[] | number[]>
  ) => {
    setFormData(data);
  };

  return (
    <main>
      <AutoForm forms={forms} handleSubmit={handleSubmit} />
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </main>
  );
}

export default App;
