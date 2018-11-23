<template>
    <wbMaintain :classifyList="classifyList"></wbMaintain>

    
</template>
<script>
/*
1：先取得所有分类，提取出组合分类：分类id，二级分类数据
2：获取组合分类下所有数据
*/
import wbMaintain from '../../components/wbMaintain/index'
export default {
    data() {
        return {
            startCode: "11", //组合商品分类为：11
        }
    },
    components: {
        wbMaintain,
    },
    computed: {
        
        //组合商品二级分类
        classifyList(){
            //this.startCode = "1";
            let classifyList = this.$store.state.jyModules.classifyList;
            console.log("----------classifyList------------");
            console.log(classifyList);
            let list = [];
            classifyList.forEach(e => {
                //console.log(e);
                if(e.goodsclasscode == this.startCode){
                    list = e.secList;
                }
            });
            return list;
        }
        
    },

}
</script>
<style>

</style>