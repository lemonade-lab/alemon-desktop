import Header from './Header'
import Sidebar from './Sidebar'
import Breadcrumb from './Breadcrumb'
import { useState } from 'react'
import Table from './Table'
import { SelectType } from './types'
import Bot from './Bot'
export default () => {
  const [select, setSelect] = useState<SelectType>('default')
  return (
    <>
      <Header></Header>
      <Breadcrumb></Breadcrumb>
      <Sidebar onClickMenu={val => setSelect(val)}></Sidebar>
      <main className="w-full h-full lg:ps-64">
        {select == 'user.manage' && <Table />}
        {select == 'default' && <Bot />}
      </main>
    </>
  )
}
