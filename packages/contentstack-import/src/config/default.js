module.exports = {
  versioning: false,
  // use below hosts for eu region
  // host:'https://eu-api.contentstack.com/v3',
  // use below hosts for azure-na region
  // host:'https://azure-na-api.contentstack.com/v3',
  // pass locale, only to migrate entries from that locale
  // not passing `locale` will migrate all the locales present
  // locales: ['fr-fr'],
  host: 'https://api.contentstack.io/v3',
  extensionHost: 'https://app.contentstack.com',
  developerHubUrls: {
    'https://api.contentstack.io': 'https://developerhub-api.contentstack.com',
    'https://eu-api.contentstack.com': 'https://eu-developerhub-api.contentstack.com',
    'https://azure-na-api.contentstack.com': 'https://azure-na-developerhub-api.contentstack.com',
    'https://stag-api.csnonprod.com': 'https://stag-developerhub-api.csnonprod.com',
  },
  modules: {
    types: [
      'locales',
      'environments',
      'assets',
      'extensions',
      'marketplace-apps',
      'global-fields',
      'content-types',
      'workflows',
      'entries',
      'labels',
      'webhooks',
      'custom-roles',
    ],
    locales: {
      dirName: 'locales',
      fileName: 'locales.json',
      requiredKeys: ['code', 'uid', 'name', 'fallback_locale'],
    },
    customRoles: {
      dirName: 'custom-roles',
      fileName: 'custom-roles.json',
      customRolesLocalesFileName: 'custom-roles-locales.json',
    },
    environments: {
      dirName: 'environments',
      fileName: 'environments.json',
    },
    labels: {
      dirName: 'labels',
      fileName: 'labels.json',
    },
    extensions: {
      dirName: 'extensions',
      fileName: 'extensions.json',
    },
    webhooks: {
      dirName: 'webhooks',
      fileName: 'webhooks.json',
    },
    releases: {
      dirName: 'releases',
      fileName: 'releases.json',
      invalidKeys: ['stackHeaders', 'urlPath', 'created_at', 'updated_at', 'created_by', 'updated_by'],
    },
    workflows: {
      dirName: 'workflows',
      fileName: 'workflows.json',
      invalidKeys: ['stackHeaders', 'urlPath', 'created_at', 'updated_at', 'created_by', 'updated_by'],
    },
    assets: {
      dirName: 'assets',
      fileName: 'assets.json',
      // This is the total no. of asset objects fetched in each 'get assets' call
      limit: 100,
      host: 'https://api.contentstack.io',
      validKeys: ['uid', 'filename', 'url', 'status'],
      assetBatchLimit: 1,
    },
    content_types: {
      dirName: 'content_types',
      fileName: 'content_types.json',
      validKeys: ['title', 'uid', 'schema', 'options', 'singleton', 'description'],
      limit: 100,
    },
    entries: {
      dirName: 'entries',
      fileName: 'entries.json',
      invalidKeys: ['created_at', 'updated_at', 'created_by', 'updated_by', '_metadata', 'published'],
      limit: 50,
      assetBatchLimit: 5,
    },
    globalfields: {
      dirName: 'global_fields',
      fileName: 'globalfields.json',
      validKeys: ['title', 'uid', 'schema', 'options', 'singleton', 'description'],
      limit: 100,
    },
    stack: {
      dirName: 'stack',
      fileName: 'stack.json',
    },
    marketplace_apps: {
      dirName: 'marketplace_apps',
      fileName: 'marketplace_apps.json',
    },
  },
  languagesCode: [
    'af-za',
    'sq-al',
    'ar',
    'ar-dz',
    'ar-bh',
    'ar-eg',
    'ar-iq',
    'ar-jo',
    'ar-kw',
    'ar-lb',
    'ar-ly',
    'ar-ma',
    'ar-om',
    'ar-qa',
    'ar-sa',
    'ar-sy',
    'ar-tn',
    'ar-ae',
    'ar-ye',
    'hy-am',
    'az',
    'cy-az-az',
    'lt-az-az',
    'eu-es',
    'be-by',
    'bs',
    'bg-bg',
    'ca-es',
    'zh',
    'zh-au',
    'zh-cn',
    'zh-hk',
    'zh-mo',
    'zh-my',
    'zh-sg',
    'zh-tw',
    'zh-chs',
    'zh-cht',
    'hr-hr',
    'cs',
    'cs-cz',
    'da-dk',
    'div-mv',
    'nl',
    'nl-be',
    'nl-nl',
    'en',
    'en-au',
    'en-at',
    'en-be',
    'en-bz',
    'en-ca',
    'en-cb',
    'en-cn',
    'en-cz',
    'en-dk',
    'en-do',
    'en-ee',
    'en-fi',
    'en-fr',
    'en-de',
    'en-gr',
    'en-hk',
    'en-hu',
    'en-in',
    'en-id',
    'en-ie',
    'en-it',
    'en-jm',
    'en-jp',
    'en-kr',
    'en-lv',
    'en-lt',
    'en-lu',
    'en-my',
    'en-mx',
    'en-nz',
    'en-no',
    'en-ph',
    'en-pl',
    'en-pt',
    'en-pr',
    'en-ru',
    'en-sg',
    'en-sk',
    'en-si',
    'en-za',
    'en-es',
    'en-se',
    'en-ch',
    'en-th',
    'en-nl',
    'en-tt',
    'en-gb',
    'en-us',
    'en-zw',
    'et-ee',
    'fo-fo',
    'fa-ir',
    'fi',
    'fi-fi',
    'fr',
    'fr-be',
    'fr-ca',
    'fr-fr',
    'fr-lu',
    'fr-mc',
    'fr-ch',
    'fr-us',
    'gd',
    'gl-es',
    'ka-ge',
    'de',
    'de-at',
    'de-de',
    'de-li',
    'de-lu',
    'de-ch',
    'el-gr',
    'gu-in',
    'he-il',
    'hi-in',
    'hu-hu',
    'is-is',
    'id-id',
    'it',
    'it-it',
    'it-ch',
    'ja',
    'ja-jp',
    'kn-in',
    'kk-kz',
    'km-kh',
    'kok-in',
    'ko',
    'ko-kr',
    'ky-kz',
    'lv-lv',
    'lt-lt',
    'mk-mk',
    'ms',
    'ms-bn',
    'ms-my',
    'ms-sg',
    'mt',
    'mr-in',
    'mn-mn',
    'no',
    'no-no',
    'nb-no',
    'nn-no',
    'pl-pl',
    'pt',
    'pt-br',
    'pt-pt',
    'pa-in',
    'ro-ro',
    'ru',
    'ru-kz',
    'ru-ru',
    'ru-ua',
    'sa-in',
    'cy-sr-sp',
    'lt-sr-sp',
    'sr-me',
    'sk-sk',
    'sl-si',
    'es',
    'es-ar',
    'es-bo',
    'es-cl',
    'es-co',
    'es-cr',
    'es-do',
    'es-ec',
    'es-sv',
    'es-gt',
    'es-hn',
    'es-419',
    'es-mx',
    'es-ni',
    'es-pa',
    'es-py',
    'es-pe',
    'es-pr',
    'es-es',
    'es-us',
    'es-uy',
    'es-ve',
    'sw-ke',
    'sv',
    'sv-fi',
    'sv-se',
    'syr-sy',
    'tl',
    'ta-in',
    'tt-ru',
    'te-in',
    'th-th',
    'tr-tr',
    'uk-ua',
    'ur-pk',
    'uz',
    'cy-uz-uz',
    'lt-uz-uz',
    'vi-vn',
    'xh',
    'zu',
  ],
  apis: {
    userSession: '/user-session/',
    locales: '/locales/',
    environments: '/environments/',
    assets: '/assets/',
    content_types: '/content_types/',
    entries: '/entries/',
    extensions: '/extensions/',
    webhooks: '/webhooks/',
    globalfields: '/global_fields/',
    folders: '/folders/',
    stacks: '/stacks/',
    labels: '/labels/',
  },
  rateLimit: 5,
  preserveStackVersion: false,
  entriesPublish: true,
  concurrency: 1,
  //  ,useBackedupDir: '_backup_397'
  // backupConcurrency: 10,
};
