<template>
    <div>
        <el-container>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path: '/periodicAnalysis', query:{currentPage:this.$route.query.currentPage}}">定期评估分析</el-breadcrumb-item>
                <el-breadcrumb-item>编辑评估分析</el-breadcrumb-item>
                <el-breadcrumb-item></el-breadcrumb-item>
            </el-breadcrumb>
        </el-container>
        <el-divider></el-divider>
        <el-container>
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
                <el-form :inline="true" align="left">
                    <el-form-item label="学年">
                        <el-select v-model="schoolYear" placeholder="请选择" :disabled="disabled">
                            <el-option
                                    v-for="item in schoolYear_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学期">
                        <el-select v-model="term" placeholder="请选择" :disabled="disabled">
                            <el-option
                                    v-for="item in term_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班级">
                        <el-select v-model="tclass" placeholder="请选择" :disabled="disabled" @change="queStudents()">
                            <el-option
                                    v-for="item in class_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学生">
                        <el-select v-model="stuName" placeholder="请选择学生" :disabled="disabled" @change="selectStuName">
                            <el-option
                                    v-for="item in student_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                                <span style="float: left">{{ item.value }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="分析人">
                        <el-select v-model="teacher" placeholder="请选择" :disabled="disabled">
                            <el-option
                                    v-for="item in teacher_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="分析时间">
                        <el-date-picker :disabled="disabled" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" align="left" v-model="date" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-container>
        <el-divider></el-divider>
        <el-form :inline="true"  align="left" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)">
            <el-header>
                <p style="color: #000000;font-family: 楷体; font-size: large; font-weight:bold">学期总评量</p>
            </el-header>
            <div style="padding: 5px">
        <el-card>
            <div slot="header" style="font-family: 楷体; font-size: large; font-weight: bold">
              <span>
                目标评鉴结果
              </span>
            </div>
            <vue-ckeditor type="classic"  v-model="target_assess" :editors="editors1"
                          :config='config' :readonly="disabled"></vue-ckeditor>
        </el-card><br />

        <el-card>
            <div slot="header" style="font-family: 楷体; font-size: large; font-weight: bold">
              <span>
                学科能力评量结果
              </span>
            </div>
            <vue-ckeditor type="classic"  v-model="subject_ability" :editors="editors1"
                          :config='config' :readonly="disabled"></vue-ckeditor>
        </el-card><br />

        <el-card>
            <div slot="header" style="font-family: 楷体; font-size: large; font-weight: bold">
              <span>
                课程评量结果
              </span>
            </div>
            <vue-ckeditor type="classic"  v-model="course_assess" :editors="editors1"
                          :config='config' :readonly="disabled"></vue-ckeditor>
        </el-card><br />

        <el-card>
            <div slot="header" style="font-family: 楷体; font-size: large; font-weight: bold">
              <span>
                治疗性评估结果
              </span>
            </div>
            <vue-ckeditor type="classic"  v-model="remedial_assess" :editors="editors1"
                          :config='config' :readonly="disabled"></vue-ckeditor>
        </el-card>
            </div>
        </el-form>
        <br /><br />
        <el-form :inline="true"  align="left" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)">
            <el-header>
                <p style="color: #000000;font-family: 楷体; font-size: large; font-weight:bold">综合研判</p>
            </el-header>
            <div style="padding: 5px">
        <el-card>
            <div slot="header" style="font-family: 楷体; font-size: large; font-weight: bold">
              <span>
                生活描述
              </span>
            </div>
            <vue-ckeditor type="classic"  v-model="life_describe" :editors="editors1"
                          :config='config' :readonly="disabled"></vue-ckeditor>
        </el-card><br />

        <el-card>
            <div slot="header" style="font-family: 楷体; font-size: large; font-weight: bold">
              <span>
                主要问题
              </span>
            </div>
            <vue-ckeditor type="classic"  v-model="main_problem" :editors="editors1"
                          :config='config' :readonly="disabled"></vue-ckeditor>
        </el-card><br />

        <el-card>
            <div slot="header" style="font-family: 楷体; font-size: large; font-weight: bold">
              <span>
                主要需求
              </span>
            </div>
            <vue-ckeditor type="classic"  v-model="main_request" :editors="editors1"
                          :config='config' :readonly="disabled"></vue-ckeditor>
        </el-card><br />

        <el-card>
            <div slot="header" style="font-family: 楷体; font-size: large; font-weight: bold">
              <span>
                教育重点
              </span>
            </div>
            <vue-ckeditor type="classic"  v-model="edu_emphasis" :editors="editors1"
                          :config='config' :readonly="disabled"></vue-ckeditor>
        </el-card><br />

        <el-card>
            <div slot="header" style="font-family: 楷体; font-size: large; font-weight: bold">
              <span>
                补充目标
              </span>
            </div>
            <vue-ckeditor type="classic"  v-model="add_target" :editors="editors1"
                          :config='config' :readonly="disabled"></vue-ckeditor>
        </el-card><br />

        <el-card>
            <div slot="header" style="font-family: 楷体; font-size: large; font-weight: bold">
              <span>
                教学策略
              </span>
            </div>
            <vue-ckeditor type="classic"  v-model="edu_tactice" :editors="editors1"
                          :config='config' :readonly="disabled"></vue-ckeditor>
        </el-card><br />

        <el-card>
            <div slot="header" style="font-family: 楷体; font-size: large; font-weight: bold">
              <span>
                相关服务
              </span>
            </div>
            <vue-ckeditor type="classic"  v-model="relate_service" :editors="editors1"
                          :config='config' :readonly="disabled"></vue-ckeditor>
        </el-card>
            </div>
        </el-form>
        <br />
        <el-divider></el-divider>
        <el-form :inline="true" align="center">
            <el-form-item>
                <el-button type="danger" @click.native="submit()" :disabled="disabled">提交</el-button>
                <el-button type="danger" @click.native="go_back()">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import VueCkeditor from 'vue-ckeditor5'
    import ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block'
    import '@ckeditor/ckeditor5-build-balloon-block/build/translations/zh-cn'
    export default {
        components:{'vue-ckeditor': VueCkeditor.component},
        data(){
            return{
                term_options:[{value: '上学期', label: '上学期'},
                    {value: '下学期', label: '下学期'}],
                schoolYear_options:[],
                class_options:[],
                student_options:[],
                teacher_options:[],

                schoolYear:'',
                term:'',
                tclass:'',
                stuName:'',
                stu_id:'',
                teacher:'',
                date:'',

                edt: ClassicEditor,
                disabled:false,
                editors1: {
                    classic: ClassicEditor,
                },
                config:{
                    language:'zh-cn',
                    placeholder:'点击此处编辑',
                    ckfinder: {
                        uploadUrl: '/api/stu/picture_PA'
                    },
                },

                target_assess:'',
                subject_ability:'',
                course_assess:'',
                remedial_assess:'',
                life_describe:'',
                main_problem:'',
                main_request:'',
                edu_emphasis:'',
                add_target:'',
                edu_tactice:'',
                relate_service:'',

                isEdit:'',
            }
        },
        async mounted() {
            window.onbeforeunload = () =>{
                this.releaseDQPG();
                return 'tips';
            }
            this.isEdit = this.$route.query.isEdit;
            this.init_options();
            if(this.$route.query.isEdit == 2){
                this.readPA();
                this.disabled = true;
            }else if (this.$route.query.isEdit == 1){
                this.readPA();
                this.disabled = false;
            }else {
                this.disabled = false;
            }
        },
        destroyed() {
            this.releaseDQPG();
        },

        methods:{
            releaseDQPG()
            {
                if (this.isEdit == 1) {
                    var ID = this.$store.state.PA[0].id;
                    this.$http.post('/api/stu/DQPGFinish', {
                        ID: ID
                    }, {});
                }
            },

            //初始化选项
            init_options(){
                //初始化分析人选项
                this.$http.post('/api/stu/queSchoolTeachers', {
                    school:"苏州工业园区仁爱学校"
                },{}).then((response) => {
                    console.log(response);
                    for (var i = 0; i < response.body.length; i++) {
                        this.teacher_options.push({value:response.body[i].userName, label:response.body[i].userName, id:response.body[i].id});
                    }
                });
                //初始化班级选项
                this.class_options = [];
                this.$http.post('/api/stu/queClasstable', {
                    schoolName: "苏州工业园区仁爱学校",
                }, {}).then((response) => {
                    for (var i = 0; i < response.body.length; i++){
                        var opt = {};
                        opt.value = response.body[i].className;
                        opt.label = response.body[i].className;
                        this.class_options.push(opt);
                    }
                })
                //初始化学年选项
                var year = new Date().getFullYear();
                this.schoolYear_options.push({key:0, value:(year+1)+'-'+(year+2), label:(year+1)+'-'+(year+2)});
                this.schoolYear_options.push({key:1, value:year+'-'+(year+1), label:year+'-'+(year+1)});
                for (var i = 2; ; i++)
                    if (year-i+1 >= 2019)
                        this.schoolYear_options.push({key:i, value:(year-i+1)+'-'+(year-i+2), label:(year-i+1)+'-'+(year-i+2)});
                    else
                        break;
            },

            //设置学生选项
            async queStudents(){
                this.student_options = [];
                this.stu_id = '';
                await this.$http.post('/api/stu/queryClass',{
                    class_id:this.tclass
                },{}).then((response) => {
                    console.log(response)
                    for (var i = 0; i < response.body.length; i++)
                        this.student_options.push({key:i, label:response.body[i].student_id, value:response.body[i].name});
                })
            },
            //选择学生时为stuName赋值
            selectStuName(id){
                let stu = {};
                stu = this.student_options.find((item)=>{
                    return item.value === id;
                });
                this.stu_id = stu.label;
            },

            //获取定期评估分析内容
            readPA(){
                this.schoolYear=this.$store.state.PA[0].schoolYear;
                this.term=this.$store.state.PA[0].term;
                this.tclass=this.$store.state.PA[0].class;
                this.stuName=this.$store.state.PA[0].stuName;
                this.stu_id=this.$store.state.PA[0].stuID;
                this.teacher=this.$store.state.PA[0].teacher;
                this.date=this.$store.state.PA[0].analysisTime;
                this.target_assess=this.$store.state.PA[0].targetResult;
                this.subject_ability=this.$store.state.PA[0].subjectResult;
                this.course_assess=this.$store.state.PA[0].courseResult;
                this.remedial_assess=this.$store.state.PA[0].treatmentResult;
                this.life_describe=this.$store.state.PA[0].lifeDes;
                this.main_problem=this.$store.state.PA[0].mainProblem;
                this.main_request=this.$store.state.PA[0].mainDemand;
                this.edu_emphasis=this.$store.state.PA[0].eduFocus;
                this.add_target=this.$store.state.PA[0].moreTarget;
                this.edu_tactice=this.$store.state.PA[0].teachingStrategy;
                this.relate_service=this.$store.state.PA[0].relatedService;
            },

            //返回列表
            go_back(){
                this.$router.replace({path:'/periodicAnalysis', query:{currentPage: this.$route.query.currentPage}});
            },

            //提交内容
            submit(){
              if (this.$route.query.isEdit == 0){
                  this.$http.post('/api/stu/addPA', {
                      stuName:this.stuName,
                      stuID:this.stu_id,
                      term:this.term,
                      schoolYear:this.schoolYear,
                      class:this.tclass,
                      teacher:this.teacher,
                      analysisTime:this.date,
                      targetResult:this.target_assess,
                      subjectResult:this.subject_ability,
                      courseResult:this.course_assess,
                      treatmentResult:this.remedial_assess,
                      lifeDes:this.life_describe,
                      mainProblem:this.main_problem,
                      mainDemand:this.main_request,
                      eduFocus:this.edu_emphasis,
                      moreTarget:this.add_target,
                      teachingStrategy:this.edu_tactice,
                      relatedService:this.relate_service
                  }, {}).then((response) => {
                      console.log(response);
                      this.$router.replace({path:'/periodicAnalysis', query:{currentPage: this.$route.query.currentPage}});
                  });
              }else if (this.$route.query.isEdit == 1){
                  this.$http.post('/api/stu/upPA', {
                      stuName:this.stuName,
                      stuID:this.stu_id,
                      term:this.term,
                      schoolYear:this.schoolYear,
                      class:this.tclass,
                      teacher:this.teacher,
                      analysisTime:this.date,
                      targetResult:this.target_assess,
                      subjectResult:this.subject_ability,
                      courseResult:this.course_assess,
                      treatmentResult:this.remedial_assess,
                      lifeDes:this.life_describe,
                      mainProblem:this.main_problem,
                      mainDemand:this.main_request,
                      eduFocus:this.edu_emphasis,
                      moreTarget:this.add_target,
                      teachingStrategy:this.edu_tactice,
                      relatedService:this.relate_service,
                      id:this.$store.state.PA[0].id
                  }, {}).then((response) => {
                      console.log(response);
                      this.$router.replace({path:'/periodicAnalysis', query:{currentPage: this.$route.query.currentPage}});
                  });
              }
            },
        }
    }
</script>

<style scoped>
</style>
