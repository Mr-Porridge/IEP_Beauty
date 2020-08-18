
<template>
  <section>
    <div class="custom-tree-container">
      <div class="block">
        <el-tree :data="list" :props="defaultProps" @node-click="handleNodeClick" :expand-on-click-node="false"
                 :render-content="renderContent"></el-tree>

        <el-dialog title="指标菜单" :visible.sync="dialogFormVisible">
          <el-button type="text" @click.prevent>先在下方输入，再在上方需要的地方点击添加</el-button>
          <el-form v-model="newChild">
            <el-form-item label="指标描述" :label-width="formLabelWidth">
              <el-input v-model="newChild.label1" placeholder="请输入指标(父节点名称)"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="danger" @click="toSave(),dialogFormVisible=false">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="指标菜单(增加子节点)" :visible.sync="dialogFormVisible_insert">
          <el-form v-model="newChild">
            <el-form-item label="指标描述" :label-width="formLabelWidth">
              <el-input v-model="newChild.label1" placeholder="请输入指标"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible_insert = false">取 消</el-button>
            <el-button type="danger" @click="toSave2(),dialogFormVisible_insert=false">确 定</el-button>
          </div>
        </el-dialog>
        <!--这是修改-->
        <el-dialog title="指标菜单(修改)" :visible.sync="dialogFormVisible_update">
          <el-form v-model="newChild">
            <el-form-item label="指标描述" :label-width="formLabelWidth">
              <el-input v-model="newChild.label" placeholder="请输入指标(父节点名称)">{{newChild.label}}</el-input>
            </el-form-item>
            <el-form-item label="主键ID" :label-width="formLabelWidth">
              <el-input v-model="newChild.id" placeholder="请用分号间隔">{{newChild.id}}</el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible_update = false">取 消</el-button>
            <el-button type="danger" @click="toUpdate(),dialogFormVisible_update=false">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="指标菜单(删除)" :visible.sync="dialogFormVisible_delete">
          <el-form v-model="newChild">
            <el-form-item label="删除的指标为：" :label-width="formLabelWidth">
              <el-input v-model="newChild.label" placeholder="请用分号间隔">{{newChild.label}}</el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible_delete = false">取 消</el-button>
            <el-button type="danger" @click="toDelete(),dialogFormVisible_delete=false">确 定</el-button>
          </div>
        </el-dialog>
        <!--<el-button type="danger" @click="append1()" v-if="sysPermission==1">添加</el-button>-->
        <!--<el-main>
          <el-button @click="getCheckedNodes">输出所有选中的结点</el-button>&lt;!&ndash;&ndash;&gt;
          <el-button @click="getCheckedKeys">输出所有选中的Key</el-button>
          <el-button @click="setCheckedNodes">套餐一</el-button>&lt;!&ndash;通过 node 设置&ndash;&gt;
          <el-button @click="setCheckedKeys">套餐二</el-button>&lt;!&ndash;通过 key 设置&ndash;&gt;
          <el-button @click="resetChecked">清空所选项</el-button>
        </el-main>-->

      </div>
    </div>
  </section>
</template>

