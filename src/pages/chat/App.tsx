import { useEffect, useState } from 'react'
import { MenuMoreIcon, SendIcon } from '../Icon'
export default () => {
  const [status, setStatus] = useState<'open' | 'close'>('close')
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [message, setMessage] = useState<string[]>([])
  const [value, setValue] = useState('')
  const map = {
    open: '已连接',
    close: '已断开'
  }

  const URI = 'ws://localhost:9601'

  useEffect(() => {
    // 创建 WebSocket 连接
    const socket = new WebSocket(URI)
    // 监听连接打开事件
    socket.onopen = () => {
      console.log('WebSocket 连接已建立')
      setStatus('open')
    }
    // 监听消息事件
    socket.onmessage = db => {
      const event = JSON.parse(db.data)
      console.log('event', event)
      if (event.t == 'send_message') {
        const txt = event.d.find((item: any) => item.t == 'text')
        // 使用函数式更新
        setMessage(prevMessages => prevMessages.concat([txt.d]))
      }
    }
    // 监听连接关闭事件
    socket.onclose = () => {
      setStatus('close')
      console.log('WebSocket 连接已关闭')
    }
    // 设置 socket 状态
    setSocket(socket)
    // 清理函数，关闭 WebSocket 连接
    return () => {
      socket.close()
    }
  }, [])

  // 变动时自动清理
  useEffect(() => {
    setValue('')
  }, [message])

  /**
   *
   * @param msg
   */
  const sendMessage = (msg: string) => {
    if (socket && msg != '') {
      socket.send(
        JSON.stringify({
          t: 'send_message',
          d: [
            {
              t: 'text',
              d: msg
            }
          ]
        })
      )
    }
  }

  return (
    <section className="bg-white h-full flex flex-col">
      <section className="h-6 flex  bg-slate-300 bg-opacity-80">
        <div className="px-1">{URI}</div>
        <div>{map[status]}</div>
        <div className="flex-1 drag-area"></div>
        <div className="px-2  cursor-pointer">
          <MenuMoreIcon />
        </div>
      </section>
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
            if (event.key === 'Enter') sendMessage(value)
          }}
        />
        <div
          className="shadow-centent mx-2 cursor-pointer px-2 rounded-md  border-0"
          onClick={() => {
            sendMessage(value)
          }}
        >
          <SendIcon />
        </div>
      </section>
    </section>
  )
}
