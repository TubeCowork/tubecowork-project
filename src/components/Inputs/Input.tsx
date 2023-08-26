import React, { ChangeEvent } from "react";

import css from "styled-jsx/css";

type InputProps = {
  id: string;
  placeholder?: string;
  type?: string;
  label?: string;
  value?: string | number;
  required?: boolean;
  disabled?: boolean;
  instructions?: string;
  minlength?: number;
  maxlength?: number;
  onChange: (id: string, file: string | number | null) => void;
};

// pattern = "[a-zA-Z0-9]+"

function Input({
  id,
  placeholder,
  type,
  label,
  value,
  onChange,
  minlength = 0,
  maxlength = 100,
  required = false,
  instructions,
  disabled = false,
}: InputProps) {
  return (
    <div className="input_div">
      {label && (
        <label htmlFor={id}>
          {label} {required && <span>*</span>}
        </label>
      )}
      {instructions && <p>{instructions}</p>}

      <input
        type={type ? type : "text"}
        placeholder={placeholder ? placeholder : ""}
        id={id}
        name={id}
        value={value}
        minLength={minlength}
        maxLength={maxlength}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(id, e.target.value)}
        required={required}
        disabled={disabled}
        step="any"
      />
      <style jsx>{style}</style>
    </div>
  );
}

const style = css`
  .input_div {
    margin-top: 1rem;
  }

  .input_div p {
    font-size: 14px;
    color: gray;
    margin: 0;
    margin-bottom: 0.2rem;
  }

  .input_div > label {
    font-size: 16px;
    text-transform: none;
    color: var(--ls-text-color);
    & span {
      color: var(--ls-error);
    }
  }

  .input_div input {
    margin-top: 0.4rem;
  }

  @media screen and (max-width: 700px) {
    .input_div input {
      width: 100% !important;
    }
  }
`;

export default Input;
