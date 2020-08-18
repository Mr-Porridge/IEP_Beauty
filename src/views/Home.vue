<template>
  <el-row class="container">
    <el-col :span="24" class="header">
<!--      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'" style="font-size: x-large">-->
      <el-col :span="10" class="logo" style="font-size: large;">
      <img :src="this.logo" alt=""/>
        <strong>{{collapsed?'':sysName}}</strong>
      </el-col>
      <!--收起导航栏 st-->
<!--      <el-col :span="10">-->
<!--        <div class="tools" @click.prevent="collapse">-->

<!--          <i class="fa fa-indent fa-2x" aria-hidden="true" style="color:#d61117;"></i>-->

<!--        </div>-->
<!--      </el-col>-->
      <!--收起导航栏 ed-->
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userinfo-inner">
                      <img :src="this.sysUserAvatar" alt=""/> {{sysUserName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Hello, {{sysUserName}}</el-dropdown-item>
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            @open="handleopen"
            @close="handleclose"
            @select="handleselect"
            :collapse="collapsed"
            :unique-opened=openMethod
            background-color="#545c64"
            color="#fff"
            text-color="#fff"
            active-text-color="#ffd04b"
            style="width: 90%"
        >
          <template v-for="(item,index) in $router.options.routes"
                    v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="!item.leaf">
              <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span>
              </template>
              <template v-for="child in item.children">
                <el-submenu :index="child.path" v-if="(child.goon) && (child.authority[sysUserRank] === 1)">
                  <template slot="title"><i :class="child.iconCls"></i><span slot="title">{{child.name}}</span>
                  </template>
                  <el-menu-item v-for="childone in child.children" :index="childone.path" :key="childone.path"
                                v-if="(!childone.hidden) && (childone.authority[sysUserRank] === 1)"
                                @click="$router.push(childone.path)"><span slot="title">{{childone.name}}</span>
                  </el-menu-item>
                </el-submenu>
                <el-menu-item style="padding-left: 50px"
                              :index="child.path" :key="child.path"
                              v-else-if="!child.hidden&&!child.goon&&(child.authority[sysUserRank] === 1)"
                              @click="$router.push(child.path)">
                  <i :class="child.iconCls"></i><span slot="title">{{child.name}}</span>
                </el-menu-item>
              </template>


            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0&&item.authority[0] === 1"
                          :index="item.children[0].path"
                          @click="$router.push(item.children[0].path)"><i
                :class="item.iconCls"></i><span slot="title">{{item.children[0].name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
        <el-col :span="24" class="footer" style="display: none">
          @技术支持&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;南京邮电大学
        </el-col>
        <!--<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen"-->
        <!--@close="handleclose" @select="handleselect"-->
        <!--unique-opened router v-show="!collapsed">-->
        <!--<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">-->
        <!--<el-submenu :index="index+''" v-if="!item.leaf">-->
        <!--<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>-->
        <!--<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path"-->
        <!--v-if="!child.hidden">{{child.name}}-->
        <!--</el-menu-item>-->
        <!--</el-submenu>-->
        <!--<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i-->
        <!--:class="item.iconCls"></i>{{item.children[0].name}}-->
        <!--</el-menu-item>-->
        <!--</template>-->
        <!--</el-menu>-->
        <!--&lt;!&ndash;导航菜单-折叠后&ndash;&gt;-->
        <!--<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed"ref="menuCollapsed">-->
        <!--<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">-->
        <!--<template v-if="!item.leaf">-->
        <!--<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)"-->
        <!--@mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>-->
        <!--<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)"-->
        <!--@mouseout="showMenu(index,false)">-->
        <!--<li v-for="child in item.children" v-if="!child.hidden" :key="child.path"-->
        <!--class="el-menu-item" style="padding-left: 40px;"-->
        <!--:class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">-->
        <!--{{child.name}}-->
        <!--</li>-->
        <!--</ul>-->
        <!--</template>-->
        <!--<template v-else>-->
        <!--<li class="el-submenu">-->
        <!--<div class="el-submenu__title el-menu-item"-->
        <!--style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;"-->
        <!--:class="$route.path==item.children[0].path?'is-active':''"-->
        <!--@click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i>-->
        <!--</div>-->
        <!--</li>-->
        <!--</template>-->
        <!--</li>-->
        <!--</ul>-->
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>

        </div>
      </section>
    </el-col>

  </el-row>
</template>

<script>
    export default {
        data() {
            return {
                logo: 'static/home.jpg', //平台logo
                // logo: 'http://47.110.134.247/family_members/home.jpg', //平台logo
                sysName: 'IEP综合数据管理平台',
                collapsed: false,
                openMethod: true, //手风琴式展开
                sysUserName: '',
                sysUserAvatar: '',
                sysUserRank: "admin",
                sysShow: true,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            handleopen() {
                //console.log('handleopen');
            },
            handleclose() {
                //console.log('handleclose');
            },
            handleselect: function (a, b) {
            },
            //退出登录
            logout: function () {
                var _this = this;
                this.$confirm('确认退出吗?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    sessionStorage.removeItem('user');
                    _this.$router.push('/login');
                }).catch(() => {

                });

            },
            //折叠导航栏
            collapse: function () {
                this.collapsed = !this.collapsed;
            },
            showMenu(i, status) {
                this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
            },
            //判断手机
            _isMobile() {
                let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
                return flag;
            },

            //彩蛋
            oreo() {
                /*console.group("制作方：");
                console.log("南京邮电大学开发团队");
                console.group("制作人员名单：");
                console.log("周奕飞");
                console.log("卢兴康");
                console.log("郑博文");
                console.group("指导老师：");
                console.log("薛景");*/
                //console.log("%c ", "background: url(http://47.110.134.247/family_members/njupt.jpg) no-repeat center;padding-left:1200px;padding-bottom: 400px;")
                console.log("\n\n\n" +
                    "%c" +
                    "NN            NN      JJJJJJJJJJJJJJJ     UU         UU      PPPPPPPPP        TTTTTTTTTTTTTTT\n" +
                    "NNN           NN             JJ           UU         UU      PP      PP             TT\n" +
                    "NN N          NN             JJ           UU         UU      PP       PP            TT\n" +
                    "NN  N         NN             JJ           UU         UU      PP       PP            TT\n" +
                    "NN   N        NN             JJ           UU         UU      PP        PP           TT\n" +
                    "NN    N       NN             JJ           UU         UU      PP       PP            TT\n" +
                    "NN     N      NN             JJ           UU         UU      PPPPPPPPPP             TT\n" +
                    "NN      N     NN       JJ    JJ           UU         UU      PP                     TT\n" +
                    "NN       N    NN       JJ    JJ           UU         UU      PP                     TT\n" +
                    "NN        N   NN       JJ    JJ           UU         UU      PP                     TT\n" +
                    "NN         N  NN       JJJ   JJ            UU       UU       PP                     TT\n" +
                    "NN          N NN        JJJJJJ              UUUUUUUUU        PP                     TT\n" +
                    "                                                            \n" +
                    "                                                                    @南京邮电大学 zyf lxk zbw",
                    "color:#28a5f3");

            }
        },
        mounted() {
            this.sysUserRank = localStorage.getItem("rank");
            console.log("权限等级", this.sysUserRank,);
            //this.oreo();
            if (this._isMobile()) {
                // alert("手机端");
                this.collapsed = true
            } else {
                // alert("pc端");
                this.collapsed = false
            }
            let user = sessionStorage.getItem('user');

            if (user) {
                user = JSON.parse(user);
                //console.log("Test for get userName:", user.name);
                this.sysUserName = user.name || '';
                this.sysUserAvatar = user.avatar || '';
            }

        }
    }

</script>

<style lang="scss">
  @import '~scss_vars';

  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

    .header {
      height: 60px;
      line-height: 60px;
      background: $color-primary;
      color: #000;
      box-shadow: 0px 4px 0px 0px #e71218;

      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;

        .userinfo-inner {
          cursor: pointer;
          color: #fff;

          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
          }
        }
      }

      .logo {
        //width:230px;
        height: 60px;
        font-size: 12px;
        padding-left: 20px;
        padding-right: 20px;
        border-color: rgba(238, 241, 146, 0.3);
        /*border-right-width: 1px;*/
        /*border-right-style: solid;*/
        img {
          width: 20px;
          float: left;
          margin: 20px 10px 10px 0px;
        }

        .txt {
          color: #fff;
        }
      }

      .logo-width {
        width: 200px;
      }

      .logo-collapse-width {
        width: 60px
      }

      .tools {
        padding: 0px 23px;
        width: 14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
    }

    .main {
      display: flex;
      // background: #324057;
      position: absolute;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
      margin-top: 4px;

      aside {
        flex: 0 0 230px;
        width: 230px;
        // position: absolute;
        // top: 0px;
        // bottom: 0px;
        color: #fff;

        .footer {
          position: fixed;
          width: 100%;
          height: 30px;
          line-height: 30px;
          background-color: #fff;
          color: black;
          bottom: 0;
          text-align: center;
          z-index: 99;
          /*opacity: 0.8;*/
        }

        .el-menu {
          height: 100%;
          background-color: #545d64;
          color: #fff;

          .el-menu-item {
            background-color: #545d64 !important;
            color: #FFF !important;
          }

          .el-aside {
            color: #fff;
          }

          .el-menu-item:hover {
            outline: 0 !important;
            color: #fff !important;
            background: #4b545b !important;
          }

          .el-menu-item.is-active {
            color: #ffd04b !important;
            background: #4b545b !important;
          }

          .el-submenu__title {
            color: #fff !important;
          }

          .el-submenu__title:focus, .el-submenu__title:hover {
            outline: 0 !important;
            color: #fff !important;
            background: #4b545b !important;
          }
        }

        .el-menu--horizontal > .el-submenu .el-submenu__title {
          height: 60px;
          line-height: 60px;
          border-bottom: 2px solid transparent;
          color: #fff;
          font-size: 20px;
        }

        .el-menu--horizontal > .el-submenu .el-submenu__title {
          height: 60px;
          line-height: 60px;
          border-bottom: 2px solid transparent;
          color: #fff;
          font-size: 20px;
        }


        .collapsed {
          width: 60px;

          .item {
            color: #fff;
            position: relative;
          }

          .submenu {
            color: #fff;
            position: absolute;
            top: 0px;
            left: 200px;
            z-index: 99999;
            height: auto;
            display: none;
          }

        }
      }

      .menu-collapsed {
        flex: 0 0 60px;
        width: 60px;
      }

      .menu-expanded {

        flex: 0 0 230px;
        width: 230px;
      }

      .content-container {
        // background: #f1f2f7;
        flex: 1;
        // position: absolute;
        // right: 0px;
        // top: 0px;
        // bottom: 0px;
        // left: 230px;
        overflow-y: scroll;
        padding: 20px;
        /*background-color: #ecf0f3;*/
        .breadcrumb-container {
          margin-bottom: 15px;
          font-size: 12px;

          .title {
            width: 200px;
            float: left;
            color: #475669;
          }

          .breadcrumb-inner {
            float: right;
          }
        }

        .content-wrapper {
          background-color: #fff;
          box-sizing: border-box;
        }

      }
    }
  }
</style>
