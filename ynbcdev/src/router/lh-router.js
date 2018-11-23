const Home = resolve => require(['../containers/HomeNewNew'], resolve);
const Address = resolve => require(['../containers/Address'], resolve);
const AddAddress = resolve => require(['../containers/AddAddress'], resolve);
export const lhRouter = [{
            path: "/addAddress",
            component: AddAddress,
        }]
export const lhRouterChildren = [{
            path: "home",
            component: Home,
        },{
            path: "/address",
            component: Address,
            name: "address"
        }]
