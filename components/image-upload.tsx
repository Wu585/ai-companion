"use client"

import {FC, useEffect, useState} from "react";
import {CldUploadButton} from "next-cloudinary";
import Image from "next/image";

interface ImageUploadProps {
  value: string
  onChange: (src: string) => void
  disabled?: boolean
}

const ImageUpload: FC<ImageUploadProps> = ({value, onChange, disabled}) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) {
    return null
  }
  return (
    <div className={"space-y-4 w-full flex flex-col justify-center items-center"}>
      <CldUploadButton
        onUpload={(results: any) => onChange(results.info.secure_url)}
        options={{
          maxFiles: 1
        }}
        uploadPreset={"fob55gc7"}
      >
        <div className={`p-4 border-4 border-dashed border-primary/10 rounded-lg 
        hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center`}>
          <div className={"relative h-40 w-40"}>
            <Image className={"rounded-lg object-cover"} src={value || "/placeholder.svg"} alt={"Upload"}
                   fill/>
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
}

export default ImageUpload

