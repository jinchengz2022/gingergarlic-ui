import React, { FC } from 'react'

export interface StepProps {
  current?: number;
  children?: React.ReactNode;
}

export const Step: FC<StepProps> = props => {
  const { children, current } = props;

  return (
    <div>
      {children}
    </div>
  )
}
