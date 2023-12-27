<template>
  <div class="dashborad-container">
    <div class="app-container">
      <!-- 组织架构--头部 -->
     <el-card class="tree-card">
      <!-- 放置结构内容 -->
      <tree-tools :treeNode="company" :isRoot="true"  @addDepts="addDepts"/>
      <el-tree :data="list" :props="defaultProps" :default-expand-all="true"> 
        <!-- 传入内容 插槽内容 会循环多少次 就循环多少次 -->
        <!-- 作用域插槽  slot-scope='obj' 接收传递给插槽的数据  data 每个节点的数据对象 -->
      <tree-tools slot-scope="{data}"  :treeNode="data"  @delDepts="getDepartments"  @addDepts="addDepts" @editDepts="editDepts"/>
      </el-tree>
     </el-card>
    </div>
    <!-- 放置新增弹层组件 -->
    <add-dept ref="addDept"  :showDialog.sync="showDialog" :treeNode="node" @addDepts="getDepartments"></add-dept>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import {getDepartments} from '@/api/departments'
import {tranListToTreeData} from '@/utils/index'
import AddDept from './components/add-dept.vue'
export default {
  components:{
    TreeTools,
    AddDept
  },
  data(){
    return{
      company:{},
      list: [],
     defaultProps:{
      label:'name'
     },
     showDialog:false,//默认不显示新增弹出层
     node:null,//记录当前点击的节点
    }
  },
  created(){
    this.getDepartments()
  },
  methods:{
    async getDepartments(){
     const result=await getDepartments()
    //  console.log(result);
     this.company={name:result[0].name,managerName:'负责人',id:1}

     const newResult=result.slice(1)
    //  console.log(newResult);
     this.list=tranListToTreeData(newResult,1)
    },
    addDepts(node){
      this.showDialog=true//显示新增部门弹出层
      this.node=node
      // console.log(this.node);

    },
    editDepts(node){
      this.showDialog=true//弹出层
      this.node=node
      // 获取部门详情
      this.$refs.addDept.getDepartDetail(node.id)
    }
  }
  
}
</script>

<style  scoped>
.tree-card{
  padding:30px 140px;
  font-size:14px ;
}
</style>