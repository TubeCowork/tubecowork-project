import Button from "@/components/Buttons/Button"
import PopUpModal from "@/components/Modal/PopUpModal"
import { UserBasicDetailsType } from "@/utils/types/user"
import Image from "next/image"
import React, { useState } from "react"
import { RiDeleteBack2Line } from "react-icons/ri"

function EditorCard({ editor }: { editor: UserBasicDetailsType }) {
    console.log(editor?.image)
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div className="w-full flex items-center justify-between h-24 bg-secondary-hover px-4 rounded-xl">
            <PopUpModal
                isOpen={isOpen}
                closeModal={() => {
                    setIsOpen(false)
                }}
            >
                <div className="w-full flex justify-start items-center flex-col p-3">
                    <div className="flex justify-center items-center">
                        Are you sure you want to remove this Editor?
                    </div>
                    <div className="flex justify-between items-center text-white w-full">
                        <Button
                            className="p-2 text-sm md:text-base"
                            text="No"
                            onClick={() => setIsOpen(false)}
                        />
                        <Button
                            className="p-2 bg-green-400 border-none hover:bg-green-500 text-sm md:text-base"
                            text="Yes"
                        />
                    </div>
                </div>
            </PopUpModal>

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
                onClick={() => setIsOpen(true)}
            />
        </div>
    )
}

export default EditorCard