<script>/* eslint-disable */
let id//这里的id是用于临时保存data的数值的
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
            sysUserId:localStorage.getItem('userId'),
            sysPermission:localStorage.getItem('Permission')[3],
            str:"aaa",//这是字符串 ""这是为空尚未初始化，" "这是一个空字符串，已经被初始化，和"ddd"一个意思 str=字符串变量 bbb 将会替换aaa  str=bbb
            map:{"key1":"value1","key2":"value2"},
            dataList:{
                id: '',
                region: '',
            },
            dialogFormVisible: false,
            dialogFormVisible_insert: false,
            dialogFormVisible_update: false,
            dialogFormVisible_delete: false,
            newChild: {
                id: '',
                region: '',
                label:'',
                label1:'',
                producerId:''
            },
            formLabelWidth: '120px',
            /*data1: JSON.parse(JSON.stringify(data2)),
            data1: JSON.parse(JSON.stringify(data2))*/
        }
    },

    components: {},

    methods: {//方法home，所有方法在这里 未来读写分离，好处便于维护和方法公用

        append1 (data){//实现一个添加功能 append1它是一个方法名  叫什么无所谓
            this.dialogFormVisible = true;
        },
        append2 (data){//实现一个添加功能 append1它是一个方法名  叫什么无所谓
            this.dialogFormVisible_insert = true;
            id=data;
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
            if(localStorage.getItem('userId')==data.producerId){
                return (
                    <span class="custom-tree-node">
                    <span>{node.label}</span>
                    <span>
                    <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.append2(data) }>添加子节点</el-button>
                <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.recover(data) }>刷新</el-button>
                </span>
                </span>);
            }
            else{
                if(localStorage.getItem('Permission')[3]=='1'&&localStorage.getItem('Permission')[4]=='1'&&localStorage.getItem('Permission')[5]=='1'){
                    return (
                        <span class="custom-tree-node">
                        <span>{node.label}</span>
                        <span>
                        <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.append2(data) }>添加子节点</el-button>
                    <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                    <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                    <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.recover(data) }>刷新</el-button>
                    </span>
                    </span>);
                }
                else if(localStorage.getItem('Permission')[3]=='0'&&localStorage.getItem('Permission')[4]=='1'&&localStorage.getItem('Permission')[5]=='1'){
                    return (
                        <span class="custom-tree-node">
                        <span>{node.label}</span>
                        <span>
                        <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                    <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                    <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.recover(data) }>刷新</el-button>
                    </span>
                    </span>);
                }
                else if(localStorage.getItem('Permission')[3]=='1'&&localStorage.getItem('Permission')[4]=='0'&&localStorage.getItem('Permission')[5]=='1'){
                    return (
                        <span class="custom-tree-node">
                        <span>{node.label}</span>
                        <span>
                        <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.append2(data) }>添加子节点</el-button>
                    <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                    <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.recover(data) }>刷新</el-button>
                    </span>
                    </span>);
                }
                else if(localStorage.getItem('Permission')[3]=='1'&&localStorage.getItem('Permission')[4]=='1'&&localStorage.getItem('Permission')[5]=='0'){
                    return (
                        <span class="custom-tree-node">
                        <span>{node.label}</span>
                        <span>
                        <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.append2(data) }>添加子节点</el-button>
                    <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                    <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.recover(data) }>刷新</el-button>
                    </span>
                    </span>);
                }
                else if(localStorage.getItem('Permission')[3]=='0'&&localStorage.getItem('Permission')[4]=='0'&&localStorage.getItem('Permission')[5]=='1'){
                    return (
                        <span class="custom-tree-node">
                        <span>{node.label}</span>
                        <span>
                        <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                    <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.recover(data) }>刷新</el-button>
                    </span>
                    </span>);
                }
                else if(localStorage.getItem('Permission')[3]=='0'&&localStorage.getItem('Permission')[4]=='1'&&localStorage.getItem('Permission')[5]=='0'){
                    return (
                        <span class="custom-tree-node">
                        <span>{node.label}</span>
                        <span>
                        <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                    <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.recover(data) }>刷新</el-button>
                    </span>
                    </span>);
                }
                else if(localStorage.getItem('Permission')[3]=='1'&&localStorage.getItem('Permission')[4]=='0'&&localStorage.getItem('Permission')[5]=='0'){
                    return (
                        <span class="custom-tree-node">
                        <span>{node.label}</span>
                        <span>
                        <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.append2(data) }>添加子节点</el-button>
                    <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.recover(data) }>刷新</el-button>
                    </span>
                    </span>);
                }
                else{
                    return (
                        <span class="custom-tree-node">
                        <span>{node.label}</span>
                        <span>
                        <el-button size="mini" style="color: #F56C6C" type="text" on-click={ () => this.recover(data) }>刷新</el-button>
                    </span>
                    </span>);
                }
            }


        },
        getData: function() {///methods中的一个方法 获取后端数据  实现前端渲染
            //这是一个ajax的post请求  res是response的简化参数名 叫什么无所谓  代表的是response
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/DataForm").then((res) =>{
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
            params.append('producerId',localStorage.getItem('userId'));
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/insertDataForm",params).then((res) =>{
                console.log(res.data);//返回的参数 res.data才是后端返回的
            }).catch((err)=>{
                console.log(err)
            })
            this.newChild.label1='';
            //this.getData()
        },
        toSave2(){//它是一个添加方法——whl，它叫什么并不重要
            //点击确定打印输入框数据
            /*const theChild = { label: this.newChild.label1,
              //father: 120,
              children: [],
              //help: 1,
              //producerId: 1,
              id: 156 };
            if (!id.children) {
              this.$set(data, 'children', []);
            }
            id.children.push(theChild);*/
            var k=this.newChild.label1;
            var params = new URLSearchParams();
            params.append('label',this.newChild.label1);
            params.append('id', this.newChild.id);
            params.append('producerId',localStorage.getItem('userId'));
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/insertDataForm2",params).then((res) =>{
                console.log(res.data);//返回的参数 res.data才是后端返回的
                const theChild = {
                    label: k,
                    children: [],
                    id: res.data.data };
                if (!id.children) {
                    this.$set(data, 'children', []);
                }
                id.children.push(theChild);
            }).catch((err)=>{
                console.log(err)
            })
            this.newChild.label1='';
            //this.getData()
        },
        toUpdate(){//实现修改
            var params = new URLSearchParams();
            params.append('label', this.newChild.label);
            params.append('id', this.newChild.id);
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/updateDataForm",params).then((res) =>{
                console.log(res.data);//返回的参数 res.data才是后端返回的
            }).catch((err)=>{
                console.log(err)
            })
            this.getData()
        },
        toDelete(){//实现删除
            var params = new URLSearchParams();
            params.append('id', this.newChild.id);
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/deleteDataForm",params).then((res) =>{
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
            this.newChild.producerId=data.producerId;
        }
    },
    mounted() {//钩子函数（vue生命周期，它会在项目启动时，执行其中的方法，进行全局初始化）
        this.getData();
    }
}
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px; /*字号*/
    padding-right: 8px; /*右侧宽度*/
  }




  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /*margin-outside: 0px;
    margin: 0px;*/
  }

  .body {
    margin: 0;
  }
</style>
