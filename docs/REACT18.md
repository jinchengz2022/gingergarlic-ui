## useTransition

[isPending, startTransition] = useTransition

isPending 初始值为false
startTransition执行 isPending为true
startTransition执行完后 isPending为false

当数据量特别大时
请求异步数据需要等待

demo: 输入时显示不会卡顿，react17会
  const [numCount, setNumCount] = React.useState('');
  const [searchData, setSearchData] = React.useState<number[]>([]);
  const [isPending, startTransiton] = useTransition();
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumCount(e.target.value);
    startTransiton(() => {
      setSearchData(Array.from({ length: 10000 }, (_, i) => new Date().getTime() + i))
    })
  }
    {
      isPending && <span>pending!!!</span>
    }
    <input type="text" name="" id="" onChange={inputChange} />
    {
      searchData.map((item) => (
        <p key={item}>{item}</p>
      ))
    }

   

## 自动批处理