<template>
  <div class="manage">
    <!-- 弹窗 -->
    <!-- visible后面的sync属性加上了的话就可以不单纯依靠isShow来关闭了 原生的x也可以关闭 -->
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <CommonForm
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
      />

      <div class="dialog-footer" slot="footer">
        <el-button @click="isShow = false"> 取消 </el-button>
        <el-button type="primary" @click="confirm"> 确定 </el-button>
      </div>
    </el-dialog>

    <!-- 头部区域 -->
    <div class="manage-header">
      <el-button type="primary" @click="addUserWindow"> 新增 </el-button>

      <CommonForm 
        :formLabel="formLabel" 
        :form="searchFrom" 
        :inline="true"
      >
        <!-- slot位 -->
        <el-button type="primary" @click="getList(searchFrom.keyword)"
          >搜索</el-button
        >
      </CommonForm>
    </div>


    <!-- 表区域 -->
    <CommonTable
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    />  
    
  </div>
</template>

<script>
import CommonForm from "@/components/CommonForm.vue";
import CommonTable from '@/components/CommonTable.vue'
import {getUserList,addUser,editUser, deleteUser} from '@/api'
export default {
  name: "user",
  components: { CommonForm,CommonTable },
  data() {
    return {
      isShow: false,
      operateType: "",
      //属于dialog的循环
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      //属于dialog的数据绑定
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      //顶部搜索栏
      formLabel:[
        {
        model:'keyword',
        label:'',
        type:'input'
        }
      ],
      //顶部搜索栏的数据绑定
      searchFrom:{
        keyword:''
      },

      //table数据
      tableData:[],

      //table列名和
      tableLabel:[
        {
          prop:'name',
          label:'姓名'
        },
        {
          prop:'age',
          label:'年龄'
        },
        {
          prop:'sexLabel',
          label:'性别'
        },
        {
          prop:'birth',
          label:'出生日期'
        },
        {
          prop:'addr',
          label:'地址',
          width:300
        },
      ],

      //table配置
      config:{
        page:1,
        total:30
      }
    };
  },

  methods: {
    //处理点击新增后的dialog弹窗的确定按钮点击事件
    async confirm() {
      if(this.operateType === 'add'){
          
        let result = await addUser(this.operateForm)
        this.isShow = false
        this.getList() //重置更新列表
      }else{
        let result = await editUser(this.operateForm)
        this.isShow = false
        this.getList() //重置更新列表
      }
    },
    //处理点击头部区域的新增用户按钮点击事件
    addUserWindow() {
        this.operateType = 'add'
        this.isShow = true
        //重置绑定数据，以免出现上次刚填完的数据
        this.operateForm = {
          name:'',
          addr:'',
          age:'',
          birth:'',
          sex:''
        }
    },

    //处理得到表数据
    async getList(name = ''){
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      let result = await getUserList({
        page:this.config.page,
        name
      })
      if(result.code == 200){
        this.tableData = result.list.map(item => {
          item.sexLabel = item.sex === 0 ? '女' : '男'
          return item
        })
        this.config.total = result.count
        this.config.loading = false
      }
    },
    //处理编辑用户
    editUser(row){
        this.operateType = 'edit'
        this.isShow = true
        this.operateForm = row
        
    },
    //处理删除用户
    async delUser(row){
      this.$confirm('此操作降永久删除该用户，是否继续？',"提示",{
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        type:"warning"
      }).then(async ()=>{
        const id = row.id
        let result = await deleteUser({id})
        if(result.code == 200){
          this.$message({
            type:'success',
            message:'删除成功'
          })
          this.getList()
        }
      })
    },
  },
  created(){
    this.getList()
  }
};
</script>

<style scoped>
.manage{
  display: flex;
  flex-direction: column;
}
.manage-header{
  display: flex;
  justify-content: space-between;
  
}
.manage-header button{
  height: 40px;
}
</style>