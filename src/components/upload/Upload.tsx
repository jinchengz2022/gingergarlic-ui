import React, { FC, useState } from 'react';
import axios from 'axios'

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
interface UploadList {
  name: string;
  uid: string | number;
  size: number;
  percent: number;
  status: 'uploading' | 'done' | 'failed';
}

export const Upload: FC<UploadProps> = (props) => {
  const { acceptFileTypes, multiple } = props;
  const [fileList, updateFileList] = useState<UploadList[]>([])

  const uploadChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedFile = files[0];
      const _file: UploadList = {
        name: selectedFile.name,
        size: selectedFile.size,
        uid: selectedFile.lastModified + 'file',
        percent: 0,
        status: 'uploading'
      }
      const _formData = new FormData();
      _formData.append(selectedFile.name, selectedFile)
      const uploadRes = await axios.post('https://jsonplaceholder.typicode.com/posts/', _formData, {
        onUploadProgress: (e) => {
          const progress = Math.round((e.loaded * 100) / e.total) || 0;
          updateFileList([{ ..._file, percent: progress }, ...fileList])
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (uploadRes) {
        uploadSuccess((pre: UploadList[]) => [{ ..._file, percent: 100 }, ...pre])
      }
    }
  }

  const uploadSuccess = (requestRes: any) => {
    updateFileList([{ ...requestRes, status: 'done' }, ...fileList])
  }

  return (
    <div>
      <input
        type='file'
        onChange={uploadChange}
        accept={acceptFileTypes}
        multiple={multiple}
      />
      {fileList.map((li) => <p key={li.name}>{li.name}</p>)}
    </div>
  )
}