import React from "react";

const FormInput = ({ label, ...otherProps }) => (
  <div>
    <label>{label}</label>
    <input {...otherProps}></input>
  </div>
);

export default FormInput;
