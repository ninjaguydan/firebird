/* 
useValidator is a custom hook that returns an object of errors-- with each key
corresponding with a form field. All 3 props are required to function properly.

Given the object: 

formValues = {
  name: "John",
  username: "JohnDoe"
}

...and the second object:

formObject = {
  name: "",
  username: ""
}

The given validator should dynamically populate formObject with the
corresponding error, which this component returns.

let validator = (formObject) => {
  // validate fields
  return {
  name: "Must be more than 2 characters",
  username: "Cannot contain special characters."
  }
}

*/
import { useEffect, useState } from "react";

export default function useValidator(
  formValues: { [key: string]: any },
  formObject: { [key: string]: any },
  validator: (formObject: any) => { [key: string]: any },
) {
  const [errors, setErrors] = useState(formObject);

  useEffect(() => {
    setErrors({ ...errors, ...validator(formValues) });
  }, [formValues]);

  return errors;
}
