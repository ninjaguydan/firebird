/*
This component returns a group of single-input fields usually seen when 
entering verification codes. By default, it returns 6 inputs, but passing the 
'length' prop allows as many as you need. 

The only required prop is'getCode,' a Function prop which is needed to access 
the complete code or phone number outside of this component. Should look something like:

------
const [code, setCode] = useState(null)

function getCode(code) {
  setCode(code)
}

<MultiInput getCode={getCode} />
------

Until the number of input values matches the initial length property, the value of 'code' is null.

If using for a 10-digit phone number, pass the 'phoneNum' prop as true.

The 'defaultNum' prop allows for pre-populating the inputs. To empty all
fields, pass an empty string with this prop.
*/
import React from "react";

import "src/components/inputs/multiInput/multi-input.css";

import useAutoFocus from "src/utils/hooks/general/useAutoFocus";

type MultiInputProps = {
  getCode: (code: string | null) => void;
  length?: number;
  phoneNum?: boolean;
  defaultNum?: string;
  error?: string;
};

export default function MultiInput({
  getCode,
  length = 6,
  phoneNum = false,
  defaultNum = undefined,
  error = "",
}: MultiInputProps) {
  const { inputStates, inputClass, handleChange, handleBackspace, handlePaste } = useAutoFocus(
    length,
    defaultNum,
    getCode,
  );

  return (
    <fieldset className={`multi-inputs ${phoneNum ? "phone" : ""} ${error ? "error" : ""}`}>
      {inputStates.map((state, index) => (
        <React.Fragment key={index}>
          <input
            autoFocus={index === 0 || (!!defaultNum && index === length - 1)}
            className={inputClass}
            value={state.digit}
            aria-label="passcode-input"
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            onPaste={(e) => handlePaste(e)}
            maxLength={1}
            required
          />
          {phoneNum && (index === 2 || index === 5) ? <span>-</span> : <></>}
        </React.Fragment>
      ))}
      {error && <small className="error">{error}</small>}
    </fieldset>
  );
}
