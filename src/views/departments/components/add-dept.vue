<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
    <el-form ref="deptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input style="width:80%" placeholder="1-50个字符"  v-model="formData.name" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input style="width:80%" placeholder="1-50个字符"  v-model="formData.code"/>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select style="width:80%" placeholder="请选择"  v-model="formData.manager" @focus="getEmployeeSimple">
          <el-option v-for="item in people" :key="item.id" :label="item.username" :value="item.username" >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input style="width:80%" placeholder="1-300个字符" type="textarea" v-model="formData.introduce"/>
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="center" slot="footer">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import {getDepartments,addDepartments,getDepartDetail,updateDepartments} from "@/api/departments"
import {getEmployeeSimple} from '@/api/employees'
import departments from "@/router/modules/departments"
export default {
props:{
  showDialog:{
    type:Boolean,
    default:false
  },
  treeNode:{
    type:Object,
    default:null
  }
 
},
data(){
  //定义检查新增部门名称在同级是否存在的方法
  const checkNameRepeat=async (rule,value,callback)=>{
    // value是新增部门的名称，要去和同级别的部门去比较，看是否有相同的。如果有，不通过；如果没有，通过
   const result= await getDepartments()
  //  console.log('111');
  //  console.log(this.treeNode);
  //  console.log('333');
  //  console.log(result);
    // 去找同级部门下有没有和value相同的数据
    // 找到所有的子部门
    let isRepeat=false
    if(this.formData.code===""){
    isRepeat=  result.filter(item=>item.pid===this.treeNode.pid&&item.id!==this.treeNode.id).some(item=>item.name===value)
    }else{
      isRepeat= result.filter(item=>item.pid===this.treeNode.id).some(item=>item.name===value)
    }
  // //  如果isRepeat为true，说明找到了一样的名字；
  isRepeat?callback(new Error(`同级部门下已存在${value}`)):callback()
  } 

  //定义检查新增部门编码是否存在的方法(全局)
  const checkCodeRepeat=async (rule,value,callback)=>{
    const result= await getDepartments()
    let isRepeat=false
  if(this.formData.code===""){
   isRepeat= result.filter(item=>item.id!==this.treeNode.id).some(item=>item.code===value&&value)
  }else{
    isRepeat= result.some(item=>item.code===value&&value)
  }
   isRepeat?callback(new Error(`${value}已经存在`)):callback()
  }

  return{
    formData:{//定义表单数据
      name:'',
      code:'',
      manager:'',
      introduce:'',
    },
    rules:{//定义表单校验规则
      name: [
              { required: true, message: '部门名称不能为空', trigger: ['blur'] },
              { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: ['blur'] },
              {validator:checkNameRepeat,  trigger:'blur'}
            ],
      code: [
              { required: true, message: '部门编码不能为空', trigger: ['blur'] },
              { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: ['blur'] },
              {validator:checkCodeRepeat, trigger:'blur'}
            ],
      manager: [
              { required: true, message: '部门负责人不能为空', trigger: ['blur'] }
            ],
      introduce: [
              { required: true, message: '部门介绍不能为空', trigger: ['blur'] },
              { min: 1, max: 300, message: '部门介绍要求1-300个字符', trigger: ['blur']}
            ]
        },
        people:[]
       
  }
},
methods:{
   
    async getEmployeeSimple(){
     this.people=await getEmployeeSimple()
    },

  
    btnOK(){
    this.$refs.deptForm.validate(async isOK=>{
      if(isOK){
        // if(this.formData.code===""){
        //   await updateDepartments(this.formData)
        // }
        await addDepartments({...this.formData,pid:this.treeNode.id,managerId:this.treeNode.id})
        this.$emit('addDepts')
        this.$emit('update:showDialog',false)
      }
    })
    },
    btnCancel(){
      // this.formData={
      //   name:'',
      // code:'',
      // manager:'',
      // introduce:''
      // }
      this.$emit('update:showDialog',false)
      this.$refs.deptForm.resetFields()
    },
    // 获取部门详情的方法
    async getDepartDetail(id){
   const form =  await getDepartDetail(id)
  //  console.log(form);
   this.formData.name=form.name
   this.formData.manager=form.managerName
   this.formData.code=form.code
   this.formData.introduce=form.introduce
    },
  
  },
  computed:{
    showTitle(){
     return this.formData.code===""?"新增子部门":"编辑部门"
    }
  }
}
</script>

<style>

</style>