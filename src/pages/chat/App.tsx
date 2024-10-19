import { useEffect, useState } from 'react'
import { SendIcon } from '../Icon'
export default () => {
  const [message, setMessage] = useState<string[]>([])
  const [value, setValue] = useState('')
  useEffect(() => {
    setValue('')
  }, [message])
  return (
    <section className="bg-white h-full flex flex-col">
      <section className="h-6 drag-area bg-slate-300" />
      <section className="flex-1 px-2 overflow-y-auto webkit">
        {message.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </section>
      <section className="w-full flex flex-row justify-center p-1 bg-slate-400 ">
        <input
          type="text"
          className="rounded-md w-full h-8 px-2"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="输入内容..."
        />
        <div
          className="
            shadow-centent 
            mx-2 
            cursor-pointer 
            px-2
            rounded-md
            border-0
          hover:border-blue-500
          focus:border-blue-500
          focus:ring-blue-500
            disabled:opacity-50 
            disabled:pointer-events-none"
          onClick={() => setMessage(message.concat([value]))}
        >
          <SendIcon />
        </div>
      </section>
    </section>
  )
}
