import { useEffect, useState } from 'react'
import From from './From'

type DataType = {
  bot_name: string
  bot_username: string
  mastear_name: string
  mastear_username: string
  status: string
  time: string
  create_time: string
}[]

export default function App() {
  const [data, setData] = useState<DataType>([])

  const [show, setShow] = useState(false)

  useEffect(() => {}, [])

  /**
   * 添加账号
   */
  const onClickAddBot = () => {
    //
  }

  /**
   * 点击关闭
   */
  const onClickClose = () => {
    setShow(false)
  }

  /**
   *
   */
  const onClickOpen = () => {
    setShow(true)
  }

  return (
    <section className="flex p-2">
      <div className="flex flex-col relative w-full">
        {show && (
          <section className=" absolute flex justify-center w-full ">
            <From onClickClose={onClickClose}></From>
          </section>
        )}
        <section className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
              <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                    账号
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-neutral-400">添加或删除账号</p>
                </div>

                <div>
                  <div className="inline-flex gap-x-2">
                    <button
                      onClick={onClickOpen}
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                      添加账号
                    </button>
                  </div>
                </div>
              </div>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                {
                  // 表头
                }
                <thead className="bg-gray-50 dark:bg-neutral-800">
                  <tr>
                    <th scope="col" className="ps-6 py-3 text-start">
                      <label className="flex">
                        <input
                          type="checkbox"
                          className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                          id="hs-at-with-checkboxes-main"
                        />
                        <span className="sr-only">选择</span>
                      </label>
                    </th>

                    <th scope="col" className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                          账号
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                          主人
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                          状态
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                          运行时长
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                          创建时间
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-end"></th>
                  </tr>
                </thead>

                {
                  // body
                }

                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td className="size-px whitespace-nowrap">
                        <div className="ps-6 py-3">
                          <label className="flex">
                            <input
                              type="checkbox"
                              className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                              id="hs-at-with-checkboxes-1"
                            />
                            <span className="sr-only">Checkbox</span>
                          </label>
                        </div>
                      </td>
                      <td className="size-px whitespace-nowrap">
                        <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                          <div className="flex items-center gap-x-3">
                            <img
                              className="inline-block size-[38px] rounded-full"
                              src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                              alt="Image Description"
                            />
                            <div className="grow">
                              <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                {item.bot_name}
                              </span>
                              <span className="block text-sm text-gray-500 dark:text-neutral-500">
                                {item.bot_username}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="h-px w-72 whitespace-nowrap">
                        <div className="px-6 py-3">
                          <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                            {item.mastear_name}
                          </span>
                          <span className="block text-sm text-gray-500 dark:text-neutral-500">
                            {item.mastear_username}
                          </span>
                        </div>
                      </td>
                      <td className="size-px whitespace-nowrap">
                        <div className="px-6 py-3">
                          <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                            <svg
                              className="size-2.5"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                            </svg>
                            {item.status == '1' && '运行中'}
                          </span>
                        </div>
                      </td>
                      <td className="size-px whitespace-nowrap">
                        <div className="px-6 py-3">
                          <div className="flex items-center gap-x-3">{item.time}</div>
                        </div>
                      </td>
                      <td className="size-px whitespace-nowrap">
                        <div className="px-6 py-3">
                          <span className="text-sm text-gray-500 dark:text-neutral-500">
                            {item.create_time}
                          </span>
                        </div>
                      </td>
                      <td className="size-px whitespace-nowrap">
                        <div className="px-6 py-1.5">
                          <a className="inline-flex mx-1 items-center gap-x-1 text-sm text-red-600 decoration-2 hover:underline font-medium dark:text-blue-500">
                            停止
                          </a>
                          <a className="inline-flex mx-1 items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500">
                            编辑
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
                <div>
                  <p className="text-sm text-gray-600 dark:text-neutral-400">
                    <span className="font-semibold text-gray-800 dark:text-neutral-200">
                      {data.length}
                    </span>
                  </p>
                </div>

                <div>
                  <div className="inline-flex gap-x-2">
                    <button
                      type="button"
                      className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                    >
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                      上一页
                    </button>

                    <button
                      type="button"
                      className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                    >
                      下一页
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
