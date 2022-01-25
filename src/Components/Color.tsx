import React from "react";
interface propsColor {
  color: string;
  handleChangeColor: Function;
}
const Color = ({ color, handleChangeColor }: propsColor) => {
  return (
    <>
      <input
        type="color"
        value={color}
        onChange={(event) => handleChangeColor(event.target.value)}
      />
    </>
  );
};

export { Color };
