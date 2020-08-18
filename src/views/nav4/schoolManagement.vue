
<template>
  <section>
    <template>
            <div class="custom-tree-container">
              <div class="block">

                <el-tree :data="list" :props="defaultProps" @node-click="handleNodeClick" :render-content="renderContent"></el-tree>

                <el-dialog title="新建学校" :visible.sync="dialogFormVisible">
                  <el-form v-model="newChild">
                    <el-form-item label="学校名称" :label-width="formLabelWidth">
                      <el-input v-model="newChild.label1" placeholder="请输入指标(父节点名称)"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="danger" @click="toSave(),dialogFormVisible=false">确 定</el-button>
                  </div>
                </el-dialog>

                <!--这是修改-->
                <el-dialog title="修改学校名称" :visible.sync="dialogFormVisible_update">
                  <el-form v-model="newChild">
                    <el-form-item label="学校名称" :label-width="formLabelWidth">
                      <el-input v-model="newChild.label" placeholder="请输入指标(父节点名称)">{{newChild.label}}</el-input>
                    </el-form-item>

                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible_update = false">取 消</el-button>
                    <el-button type="danger" @click="toUpdate(),dialogFormVisible_update=false">确 定</el-button>
                  </div>
                </el-dialog>

                <el-dialog title="是否确定删除学校！" :visible.sync="dialogFormVisible_delete">
                  <el-form v-model="newChild">
                    <el-form-item label="删除的学校为："  :label-width="formLabelWidth">
                      <el-input v-model="newChild.label" placeholder="请用分号间隔" >{{newChild.label}}</el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible_delete = false">取 消</el-button>
                    <el-button type="primary" @click="toDelete(),dialogFormVisible_delete=false">确 定</el-button>
                  </div>
                </el-dialog>

              </div>
            </div>
      <el-button type="danger" class="button-bottom" @click="append1()" v-if="userRank==1">新建</el-button>
          </template>
  </section>
</template>

<script>/* eslint-disable */

