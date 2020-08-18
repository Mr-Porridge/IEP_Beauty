<template>
  <section>
    <el-container>
      <!--      <div>{{this.$store.state.stuinfo[0].Courses}}</div>-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/courseEvaluation', query:{currentPage:this.$route.query.currentPage} }">课程评量</el-breadcrumb-item>
        <el-breadcrumb-item>填写课程评量</el-breadcrumb-item>
        <el-breadcrumb-item></el-breadcrumb-item>
      </el-breadcrumb>
    </el-container>
    <el-divider></el-divider>
    <el-container>
      <el-col :span="24" class="toolbar" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);padding-bottom: 0px;">
        <el-form :inline="true"  align="left" >
          <el-form-item label="学年">
            <el-input align="left" :disabled="true" :value="this.$route.query.schoolYear"></el-input>
          </el-form-item>
          <el-form-item label="学期">
            <el-input align="left" :disabled="true" :value="this.$route.query.term"></el-input>
          </el-form-item>
          <el-form-item label="评量日期">
            <el-input align="left" :disabled="true" v-model="evaDate"></el-input>
          </el-form-item>
          <el-form-item label="班级">
            <el-input align="left" :disabled="true" :value="JSON.parse(this.$store.state.stuinfo[0].Courses)[0].class"></el-input>
          </el-form-item>
          <el-form-item label="学生">
            <el-input align="left" :disabled="true" :value="JSON.parse(this.$store.state.stuinfo[0].Courses)[0].stuName"></el-input>
          </el-form-item>
          <el-form-item label="课程">
            <el-input align="left" type="textarea" :disabled="true" autosize :value="JSON.parse(this.$store.state.stuinfo[0].Courses)[0].courseName"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-container>
    <el-divider></el-divider>

    <div>
      <el-form style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
        <el-form-item style="padding-left: 1em; padding-top: 1em" ref="field1" label="领域">
          <el-select v-model="field_value" placeholder="请选择" @change="second_traverse()" >
            <el-option v-for="item in field1"
                       :label="item.label"
                       :key="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item><br>
        <el-form-item style="padding-left: 1em" label="次领域">
          <el-select v-model="se_field_value" placeholder="请选择" @change="project_traverse()" >
            <el-option v-for="item in second_field"
                       :label="item.label"
                       :key="item.value"
                       :value="item.value" @click="change(item.label)">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.isEvaluated }}</span>
            </el-option>
          </el-select>
         </el-form-item><br>
        <el-form-item style="padding-left: 1em" label="项目">
          <el-select  v-model="project_value"   placeholder="请选择" @change="pro_item_traverse()">
            <el-option v-for="(item,index) in project"
                       :label="item.label"
                       :key="item.value"
                       :value="item.value" @click.native="set_project_index(index)">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.isEvaluated }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button-group style="padding-left: 1em; padding-bottom: 1em">
            <el-button icon="el-icon-edit" v-for="(item,index) in radioes[0]":key="index" :disabled="disabled" @click="choose_item(index)" type="primary" plain round>全选{{index}}分</el-button>
            <el-button icon="el-icon-caret-top" v-if="radioes.length>0" type="primary" round @click="last_project"></el-button>
            <el-button icon="el-icon-caret-bottom" v-if="radioes.length>0" type="primary" round @click="next_project"></el-button>
            <el-button v-if="radioes.length>0" type="danger" :disabled="disabled" @click="eval_submit()" plain round>修改提交</el-button>
            <el-button v-if="radioes.length>0" type="danger" :disabled="disabled" @click="cancel()" plain round>取消评量</el-button>
          </el-button-group>
        </el-form-item>
      </el-form>

      <el-divider></el-divider>

      <el-form style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" v-for="(item,index) in radio_title":key="item.value">
        <el-form-item>
          <el-card>
            <div slot="header" style="font-size: 1.1em">
              <span>
                {{item.label}}。::{{radioarray[index]}}分
              </span>
            </div>
            <el-radio-group v-model="radioarray[index]" :disabled="disabled">
              <el-radio style="display: block; margin-top: 1em;" v-for="opt in radioes[index]":key="opt.value":label="opt.label":value="opt.label">
                <p style="display: inline; font-size: 1em">
                  {{opt.value}}<br>
                </p>
              </el-radio>
            </el-radio-group>
          </el-card>
        </el-form-item>
      </el-form>

      <el-divider></el-divider>

      <el-form :inline="true" align="center">
        <el-form-item>
          <el-button type="danger" :disabled="disabled" @click="eval_submit()">修改提交</el-button>
          <el-button type="danger" @click.native="go_back()">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
  export default {
    data(){
      return{
        disabled:false,
        field1: [],
        field_value:'',
        field_label:'',
        second_field:[],
        se_field_value:'',
        se_field_label:'',
        project:[],
        project_value:'',
        project_label:'',
        project_index:'',
        radio_title:[],
        radioes:[],
        radioarray:[],

        evaDate:'',
        evaluation:{},
        termTarget:{},
        appraisal:[],

        isEdit:'',
      }
    },
    mounted(){
      window.onbeforeunload = () =>{
        this.releaseKCPL();
        return 'tips';
      }
      this.init();
      this.isEdit = this.$route.query.isEdit;
      console.log(JSON.parse(this.$store.state.stuinfo[0].Courses));
    },
    destroyed() {
      this.releaseKCPL();
    },
    methods:{
      async init(){
        //获取次领域、项目选项内容
        await  this.$http.post('/api/stu/queCourse', {
        }, {}).then((response) => {
          this.$store.dispatch("setcourse", response.bodyText);
        });

        //判断是否可以编辑
        if (this.$route.query.isEdit == 1)
          this.disabled = false;
        else
          this.disabled = true;

        this.field1_traverse();
        this.evaDate = this.getDate();
        this.getStuAppraisal();
      },

      releaseKCPL()
      {
        if (this.isEdit == 1) {
          var stuID = this.$store.state.stuinfo[0].student_id;
          this.$http.post('/api/stu/KCPLFinish', {
            StuID: stuID
          }, {});
        }
      },

      //获取评量分析的文字描述
      getStuAppraisal(){
        var courses = JSON.parse(this.$store.state.stuinfo[0].Courses);
        for (var i = 0; i < courses.length; i++){
          if (courses[i].schoolYear == this.$route.query.schoolYear && courses[i].term == this.$route.query.term) {
            this.appraisal = [];
            for (var j = 0; j < courses[i].appraisal.length; j++){
              this.appraisal.push(courses[i].appraisal[j])
            }
          }
        }
      },

      getDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
      },
      field1_traverse(){
        this.field1 = [];
        // var value_nub=0;
        for(var i=0; i<this.$store.state.course.length;i++)
        {
          if(this.$store.state.course[i].show_type=='1' && this.$store.state.course[i].father=='1')
          {
                this.field1.push({label: this.$store.state.course[i].label, value: this.$store.state.course[i].id});
                //value_nub++;
          }
        }
      },
      second_traverse(){
        this.termTarget={};
        this.project=[];
        this.project_value='';
        this.radio_title=[];
        this.radioes=[];
        this.second_field=[];
        this.se_field_value='';

        for (var i = 0; i < this.$store.state.course.length; i++)
          if(this.$store.state.course[i].id == this.field_value)
            this.field_label = this.$store.state.course[i].label;

        var Courses = JSON.parse(this.$store.state.stuinfo[0].Courses);
        var evaluatedCourses;
        var evaluatedSe;
        for (var i = 0; i < Courses.length; i++)
          if (Courses[i].schoolYear == this.$route.query.schoolYear && Courses[i].term == this.$route.query.term)
            evaluatedCourses = Courses[i].evaluatedCourses;
        if (evaluatedCourses == undefined)
          evaluatedCourses = [];

        console.log("evaluatedCourses:");
        console.log(evaluatedCourses);
        for(var j = 0; j < evaluatedCourses.length; j++)
          if(evaluatedCourses[j].领域 == this.field_label)
            evaluatedSe = evaluatedCourses[j].child;
        if (evaluatedSe == undefined)
          evaluatedSe = [];

        for (var i = 0; i < this.$store.state.course.length; i++) {
          if (this.$store.state.course[i].father == this.field_value) {
            var isAdded = false;
            for(var j = 0; j < evaluatedSe.length; j++)
              if(evaluatedSe[j].次领域 == this.$store.state.course[i].label && evaluatedSe[j].allComplete) {
                this.second_field.push({
                  label: this.$store.state.course[i].label,
                  value: this.$store.state.course[i].id,
                  isEvaluated: "√"
                });
                isAdded = true;
                break;
              }

            if(!isAdded)
            this.second_field.push({
              label: this.$store.state.course[i].label,
              value: this.$store.state.course[i].id,
              isEvaluated: ""
            });
          }
        }
      },
      project_traverse(){
        this.termTarget={};
        this.project=[];
        this.project_value='';
        this.radio_title=[];
        this.radioes=[];

        for (var i = 0; i < this.$store.state.course.length; i++){
          if(this.$store.state.course[i].id == this.field_value)
            this.field_label = this.$store.state.course[i].label;
          else if(this.$store.state.course[i].id == this.se_field_value)
            this.se_field_label = this.$store.state.course[i].label;
        }

        var Courses = JSON.parse(this.$store.state.stuinfo[0].Courses);
        var evaluatedCourses;
        var evaluatedProjects;
        for (var i = 0; i < Courses.length; i++)
          if (Courses[i].schoolYear == this.$route.query.schoolYear && Courses[i].term == this.$route.query.term)
            evaluatedCourses = Courses[i].evaluatedCourses;
        if (evaluatedCourses == undefined)
          evaluatedCourses = [];

        for(var j = 0; j < evaluatedCourses.length; j++)
          if(evaluatedCourses[j].领域 == this.field_label)
            for (var k = 0; k < evaluatedCourses[j].child.length; k++)
              if(evaluatedCourses[j].child[k].次领域 == this.se_field_label)
                evaluatedProjects = evaluatedCourses[j].child[k].child;
        if (evaluatedProjects == undefined)
          evaluatedProjects = [];

        for(var i =0 ;i<this.$store.state.course.length;i++)
        {
          if(this.$store.state.course[i].father== this.se_field_value)
          {
            var isAdded = false;
            for(var j = 0; j < evaluatedProjects.length; j++)
              if(this.$store.state.course[i].label == evaluatedProjects[j]) {
                this.project.push({
                  label: this.$store.state.course[i].label,
                  value: this.$store.state.course[i].id,
                  isEvaluated: "√"
                });
                isAdded = true;
                break;
              }

            if(!isAdded)
              this.project.push({
                label:this.$store.state.course[i].label,
                value:this.$store.state.course[i].id,
                isEvaluated:""});
          }
        }
      },
      pro_item_traverse(){
        this.termTarget={};
        this.radioes=[];
        this.radio_title=[];
        this.radioarray=[];
        for(var i = 0;i<this.$store.state.course.length;i++)
        {
          if(this.$store.state.course[i].father == this.project_value)
          {
            this.radio_title.push({
              label:this.$store.state.course[i].label,
              value:this.$store.state.course[i].id});
            var arr1=[];
            for(var j = 0;j<this.$store.state.course.length;j++) {
              if (this.$store.state.course[j].father == this.$store.state.course[i].id) {
                var p = {
                  label: this.$store.state.course[j].grade,
                  value: this.$store.state.course[j].label
                };
                arr1.push(p)
              }
            }
            this.radioes.push(arr1)
            // }
          }
        }
        this.fieldID2label();
        for (var i = 0; i < JSON.parse(this.$store.state.stuinfo[0].Courses).length; i++){
          if (JSON.parse(this.$store.state.stuinfo[0].Courses)[i].schoolYear == this.$route.query.schoolYear && JSON.parse(this.$store.state.stuinfo[0].Courses)[i].term == this.$route.query.term)
            var json = JSON.parse(this.$store.state.stuinfo[0].Courses)[i].evaluation;
        }
        if (json.length > 0) {
          for (var i = 0; i < json.length; i++) {
            if ((json[i].领域 == this.field_label) && (json[i].次领域 == this.se_field_label) && (json[i].项目 == this.project_label)) {
              for (var j = 0; j < this.radio_title.length; j++) {
                this.radioarray.push(json[i].长期目标[this.radio_title[j].label].score);
              }
            }
          }
        }
        else{
          this.radioarray = [];
        }
      },
      change(name){
        console.log(name)
      },
      fieldID2label(){
        for (var i = 0; i < this.$store.state.course.length; i++){
          if(this.$store.state.course[i].id == this.field_value)
            this.field_label = this.$store.state.course[i].label;
          else if(this.$store.state.course[i].id == this.se_field_value)
            this.se_field_label = this.$store.state.course[i].label;
          else if(this.$store.state.course[i].id == this.project_value)
            this.project_label = this.$store.state.course[i].label;
        }
      },
      go_back(){
        this.$router.replace({path:'/courseEvaluation', query:{currentPage: this.$route.query.currentPage}});
      },
      cancel(){
        this.radioarray = [];
      },
      async eval_submit(){
        if (this.radioarray.length == 0){
          this.$message.warning("您还没有对该项目进行评量！");
          return ;
        }

        var status;
        for (var i = 0; i < this.radio_title.length; i++){
          for (var j = 0; j < this.radioes[i].length; j++){
            if (this.radioes[i][j].label == this.radioarray[i]){
              var js = {};
              js.choice = this.radioes[i][j].value;
              js.score = this.radioes[i][j].label;
              js.title = this.radio_title[i].label;
              this.termTarget[this.radio_title[i].label] = js;
            }
          }
        }
        if (this.appraisal.length == 0)
          this.appraisal.push({领域:this.field_label, 描述:''});
        else
          for (var i = 0; i < this.appraisal.length; i++){
            if (this.field_label == this.appraisal[i].领域)
              break
            if (i == this.appraisal.length-1)
              this.appraisal.push({领域:this.field_label, 描述:''});
          }
        this.evaluation.领域 = this.field_label;
        this.evaluation.次领域 = this.se_field_label;
        this.evaluation.项目 = this.project_label;
        this.evaluation.长期目标 = this.termTarget;
        var Courses = JSON.parse(this.$store.state.stuinfo[0].Courses);
        for (var i = 0; i < Courses.length; i++){
          if (Courses[i].schoolYear == this.$route.query.schoolYear && Courses[i].term == this.$route.query.term)
          {
            //更新已完成评量的课程数据
            var isAdded = false;
            if (Courses[i].evaluatedCourses == undefined)
              Courses[i].evaluatedCourses = [];
            if(Courses[i].evaluatedCourses.length == 0)
            {
              Courses[i].evaluatedCourses.push({领域:this.field_label, child:[]});
              Courses[i].evaluatedCourses[0].child.push({次领域:this.se_field_label, child:[], allComplete:false});
              Courses[i].evaluatedCourses[0].child[0].child.push(this.project_label);
              isAdded = true;
            }else {
              for (var j = 0; j < Courses[i].evaluatedCourses.length; j++) {
                if (Courses[i].evaluatedCourses[j].领域 == this.field_label) {
                  for (var k = 0; k < Courses[i].evaluatedCourses[j].child.length; k++) {
                    if (Courses[i].evaluatedCourses[j].child[k].次领域 == this.se_field_label) {
                      for (var n = 0; n < Courses[i].evaluatedCourses[j].child[k].child.length; n++)
                        if (isAdded || Courses[i].evaluatedCourses[j].child[k].child[n] == this.project_label) {
                          isAdded = true;
                          if (Courses[i].evaluatedCourses[j].child[k].child.length == this.project.length)
                            Courses[i].evaluatedCourses[j].child[k].allComplete = true;
                          break;
                        } else if (n == Courses[i].evaluatedCourses[j].child[k].child.length - 1) {
                          Courses[i].evaluatedCourses[j].child[k].child.push(this.project_label)
                          isAdded = true;
                          if (Courses[i].evaluatedCourses[j].child[k].child.length == this.project.length)
                            Courses[i].evaluatedCourses[j].child[k].allComplete = true;
                          break;
                        } else if (isAdded)
                          break;
                    } else if (k == Courses[i].evaluatedCourses[j].child.length - 1) {
                      Courses[i].evaluatedCourses[j].child.push({次领域: this.se_field_label, child: []});
                      Courses[i].evaluatedCourses[j].child[k + 1].child.push(this.project_label);
                      isAdded = true;
                      break;
                    } else if (isAdded)
                      break;
                  }
                } else if (j == Courses[i].evaluatedCourses.length - 1) {
                  Courses[i].evaluatedCourses.push({领域: this.field_label, child: []});
                  Courses[i].evaluatedCourses[j + 1].child.push({次领域: this.se_field_label, child: []});
                  Courses[i].evaluatedCourses[j + 1].child[0].child.push(this.project_label);
                  isAdded = true;
                  break;
                } else if (isAdded)
                  break;
              }
            }
            console.log(Courses);

            for (var j = 0; ; j++){
              if (Courses[i].evaluation[j] == undefined)
                break;
              if ((Courses[i].evaluation[j].领域==this.evaluation.领域)&&(Courses[i].evaluation[j].次领域==this.evaluation.次领域)&&(Courses[i].evaluation[j].项目==this.evaluation.项目)) {
                Courses[i].evaluation[j] = this.evaluation;
                Courses[i].appraisal = [];
                Courses[i].evaDate = this.evaDate;
                for (var n = 0; n < this.appraisal.length; n++)
                  Courses[i].appraisal.push(this.appraisal[n])

                var num=0;
                for (var p = 0; p < this.project.length; p++)
                  for (var n = 0; n < Courses[i].evaluation.length; n++)
                    if (this.project[p].label == Courses[i].evaluation[n].项目 && this.evaluation.次领域 == Courses[i].evaluation[n].次领域 && this.evaluation.领域 == Courses[i].evaluation[n].领域){
                      num++;
                      continue;
                    }
                if (num == this.project.length) {
                  if (Courses[i].completedCourses.length == 0)
                    Courses[i].completedCourses.push(this.evaluation.领域);
                  else if (Courses[i].completedCourses.indexOf(this.evaluation.领域) == -1)
                    Courses[i].completedCourses.push(this.evaluation.领域);
                }
                var progress = (Courses[i].completedCourses.length / this.field1.length).toFixed(2) * 100;
                if(progress >= 100)
                  progress = 100;
                Courses[i].progress = progress;
                if (Courses[i].progress == 100)
                  Courses[i].status = 'success';
                else
                  Courses[i].status = 'warning';

                await this.$http.post('/api/stu/upStuCourse', {
                  Course:Courses,
                  stuID:this.$store.state.stuinfo[0].student_id
                }, {}).then((response) => {
                  status = response.status;
                });
                if (status == 200){
                  this.$message.success('“'+this.project_label+'”项目评量已成功保存！');
                  this.$http.post('/api/stu/queryStuinfo',{
                    AStuID:JSON.parse(this.$store.state.stuinfo[0].Courses)[0].stuID
                  },{}).then((response) => {
                    this.$store.dispatch("setstuinfo", response.bodyText);
                    this.init();
                    this.next_project();
                  });
                }else
                  this.$message.error("发生错误，错误代码："+status);
                return;
              }
            }
            for (var l = 0; ;l++)
              if(Courses[i].evaluation[l]==undefined) {
                Courses[i].evaluation[l] = this.evaluation;
                Courses[i].appraisal = [];
                for (var n = 0; n < this.appraisal.length; n++)
                  Courses[i].appraisal.push(this.appraisal[n]);

                var num=0;
                for (var p = 0; p < this.project.length; p++)
                  for (var n = 0; n < Courses[i].evaluation.length; n++)
                    if (this.project[p].label == Courses[i].evaluation[n].项目 && this.evaluation.次领域 == Courses[i].evaluation[n].次领域 && this.evaluation.领域 == Courses[i].evaluation[n].领域){
                      num++;
                      continue;
                    }
                if (num == this.project.length) {
                  if (Courses[i].completedCourses.length == 0)
                    Courses[i].completedCourses.push(this.evaluation.领域);
                  else if (Courses[i].completedCourses.indexOf(this.evaluation.领域) == -1)
                    Courses[i].completedCourses.push(this.evaluation.领域);
                }
                var progress = (Courses[i].completedCourses.length / this.field1.lengsssth).toFixed(2) * 100;
                if(progress >= 100)
                  progress = 100;
                Courses[i].progress = progress;
                if (Courses[i].progress == 100)
                  Courses[i].status = 'success';
                else
                  Courses[i].status = 'warning';

                break;
              }
            Courses[i].evaDate = this.evaDate;
          }
        }

        await this.$http.post('/api/stu/upStuCourse', {
          Course:Courses,
          stuID:this.$store.state.stuinfo[0].student_id
        }).then((response) => {
          status = response.status;
        });
        if (status == 200){
          this.$message.success('“'+this.project_label+'”项目评量已成功保存！');
          this.$http.post('/api/stu/queryStuinfo',{
            AStuID:JSON.parse(this.$store.state.stuinfo[0].Courses)[0].stuID
          },{}).then((response) => {
            this.$store.dispatch("setstuinfo", response.bodyText);
            this.init();
            this.next_project();
          });
        }else
          this.$message.error("发生错误，错误代码："+status);
      },

      //单选全选num选项
      choose_item(num){
        this.radioarray = [];
        for (var i = 0; i < this.radioes.length; i++)
          this.radioarray.push(num);
      },

      set_project_index(index){
        this.project_index = index;
      },

      //下一个项目
      next_project(){
        if (this.project_index == this.project.length-1){
          this.$message.warning("当前已是最后一个项目！")
          return;
        }
        this.project_index++;
        this.project_value = this.project[this.project_index].value;
        this.pro_item_traverse();
      },

      //上一个项目
      last_project(){
        if (this.project_index == 0) {
          this.$message.warning("当前已是第一个项目！")
          return;
        }
        this.project_index--;
        this.project_value = this.project[this.project_index].value;
        this.pro_item_traverse();
      }
    }
  }
</script>

<style scoped>
</style>