import React from "react";
interface propsColor {
  inputName: string;
  color: string;
  handleChangeColor: Function;
}
const Color = ({ inputName, color, handleChangeColor }: propsColor) => {
  return (
    <input
      type="color"
      value={color}
      name={inputName}
      onChange={(event) => handleChangeColor(event.target.value)}
    />
  );
};

export { Color };
