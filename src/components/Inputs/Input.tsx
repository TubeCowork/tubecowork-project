import React, { ChangeEvent, useRef } from "react"

import css from "styled-jsx/css"

type InputProps = {
    id: string
    placeholder?: string
    className?: string
    type?: string
    label?: string
    value?: string | number
    required?: boolean
    disabled?: boolean
    instructions?: string
    minlength?: number
    maxlength?: number
    onChange: (id: string, file: string | number | null) => void
}

// pattern = "[a-zA-Z0-9]+"

function Input({
    id,
    className,
    placeholder,
    type,
    label,
    value,
    onChange,
    minlength,
    maxlength,
    required = false,
    instructions,
    disabled = false,
}: InputProps) {
    return (
        <div className="flex flex-col gap-2 text-start">
            {label && (
                <label htmlFor={id}>
                    {label}{" "}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}
            {instructions && <p>{instructions}</p>}
            <input
                type={type ? type : "text"}
                placeholder={placeholder ? placeholder : ""}
                className={` input_1 ${className}`}
                id={id}
                name={id}
                value={value}
                minLength={minlength}
                maxLength={maxlength}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onChange(id, e.target.value)
                }
                required={required}
                disabled={disabled}
                step="any"
            />
            {maxlength && (
                <div className="flex justify-end">
                    <p>
                        <span>
                            {value ? String(value).length : 0}/{maxlength}
                        </span>
                    </p>
                </div>
            )}
        </div>
    )
}

export default Input
