import { defineConfig } from 'vitepress'

const HOSTNAME = 'https://hexters.github.io/hexa-docs/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // Served from https://hexters.github.io/hexa-docs/
  base: '/hexa-docs/',

  lang: 'en-US',
  title: 'Filament Hexa',
  description: 'Effortless role & permission management plugin for Filament (v4 & v5).',

  lastUpdated: true,
  cleanUrls: true,

  // Generates dist/sitemap.xml at build time.
  sitemap: {
    hostname: HOSTNAME,
  },

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap' }],
    ['meta', { name: 'theme-color', content: '#f59e0b' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Filament Hexa' }],
    ['meta', { property: 'og:image', content: 'https://github.com/hexters/assets/blob/main/hexa/v2/banner.png?raw=true' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://github.com/hexters/assets/blob/main/hexa/v2/banner.png?raw=true' }],
    ['meta', { name: 'keywords', content: 'Filament, Laravel, role, permission, ACL, authorization, Filament plugin, Hexa, multi-tenant, multi-panel' }],
  ],

  // Inject canonical + per-page Open Graph / Twitter tags for every page.
  transformHead({ pageData, siteData }) {
    const path = pageData.relativePath
      .replace(/(^|\/)index\.md$/, '$1')
      .replace(/\.md$/, '')
    const url = HOSTNAME + path

    const title =
      pageData.frontmatter.title ||
      pageData.title ||
      siteData.title
    const description =
      pageData.frontmatter.description ||
      pageData.description ||
      siteData.description

    return [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
    ]
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Changelog', link: '/changelog' },
      { text: 'Issues', link: 'https://github.com/hexters/hexa-docs/issues' },
      {
        text: 'v3',
        items: [
          { text: 'Hexa Lite (free)', link: 'https://filamentphp.com/plugins/hexters-hexa' },
          { text: 'Buy a License', link: 'https://buymeacoffee.com/hexters/e/476730' },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Assigning Roles', link: '/guide/assigning-roles' },
          ],
        },
        {
          text: 'Permissions',
          items: [
            { text: 'Defining Permissions', link: '/guide/defining-permissions' },
            { text: 'Granting Access', link: '/guide/granting-access' },
            { text: 'Descriptions & Order', link: '/guide/descriptions-and-order' },
            { text: 'Custom Access', link: '/guide/custom-access' },
          ],
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Multi Panel', link: '/guide/multi-panel' },
            { text: 'Multi Tenancy', link: '/guide/multi-tenancy' },
            { text: 'Meta Options', link: '/guide/meta-options' },
            { text: 'Vendor Publish', link: '/guide/vendor-publish' },
            { text: 'Traits Reference', link: '/guide/traits' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hexters/hexa-docs' },
    ],

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/hexters/hexa-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Hexters',
    },
  },
})
