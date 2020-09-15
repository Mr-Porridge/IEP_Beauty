<!--2019.07.10开始开发目标制定功能-->
<template>
  <section>
    <!--<el-button type="primary" @click="mockTest">测试</el-button>-->
    <div style="padding-bottom: 1%; text-align: center">
      <el-tag
          v-for="item in heads"
          :key="item.key"
          :type="item.type"
          effect="dark">
        {{ item.label }}
      </el-tag>
      <el-button type="text" @click="dialogFormVisible = true">查看其它学年学期课表</el-button>
    </div>


    <!--选择学年学期-->
    <el-dialog title="选择查询的学年学期" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="学年" :label-width="formLabelWidth">
          <el-select v-model="form.year" clearable placeholder="请选择学年" id="chooseSemester">
            <el-option
                v-for="item in yearOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学期" :label-width="formLabelWidth">
          <el-select v-model="form.semester" clearable placeholder="请选择学期" id="chooseYear">
            <el-option
                v-for="item in semesterOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="searchTables()">确 定</el-button>
      </div>
    </el-dialog>

    <div id="creatSchoolTable" style="padding-top: 15px">
      <el-row>
        <el-col :span="3">
          <div class="grid-content bg-purple-light school-tables">节次\星期</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple school-tables">一</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple school-tables">二</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple school-tables">三</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple school-tables">四</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple school-tables">五</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple school-tables">六</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple school-tables">日</div>
        </el-col>
      </el-row>
      <el-row :span="3">
        <el-col :span="3" v-for="item in coursesNames" :key="item.id">
          <div class="grid-content bg-purple-light school-tables" :style="randomRgb(item.id)">
            <span class="courseName">{{item.mes}}</span>
          </div>
        </el-col>
      </el-row>

    </div>
  </section>
</template>

<script>/* eslint-disable */
import ElSelectDropdown from 'element-ui/packages/select/src/select-dropdown'
import axios from 'axios/index'

