const addInstallTerminal = resolve => require(['../components/install/add_installation_terminal'], resolve);
const terminalMap = resolve => require(['../components/terminalMap'], resolve);
const terminalDetail = resolve => require(['../components/install/terminalDetail'], resolve);

const zwyRouter = [
    {
        path: '/main/terminalMap',
        name: 'terminalMap',
        title: '终端地图',
        component: terminalMap
    },
    {
        path: '/main/terminalDetail',
        name: 'terminalDetail',
        title: '终端工单详情',
        component: terminalDetail
    },
];

const zwyRouterChildren = [
    {
        path: 'addInstallTerminal',
        component: addInstallTerminal	 
    },
];

export {zwyRouter,zwyRouterChildren}