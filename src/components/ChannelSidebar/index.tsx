"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';

import { RiLockPasswordLine } from "react-icons/ri";
import { PiFiles, PiInfinityThin, PiInfo, PiInfoBold } from "react-icons/pi";
import { CgClose } from 'react-icons/cg'
import { FiMenu } from 'react-icons/fi';
import Button from '../Buttons/Button';
import { YoutubeChannelBasicType } from '@/utils/types/youtube/channel';



function ChannelSidebar({ channelDetails, setSectionToShow }: { channelDetails: YoutubeChannelBasicType; setSectionToShow: (value: string) => void }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  // async function loadAllData() {
  //   if (!address) return
  //   setLoadingStatus(true)
  //   await getAllDataOfUser();
  //   setLoadingStatus(false)
  // }

  // useEffect(() => {
  //   loadAllData()
  // }, [address])



  return (
    <>
      {/* {!isMenuOpen &&
        <div className="fixed top-6 left-8 lg:hidden">
          <Button icon={<FiMenu />} className={isMenuOpen ? "btn_1" : "btn_1_2 py-3"} onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }} />
        </div>
      } */}
      {/* <div className="lg:block hidden h-screen"> */}
      <div className="h-[90vh]">
        <DrawerContent router={router} pathName={pathname} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} channelDetails={channelDetails} setSectionToShow={setSectionToShow} />
      </div>
      {/* <div className="lg:hidden ">
        <DrawerMenuProvider pathName={pathname} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}>
          <DrawerContent router={router} pathName={pathname} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </DrawerMenuProvider>
      </div> */}
    </>
  )
}


// function DrawerMenuProvider({ children, isMenuOpen, setIsMenuOpen }: { children: any, pathName: string, isMenuOpen: boolean, setIsMenuOpen: (state: boolean) => void }) {
//   return (
//     <div className={`fixed top-0 left-0 z-40 h-screen overflow-hidden transition-transform ${!isMenuOpen && "-translate-x-full"}`} >
//       {children}
//     </div>
//   )
// }


function DrawerContent({ router, isMenuOpen, setIsMenuOpen, pathName, channelDetails, setSectionToShow }: { channelDetails: YoutubeChannelBasicType, router: any, pathName: string, isMenuOpen: boolean, setIsMenuOpen: (state: boolean) => void, setSectionToShow: (value: string) => void }) {
  return (
    <div className="h-full w-[22rem] px-4">
      <div className="glassmorphism-bg h-full rounded-lg border border-primary flex_center flex-col justify-between px-2 py-2">
        <div className='w-full'>
          {/* <div className="w-full flex items-center justify-end lg:hidden">
            <Button icon={<CgClose />} className={"btn_primary_2 py-2 px-4"} onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }} />
          </div> */}
          <div className="flex_center flex-col w-full gap-2">
            <span className="flex_center flex-col cursor-pointer pt-2 mb-4">
              <Image
                src={channelDetails.image || "/images/channelavatar.png"}
                width={120}
                height={120}
                alt="Picture"
              />

              <h6>{channelDetails.name}</h6>
            </span>
            <Button icon={<PiFiles />} text='Videos' onClick={() => setSectionToShow("videos")} className={pathName === "/app" ? "btn_sidebar_active" : "btn_sidebar"} />

            <Button icon={<PiInfoBold />} text='Editors' onClick={() => setSectionToShow("editors")} className={pathName === "/app/files" ? "btn_sidebar_active" : "btn_sidebar"} />
          </div>
        </div>

        <span className='flex_center'>
          <Button text='button' />
        </span>

      </div>
    </div>
  )
}

export default ChannelSidebar