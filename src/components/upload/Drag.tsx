import React, { DragEvent, FC } from 'react'
import classNames from 'classnames'

interface DragProps {
  uploadChange: any;
}

export const Drag: FC<DragProps> = ({ uploadChange }) => {

  const [dragOver, updateDragOver] = React.useState(false);

  const classes = classNames('upload-drag', {
    [`dragOver`]: dragOver
  })

  const onDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    updateDragOver(false);
    uploadChange(e.dataTransfer.files);
  }

  const onDrag = (e: DragEvent<HTMLElement>, drag: boolean) => {
    e.preventDefault();
    updateDragOver(drag)
  }

  return (
    <div
      onDragOver={(e) => onDrag(e, true)}
      onDragLeave={(e) => onDrag(e, false)}
      onDrop={(e) => onDrop(e)}
      className={classes}
    >
      请拖动文件到此上传
    </div>
  )
}