let id = 61;//这里的id改成表里最大id
import axios from 'axios'
export default {
    data () {

        return {
            //设置别名
            /*
            * data中的return里可以定义多个临时变量，申明式变量
            * 临时变量的格式有{}，[],""
            * 例如：Map（变量名）:{}===>它是一个对象
            * 例如：List（变量名）:[]===>它是一个数组
            * 例如：var（变量名）：""===>它是一个字符串
            * 注意：尽量一对一（不一定），一个变量一赋值
            * */
            defaultProps: {//它是一个临时变量，格式是对象{}
                children: 'children',
                label: 'label'
            },
            list:[],
            userRank:localStorage.getItem('rank'),
            str:"aaa",//这是字符串 ""这是为空尚未初始化，" "这是一个空字符串，已经被初始化，和"ddd"一个意思 str=字符串变量 bbb 将会替换aaa  str=bbb
            map:{"key1":"value1","key2":"value2"},
            dataList:{
                id: '',
                region: '',
            },
            dialogFormVisible: false,
            dialogFormVisible_update: false,
            dialogFormVisible_delete: false,
            newChild: {
                id: '',
                region: '',
                label:'',
                label1:''
            },
            formLabelWidth: '120px',
            /*data1: JSON.parse(JSON.stringify(data2)),
            data1: JSON.parse(JSON.stringify(data2))*/
        }
    },

    components: {},

    methods: {//方法home，所有方法在这里 未来读写分离，好处便于维护和方法公用

        append1 (data){//实现一个添加功能 append1它是一个方法名  叫什么无所谓
            console.log("start");
            console.log(data);
            console.log(1);
            this.dialogFormVisible = true;
            console.log(2);
            if (!data.children) {
                console.log(3);
                this.$set(data, 'children', []);
                console.log(4);
            }
            console.log(5);
            data.children.push(this.getData());
            console.log(6);
        },
        append (data) {
            console.log(data);
            if (!data.children) {
                this.$set(data, 'children', [])
            }
            data.children.push(this.getData())
        },
        update (data) {
            this.dialogFormVisible_update = true;
        },
        delete (data) {
            this.dialogFormVisible_delete = true;
        },
        remove (node, data) {
            /*console.log(node.parent)
            console.log(node.parent.data)
            console.log(node.parent.data.children)*/
            this.$set(data, 'disabled', true)
            /*const parent = node.parent
            const children = parent.data.children || parent.data
            const index = children.findIndex(d => d.id === data.id)
            children.splice(index, 1)*/
        },

        recover (data) {
            this.getData()
        },

        getCheckedNodes() {
            console.log("chosenList is:");
            console.log(this.$refs.tree.getCheckedNodes());

        },
        getCheckedKeys() {
            console.log(this.$refs.tree.getCheckedKeys());
        },
        setCheckedNodes() {
            this.$refs.tree.setCheckedNodes([{
                id: 5,
                /*label: '二级 2-1'*/
            }, {
                id: 9,
                /*label: '三级 1-1-1'*/
            }]);
        },
        setCheckedKeys() {
            this.$refs.tree.setCheckedKeys([3,7,14,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49]);
        },
        resetChecked() {
            this.$refs.tree.setCheckedKeys([]);
        },
        saveList(){
            //console.log(this.$refs.tree.getCheckedKeys());
            //点击确定打印输入框数据
            console.log("sssss")
        },
        renderContent(h, { node, data, store }) {
            if(localStorage.getItem('rank')==1){
                return (
                    <span class="custom-tree-node">
                    <span>{node.label}</span>
                    <span>
                    <el-button size="mini"  style="color: #F56C6C" type="text" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                <el-button size="mini"  style="color: #F56C6C" type="text" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                <el-button size="mini"  style="color: #F56C6C" type="text" on-click={ () => this.recover(data) }>刷新</el-button>
                </span>
                </span>);
            }
            else{
                return (
                    <span class="custom-tree-node">
                    <span>{node.label}</span>
                    </span>);
            }

        },
        getData: function() {///methods中的一个方法 获取后端数据  实现前端渲染
            //这是一个ajax的post请求  res是response的简化参数名 叫什么无所谓  代表的是response
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/DataForm3").then((res) =>{
                console.log(res.data);//返回的参数 res.data才是后端返回的
                this.list=res.data.data
            }).catch((err)=>{
                console.log(err)
            })
        },
        toSave(){//它是一个添加方法——whl，它叫什么并不重要
            //点击确定打印输入框数据
            console.log(this.newChild.label1)
            var params = new URLSearchParams();
            params.append('label',this.newChild.label1);
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/insertDataForm6",params).then((res) =>{
                console.log(res.data);//返回的参数 res.data才是后端返回的
            }).catch((err)=>{
                console.log(err)
            })
            this.newChild.label1='';
            this.getData()
        },
        toUpdate(){//实现修改
            var params = new URLSearchParams();
            params.append('label', this.newChild.label);
            params.append('id', this.newChild.id);
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/updateDataForm3",params).then((res) =>{
                console.log(res.data);//返回的参数 res.data才是后端返回的
            }).catch((err)=>{
                console.log(err)
            })
            this.getData()
        },
        toDelete(){//实现删除
            var params = new URLSearchParams();
            params.append('id', this.newChild.id);
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/deleteDataForm3",params).then((res) =>{
                console.log(res.data);//返回的参数 res.data才是后端返回的
            }).catch((err)=>{
                console.log(err)
            })
            this.getData()
        },
        handleNodeClick(data) {
            console.log(data);
            this.newChild.id=data.id;
            this.newChild.label=data.label;
        }
    },
    mounted() {//钩子函数（vue生命周期，它会在项目启动时，执行其中的方法，进行全局初始化）
        this.getData();
    }
}
</script>

<style scoped>
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    margin-outside: 0px;
    margin: 0px;
  }

  .button-bottom{
    margin: 1% 2% 2% 2.5%;
  }
</style>
