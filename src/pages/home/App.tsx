import { useEffect, useState } from 'react'
export default () => {
  const [value, setValue] = useState<'no' | 'ok'>('no')

  const [bot, setBot] = useState<'no' | 'ok'>('no')

  //

  useEffect(() => {
    window.app.isTemplateExists().then(res => setValue(res.exists ? 'ok' : 'no'))
    window.app.botIsRunning().then(res => setBot(res ? 'ok' : 'no'))
  }, [])
  return (
    <section className="bg-white h-full flex flex-col">
      <section className="h-6 drag-area bg-gradient-to-tl from-sky-300 to-indigo-200" />

      <section className="flex-1 px-2 overflow-y-auto webkit py-2 ">
        <section className="flex-1 px-2 border rounded-md">
          <div className="m-auto flex gap-4 py-1">
            <div className=" py-1 px-4 rounded-md">
              依赖状态 : {value == 'no' ? '未加载' : '已加载'}
            </div>
            <button
              className="border py-1 px-2 rounded-md bg-blue-500 hover:bg-blue-400"
              onClick={() => {
                window.app.yarnInstall()
              }}
            >
              <span className="text-white">加载</span>
            </button>
          </div>
          <div className="m-auto flex gap-4 py-1">
            <div className=" py-1 px-4 rounded-md">
              机器状态 : {bot == 'no' ? '未启动' : '已启动'}
            </div>
            <button
              className="border py-1 px-2 rounded-md bg-blue-500 hover:bg-blue-400"
              onClick={() => {
                window.app.botRun()
                setTimeout(() => {
                  window.app.botIsRunning().then(res => setBot(res ? 'ok' : 'no'))
                }, 500)
              }}
            >
              <span className="text-white">启动</span>
            </button>
            <button
              className="border py-1 px-2 rounded-md bg-blue-500 hover:bg-blue-400"
              onClick={() => {
                window.app.botClose()
                setBot('no')
              }}
            >
              <span className="text-white">关闭</span>
            </button>
          </div>
        </section>
      </section>
    </section>
  )
}
