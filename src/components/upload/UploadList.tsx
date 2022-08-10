import React, { FC } from 'react'

import type { FileList } from './Upload'

interface UploadListProps {
  list: FileList[];
  isRemove?: boolean;
  onRemove: (uid: string | number) => void;
}

export const UploadList: FC<UploadListProps> = (props) => {

  const { list, isRemove, onRemove } = props;

  const downLoad = () => { 
    // TODO: 点击下载文件（可提供选项下载后文件名与上传文件名相同）
  }

  return (
    <ul className='upload-list'>
      {list.map((f) => (
        <li key={f.name} className={f.status === 'failed' ? 'upload-error' : undefined}>
          <div>{f.name}</div>
          <div>
            {isRemove && (
              <div
                className='gg-close-o'
                style={{ marginRight: 20 }}
                onClick={() => onRemove(f.uid)}
              />
            )}
            {<div
              className='gg-software-download'
              onClick={f.status === 'done' ? downLoad : undefined}
            />}
          </div>
        </li>
      ))}
    </ul>
  )
}