import React, { FC } from 'react';

interface UploadProps {
  server?: string;
  acceptFileTypes?: string;
  disabled?: boolean;
  multiple?: boolean;
  beforeUpload?: () => void;
  success?: () => void;
  error?: () => void;
  progress?: () => void;
}

export const Upload: FC<UploadProps> = (props) => {
  const { acceptFileTypes, multiple } = props;

  const uploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedFile = files[0];
      const formData = new FormData();
      formData.append(selectedFile.name, selectedFile);
    }
  }

  return (
    <input
      type='file'
      onChange={uploadChange}
      accept={acceptFileTypes}
      multiple={multiple}
    />
  )
}