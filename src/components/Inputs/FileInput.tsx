import React, { useRef, useState } from "react"

import css from "styled-jsx/css"

import { VscFileMedia } from "react-icons/vsc"
import { mbToBytes } from "@/utils/helper/generic"

type FileInputProps = {
    onChange: (id: string, file: File | null) => void
    isVideo?: boolean
    isImage?: boolean
    label?: string
    id: string
    instructions?: string
    required?: boolean
    accept?: string // File types, e.g., ".jpg, .png, .pdf" ".png, .jpeg, .svg, .gif"
    maxSize?: number // Maximum file size in bytes, e.g., 1048576 (1MB)
}

const FileInput: React.FC<FileInputProps> = ({
    onChange,
    isVideo,
    isImage,
    accept,
    maxSize,
    label,
    instructions,
    id,
    required,
}) => {
    const [selectedFile, setSelectedFile] = useState<File>()
    const [selectedFileURL, setSelectedFileURL] = useState("")
    const [isDraggingOver, setIsDraggingOver] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleSelectedFile = (file: File) => {
        const fileNameParts = file.name.split(".")
        const fileExtension =
            fileNameParts[fileNameParts.length - 1].toLowerCase()

        if (accept && !accept.includes(fileExtension)) {
            console.error("Invalid file type. Accepted file types:", accept)
            return
        }

        if (maxSize && file.size > mbToBytes(maxSize)) {
            console.error("File size exceeds the allowed maximum size.")
            return
        }
        if (selectedFileURL) {
            URL.revokeObjectURL(selectedFileURL)
        }
        onChange(id, file)
        setSelectedFile(file)
        const url = URL.createObjectURL(file)

        setSelectedFileURL(url)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files && files.length > 0) {
            handleSelectedFile(files[0])
        }
    }

    const handleSelectFile = (
        e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
    ) => {
        setSelectedFileURL("")
        e.preventDefault()

        inputRef.current?.click()
    }

    const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        const files = event.dataTransfer.files
        if (files && files.length > 0) {
            handleSelectedFile(files[0])
        }
        setIsDraggingOver(false)
    }

    return (
        <div className="file_input_div">
            {label && (
                <label htmlFor={id}>
                    {label} {required && <span>*</span>}
                </label>
            )}
            {instructions && <p>{instructions}</p>}

            <div
                className={`select_area ${
                    isDraggingOver && "select_area_hover"
                }`}
                onDrop={handleFileDrop}
                onDragOver={(e) => {
                    e.preventDefault()
                    setIsDraggingOver(true)
                }}
                onDragLeave={() => setIsDraggingOver(false)}
            >
                {selectedFile ? (
                    <>
                        {selectedFileURL &&
                            (isVideo ? (
                                <video
                                    width="100%"
                                    height="100%"
                                    controls
                                    autoPlay
                                    loop
                                >
                                    <source
                                        src={selectedFileURL}
                                        type={selectedFile.type}
                                    />
                                </video>
                            ) : (
                                isImage && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={selectedFileURL}
                                        alt="uploaded file"
                                    />
                                )
                            ))}
                        <a
                            onClick={handleSelectFile}
                            href=""
                            className="ls-link-secondary"
                        >
                            Choose New File
                        </a>
                    </>
                ) : (
                    <>
                        <VscFileMedia size="60px" />
                        <div>
                            <button
                                onClick={handleSelectFile}
                                className="ls-button-light"
                            >
                                Choose File
                            </button>
                            <p>Or Drag & Drop</p>
                        </div>
                    </>
                )}
            </div>

            <input
                type="file"
                id={id}
                name={id}
                onChange={handleChange}
                accept={accept}
                required={required}
                style={{ display: `none` }}
                ref={inputRef}
            />
            <style jsx>{style}</style>
        </div>
    )
}

const style = css`
    .file_input_div {
        text-align: left;
    }
    .file_input_div p {
        font-size: 14px;
        color: gray;
    }

    .file_input_div > label {
        font-size: 16px;
        text-transform: none;
        color: var(--text-color);
        & span {
            color: var(--primary);
        }
    }

    .file_input_div .select_area > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 4px;
    }
    .file_input_div .select_area {
        /* width: 240px; */
        /* max-width: 400px; */
        height: 180px;
        border: 2px dashed gray;
        padding: 28px 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 16px;
        transition: 0.4s;
        border-radius: 1rem;

        &:hover {
            border: 2px solid var(--primary);
            background-color: var(--primary-bg);
        }
    }

    .select_area_hover {
        border: 2px solid gray;
        background-color: gray;
    }

    .file_input_div video {
        width: 100%;
        /* height: 100%; */
        max-width: 380px;
        max-height: 120px;
    }
    .file_input_div img {
        max-height: 100px;
    }

    @media screen and (max-width: 700px) {
        .file_input_div .select_area {
            width: 100%;
            height: 240px;
            border: 1px dashed gray;
            padding: 14px 20px;
            gap: 8px;
        }
        .file_input_div video,
        .file_input_div img {
            max-width: 100%;
            max-height: 80%;
        }
    }
`

export default FileInput
