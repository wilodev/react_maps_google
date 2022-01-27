import React from "react";

// Tipado
interface propsInput {
  inputName: string;
}
function Input({ inputName }: propsInput) {
  return (
    <input type="text" name={inputName} className="form-control-plaintext" />
  );
}

export default Input;
