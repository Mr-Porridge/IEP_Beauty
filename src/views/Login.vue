<template>
  <div style="position: absolute;margin-top: 0;margin-bottom: 0;width: 100%;height: 100%;">
    <img :src="this.icon" style="position: fixed;width: 20%;z-index: -1;top: 5%;margin-left: 10%;" alt=""/>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
             class="demo-ruleForm login-container"
    style="margin-top: 6%">
      <p class="title">欢迎登陆IEP综合数据后台管理系统</p>
      <p class="tips">注意：请填写准确账号及密码！</p>
      <el-form-item prop="account" style="width: 60%;margin-left: 20%;">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="请输入账号/用户名"
                  size="large"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass" style="width: 60%;margin-left: 20%;">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请输入密码"
                  size="large"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember" style="width: 60%;margin-left: 20%;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" class="denglu" style="" @click.native.prevent="handleSubmit2" :loading="logining">
          登录
        </el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
    <img :src="this.logo" style="position: fixed;width: 100%;z-index: -1;bottom:0px;width:80%;margin-left: 10%;"
         alt=""/>
    <div class="bottomTitle">@技术支持</div>
  </div>
</template>

<script>
    import {requestLogin} from '../api/api';
    //import NProgress from 'nprogress'
    export default {
        data() {
            return {
                icon: 'static/icon.jpg',
                logo: 'static/lgon.jpg',
                // icon: 'http://47.110.134.247/family_members/icon.jpg',
                // logo: 'http://47.110.134.247/family_members/lgon.jpg',
                logining: false,
                ruleForm2: {
                    // account: 'admin',
                    // checkPass: '123456'
                    account: '',
                    checkPass: ''
                },
                rules2: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        //{ validator: validaePass }
                    ],
                    checkPass: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        //{ validator: validaePass2 }
                    ]
                },
                checked: true
            };
        },
        methods: {
            handleReset2() {
                this.$refs.ruleForm2.resetFields();
            },
            handleSubmit2(ev) {
                var _this = this;
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        //_this.$router.replace('/table');
                        this.logining = true;
                        //NProgress.start();
                        //var loginParams = {username: this.ruleForm2.account, password: this.ruleForm2.checkPass};
                        const loginParams = {userName: this.ruleForm2.account, password: this.ruleForm2.checkPass};
                        requestLogin(loginParams).then(res => {
                            this.logining = false;
                            //整合调试
                            console.log("Testing for res.data:", res);
                            //NProgress.done();
                            /*let {msg, code, user} = data;
                            console.log(msg, code, user);
                            if (code !== 200) {
                                this.$message({
                                    message: msg,
                                    type: 'error'
                                });
                            } else {
                                /!*把用户信息写入session*!/
                                sessionStorage.setItem('user', JSON.stringify(user));
                                this.$router.push({path: '/schoolTables'});
                            }*/
                            let {data, errCode, errMessage, permission, rank, username} = res;
                            let user = {
                                "id": data,
                                "username": username,
                                "avatar": "http://47.110.134.247/lmy0.jpg",
                                "name": username,
                                "permission": permission,
                                "rank": rank,
                            };
                            console.log(data, errCode, errMessage, permission, rank, username);
                            if (errCode !== 0) {
                                this.$message({
                                    message: errMessage,
                                    type: 'error'
                                });
                            } else {
                                /*把用户信息写入session*/
                                sessionStorage.setItem('user', JSON.stringify(user));
                                /*第一组的注册策略*/
                                localStorage.setItem('userId', data);
                                localStorage.setItem('userName', username);
                                localStorage.setItem('Permission', permission);
                                localStorage.setItem('rank', rank);
                                //document.cookie = `Authorization=${res.headers.authorization}`;
                                // 登陆后跳转页面
                                this.$router.push({path: '/HomePage'});
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    /*opacity: 0.6;*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 50%;
    padding: 50px 15px;
    background: #ffffff;
    border: 1px solid #ffffff;
    box-shadow: 3px 14px 49px 0px rgba(223, 223, 223, 0.63);

    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #333333;
      font-weight: bold;
      font-size: 18px;
      font-family: SourceHanSansCN-Normal;
    }

    .tips {
      width: 100%;
      margin: 30px 20%;
      height: 16px;
      font-family: SourceHanSansCN-Light;
      font-size: 10px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 30px;
      letter-spacing: 0px;
      color: #999999;
    }

    .remember {
      margin: 0px 0px 35px 0px;
      color: #000000;
      font-size: 18px;
    }

    .denglu {
      box-shadow: 0px 13px 39px 0px rgba(251, 143, 146, 0.84);
      background-color: #e71218;
      border: none;
      width: 26%;
      margin-left: 37%;
      /*font-size: 18px;*/
    }
  }

  .bottomTitle {
    position: fixed;
    width: 100%;
    height: 34px;
    font-size: 10px;
    background-color: #e71218;
    text-align: center;
    line-height: 34px;
    bottom: 0;
    color: #ffffff;
    font-family: SourceHanSansCN-Normal;
    z-index: 99;
  }
</style>
