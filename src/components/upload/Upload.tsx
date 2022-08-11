import React, { FC } from 'react';
import axios from 'axios'

import { UploadList } from './UploadList'
import { Button } from '../button'
interface UploadProps {
  /**上传地址 */
  server?: string;
  /**可上传文件类型 */
  acceptFileTypes?: string;
  /**是否禁用 */
  disabled?: boolean;
  /**是否支持多选 */
  multiple?: boolean;
  /**是否支持删除已上传文件 */
  isRemove?: boolean;
  /**文件上传之前的动作 */
  beforeUpload?: () => void;
  /**上传成功的回调函数 */
  onSuccess?: (file: FileList) => void;
  error?: () => void;
  progress?: () => void;
}
export interface FileList {
  name: string;
  uid: string | number;
  size: number;
  percent: number;
  status: 'uploading' | 'done' | 'failed';
}

export const Upload: FC<UploadProps> = (props) => {
  const { acceptFileTypes, multiple, isRemove, onSuccess } = props;
  const [fileList, updateFileList] = React.useState<FileList[]>([]);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const updateList = (file: FileList) => {
    updateFileList((pre) => {
      return pre.map((f) => {
        if (f.uid === file.uid) {
          return file;
        } else {
          return f;
        }
      })
    })
  }

  const selectFile = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  const onRemove = (uid: string | number) => {
    updateFileList(fileList.filter((f) => f.uid !== uid))
  }

  const uploadChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if(!multiple && fileList.length === 1) return;
    if (files) {
      const selectedFile = files[0];
      const _file: FileList = {
        name: selectedFile.name,
        size: selectedFile.size,
        uid: Date.now() + 'file',
        percent: 0,
        status: 'uploading'
      }
      updateFileList((pre) => [_file, ...pre])
      const _formData = new FormData();
      _formData.append(selectedFile.name, selectedFile)
      try {
        const uploadRes = await axios.post('https://jsonplaceholder.typicode.com/posts/', _formData, {
        onUploadProgress: (e) => {
          const progress = Math.round((e.loaded * 100) / e.total) || 0;
          updateList({ ..._file, percent: progress });
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (uploadRes && onSuccess) {
        updateList({ ..._file, percent: 100, status: 'done' });
        onSuccess({ ..._file, percent: 100, status: 'done' })
      } else {
        updateList({ ..._file, percent: 0, status: 'failed' })
      }
      } catch (error) {
        updateList({ ..._file, percent: 0, status: 'failed' })
        
      }
    }
  }

  return (
    <div style={{ width: 300 }}>
      <input
        type='file'
        style={{ display: 'none' }}
        ref={fileRef}
        accept={acceptFileTypes}
        multiple={multiple}
        onChange={uploadChange}
      />
      <Button onClick={selectFile}>请选择上传文件</Button>
      <UploadList list={fileList} isRemove={isRemove} onRemove={onRemove}/>
    </div>
  )
}