"use client"
import Button from "@/components/Buttons/Button"
import NormalInput from "@/components/Inputs/NormalInput"
import PopUpModal from "@/components/Modal/PopUpModal"
import { UserBasicDetailsType } from "@/utils/types/user"
import React, { useState } from "react"

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
            setFormMsg(error?.message)
        }
    }
    return (
        <div>
            <Button
                text="Add New Editor"
                onClick={() => {
                    setShowAddEditorPopup(true)
                }}
            />

            {allEditors?.length ? (
                <div className="flex gap-3 m-4">
                    {allEditors.map((editor: UserBasicDetailsType, key) => (
                        <span className="border border-blue-400 px-1 py-2">
                            <h1 key={key}>name: {editor.name}</h1>
                        </span>
                    ))}
                </div>
            ) : (
                <h1>No Editors</h1>
            )}

            <PopUpModal
                isOpen={showAddEditorPopup}
                closeModal={() => {
                    setShowAddEditorPopup(false)
                }}
            >
                <div className="">
                    <h1>Add new Editor</h1>
                    <form
                        onSubmit={addEditorToChannel}
                        className="flex_center flex-col"
                    >
                        <NormalInput
                            placeholder="Enter User Email"
                            name="email"
                            id="email"
                        />
                        <Button
                            text="Add Editor"
                            type="submit"
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
