import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Pensieve',
  description: '儲思盆 - 個人寫作與研究',
  lang: 'zh-TW',

  head: [
    ['meta', { name: 'author', content: 'Clement Tang' }],
    ['meta', { property: 'og:locale', content: 'zh_TW' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Pensieve' }]
  ],

  // 使用 docs 作為根目錄
  srcDir: 'docs',

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Pensieve',

    nav: [
      { text: '首頁', link: '/' },
      { text: '文章', link: '/articles/' },
      {
        text: '研究',
        items: [
          { text: '企業研究', link: '/company-research/' },
          { text: '議題研究', link: '/topic-research/' }
        ]
      },
      { text: '關於', link: '/about' }
    ],

    sidebar: {
      '/articles/': [
        {
          text: '文章',
          items: [
            { text: '總覽', link: '/articles/' }
          ]
        }
      ],
      '/company-research/': [
        {
          text: '企業研究',
          items: [
            { text: '總覽', link: '/company-research/' }
          ]
        }
      ],
      '/topic-research/': [
        {
          text: '議題研究',
          items: [
            { text: '總覽', link: '/topic-research/' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Clementtang/pensieve' }
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜尋',
            buttonAriaLabel: '搜尋'
          },
          modal: {
            noResultsText: '找不到相關結果',
            resetButtonTitle: '清除搜尋',
            footer: {
              selectText: '選擇',
              navigateText: '導航',
              closeText: '關閉'
            }
          }
        }
      }
    },

    outline: {
      label: '本頁目錄',
      level: [2, 3]
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    lastUpdated: {
      text: '最後更新',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },

    footer: {
      message: '以 Claude AI 輔助寫作',
      copyright: 'Copyright © 2025 Clement Tang'
    },

    returnToTopLabel: '返回頂部',
    sidebarMenuLabel: '選單',
    darkModeSwitchLabel: '深色模式'
  },

  markdown: {
    lineNumbers: false
  },

  lastUpdated: true
})
