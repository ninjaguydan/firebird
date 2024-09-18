import React, { SetStateAction, useEffect, useState } from "react";

import { sanitize } from "src/utils/helpers/formatters";

export default function useAutoFocus(
  inputLength: number,
  defaultNum: string | undefined,
  getCode: (code: string | null) => void,
) {
  const inputStates: {
    digit: string;
    setDigit: React.Dispatch<SetStateAction<string>>;
  }[] = [];
  const inputClass = "code-input";

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.keyCode === 8 && e.currentTarget.value === "") {
      let inputElements = [...document.querySelectorAll<HTMLInputElement>(`.${inputClass}`)];
      inputElements[Math.max(0, index - 1)].focus();
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let entry: string = e.target.value.trim();
    let inputElements = [...document.querySelectorAll<HTMLInputElement>(`.${inputClass}`)];
    let lastInputBox: boolean = index === inputElements.length - 1;
    let didInsertContent: boolean = entry.length === 1;

    if (didInsertContent && !isNaN(entry as any)) {
      inputStates[index].setDigit(entry);
    } else {
      inputStates[index].setDigit("");
    }

    if (didInsertContent && !lastInputBox && !isNaN(entry as any)) {
      inputElements[index + 1].focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.currentTarget.localName !== "input") return;
    let paste = (e.clipboardData || window.Clipboard).getData("text");
    let code = sanitize(paste);
    let inputElements = [...document.querySelectorAll<HTMLInputElement>(`.${inputClass}`)];
    if (inputStates.length > 0 && inputElements.length > 0) {
      for (let i = 0; i < inputStates.length; i++) {
        inputStates[i].setDigit(code[i]);
        inputElements[i]?.focus();
      }
    }
  };

  for (let i = 0; i < inputLength; i++) {
    const [digit, setDigit] = useState("");
    inputStates.push({ digit, setDigit });
  }

  const handleReset = () => {
    for (let i = 0; i < inputStates.length; i++) {
      inputStates[i].setDigit("");
    }
  };

  useEffect(() => {
    if (defaultNum === "" || defaultNum === undefined) {
      handleReset();
      return;
    }
    inputStates.forEach((input, index) => inputStates[index].setDigit(defaultNum[index]));
  }, [defaultNum]);

  useEffect(() => {
    let finalCode: string = inputStates
      .map((input) => {
        return input.digit;
      })
      .join("");

    // provide the complete code only if it is complete
    if (finalCode.length === inputLength) {
      getCode(finalCode);
    } else getCode(null);
  }, [inputStates]);

  return {
    inputStates,
    inputClass,
    handleChange,
    handleBackspace,
    handlePaste,
  };
}
