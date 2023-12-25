<template>
     <el-row  type="flex" align="middle" style="height: 40px; width: 100%;">
        <!-- 左侧内容 -->
        <el-col :span="20">
          <span>{{ treeNode.name }}</span>
        </el-col>
        <!-- 右侧内容 -->
        <el-col :span="4">
          <el-row type="flex" justify="end">
            <el-col>{{ treeNode.managerName }}</el-col>
            <!-- 放置下拉菜单 -->
            <el-col>
                <el-dropdown @command="operateDepts">
                  <span>
                    操作<i class="el-icon-arrow-down"></i>
                  </span>
                  <!-- 具名插槽 -->
                  <el-dropdown-menu slot="dropdown">
                    <!-- 下拉选项 -->
                <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
                <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
              </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
</template>

<script>
import {delDepartments} from "@/api/departments"
export default {
  props:{
    treeNode:{
      type:Object,
      required:true
    },
    isRoot:{
      type:Boolean,
      default:false
    }
    },
    methods:{
      //点击 编辑 删除 新增时触发
      operateDepts(type){
        if(type==='add'){
          // 添加部门
          // alert('添加部门')
          // 添加子部门，就是在当前点击的部门(this.treeNode)下 添加子部门
          this.$emit('addDepts',this.treeNode)//触发自定义事件，告诉父组件显示新增部门弹出层---子向父
        }else if(type==='edit'){
          this.$emit('editDepts',this.treeNode)
          // 编辑部门
        }else{
          // 删除部门
          // alert('删除部门')
          this.$confirm('确定要删除该组织部门吗？').then(()=>{
            return delDepartments(this.treeNode.id)//返回一个promise对象
          }).then(()=>{//接收promise成功返回的对象
            // 只需要等到成功的时候，调用接口删除了 后端数据变化了 但是前端没变 重新获取
            this.$emit('delDepts')//触发自定义事件
            this.$message.success('删除部门成功')
          })
        }
      }
    }
}
</script>

<style>

</style>