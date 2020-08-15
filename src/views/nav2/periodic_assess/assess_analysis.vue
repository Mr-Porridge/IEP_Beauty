<template>
    <section>
        <!--工具条-->
        <el-container>
            <el-button type="danger" icon="el-icon-edit" v-on:click="to_edit(0,0)">新建分析</el-button>
        </el-container>
        <el-divider></el-divider>
        <div class="table">
            <div class="search-Box">
                <el-input placeholder="请输入需要查找的关键字" class="search" v-model="search">
                    <template slot="prepend">模糊搜索</template>
                </el-input>
            </div>
            <el-table v-loading="loading" :data="tables" align="left" stripe>
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="schoolYear" label="学年"></el-table-column>
                <el-table-column prop="term" label="学期"></el-table-column>
                <el-table-column prop="class" label="班级"></el-table-column>
                <el-table-column prop="stuName" label="学生"></el-table-column>
                <el-table-column prop="analysisTime" label="分析时间"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-button type="danger" icon="el-icon-s-tools">
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu>
                                <el-dropdown-item @click.native="to_edit(scope.row.id,1)">编辑</el-dropdown-item>
                                <el-dropdown-item @click.native="to_edit(scope.row.id,2)">查看</el-dropdown-item>
                                <el-dropdown-item @click.native="whetherDel(scope.row.id)">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="paginationClass">
            <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page="this.currentPage1"
                    :page-size= "this.pageSize"
                    :total = "this.total"
                    layout="total, prev, pager, next, jumper">
            </el-pagination>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="this.dialogVisible"
            width="30%"
            :show-close="false">
            <span><font size="3">是否要删除此条信息？</font></span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="delAnalysis">确认删除</el-button>
          </span>
        </el-dialog>
    </section>
</template>

<script>
    export default {
       data(){
           return{
               checkPermission:localStorage.getItem('Permission')[13],
               editPermission:localStorage.getItem('Permission')[14],

               dialogVisible:false,
               delID:-1,

               search:'',
               tempList:[],
               total:0,
               pageSize:10,
               currentPage1:1,

               loading:true,
           }
       },
        computed:{
            tables:function(){
                var search=this.search;
                if(search.length > 0){
                    return  this.$store.state.PAList.filter(function(dataNews){
                        return Object.keys(dataNews).some(function(key){
                            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                    return this.$store.state.PAList
                }
                else{
                    return  this.tempList.filter(function(dataNews){
                        return Object.keys(dataNews).some(function(key){
                            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                    return this.tempList
                }
            }
        },
        mounted() {
           this.updateAnalysis();
        },
        methods:{
           //跳转至课程评量界面
           async to_edit(id,isEdit){
               if (isEdit == 0 && this.editPermission != 1){
                   this.$message.warning("暂无权限！");
                   return;
               }
               if (isEdit == 1 && this.editPermission != 1){
                   this.$message.warning("暂无权限！");
                   return;
               }
               if (isEdit == 2 && this.checkPermission != 1){
                   this.$message.warning("暂无权限！");
                   return;
               }

               var flag = true;

               if(isEdit == 1)
               {
                   await this.$http.post('/api/stu/checkDQPG',{
                       ID:id
                   },{}).then((response) => {
                       if(!response.body)
                           flag = false;
                       else
                           flag = true;
                   });
               }

               if(!flag){
                   this.$message.warning("正在被编辑！");
                   return;
               }

               if (isEdit === 1 || isEdit === 2) {
                   this.$http.post('/api/stu/quePA', {
                       id: id
                   }, {}).then((response) => {
                       this.$store.dispatch("setPA", response.bodyText);
                       this.$router.push({path: '/assessEdit', query: {isEdit: isEdit, currentPage: this.currentPage1},});
                   })
               }
               else {
                   this.$router.push({path: '/assessEdit', query: {isEdit: isEdit, currentPage: this.currentPage1},});
               }
           },



            //更新评估分析信息
            async updateAnalysis(){
                await this.$http.post('/api/stu/quePAList', {
                }, {}).then((response) => {
                    this.$store.dispatch("setPAList", response.bodyText);
                    this.total = this.$store.state.PAList.length;
                    if(this.$route.query.currentPage != undefined)
                        this.currentPage1 = parseInt(this.$route.query.currentPage);
                    this.currentChangePage(this.currentPage1);
                });
                this.loading = false;
            },


            //删除评估信息
            delAnalysis() {
                this.$http.post('/api/stu/delPA', {
                    id:this.delID
                }, {}).then((response) => {
                    this.delID = -1;
                    this.dialogVisible = false;
                    this.loading = true;
                    this.updateAnalysis();
                });
            },

            whetherDel(id){
                if (this.editPermission != 1){
                    this.$message.warning("暂无权限！");
                    return;
                }
                this.delID = id;
                this.dialogVisible = true;
            },

            handleClose() {
                this.delID = -1;
                this.dialogVisible = false;
            },

            //分页
            handleSizeChange1: function(pageSize) { // 每页条数切换
                this.pageSize = pageSize;
                this.handleCurrentChange1(this.currentPage1);
            },
            handleCurrentChange1: function(currentPage) {//页码切换
                this.currentPage1 = currentPage;
                this.currentChangePage(currentPage);
                console.log(currentPage)

            },
            //分页方法（重点）
            currentChangePage(currentPage) {
                console.log(this.$store.state.PAList)
                var from = (currentPage - 1) * this.pageSize;
                var to = currentPage * this.pageSize;
                this.tempList = [];
                for (var i = from; i < to; i++) {
                    if (this.$store.state.PAList[i]) {
                        this.tempList.push(this.$store.state.PAList[i]);
                    }
                }
            },
        }
    }
</script>

<style scoped>

</style>
