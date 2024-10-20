import img_logo from '@src/assets/logo.jpg'
/**
 * 关于该软件的一些可公开的信息
 * 1. logo
 * 2. core 版本号 源码地址
 * 3. gui 版本号 检查更新
 */
export default () => {
  return (
    <section className="bg-white h-full flex flex-col">
      <section className="h-6 drag-area bg-gradient-to-tl from-sky-300 to-indigo-200" />
      <section className="flex-1 px-2 flex flex-col  items-center bg-zinc-50">
        <div className="">
          <img className="max-w-80 pointer-events-none select-none" src={img_logo}></img>
        </div>
        <div>Core V2.0.0-rc.43</div>
        <div>GUI V1.0.0</div>
      </section>
    </section>
  )
}
