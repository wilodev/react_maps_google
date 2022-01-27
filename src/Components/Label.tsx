import React from "react";
interface porpsLabel {
  title: string;
}
function Label({ title }: porpsLabel) {
  return <label className="col-sm-2 col-form-label">{title}</label>;
}

export default Label;
