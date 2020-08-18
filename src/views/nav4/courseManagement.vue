<template>
  <section>
    <div class="custom-tree-container">
      <div class="block">

        <el-tree :data="list" :props="defaultProps" @node-click="handleNodeClick" :expand-on-click-node="false" :render-content="renderContent"></el-tree>

        <el-dialog title="新增菜单" :visible.sync="dialogFormVisible">
          <el-form v-model="newChild">
            <el-form-item label="类型" :label-width="formLabelWidth" >
              <el-input v-model="input1":disabled="true" placeholder="领域"></el-input>
            </el-form-item>
            <el-form-item label="名称" :label-width="formLabelWidth" >
              <el-input v-model="newChild.label1" placeholder="请输入指标(父节点名称)"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="danger" @click="toSave(),dialogFormVisible=false">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="增加菜单" :visible.sync="dialogFormVisible_insert" >
          <el-form v-model="newChild">
            <el-form-item label="类型" :label-width="formLabelWidth" v-if="newChild.showType==0">
              <el-input v-model="input2":disabled="true" placeholder="学科"></el-input>
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth" v-if="newChild.showType==1">
              <el-input v-model="input3":disabled="true" placeholder="学段"></el-input>
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth" v-if="newChild.showType==2">
              <el-input v-model="input4":disabled="true" placeholder="长期目标"></el-input>
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth" v-if="newChild.showType==3">
              <el-input v-model="input5":disabled="true" placeholder="短期目标"></el-input>
            </el-form-item>

            <el-form-item label="名称" :label-width="formLabelWidth" v-if="newChild.showType!=4">
              <el-input v-model="newChild.label1" placeholder="请输入指标"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" v-if="newChild.showType!=4">
            <el-button @click="dialogFormVisible_insert = false">取 消</el-button>
            <el-button type="danger" @click="toSave2(),dialogFormVisible_insert=false" >确 定</el-button>
          </div>
        </el-dialog>


        <el-dialog title="增加选项菜单" :visible.sync="dialogFormVisible_insert2" >
          <el-form v-model="newChild">
            <el-form-item label="充实级(3分)" :label-width="formLabelWidth" v-if="newChild.showType==4">
              <el-input v-model="newChild.label2" placeholder="请输入指标"></el-input>
            </el-form-item>
            <el-form-item label="标准级(2分)" :label-width="formLabelWidth" v-if="newChild.showType==4">
              <el-input v-model="newChild.label3" placeholder="请输入指标"></el-input>
            </el-form-item>
            <el-form-item label="起码级(1分) " :label-width="formLabelWidth" v-if="newChild.showType==4">
              <el-input v-model="newChild.label4" placeholder="请输入指标"></el-input>
            </el-form-item>
            <el-form-item label="补救级(0分)" :label-width="formLabelWidth" v-if="newChild.showType==4">
              <el-input v-model="newChild.label5" placeholder="请输入指标"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" v-if="newChild.showType==4">
            <el-button @click="dialogFormVisible_insert2 = false">取 消</el-button>
            <el-button type="danger" @click="toSave3(),dialogFormVisible_insert2=false" >确 定</el-button>
          </div>
        </el-dialog>

        <!--这是修改-->
        <el-dialog title="修改菜单" :visible.sync="dialogFormVisible_update">
          <el-form v-model="newChild">
            <el-form-item label="类型" :label-width="formLabelWidth" v-if="newChild.showType==0">
              <el-input v-model="input1":disabled="true" placeholder="领域"></el-input>
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth" v-if="newChild.showType==1">
              <el-input v-model="input2":disabled="true" placeholder="学科"></el-input>
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth" v-if="newChild.showType==2">
              <el-input v-model="input3":disabled="true" placeholder="学段"></el-input>
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth" v-if="newChild.showType==3">
              <el-input v-model="input4":disabled="true" placeholder="长期目标"></el-input>
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth" v-if="newChild.showType==4">
              <el-input v-model="input5":disabled="true" placeholder="短期目标"></el-input>
            </el-form-item>
            <el-form-item label="名称" :label-width="formLabelWidth" v-if="newChild.showType!=5">
              <el-input v-model="newChild.label" placeholder="请输入指标(父节点名称)">{{newChild.label}}</el-input>
            </el-form-item>
            <el-form-item label="充实级(3分)" :label-width="formLabelWidth" v-if="newChild.showType==5&&newChild.grade==3">
              <el-input v-model="newChild.label" placeholder="请输入指标(父节点名称)">{{newChild.label}}</el-input>
            </el-form-item>
            <el-form-item label="标准级(2分)" :label-width="formLabelWidth" v-if="newChild.showType==5&&newChild.grade==2">
              <el-input v-model="newChild.label" placeholder="请输入指标(父节点名称)">{{newChild.label}}</el-input>
            </el-form-item>
            <el-form-item label="起码级(1分)" :label-width="formLabelWidth" v-if="newChild.showType==5&&newChild.grade==1">
              <el-input v-model="newChild.label" placeholder="请输入指标(父节点名称)">{{newChild.label}}</el-input>
            </el-form-item>
            <el-form-item label="补救级(0分)" :label-width="formLabelWidth" v-if="newChild.showType==5&&newChild.grade==0">
              <el-input v-model="newChild.label" placeholder="请输入指标(父节点名称)">{{newChild.label}}</el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible_update = false">取 消</el-button>
            <el-button type="danger" @click="toUpdate(),dialogFormVisible_update=false">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="删除菜单" :visible.sync="dialogFormVisible_delete">
          <el-form v-model="newChild">
            <el-form-item label="删除的名称为："  :label-width="formLabelWidth" >
              <el-input v-model="newChild.label" placeholder="请用分号间隔" >{{newChild.label}}</el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible_delete = false">取 消</el-button>
            <el-button type="danger" @click="toDelete(),dialogFormVisible_delete=false">确 定</el-button>
          </div>
        </el-dialog>



        <el-button type="danger" @click="append1()" v-if="sysPermission=='1'" class="button-bottom">新建领域</el-button>



      </div>
    </div>
  </section>
