"use client";

import React from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { useToast } from "./ui/use-toast";

interface Props {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

const FileUpload = ({ onChange, endpoint }: Props) => {
  const { toast } = useToast();
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast({
          title: "Something went wrong.",
          description:
            "There was a problem uploading your image. Make sure your image is less than 4MB.",
          variant: "destructive",
        });
      }}
    />
  );
};

export default FileUpload;
