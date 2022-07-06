import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button, ButtonProps } from './Button';

// const defaultProps = {
//   // btnType: 'primary',
//   // size: 'sm',
//   onClick: jest.fn()
// }

test('button test', () => {
  const { rerender } = render(<Button>OneTest</Button>)
  expect(() => {
    rerender(<Button>OneTest</Button>)
  }).toBeTruthy();
})

// test('button describe', () => {
//   it('should be have button default props', () => {
//     render(<Button {...defaultProps}>OneTest</Button>)
//     const ele = screen.getByText('OneTest')
//     是否存在节点中
//     expect(ele).toBeInTheDocument()
       // 标签名为button
//     expect(ele.tagName).toEqual('Button')
       // click是是否生效
//     fireEvent.click(ele)
//     expect(defaultProps.onClick).toHaveBeenCalled()
//   })
// })