import { useEffect, useState } from 'react'
import { MenuMoreIcon, SendIcon } from '../Icon'
import moment from 'moment'

export default () => {
  const [status, setStatus] = useState<'open' | 'close'>('close')
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [message, setMessage] = useState<
    {
      bot: boolean
      value: string
      createAt: string
    }[]
  >([])
  const [value, setValue] = useState('')
  const map = {
    open: '已连接',
    close: '已断开'
  }

  const URI = 'ws://localhost:9601'

  /**
   * 刷新状态
   * @returns
   */
  const update = () => {
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
        setMessage(prevMessages =>
          prevMessages.concat([
            {
              bot: true,
              value: txt.d,
              createAt: moment().format('YYYY-MM-DD HH:mm:ss')
            }
          ])
        )
      }
    }
    // 监听连接关闭事件
    socket.onclose = () => {
      setStatus('close')
      console.log('WebSocket 连接已关闭')
    }
    return socket
  }

  useEffect(() => {
    const socket = update()
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
      setMessage(prevMessages =>
        prevMessages.concat([
          {
            bot: false,
            value: msg,
            createAt: moment().format('YYYY-MM-DD HH:mm:ss')
          }
        ])
      )
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

  const [show, setShow] = useState(false)

  const BOT_URI =
    ' https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'

  const USER_URI = 'https://q1.qlogo.cn/g?b=qq&s=0&nk=1715713618'

  return (
    <section className="bg-white h-full flex flex-col">
      <section className="h-6 flex  bg-slate-300 bg-opacity-80">
        <div className="flex-1 drag-area text-center">
          {URI} {map[status]}
        </div>
        <div className="px-2  cursor-pointer" onClick={() => setShow(!show)}>
          {show ? <span className="text-sm">关闭</span> : <MenuMoreIcon />}
        </div>
      </section>
      {!show && (
        <>
          <section className="flex-1 px-3 py-2 overflow-y-auto flex gap-1 flex-col webkit bg-slate-50 bg-opacity-50">
            {message.map((item, index) => (
              <div key={index} className="flex  gap-4 bg-opacity-70 mr-auto ">
                <img
                  className="size-[3rem] rounded-full"
                  src={item.bot ? BOT_URI : USER_URI}
                  // src=""
                  alt="Avatar"
                />
                <div className="rounded-md relative p-1 m-auto bg-slate-200">
                  <span>{item.value}</span>
                  <span className="absolute text-[0.5rem] whitespace-nowrap">{item.createAt}</span>
                </div>
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
        </>
      )}
      {show && (
        <section className="flex-1 px-3 py-2 overflow-y-auto flex gap-1 flex-col webkit bg-slate-50 bg-opacity-50">
          <div>用户名:text</div>
          <div>平台</div>
        </section>
      )}
    </section>
  )
}
