<template>
  <section>

      <div class="custom-tree-container">
        <div class="block">
          <el-tree :data="list" :props="defaultProps" @node-click="handleNodeClick" :render-content="renderContent"></el-tree>

          <el-dialog title="新建班级" :visible.sync="dialogFormVisible">
            <el-form v-model="newChild">
              <el-form-item label="班级名称" :label-width="formLabelWidth">
                <el-input v-model="newChild.label1" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="学校" :label-width="formLabelWidth">
                <el-select v-model="idk" placeholder="请选择" @click="atSelect()">
                  <el-option
                      v-for="item in list2"
                      :key="item.id"
                      :label="item.label"
                      :value="item.label">
                  </el-option>
                </el-select>
              </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <!--<el-button @click=getId()>！！！</el-button>-->
              <el-button type="danger" @click="toSave(),dialogFormVisible=false">确 定</el-button>
            </div>
          </el-dialog>

          <!--这是查看-->
          <el-dialog title="班级信息" :visible.sync="dialogFormVisible_LookOver">
            <el-form v-model="newChild">
              <el-form-item label="班级名称" :label-width="formLabelWidth">
                <el-input v-model="newChild.label" placeholder="">{{newChild.label}}</el-input>
              </el-form-item>
            </el-form>
            <el-form v-model="newChild">

              <el-form-item label="学校" :label-width="formLabelWidth">
                <el-input v-model="newChild.schoolName" placeholder="">{{newChild.schoolName}}</el-input>
              </el-form-item>


            </el-form>

          </el-dialog>


          <!--这是修改-->
          <el-dialog title="修改班级信息" :visible.sync="dialogFormVisible_update">
            <el-form v-model="newChild">
              <el-form-item label="班级名称" :label-width="formLabelWidth">
                <el-input v-model="newChild.label" placeholder="">{{newChild.label}}</el-input>
              </el-form-item>

              <el-form-item label="学校" :label-width="formLabelWidth">
                <el-select v-model="idk" placeholder="请选择" @click="atSelect()"><!-- id="test"-->
                  <el-option
                      v-for="item in list2"
                      :key="item.id"
                      :label="item.label"
                      :value="item.label">
                  </el-option>
                </el-select>
              </el-form-item>

            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible_update = false">取 消</el-button>
              <el-button type="danger" @click="toUpdate(),dialogFormVisible_update=false">确 定</el-button>
            </div>
          </el-dialog>

          <!--这是删除-->
          <el-dialog title="是否确定删除班级！" :visible.sync="dialogFormVisible_delete">
            <el-form v-model="newChild">
              <el-form-item label="删除的班级为："  :label-width="formLabelWidth">
                <el-input v-model="newChild.label" placeholder="请用分号间隔" >{{newChild.label}}</el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible_delete = false">取 消</el-button>
              <el-button type="danger" @click="toDelete(),dialogFormVisible_delete=false">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>

    <el-button type="danger" class="button-bottom" @click="append1()">新 建</el-button>
  </section>
</template>

<script>/* eslint-disable */
const cityOptions = ['添加课程', '修改课程', '删除课程','添加指标','修改指标','删除指标'];

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
                userName:'userName',
            },
            checkAll: false,
            checkedCities: [],
            cities: cityOptions,
            isIndeterminate: true,
            userId:localStorage.getItem('userId'),
            userRank:localStorage.getItem('rank'),
            list:[],
            list2:[],
            idk:"",
            str:"aaa",//这是字符串 ""这是为空尚未初始化，" "这是一个空字符串，已经被初始化，和"ddd"一个意思 str=字符串变量 bbb 将会替换aaa  str=bbb
            map:{"key1":"value1","key2":"value2"},
            dataList:{
                id: '',
                region: '',
                label: '',
            },
            dialogFormVisible: false,
            dialogFormVisible_LookOver: false,
            dialogFormVisible_update: false,
            dialogFormVisible_delete: false,
            newChild: {
                id: '',
                schoolName:'',
                label1:'',
                label:''
            },
            formLabelWidth: '120px',
            /*data1: JSON.parse(JSON.stringify(data2)),
            data1: JSON.parse(JSON.stringify(data2))*/
        };
    },

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
        LookOver (data) {
            this.dialogFormVisible_LookOver = true;
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
            return (
                <span class="custom-tree-node">
                <span>{data.className}</span>
                <span>
                <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.LookOver(data,this.getData()) }>查看</el-button>
            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
            </span>
            </span>);


        },
        getData: function() {///methods中的一个方法 获取后端数据  实现前端渲染
            //这是一个ajax的post请求  res是response的简化参数名 叫什么无所谓  代表的是response
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/classData").then((res) =>{
                console.log(res.data);//返回的参数 res.data才是后端返回的
                this.list=res.data.data
            }).catch((err)=>{
                console.log(err)
            })

        },

        toSave(){//它是一个添加方法——whl，它叫什么并不重要

            var params = new URLSearchParams();
            params.append('className',this.newChild.label1);
            params.append('schoolName',this.idk);
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/createClass",params).then((res) =>{
                console.log(res.data);//返回的参数 res.data才是后端返回的
                alert(res.data.message);
            }).catch((err)=>{
                console.log(err)
            });
            this.newChild.label1='';
            this.idk='';
            this.getData()
        },
        toUpdate(){//实现修改
            var params = new URLSearchParams();
            params.append('className',this.newChild.label);
            params.append('schoolName',this.idk);
            params.append('id',this.newChild.id);
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/updateClass",params).then((res) =>{
                console.log(res.data);//返回的参数 res.data才是后端返回的
            }).catch((err)=>{
                console.log(err)
            });
            this.newChild.label1='';
            this.getData()
        },
        toDelete(){//实现删除
            var params = new URLSearchParams();
            params.append('id', this.newChild.id);
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/deleteClass",params).then((res) =>{
                console.log(res.data);//返回的参数 res.data才是后端返回的
            }).catch((err)=>{
                console.log(err)
            });
            this.getData()
        },
        atSelect(){
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/DataForm3").then((res) =>{
                console.log(res.data);//返回的参数 res.data才是后端返回的
                this.list2=res.data.data
            }).catch((err)=>{
                console.log(err)
            })
        },
        getId(value){
            // var  myselect=document.getElementById("test");
            // var index=myselect.selectedIndex ;
            // alert(myselect.options[index].value);
            // alert(myselect.options[index].text);

            alert(localStorage.getItem('Permission')[4]);
        },
        handleNodeClick(data) {
            console.log(data);
            this.newChild.id=data.id;
            this.newChild.label=data.className;
            this.newChild.schoolName=data.schoolName;
        },
        handleCheckAllChange(val) {
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },

    },


    mounted() {//钩子函数（vue生命周期，它会在项目启动时，执行其中的方法，进行全局初始化）
        this.getData();
        this.atSelect();
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
