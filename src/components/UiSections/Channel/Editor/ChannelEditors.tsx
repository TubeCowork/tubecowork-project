"use client"
import Button from "@/components/Buttons/Button"
import NormalInput from "@/components/Inputs/NormalInput"
import PopUpModal from "@/components/Modal/PopUpModal"
import { UserBasicDetailsType } from "@/utils/types/user"
import React, { useState } from "react"
import EditorCard from "./EditorCard"

type ChannelEditorsType = {
    addEditor: (email: string) => Promise<UserBasicDetailsType>
    allEditors: UserBasicDetailsType[] | undefined
}

function ChannelEditors({ addEditor, allEditors }: ChannelEditorsType) {
    const [showAddEditorPopup, setShowAddEditorPopup] = useState(false)

    const [adding, setAdding] = useState(false)
    const [FormMsg, setFormMsg] = useState("")
    const addEditorToChannel = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setFormMsg("")
            const email = (e.target as HTMLFormElement)?.email?.value
            if (email) {
                setAdding(true)
                const addedEditor = await addEditor(email)
                setFormMsg(`User added: ${addedEditor.name}`)
                setAdding(false)
            }
        } catch (error: any) {
            setAdding(false)
            console.log("addEditorToChannel", error)
            // setFormMsg(error?.message)
            setFormMsg("User do not exits. Please check your email")
        }
    }
    return (
        <div>
            <div className="flex items-center justify-between mx-12">
                <h1 className="text_sub_heading_size font-bold">
                    Channel Editors
                </h1>
                <Button
                    text="Add New Editor"
                    className="btn_1_2"
                    onClick={() => {
                        setShowAddEditorPopup(true)
                    }}
                />
            </div>

            {allEditors?.length ? (
                <div className="flex gap-3 flex-col mx-4 mt-6">
                    {allEditors.map((editor: UserBasicDetailsType, key) => {
                        return <EditorCard editor={editor} key={key} />
                    })}
                </div>
            ) : (
                <div className="flex_center w-full h-[20vh]">
                    <h1>No Editors, Please Add</h1>
                </div>
            )}

            <PopUpModal
                isOpen={showAddEditorPopup}
                closeModal={() => {
                    setShowAddEditorPopup(false)
                }}
            >
                <div className="px-24 py-12">
                    <h1 className="text_sub_heading_size mb-4">
                        Add New Editor
                    </h1>
                    <form
                        onSubmit={addEditorToChannel}
                        className="flex_center flex-col gap-4"
                    >
                        <NormalInput
                            placeholder="Enter User Email"
                            name="email"
                            id="email"
                        />
                        <Button
                            text="Add Editor"
                            type="submit"
                            className="btn_1_2"
                            loading={adding}
                        />
                    </form>
                    {FormMsg && <p>{FormMsg}</p>}
                </div>
            </PopUpModal>
        </div>
    )
}

export default ChannelEditors