</template>

<script>/* eslint-disable */
let id;//这里的id相当于定义了一个全局变量，用于插入结点
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
                label: 'label',
            },
            list:[],
            sysUserId:localStorage.getItem('userId'),
            sysPermission:localStorage.getItem('Permission')[0],
            str:"aaa",//这是字符串 ""这是为空尚未初始化，" "这是一个空字符串，已经被初始化，和"ddd"一个意思 str=字符串变量 bbb 将会替换aaa  str=bbb
            map:{"key1":"value1","key2":"value2"},
            input1:'领域',
            input2:'学科',
            input3:'学段',
            input4:'长期目标',
            input5:'短期目标',
            dataList:{
                id: '',
                showType: '',
                grade:'',
                label:'',
                label1:'',
                grade1:'',
                father:''
            },
            dialogFormVisible: false,
            dialogFormVisible_insert: false,
            dialogFormVisible_update: false,
            dialogFormVisible_delete: false,
            dialogFormVisible_insert2:false,
            newChild: {
                id: '',
                showType: '',
                grade:'',
                label:'',
                label1:'',
                grade1:'',
                father:'',
                label2:'',
                label3:'',
                label4:'',
                label5:''
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
        append2 (data){//实现一个添加功能 append1它是一个方法名  叫什么无所谓
            this.dialogFormVisible_insert = true;
            id=data;
        },
        append3 (data){//实现一个添加功能 append1它是一个方法名  叫什么无所谓
            this.dialogFormVisible_insert2 = true;
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

            this.$set(data, 'disabled', true)

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

            }, {
                id: 9,

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
                if(data.father==0){
                    return(
                        <span class="custom-tree-node">
                        <span>{data.label}</span>
                        <span>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append2(data) }>添加学科</el-button>
                    <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                    <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                    <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                    </span>
                    </span>);
                }
                else if(data.grade!=-1){
                    return(
                        <span class="custom-tree-node">
                        <span>{data.label}</span>
                        <span>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                    <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                    </span>
                    </span>
                );
                }
                else if(data.showType==4){
                    return(
                        <span class="custom-tree-node">
                        <span>{data.label}</span>
                        <span>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append3(data) }>添加选项</el-button>
                    <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                    <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                    <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                    </span>
                    </span>);
                }
                else if(data.showType==1){
                    return(
                        <span class="custom-tree-node">
                        <span>{data.label}</span>
                        <span>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append2(data) }>添加学段</el-button>
                    <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                    <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                    <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                    </span>
                    </span>);
                }
                else if(data.showType==2){
                    return(
                        <span class="custom-tree-node">
                        <span>{data.label}</span>
                        <span>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append2(data) }>添加长期目标</el-button>
                    <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                    <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                    <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                    </span>
                    </span>);
                }
                else{
                    return(
                        <span class="custom-tree-node">
                        <span>{data.label}</span>
                        <span>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append2(data) }>添加短期目标</el-button>
                    <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                    <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                    <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                    </span>
                    </span>);
                }
            }
            else{
                if(data.father==0){
                    if(localStorage.getItem('Permission')[0]=='1'&&localStorage.getItem('Permission')[1]=='1'&&localStorage.getItem('Permission')[2]=='1'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append2(data) }>添加学科</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='0'&&localStorage.getItem('Permission')[1]=='1'&&localStorage.getItem('Permission')[2]=='1'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='0'&&localStorage.getItem('Permission')[1]=='0'&&localStorage.getItem('Permission')[2]=='1'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='1'&&localStorage.getItem('Permission')[1]=='0'&&localStorage.getItem('Permission')[2]=='1'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append2(data) }>添加学科</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='1'&&localStorage.getItem('Permission')[1]=='1'&&localStorage.getItem('Permission')[2]=='0'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append2(data) }>添加学科</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='0'&&localStorage.getItem('Permission')[1]=='1'&&localStorage.getItem('Permission')[2]=='0'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='1'&&localStorage.getItem('Permission')[1]=='0'&&localStorage.getItem('Permission')[2]=='0'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append2(data) }>添加学科</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else{
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                }
                else if(data.grade!=-1){
                    if(localStorage.getItem('Permission')[1]=='1'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>
                    );
                    }
                    else{
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>
                    );
                    }
                }
                else if(data.showType==4){
                    if(localStorage.getItem('Permission')[0]=='1'&&localStorage.getItem('Permission')[1]=='1'&&localStorage.getItem('Permission')[2]=='1'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append3(data) }>添加选项</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='0'&&localStorage.getItem('Permission')[1]=='1'&&localStorage.getItem('Permission')[2]=='1'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='1'&&localStorage.getItem('Permission')[1]=='0'&&localStorage.getItem('Permission')[2]=='1'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append3(data) }>添加选项</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='1'&&localStorage.getItem('Permission')[1]=='1'&&localStorage.getItem('Permission')[2]=='0'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append3(data) }>添加选项</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='0'&&localStorage.getItem('Permission')[1]=='0'&&localStorage.getItem('Permission')[2]=='1'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='0'&&localStorage.getItem('Permission')[1]=='1'&&localStorage.getItem('Permission')[2]=='0'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='1'&&localStorage.getItem('Permission')[1]=='0'&&localStorage.getItem('Permission')[2]=='0'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append3(data) }>添加选项</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else{
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                }
                else if(data.showType==1){
                    if(localStorage.getItem('Permission')[0]=='1'&&localStorage.getItem('Permission')[1]=='1'&&localStorage.getItem('Permission')[2]=='1'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append2(data) }>添加学段</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='0'&&localStorage.getItem('Permission')[1]=='1'&&localStorage.getItem('Permission')[2]=='1'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='1'&&localStorage.getItem('Permission')[1]=='0'&&localStorage.getItem('Permission')[2]=='1'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append2(data) }>添加学段</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='1'&&localStorage.getItem('Permission')[1]=='1'&&localStorage.getItem('Permission')[2]=='0'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append2(data) }>添加学段</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='0'&&localStorage.getItem('Permission')[1]=='0'&&localStorage.getItem('Permission')[2]=='1'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='0'&&localStorage.getItem('Permission')[1]=='1'&&localStorage.getItem('Permission')[2]=='0'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='1'&&localStorage.getItem('Permission')[1]=='0'&&localStorage.getItem('Permission')[2]=='0'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append2(data) }>添加学段</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else{
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                }
                else if(data.showType==2){
                    if(localStorage.getItem('Permission')[0]=='1'&&localStorage.getItem('Permission')[1]=='1'&&localStorage.getItem('Permission')[2]=='1'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append2(data) }>添加长期目标</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='0'&&localStorage.getItem('Permission')[1]=='1'&&localStorage.getItem('Permission')[2]=='1'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='1'&&localStorage.getItem('Permission')[1]=='0'&&localStorage.getItem('Permission')[2]=='1'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append2(data) }>添加长期目标</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='1'&&localStorage.getItem('Permission')[1]=='1'&&localStorage.getItem('Permission')[2]=='0'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append2(data) }>添加长期目标</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='0'&&localStorage.getItem('Permission')[1]=='0'&&localStorage.getItem('Permission')[2]=='1'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='0'&&localStorage.getItem('Permission')[1]=='1'&&localStorage.getItem('Permission')[2]=='0'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='1'&&localStorage.getItem('Permission')[1]=='0'&&localStorage.getItem('Permission')[2]=='0'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append2(data) }>添加长期目标</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else{
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                }
                else{
                    if(localStorage.getItem('Permission')[0]=='1'&&localStorage.getItem('Permission')[1]=='1'&&localStorage.getItem('Permission')[2]=='1'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append2(data) }>添加短期目标</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='0'&&localStorage.getItem('Permission')[1]=='1'&&localStorage.getItem('Permission')[2]=='1'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='1'&&localStorage.getItem('Permission')[1]=='0'&&localStorage.getItem('Permission')[2]=='1'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append2(data) }>添加短期目标</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='1'&&localStorage.getItem('Permission')[1]=='1'&&localStorage.getItem('Permission')[2]=='0'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append2(data) }>添加短期目标</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='0'&&localStorage.getItem('Permission')[1]=='0'&&localStorage.getItem('Permission')[2]=='1'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='0'&&localStorage.getItem('Permission')[1]=='1'&&localStorage.getItem('Permission')[2]=='0'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else if(localStorage.getItem('Permission')[0]=='1'&&localStorage.getItem('Permission')[1]=='0'&&localStorage.getItem('Permission')[2]=='0'){
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.append2(data) }>添加短期目标</el-button>
                        <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }
                    else{
                        return(
                            <span class="custom-tree-node">
                            <span>{data.label}</span>
                            <span>
                            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
                        </span>
                        </span>);
                    }

                }
            }

        },
        getData: function() {///methods中的一个方法 获取后端数据  实现前端渲染
            //这是一个ajax的post请求  res是response的简化参数名 叫什么无所谓  代表的是response
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/DataForm2").then((res) =>{
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
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/insertDataForm3",params).then((res) =>{
                console.log(res.data);//返回的参数 res.data才是后端返回的
            }).catch((err)=>{
                console.log(err)
            })
            this.newChild.label1='';
            this.getData()
        },
        toSave2(){//它是一个添加方法——whl，它叫什么并不重要
            //点击确定打印输入框数据
            var j=this.newChild.label1;
            var k=this.newChild.showType;
            var params = new URLSearchParams();
            params.append('label',this.newChild.label1);
            params.append('id', this.newChild.id);
            params.append('showType',this.newChild.showType);
            params.append('producerId',localStorage.getItem('userId'));
            //params.append('grade',this.newChild.grade);
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/insertDataForm4",params).then((res) =>{
                console.log(res.data);//返回的参数 res.data才是后端返回的
                const theChild = {
                    label: j,
                    children: [],
                    showType:k+1,
                    producerId:localStorage.getItem('userId'),
                    grade:-1,
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
        toSave3(){//它是一个添加方法——whl，它叫什么并不重要
            //点击确定打印输入框数据
            var k1=this.newChild.label2;
            var k2=this.newChild.label3;
            var k3=this.newChild.label4;
            var k4=this.newChild.label5;
            var params = new URLSearchParams();
            params.append('label2',this.newChild.label2);
            params.append('label3',this.newChild.label3);
            params.append('label4',this.newChild.label4);
            params.append('label5',this.newChild.label5);
            params.append('id', this.newChild.id);
            params.append('producerId',localStorage.getItem('userId'));
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/insertDataForm5",params).then((res) =>{
                console.log(res.data);//返回的参数 res.data才是后端返回的
                const theChild1 = {
                    label: k1,
                    children: [],
                    showType:5,
                    producerId:localStorage.getItem('userId'),
                    grade:3,
                    id: res.data.data-3 };
                if (!id.children) {
                    this.$set(data, 'children', []);
                }
                id.children.push(theChild1);
                const theChild2 = {
                    label: k2,
                    children: [],
                    showType:5,
                    producerId:localStorage.getItem('userId'),
                    grade:2,
                    id: res.data.data-2 };
                if (!id.children) {
                    this.$set(data, 'children', []);
                }
                id.children.push(theChild2);
                const theChild3 = {
                    label: k3,
                    children: [],
                    showType:5,
                    producerId:localStorage.getItem('userId'),
                    grade:1,
                    id: res.data.data-1 };
                if (!id.children) {
                    this.$set(data, 'children', []);
                }
                id.children.push(theChild3);
                const theChild4 = {
                    label: k4,
                    children: [],
                    showType:5,
                    producerId:localStorage.getItem('userId'),
                    grade:0,
                    id: res.data.data };
                if (!id.children) {
                    this.$set(data, 'children', []);
                }
                id.children.push(theChild4);
            }).catch((err)=>{
                console.log(err)
            })
            this.newChild.label2='';
            this.newChild.label3='';
            this.newChild.label4='';
            this.newChild.label5='';
            //this.getData()
        },
        toUpdate(){//实现修改
            var params = new URLSearchParams();
            params.append('label', this.newChild.label);
            params.append('id', this.newChild.id);
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/updateDataForm2",params).then((res) =>{
                console.log(res.data);//返回的参数 res.data才是后端返回的
            }).catch((err)=>{
                console.log(err)
            })
            this.getData()
        },
        toDelete(){//实现删除
            var params = new URLSearchParams();
            params.append('id', this.newChild.id);
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/deleteDataForm2",params).then((res) =>{
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
            this.newChild.showType=data.showType;
            this.newChild.grade=data.grade;
            this.newChild.father=data.father;
            this.newChild.label2=data.label2;
            this.newChild.label3=data.label3;
            this.newChild.label4=data.label4;
            this.newChild.label5=data.label5;
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

  .button-bottom{
    margin: 1% 2% 2% 2.5%;
  }

</style>
