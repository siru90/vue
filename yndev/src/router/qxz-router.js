const SignIn = resolve => require(['../containers/signIn'], resolve);

const qxzRouter = [
    {
        path: "/signIn",
        component: SignIn,
        name: "signIn"
    }
]
const qxzRouterChildren = [
    
];
export {qxzRouter, qxzRouterChildren}