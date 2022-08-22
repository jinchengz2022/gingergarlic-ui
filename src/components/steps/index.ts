import { FC } from 'react'
import { Step } from './Step'
import { Steps as OriginSteps } from './Steps'
import type { StepProps } from './Step'
import type { StepsProps } from './Steps'

type OriginStepsType = FC<StepsProps> & { Step: FC<StepProps> };

const Steps = OriginSteps as OriginStepsType;
Steps.Step = Step;

export default Steps;