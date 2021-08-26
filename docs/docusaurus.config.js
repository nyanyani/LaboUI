const lightCodeTheme = require("prism-react-renderer/themes/github")
const darkCodeTheme = require("prism-react-renderer/themes/dracula")

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "LaboUI",
  tagline: "React 自定义组件库",
  url: "https://nyanyani.github.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.svg",
  organizationName: "nyanyani", // Usually your GitHub org/user name.
  projectName: "LaboUI", // Usually your repo name.
  i18n: { defaultLocale: "zh-hans", locales: ["zh-hans", "en"] },
  themeConfig: {
    navbar: {
      logo: {
        alt: "LaboUI Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "文档",
        },
        { to: "/blog", label: "博客", position: "left" },
        {
          href: "https://github.com/nyanyani/LaboUI",
          label: "仓库",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Tutorial",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "About",
          items: [
            {
              label: "Me",
              href: "https://github.com/nyanyani",
            },
            {
              label: "Resume",
              href: "https://github.com/nyanyani",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/nyanyani/LaboUI",
            },
          ],
        },
      ],
      copyright: `MIT licensed | Copyright © ${new Date().getFullYear()} Nyanyani. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    hideableSidebar: true,
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/nyanyani/LaboUI/edit/docs/website/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: "https://github.com/nyanyani/LaboUI/edit/docs/website/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["zh", "en"],
      },
    ],
  ],
}
