import React from "react";
interface propsTextArea {
  textAreaName: string;
}
function TextArea({ textAreaName }: propsTextArea) {
  return (
    <textarea className="form-control" name={textAreaName} rows={3}></textarea>
  );
}

export default TextArea;
