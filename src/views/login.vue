<template>
<div class="ms-login">
 <el-form :model="ruleForm2" ref="ruleForm2" :rules='rules' label-position="left" label-width="0px" class="demo-ruleForm loginFrom">
        <h1>登录</h1>
        <el-form-item prop='name'>
            <el-input v-model="ruleForm2.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop='pass'>
            <el-input v-model="ruleForm2.pass" type="password" placeholder="密码"></el-input>
            </el-form-item>
        <div class="clear">
          <div class="rt">
          <el-checkbox v-model="checked" class="checkbox">记住密码</el-checkbox>
        </div>
        </div>
       
        <el-form-item>
            <el-button type="primary" :loading="loading" @click.native.prevent ="login">登录</el-button>
        </el-form-item>
    </el-form>
</div>
   
</template>
<script>
// import { requestLogin } from '../api/api';
export default({
	
  methods: {
    login (ev) {
    	console.log(this.barUrl)
      var _this = this
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.logining = true
          var loginParams = {
            username: this.ruleForm2.name,
            password: this.ruleForm2.pass
          }
          requestLogin(loginParams).then(data => {
            this.logining = false
            let {msg, code, user} =data;
            if (code !==200) {
              this.$message({
                message: msg,
                type: "error"
              })
            }else{
              sessionStorage.setItem('user',JSON.stringify(user))
              
            }
          })
        } else {
          return false
        }
      })
    }
  },
  data () {
    return {
      loading: false,
      ruleForm2: {
        name: "",
        pass: ""
      },
      rules: {
        name: [
          {required: true, message: '用户名不能为空', trigger: 'blue'}
        ],
        pass: [
          {required: true, message: '密码不能为空', trigger: 'blue'}
        ]
      },
      checked: false
    }
  }
})
</script>
<style lang="scss" scoped>
.ms-login{
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
h1{
  font-size:16px;
  color:#000000;
  font-weight: bold;
  padding: 10px 0;
  text-align: center;
}
.clear{
  padding: 10px 0 20px 0;
  overflow: hidden;
}
.rt{
  float:right;
  .checkbox{
  color: #a0a0a0;
  }
  span{
    cursor: pointer;
    color: #f19149;
    font-size:14px;
    margin-left:5px;
  }
}

</style>
