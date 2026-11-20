// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'intro',
    'getting-started',
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: ['api/ulixpy', 'api/ulixarm_cpp'],
    },
    'ulixarm_description',
  ],
};

export default sidebars;
