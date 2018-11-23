const state = {
    loginState: 0,
    cateList: null,
    headerConfig:{
        titlePart: {
            isHome: true,
            title: ''
        },
        hasSearch: false,
        handlePart: {
            type: '',
            handleClick: () => {}
        }
    },
    banners: [],
    chooseAddress: null
}
export default state;