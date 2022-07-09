import React from 'react';
import { Menu, MenuItem, SubMenuItem } from './components/menu'

function App() {

  // async function requestId (id: number): Promise<number> {
  //   await Promise.resolve(id);
  //   return id;
  // }

  // function lastRequest<T extends number, R>(res: (...args: R[]) => Promise<T>): (...args: R[]) => Promise<T> {
  //   let time = 0;

  //   async function innerRequest(...args: R[]): Promise<T> {
  //     time++;
  //     const request = await res(...args);
  //     if(request !== time) {
  //       await new Promise(() => {});
  //     }
  //     return request;
  //   }
  //   return innerRequest;
  // }

  // const wrapperRequest = lastRequest(requestId);

  // wrapperRequest(1).then(console.log);
  // wrapperRequest(2).then(console.log);
  // wrapperRequest(3).then(console.log);

  return (
    <div>
      <Menu
        defaultSelectKey='first'
        mode='horizontal'
        onSelect={() => {}}
        defaultOpenMenu={['submenu1']}
      >
        <MenuItem index='first' disabled>
          123
        </MenuItem>
        <MenuItem index='second'>
          3465
        </MenuItem>
        <SubMenuItem index='submenu1' title='navigate'>
          <MenuItem index='sub1'>sub1</MenuItem>
          <MenuItem index='sub2'>sub2</MenuItem>
        </SubMenuItem>
        <SubMenuItem index='submenu2' title='navigate'>
          <MenuItem index='sub3'>sub1</MenuItem>
          <MenuItem index='sub4'>sub2</MenuItem>
        </SubMenuItem>
      </Menu>
    </div>
  );
}

export default App;
