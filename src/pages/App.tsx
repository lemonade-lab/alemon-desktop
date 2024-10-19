import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from '@src/pages/home/App'
import About from '@src/pages/about/App'
export default () => {
  const navigate = useNavigate() // 获取 navigate 函数
  return (
    <main className="flex flex-row h-full">
      <section className="flex flex-col w-[4.3rem] bg-slate-200 ">
        <section className="h-6" />
        <section
          className="flex justify-center py-1 relative cursor-pointer "
          onClick={() => {
            navigate('/')
          }}
        >
          <img
            className="size-[3rem] rounded-full"
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
            alt="Avatar"
          />
        </section>
        <section className="flex-1 flex items-center flex-col">
          {[1, 2, 3, 4].map(item => (
            <div className=" rounded-md size-10 bg-black my-2"></div>
          ))}
        </section>
        <section className="py-3  flex items-center flex-col ">
          <div
            className=" rounded-md size-10 bg-black my-2 text-slate-700 cursor-pointer"
            onClick={() => {
              // 如何切换path
              navigate('/about')
            }}
          ></div>
        </section>
      </section>
      <article className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </article>
    </main>
  )
}
