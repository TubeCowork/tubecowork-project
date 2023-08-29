import Button from "@/components/Buttons/Button"
import { UserBasicDetailsType } from "@/utils/types/user"
import Image from "next/image"
import React from "react"
import { RiDeleteBack2Line } from "react-icons/ri"

function EditorCard({ editor }: { editor: UserBasicDetailsType }) {
    console.log(editor.image)

    return (
        <div className="w-full flex items-center justify-between h-24 bg-secondary-hover px-4 rounded-xl">
            <div className="flex items-center justify-center gap-2">
                <Image
                    width={60}
                    height={60}
                    src={editor?.image || "/images/avatar.png"}
                    alt="avatar"
                    className="rounded-full"
                />
                <div className="">
                    <h4 className="text-base">{editor.name}</h4>
                    <h4 className="text-sm text-text-color-light">
                        {editor.email}
                    </h4>
                </div>
            </div>

            <Button
                icon={<RiDeleteBack2Line />}
                text="remove"
                className="btn_1_2"
            />
        </div>
    )
}

export default EditorCard
