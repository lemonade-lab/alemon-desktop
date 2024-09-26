import Header from '@/pages/Header'
import { useState } from 'react'
import { SelectType } from '@/pages/home/types'
export default () => {
  const [select, setSelect] = useState<SelectType>('default')
  return (
    <>
      <Header></Header>
      {
        // 左右布局。
      }
      <main className="w-full h-full flex">
        <section className="w-16 bg-blue">
          <div className="h-full">xx</div>
        </section>
        <section className="flex-1">xx</section>
      </main>
    </>
  )
}
