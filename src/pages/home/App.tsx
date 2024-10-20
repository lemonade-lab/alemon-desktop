import { useEffect, useState } from 'react'

export default () => {
  const [value, setValue] = useState<'no' | 'ok'>('no')
  useEffect(() => {
    window.app.isTemplateExists().then(res => setValue(res.exists ? 'ok' : 'no'))
  }, [])
  return (
    <section className="bg-white h-full flex flex-col">
      <section className="h-6 drag-area bg-gradient-to-tl from-sky-300 to-indigo-200" />
      <section className="flex-1 px-2 overflow-y-auto webkit">
        <div className="m-auto flex gap-4 py-4">
          <div className="border py-1 px-4 rounded-md">
            依赖状态 : {value == 'no' ? '未加载' : '已加载'}
          </div>
          <button
            className="border py-1 px-2 rounded-md hover:bg-blue-400"
            onClick={() => {
              window.app.yarnInstall()
            }}
          >
            加载依赖
          </button>
        </div>
      </section>
    </section>
  )
}
