export const menu = [
  {
    icon: "sitemap",
    title: 'SEGMAP',
    createPath: '/segmap/create',
    createLabel: 'Create Segmap',
    listPath1: '/segmap/list',
    listLabel1: 'Segmap List',
    id: 'segmap',
    text:'Segment Map'
  },
  {
    icon: "database",
    title: 'Migration Tool',
    listPath1: '/conversiontool',
    listLabel1: 'Migration Tool',
    id: 'migration',
    text:'Migration Tool'
  },
  // {
  //   icon: "bars",
  //   title: 'RLB LISTINGS',
  //   listPath1: '/rlbvtype/list',
  //   listPath2: '/rlbledger/list',
  //   listPath3: '/rlbcc/list',
  //   listPath4: '/rlbitem/list',
  //   listLabel1: 'RLB Vtype List',
  //   listLabel2: 'RLB Ledger List',
  //   listLabel3: 'RLB Cost Center List',
  //   listLabel4: 'RLB item List',
  //   id: 'rlb',
  //   text:'Realbooks Listings'
  // },

  // {
  //   icon: "map",
  //   title: 'TALLY LISTING',
  //   listPath1: '/vtype/list',
  //   listPath2: '/ledgergroup/list',
  //   listPath3: '/ledger/list',
  //   listPath4: '/costcategory/list',
  //   listPath5: '/costcenter/list',
  //   listPath6: '/godown/list',
  //   listPath7: '/itemgroup/list',
  //   listPath8: '/item/list',
  //   listPath9: '/unit/list',
  //   listPath10: '/alt-unit/list',
  //   listLabel1: 'Tally Vtype List',
  //   listLabel2: 'Tally Ledger Group List',
  //   listLabel3: 'Tally Ledger List',
  //   listLabel4: 'Tally Cost Category List',
  //   listLabel5: 'Tally Cost Center List',
  //   listLabel6: 'Tally Godown List',
  //   listLabel7: 'Tally Itemgroup List',
  //   listLabel8: 'Tally Item List',
  //   listLabel9: 'Tally Unit List',
  //   listLabel10: 'Tally Alt Unit List',
  //   id: 'tally',
  //   text:'Tally Listing'
  // },

  // {
  //   icon: "tasks",
  //   title: 'TALLY TRAIL LISTING',
  //   listPath1: '/stock/list',
  //   listPath2: '/opening/list',
  //   listPath3: '/transaction/list',
  //   listLabel1: 'Stock List',
  //   listLabel2: 'Opening List',
  //   listLabel3: 'Transaction List',
  //   id: 'stock',
  //   text:'Trail Listing'
  // },
  {
    icon: "upload",
    title: 'Manual Uploads',
    listPath1: '/filelist/list',
    listLabel1: 'Manual Uploads',
    id: 'filelist',
    text:'Manual Uploads'
  },
  // {
  //   icon: "upload",
  //   title: 'UPLOAD FILE',
  //   listPath1: '/uploadfile',
  //   listLabel1: 'Upload File',
  //   id: 'uploadfile'
  // },
  {
    icon: "download",
    title: 'DOWNLOAD FILE',
    listPath1: '/downloadpage',
    listLabel1: 'Download File',
    id: 'downloadpage',
    text:'Download Files'
  },

]

export const sidebarMenu = [ 
  {
    icon: 'sitemap',
    title: 'SEGMENT MAP',
    path: '/segmap',
    text: 'Segment Map',
    subpaths: [
      {
        path: "/segmap/create",
        text: "Create Segmap",
        icon: "arrow right",
      },
      {
        path: "/segmap/list",
        text: "Segmap List",
        icon: "arrow right",
      },
    ],
  },
  {
    icon: "cloud upload",
    title: 'Mapping Uploads',
    path: '/mapping',
    id: 'mapping',
    text:'Mapping Uploads'
  },
  {
    icon: "database",
    title: 'Migration Tool',
    path: '/conversiontool',
    id: 'migration',
    text:'Migration Tool'
  },
  {
    icon: "upload",
    title: 'Manual Uploads',
    path: '/filelist/list',
    id: 'filelist',
    text:'Manual Uploads'
  },
  {
    icon: 'download',
    title: 'DOWNLOAD FILES',
    path: '/downloadpage',
    id: 'downloadpage',
    text: 'Download Files'
  }
]