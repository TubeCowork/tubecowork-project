import Button from '@/components/Buttons/Button'
import { FileInput } from '@/components/Inputs/FileInput';
import NormalInput from '@/components/Inputs/NormalInput';
import PopUpModal from '@/components/Modal/PopUpModal'
import React, { useState } from 'react'

function UploadVideoSection() {
    const [isUploadVideoPopupOpen, setIsUploadVideoPopupOpen] = useState(false);
    return (
        <div>
            <Button text='Upload Video' onClick={() => {
                setIsUploadVideoPopupOpen(true)
            }} />

            <PopUpModal isOpen={isUploadVideoPopupOpen} closeModal={() => {
                setIsUploadVideoPopupOpen(false)
            }}>
                <div className="">
                    <NormalInput placeholder='Enter title' />
                    <NormalInput placeholder='Enter Description' />
                    {/* <FileInput /> */}

                    <Button text='Upload Now' />
                </div>

            </PopUpModal>
        </div>
    )
}

export default UploadVideoSection