export default {
    data() {
        this.mockTest();//在渲染页面是初始时得到需要展示在前端的后端数据
        return {
            coursesNames: [],
            coursesPictures: [],
            search: '',
            /*url: 'http://dummyimage.com/100x100/4A7BF7&text=Hello',*/
            fit: 'cover',//图片的适应方式
            /*courses:['fill', 'contain', 'cover', 'none', 'scale-down'],*/
            options: [],//可选课程
            //题头---学年  学期
            heads: [
                {type: '', label: '', key: 0},
                {type: '', label: '', key: 1},
            ],
            //学年学期选择
            yearOptions: [],
            semesterOptions: [
                {
                    value: '1',
                    label: '第一学期'
                }, {
                    value: '2',
                    label: '第二学期'
                },
            ],
            //弹框表单内
            dialogFormVisible: false,
            form: {
                year: '2019-2020',
                semester: '1',
            },
            formLabelWidth: '120px',
            //随机颜色课表
            colorMap: ['#FFB6C1', '#6495ED', '#FFA500', '#FF7F50',],

            colorMap2: ['#C7EDE9', '#AFD7ED', '#5CA7BA', '#FF425D', '#93E0FF'],

            colorMap3: ['#F4E8C1', '#A0C1B8', '#B7DAE0', '#E6E6FA',
                '#FFD8EB', '#87CEFA', '#FFE4E1'],
        }

    },
    components: {ElSelectDropdown},
    methods: {
        mockTest() {
            axios({
                method: 'get',
                //url: 'http://coursesmock.com',
                // url: 'http://localhost:8082/scheduleSet/personalSchedule/',
                url: 'http://47.110.134.247/group2_b/scheduleSet/personalSchedule/',
                params: {
                    /*'year': this.form.year,
                    'semester': this.form.semester,*/
                    'year': '2019-2020',
                    'semester': '1',
                    'studentId': this.$route.query.row.studentId
                }
            }).then((res) => {
                const current = new Date();
                const y = current.getFullYear();
                this.yearOptions.push(
                    {
                        value: (y - 1) + "-" + y,
                        label: (y - 1) + "-" + y + "学年",
                    },
                    {
                        value: y + "-" + (y + 1),
                        label: y + "-" + (y + 1) + "学年",
                    },
                    {
                        value: y + 1 + "-" + (y + 2),
                        label: y + 1 + "-" + (y + 2) + "学年",
                    },
                );
                if (res.data.data === null) {
                    alert('该学生暂无' + '2019-2020学年 第 1 学期 ' + '课表！请查看其他学期课表！');
                    return
                }
                //console.log(res.data.data)
                let temp = JSON.parse(res.data.data.courses);

                this.heads[0].type = 'success';
                this.heads[0].label = res.data.data.year + '学年';
                this.heads[1].type = '';
                this.heads[1].label = '第 ' + res.data.data.semester + ' 学期';
                //console.log(temp)
                for (let item in temp) {
                    if (temp.hasOwnProperty(item)) {
                        //需要检查
                        this.coursesNames.push({id: item, mes: temp[item]});
                    }
                }
                //console.log(this.coursesNames)
                this.coursesNames.unshift({id: 101, mes: '第一节课'});
                this.coursesNames.splice(8, 0, {id: 102, mes: '第二节课'});
                this.coursesNames.splice(16, 0, {id: 103, mes: '第三节课'});
                this.coursesNames.splice(24, 0, {id: 104, mes: '第四节课'});
                this.coursesNames.splice(32, 0, {id: 105, mes: '第五节课'});
                this.coursesNames.splice(40, 0, {id: 106, mes: '第六节课'});
                this.coursesNames.splice(48, 0, {id: 107, mes: '第七节课'});
                //console.log(this.coursesNames)
                // console.log(this.yearOptions);

            })
        },
        getParams() {
            let temp = this.$route.query.row;
            // console.log('跳转到show list 了', this.$route.query.row);
            this.studentId = temp.studentId;
            // console.log(this.form)
        },
        searchTables() {
            this.dialogFormVisible = false;
            axios({
                method: 'get',
                //url: 'http://coursesmock.com',
                // url: 'http://localhost:8082/scheduleSet/personalSchedule/',
                url: 'http://47.110.134.247/group2_b/scheduleSet/personalSchedule/',
                params: {
                    /*'year': this.form.year,
                    'semester': this.form.semester,*/
                    'year': this.form.year,
                    'semester': this.form.semester,
                    'studentId': this.$route.query.row.studentId
                }
            }).then((res) => {
                if (res.data.data === null) {
                    alert('该学生暂无' + this.form.year + '学年 第 ' + this.form.semester + ' 学期 ' + '课表！请查看其他学期课表！');
                    return
                }
                this.coursesNames = [];
                //console.log(res.data.data)
                let temp = JSON.parse(res.data.data.courses);
                this.heads[0].type = 'success';
                this.heads[0].label = res.data.data.year + '学年';
                this.heads[1].type = '';
                this.heads[1].label = '第 ' + res.data.data.semester + ' 学期';
                //console.log(temp)
                for (let item in temp) {
                    if (temp.hasOwnProperty(item)) {
                        //需要检查
                        this.coursesNames.push({id: item, mes: temp[item]})
                    }
                }
                //console.log(this.coursesNames)
                this.coursesNames.unshift({id: 101, mes: '第一节课'});
                this.coursesNames.splice(8, 0, {id: 102, mes: '第二节课'});
                this.coursesNames.splice(16, 0, {id: 103, mes: '第三节课'});
                this.coursesNames.splice(24, 0, {id: 104, mes: '第四节课'});
                this.coursesNames.splice(32, 0, {id: 105, mes: '第五节课'});
                this.coursesNames.splice(40, 0, {id: 106, mes: '第六节课'});
                this.coursesNames.splice(48, 0, {id: 107, mes: '第七节课'});
                //console.log(this.coursesNames)
            })
        },
        randomRgb(id) {
            if (id < 100) {
                //左右相邻不同色
                this.coursesNames[id].color = -1;
                this.coursesNames[id].color = Math.floor((Math.random() * 7) + 1) - 1;
                while (this.coursesNames[id].color === this.coursesNames[id - 1].color) {
                    this.coursesNames[id].color = ((this.coursesNames[id].color) % 7) + 1
                }
                //console.log(this.coursesNames[id].color)
                return {
                    background: this.colorMap3[this.coursesNames[id].color],
                    color: '#696969',
                }
            } else {
                return {
                    background: '#d3dce6',
                    color: '#000000',
                }
            }
        },
    },

}
</script>

<style scoped>
  .el-col {
    text-align: center;
    vertical-align: center;
    font-size: medium;
    border-radius: 4px;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .courseName {
    /*border: #333333 solid 2px;*/
  }

  .school-tables {
    margin: 1px;
    text-align: center;
    padding-top: 11px;
  }


</style>
