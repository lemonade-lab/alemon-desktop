/**
 * @see https://www.electron.build/configuration/configuration
 */
/**
 * @type {import('electron-builder').Configuration}
 */
module.exports = {
  appId: 'com.alemonjs.desktop',
  productName: 'AlemonJS', // 你的应用程序名称
  asar: true,
  electronDownload: {
    mirror: 'https://npmmirror.com/mirrors/electron/' // electron下载地址
  },
  directories: {
    output: 'release/${version}'
  },
  // dist-electron --  dscltop
  // disc   -- web
  // npm  -- yarn
  files: ['dist-electron', 'dist', 'yarn'],
  mac: {
    artifactName: '${productName}_${version}.${ext}',
    target: ['dmg', 'zip']
  },
  win: {
    icon: './public/favicon.ico',
    // 压缩 快速打包 测试用
    // compression:'store',
    target: [
      {
        target: 'nsis',
        arch: ['x64']
      },
      {
        target: '7z',
        arch: ['x64']
      }
    ],
    artifactName: '${productName}_${version}.${ext}'
  },
  nsis: {
    oneClick: false, // 是否一键安装
    perMachine: false, // 是否单机安装
    allowToChangeInstallationDirectory: true, // 是否允许用户更改安装目录
    deleteAppDataOnUninstall: false, // 是否删除安装后的数据
    allowElevation: true, // 是否允许提升权限
    runAfterFinish: true, // 安装完成后是否运行
    installerIcon: './public/favicon.ico', // 安装图标
    uninstallerIcon: './public/favicon.ico', // 卸载图标
    installerHeader: './public/favicon.ico', // 安装的头部(右边的图标)
    installerHeaderIcon: './public/favicon.ico', // 安装时头部图标
    installerSidebar: './build/installerSidebar.bmp', // 安装包安装侧边图片，要求164 × 314 像素
    uninstallerSidebar: './build/installerSidebar.bmp', // 安装包卸载侧边图片，要求164 × 314 像素
    createDesktopShortcut: true, // 是否创建桌面图标
    createStartMenuShortcut: true, // 是否创建开始菜单图标
    shortcutName: '${productName}', // 图标名称
    // displayLanguageSelector: true, //是否允许选择安装包语言
    // installerLanguages: ['zh_CN', 'en_US'], //安装包语言
    installerLanguages: ['zh_CN'], //安装包语言只要中文
    // https://learn.microsoft.com/zh-cn/openspecs/windows_protocols/ms-lcid/a9eac961-e77d-41a6-90a5-ce1a8b0cdb9c?redirectedfrom=MSDN
    language: 0x0804, //设置安装包 属性 详细信息 语言 为 中文简体
    // license: './LICENSE.txt', // 许可证 需要gb2312格式
    include: './alemon.nsh'
  },
  // 额外的资源文件
  // 用于放置 alemonjs 机器人模版
  // 先对资源进行压缩
  extraResources: [
    {
      from: 'template', // 资源文件的来源
      to: '.', // 资源文件的目标位置 会在打包后的resources目录下
      filter: ['**/*', '!.yarn{,/**/*}', '!yarn.lock', '!root']
    }
  ],
  // 更新地址
  publish: {
    provider: 'generic',
    url: 'https://alemonjs.com/api/app'
  }
}
