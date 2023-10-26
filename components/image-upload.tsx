"use client"

import {FC, useEffect, useState} from "react";

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
  if(!isMounted){
    return null
  }
  return (
    <div className={"space-y-4 w-full flex flex-col justify-center items-center"}>

    </div>
  );
}

export default ImageUpload

