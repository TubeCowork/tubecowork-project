import Image from "next/image"
import { PiFiles, PiInfoBold } from "react-icons/pi"
import Button from "../Buttons/Button"
import { YoutubeChannelBasicType } from "@/utils/types/youtube/channel"
import UploadVideoSection from "../UiSections/Channel/YoutubeVideo/UploadVideoSection"
import { YoutubeVideoUploadDataType } from "@/utils/types/youtube/video"

type ChannelSidebarProps = {
    channelDetails: YoutubeChannelBasicType
    setSectionToShow: (value: string) => void
    sectionToShow: string
    uploadVideoFn: (videoData: YoutubeVideoUploadDataType) => Promise<string>
}

function ChannelSidebar({
    channelDetails,
    sectionToShow,
    setSectionToShow,
    uploadVideoFn,
}: ChannelSidebarProps) {
    console.log(channelDetails.image)

    return (
        <div className="h-[92vh] w-[18rem]  border-r-2 border-secondary-hover ">
            <div className="flex_center flex-col w-full gap-2">
                <span className="flex_center flex-col cursor-pointer pt-4 mb-4">
                    <Image
                        src={
                            channelDetails.image || "/images/channelavatar.png"
                        }
                        width={120}
                        height={120}
                        alt="Picture"
                        className="rounded-full"
                    />

                    <p className="text_sub_heading_size mb-4">
                        {channelDetails.name}
                    </p>
                    <UploadVideoSection uploadVideoFn={uploadVideoFn} />
                </span>
                <Button
                    icon={<PiFiles />}
                    text="Videos"
                    onClick={() => setSectionToShow("videos")}
                    className={
                        sectionToShow === "videos"
                            ? "sidebar_btn_active"
                            : "sidebar_btn"
                    }
                />

                <Button
                    icon={<PiInfoBold />}
                    text="Editors"
                    onClick={() => setSectionToShow("editors")}
                    className={
                        sectionToShow === "editors"
                            ? "sidebar_btn_active"
                            : "sidebar_btn"
                    }
                />
            </div>
        </div>
    )
}

export default ChannelSidebar
