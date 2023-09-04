import React, { ChangeEvent } from "react"

import css from "styled-jsx/css"

type InputProps = {
    id: string
    className?: number
    rows?: number
    cols?: number
    maxlength?: number
    placeholder?: string
    label?: string
    value?: string | number
    required?: boolean
    onChange: (id: string, file: string | null) => void
}

function TextareaInput({
    id,
    className,
    placeholder,
    maxlength,
    label,
    value,
    onChange,
    rows,
    cols,
    required,
}: InputProps) {
    return (
        <div className="textarea_div w-full flex flex-col text-start">
            {label && (
                <label htmlFor={id}>
                    {label}{" "}
                    {required && <span className="text-primary">*</span>}
                </label>
            )}

            <textarea
                placeholder={placeholder ? placeholder : ""}
                id={id}
                name={id}
                className={` input_1 ${className}`}
                value={value}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    onChange(id, e.target.value)
                }
                rows={rows}
                cols={cols}
                required={required}
                maxLength={maxlength}
            ></textarea>
            {maxlength && (
                <div className="flex justify-end">
                    <p>
                        <span>
                            {value ? String(value).length : 0}/{maxlength}
                        </span>
                    </p>
                </div>
            )}
            <style jsx>{style}</style>
        </div>
    )
}

const style = css`
    .textarea_div textarea {
        height: 10rem;
        background: transparent;

        &:hover {
            border: 1px solid var(--primary);
        }
        &:focus {
            border: 1px solid var(--primary);
            outline-style: none;
        }
    }
`

export default TextareaInput
