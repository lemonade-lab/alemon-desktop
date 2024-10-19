import { useEffect, useState } from 'react'
import { SendIcon } from '../Icon'
export default () => {
  const [message, setMessage] = useState<string[]>(['xxxx', '3233'])
  const [value, setValue] = useState('')
  useEffect(() => {
    setValue('')
    // 滑动滚动条到下面
  }, [message])
  return (
    <section className="bg-white h-full flex flex-col">
      <section className="h-6 drag-area bg-slate-300 bg-opacity-80" />
      <section className="flex-1 px-3 py-2 overflow-y-auto flex gap-1 flex-col webkit bg-slate-50 bg-opacity-50">
        {message.map((item, index) => (
          <div key={index} className=" bg-slate-200 bg-opacity-70 mr-auto p-1 rounded-md">
            {item}
          </div>
        ))}
      </section>
      <section className="w-full flex flex-row justify-center p-1 bg-slate-400 bg-opacity-50">
        <input
          type="text"
          className="rounded-md w-full h-8 px-2 outline-none"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="输入内容..."
          onKeyDown={event => {
            if (event.key === 'Enter') {
              setMessage(message.concat([value]))
            }
          }}
        />
        <div
          className="shadow-centent mx-2 cursor-pointer px-2 rounded-md  border-0"
          onClick={() => setMessage(message.concat([value]))}
        >
          <SendIcon />
        </div>
      </section>
    </section>
  )
}
