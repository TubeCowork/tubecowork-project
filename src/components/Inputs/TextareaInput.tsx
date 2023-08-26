import React, { ChangeEvent } from "react"

import css from "styled-jsx/css"

type InputProps = {
    id: string
    rows?: number
    cols?: number
    placeholder?: string
    label?: string
    value?: string | number
    required?: boolean
    onChange: (id: string, file: string | null) => void
}

function TextareaInput({
    id,
    placeholder,
    label,
    value,
    onChange,
    rows,
    cols,
    required,
}: InputProps) {
    return (
        <div className="textarea_div">
            {label && (
                <label htmlFor={id}>
                    {label} {required && <span>*</span>}
                </label>
            )}

            <textarea
                placeholder={placeholder ? placeholder : ""}
                id={id}
                name={id}
                value={value}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    onChange(id, e.target.value)
                }
                rows={rows}
                cols={cols}
                required={required}
            ></textarea>
            <style jsx>{style}</style>
        </div>
    )
}

const style = css`
    .textarea_div textarea {
        width: 36rem;
        height: 10rem;
        border-radius: 0.6rem;
        border: 1px solid black;
        background: transparent;
        font-size: 0.875rem;
        padding: 0.8em;
        color: black;
        display: flex;

        &:hover {
            border: 1px solid white;
        }
        &:focus {
            border: 1px solid white;
            outline-style: none;
        }
    }

    @media screen and (max-width: 700px) {
        .textarea_div textarea {
            width: 100%;
        }
    }

    .textarea_div p {
        font-size: 14px;
        color: gray;
    }

    .textarea_div > label {
        font-size: 16px;
        text-transform: none;
        color: black;
        & span {
            color: red;
        }
    }
`

export default TextareaInput
