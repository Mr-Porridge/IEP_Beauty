<template>
    <section>
        <el-container>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/evaluationAnalysis', query:{currentPage:this.$route.query.currentPage} }">评量分析</el-breadcrumb-item>
                <el-breadcrumb-item>编辑</el-breadcrumb-item>
                <el-breadcrumb-item></el-breadcrumb-item>
            </el-breadcrumb>
        </el-container>
        <el-divider></el-divider>
        <el-container>
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
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
                <el-form-item style="padding-left: 1em; padding-top: 1em"  ref="school_year" label="年度">
                    <el-select   v-model="sch_year" clearable multiple :multiple-limit=2 placeholder="请选择"  @change = "choose_fields()" >
                        <el-option v-for="item in school_year"
                                   :label="item.label"
                                   :key="item.value"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item><br>
                <el-form-item  style="padding-left: 1em" label="领域">
                    <el-select  v-model="cho_fields" clearable placeholder="请选择"  @change = "choose_sec_fields()" >
                        <el-option v-for="item in fields"
                                   :label="item.label"
                                   :key="item.value"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item><br>
                <el-form-item  style="padding-left: 1em" label="次领域">
                    <el-select v-model="cho_sec_fields" clearable placeholder="请选择"  @change = "choose_pro()" >
                        <el-option v-for="item in sec_fields"
                                   :label="item.label"
                                   :key="item.value"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item><br>
                <el-form-item  style="padding-left: 1em;padding-bottom: 1em" label="项目">
                    <el-select v-model="choose_project" clearable placeholder="请选择" @change = "getdata()">
                        <el-option v-for="item in projects"
                                   :label="item.label"
                                   :key="item.value"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <div v-if="show" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
                <columnarchart ref="tdata" />
            </div>
            <br />
            <br />
            <el-collapse v-if="!isOneTerm">
                <el-collapse-item v-for="(domain, index) in [{领域:'提示', 描述:'只有在只选中一个学期的情况下可以进行分析描述！'}]"
                                  :title="domain.领域"
                                  :name="domain.领域"
                                  :key="domain.领域"
                                  style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
                    {{domain.描述}}
                </el-collapse-item>
            </el-collapse>
            <el-collapse v-model="activeNames" v-if="isOneTerm">
                <el-collapse-item v-for="(domain, index) in LRTable" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
                                  :name="domain.领域"
                                  :key="domain.领域">
                    <template slot="title">
                        <div id="appraisal_title">
                            {{domain.领域}}<i class="header-icon el-icon-info"></i>
                        </div>
                    </template>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix" style="font-family: 楷体; font-size: medium">
                            <span>结果分析</span>
                        </div>
                        <vue-ckeditor type="classic"  v-model="domain.描述" :editors="editors1"
                                      :config='config' :readonly="disabled"></vue-ckeditor>
                    </el-card>
                </el-collapse-item>
            </el-collapse>

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
    import columnarchart from '../../../components/tools/echarts/columnar-chart'
    import VueCkeditor from 'vue-ckeditor5'
    import ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block'
    import '@ckeditor/ckeditor5-build-balloon-block/build/translations/zh-cn'

    export default {
        components: {
            columnarchart,
            'vue-ckeditor': VueCkeditor.component
        },
        data(){
            return{
                isEdit:'',
                show:false,
                isOneTerm:false,
                field1: [],
                field_value:'',
                field_label:'',
                second_field:[],
                se_field_value:'',
                se_field_label:'',
                project:[],
                project_value:'',
                project_label:'',
                radio_title:[],
                radioes:[],
                radioarray:[],
                evaDate:'',
                evaluation:{},
                termTarget:{},

                stu_id:'',
                stu_id_index:'',
                school_year:[],
                sch_year:[],
                school_year_term:[],
                fields:[],
                cho_fields:'',
                term_location:[],
                sec_fields:[],
                cho_sec_fields:'',
                choose_project:'',
                projects:[],
                tidata1:[],
                tdata:[],
                LRTable:[],

                edt: ClassicEditor,
                disabled:true,
                editors1: {
                    classic: ClassicEditor,
                },
                config:{
                    language:'zh-cn',
                    placeholder:'在此添加分析描述',
                    ckfinder: {
                        uploadUrl: '/api/stu/picture_CEE'
                    },
                },
                activeNames: []
            }
        },
        mounted(){
            window.onbeforeunload = () =>{
                this.releasePLFX();
                return 'tips';
            }
            this.stu_id = this.$store.state.stuinfo[0].student_id;
            this.isEdit = this.$route.query.isEdit;
            this.changedata();
            this.field1_traverse();
            this.evaDate = this.getDate();

        },
        destroyed() {
            this.releasePLFX();
        },

        methods:{
            releasePLFX()
            {
                if (this.isEdit == 1) {
                    var stuID = this.$store.state.stuinfo[0].student_id;
                    this.$http.post('/api/stu/PLFXFinish', {
                        StuID: stuID
                    }, {});
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
                for(var i=0; i<this.$store.state.course.length;i++)
                {
                    if(this.$store.state.course[i].show_type=='1' && this.$store.state.course[i].father=='1')
                    {
                        this.field1.push({label:this.$store.state.course[i].label,value:this.$store.state.course[i].id});
                    }
                }
            },

            second_traverse(){
                this.termTarget={};
                this.second_field=[];
                this.se_field_value='';
                for (var i = 0; i < this.$store.state.course.length; i++) {
                    if (this.$store.state.course[i].father == this.field_value) {
                        this.second_field.push({
                            label: this.$store.state.course[i].label,
                            value: this.$store.state.course[i].id
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
                for(var i =0 ;i<this.$store.state.course.length;i++)
                {
                    if(this.$store.state.course[i].father== this.se_field_value)
                    {
                        this.project.push({
                            label:this.$store.state.course[i].label,
                            value:this.$store.state.course[i].id});
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
            changedata(){
                for(var i = 0;i < this.$store.state.stuinfo.length;i++){
                    if(this.$store.state.stuinfo[i].student_id = this.stu_id){
                        this.stu_id_index = i;
                        break;
                    }
                }
                this.choose_sch_year();

            },
            choose_sch_year(){
                this.tidata1 = [];
                this.tdata=[];
                this.sch_year = [];
                this.school_year = [];
                this.fields = [];
                this.cho_fields='';
                this.sec_fields=[];
                this.cho_sec_fields = '';
                this.projects=[];
                this.choose_project = '';
                let  stu_info = JSON.parse(this.$store.state.stuinfo[this.stu_id_index].Courses);
                for(let i = 0;i < stu_info.length;i++){
                    this.school_year.push({label:stu_info[i].schoolYear+"--"+stu_info[i].term,value:stu_info[i].id});
                }
            },
            remove_repeat(filed_aver_score_r,t){
                let temp={};
                for(let i in filed_aver_score_r){
                    let key = filed_aver_score_r[i].filed1;
                    if(temp[key]){
                        temp[key].field1 = key;
                        if(t === 0){
                            temp[key].score1 = 0;
                            temp[key].num = 1;
                        }else{
                            temp[key].score1 = temp[key].score1 + filed_aver_score_r[i].score1;
                            temp[key].num = temp[key].num + filed_aver_score_r[i].num;
                        }
                    }else{
                        if(t === 0){
                            temp[key] = {};
                            temp[key].field1 = key;
                            temp[key].score1 = 0;
                            temp[key].num = 1;
                        }else
                        temp[key] = {};
                        temp[key].field1 = key;
                        temp[key].score1 = filed_aver_score_r[i].score1;
                        temp[key].num = filed_aver_score_r[i].num;
                    }
                }
                if(t==0){
                    let array = [];
                    for(let i in temp){
                        array.push(i);
                    }
                    return array;
                }
            },

            choose_fields(){
                if (this.sch_year.length == 0)
                    this.show = false;
                else
                    this.show = true;
                //只有当之选中一个学期的时候可以进行分析描述
                if (this.sch_year.length == 1 && this.$route.query.isEdit == 1) {
                    this.isOneTerm = true;
                    this.disabled = false;
                } else if (this.sch_year.length == 1 && this.$route.query.isEdit == 2){
                    this.isOneTerm = true;
                    this.disabled = true;
                } else {
                    this.isOneTerm = false;
                    this.disabled = true;
                }

                this.tidata1 = [];
                this.tdata=[];
                this.fields = [];
                this.cho_fields='';
                this.sec_fields=[];
                this.cho_sec_fields = '';
                this.projects=[];
                this.choose_project = '';
                this.term_location=[];
                let  stu_info = JSON.parse(this.$store.state.stuinfo[this.stu_id_index].Courses);
                let field_aver_score_r =[];
                let field_score_all=[];
                let fields_B = [];
                let echarts_name = [];
                for(let j = 0;j < this.sch_year.length;j++){
                    for(let i = 0;i < stu_info.length;i++){
                        if(stu_info[i].id == this.sch_year[j]){
                            echarts_name.push(stu_info[i].schoolYear+"--"+stu_info[i].term);
                            let evalu = stu_info[i].evaluation;
                            this.LRTable = [];
                            this.activeNames = [];
                            this.LRTable = stu_info[i].appraisal;
                            for (var n = 0; n < this.LRTable.length; n++)
                                this.activeNames.push(this.LRTable[n].领域);
                            // if( j == 0 ){
                            //     this.LRTable = [];
                           // let ss = stu_info[i].appraisal;
                           // for(let k in ser){
                           //     this.LRTable[]
                           // }
                           //  console.log(this.LRTable);
                            // }
                            this.term_location.push(i);
                            let filed_score = [];
                            for(let k = 0;k < evalu.length;k++){
                                let score_1 = evalu[k].长期目标;
                                if(score_1.length === 0){
                                    filed_score.push({filed1:evalu[k].领域,score1:0,num:1});
                                    field_score_all.push({filed1:evalu[k].领域,score1:0,num:1});
                                }else{
                                    let count = 0;
                                    let score = 0;
                                    for(let i in score_1){
                                        score += score_1[i].score;
                                        count++;
                                    }
                                    filed_score.push({filed1:evalu[k].领域,score1:score,num:count});
                                    field_score_all.push({filed1:evalu[k].领域,score1:0,num:1});
                                }
                                fields_B.push(evalu[k].领域);
                            }
                            field_aver_score_r.push({label:j,value:filed_score});
                        }
                    }
                }
                field_score_all = this.remove_repeat( field_score_all,0);
                let ss = [];
                for(let i = 0;i < field_aver_score_r.length;i++) {
                    let tmp = field_aver_score_r[i].value;
                    let s = [];
                    for (let j = 0; j < field_score_all.length; j++) {
                        let score = 0;
                        let num = 0;
                        for (let k = 0; k < tmp.length; k++) {
                            if (tmp[k].filed1 == field_score_all[j]) {
                                score += tmp[k].score1;
                                num += tmp[k].num;
                            }
                        }
                        if (num !== 0) {
                            s.push({filed1: field_score_all[j], score1: score, num: num})
                        } else {
                            s.push({filed1: field_score_all[j], score1: 0, num: 1})
                        }
                    }
                    ss.push(s);
                }
                let title = field_score_all;
                let score_field_all =[];
                let e_titile=''
                if(echarts_name.length > 1){
                    e_titile = "学年/学期对比图"
                }else{
                    e_titile = echarts_name[0];
                }
                for(let i = 0;i < ss.length;i++){
                    let temp = ss[i];
                    let score_field = [];
                    for(let k in temp){
                        score_field.push((temp[k].score1/temp[k].num).toFixed(2));
                    }

                    score_field_all.push({
                            barGap: 0,
                            name: echarts_name[i],
                            type: 'bar',
                            barWidth: 16,
                            data: score_field,
                        });
                }
                this.tidata1.push(score_field_all);
                this.tidata1.push(title);
                this.tidata1.push(e_titile);
                this.$nextTick(function () {
                    this.$refs.tdata.drawLine(this.tidata1);
                });
                var fields_A = fields_B.filter(function(ele,index,self){
                    return self.indexOf(ele) == index;
                });
                for(let i = 0; i < fields_A.length;i++){
                    this.fields.push({label:fields_A[i],value:i});
                }
            },
            choose_sec_fields(){
                //当清空领域选项时，显示年度图表
                if(this.cho_fields==null||$.trim(this.cho_fields)==""){
                    this.fields = [];
                    this.choose_fields();
                    return;
                }
                this.tidata1 = [];
                this.tdata=[];
                this.sec_fields=[];
                this.cho_sec_fields = '';
                this.projects=[];
                this.choose_project = '';
                let ch_fields = this.fields[this.cho_fields].label;
                let  stu_info = JSON.parse(this.$store.state.stuinfo[this.stu_id_index].Courses);
                let sec_fields_B = [];
                let sec_filed_aver_score = [];
                let sec_field_score_all = [];
                let echarts_name = [];
                for(let i = 0;i < this.term_location.length;i++){
                    let evalu = stu_info[this.term_location[i]].evaluation;
                    echarts_name.push(stu_info[this.term_location[i]].schoolYear+"--"+stu_info[this.term_location[i]].term);
                    let sec_filed_aver_score_r =[];
                    for(let i = 0;i < evalu.length;i++){
                        if(evalu[i].领域 == ch_fields){
                            let score_1 = evalu[i].长期目标;
                            if(score_1.length === 0){
                                sec_filed_aver_score_r.push({filed1:evalu[i].次领域,score1:0,num:1});
                                sec_field_score_all.push({filed1:evalu[i].次领域,score1:0,num:1});
                            }else {
                                let count = 0;
                                let score = 0;
                                for (let i in score_1) {
                                    score += score_1[i].score;
                                    count++;
                                }
                                sec_filed_aver_score_r.push({filed1: evalu[i].次领域, score1: score, num: count});
                                sec_field_score_all.push({filed1: evalu[i].次领域, score1: score, num: count});
                            }
                            sec_fields_B.push(evalu[i].次领域);
                        }
                    }
                    sec_filed_aver_score.push({label:i,value:sec_filed_aver_score_r});
                }
                sec_field_score_all = this.remove_repeat(sec_field_score_all,0);
                let ss = [];
                for(let i = 0;i < sec_filed_aver_score.length;i++) {
                    let tmp = sec_filed_aver_score[i].value;
                    let s = [];
                    for (let j = 0; j <  sec_field_score_all.length; j++) {
                        let score = 0;
                        let num = 0;
                        for (let k = 0; k < tmp.length; k++) {
                            if (tmp[k].filed1 ==  sec_field_score_all[j]) {
                                score += tmp[k].score1;
                                num += tmp[k].num;
                            }
                        }
                        if (num !== 0) {
                            s.push({filed1:sec_field_score_all[j], score1: score, num: num})
                        } else {
                            s.push({filed1:sec_field_score_all[j], score1: 0, num: 1})
                        }
                    }
                    ss.push(s);
                }
                let score_field_all =[];
                for(let i = 0;i < ss.length;i++){
                    let temp = ss[i];
                    let score_field = [];
                    for(let k in temp){
                        score_field.push((temp[k].score1/temp[k].num).toFixed(2));
                    }
                    score_field_all.push({
                        barGap: 0,
                        name: echarts_name[i],
                        type: 'bar',
                        barWidth: 16,
                        data: score_field,
                    });
                }
                let title =  sec_field_score_all;
                this.tidata1.push(score_field_all);
                this.tidata1.push(title);
                this.tidata1.push(ch_fields);
                this.$nextTick(function () {
                    this.$refs.tdata.drawLine(this.tidata1);
                });
                var sec_fields_A = sec_fields_B.filter(function(ele,index,self){
                    return self.indexOf(ele) == index;
                });
                for(let i = 0; i < sec_fields_A.length;i++){
                    this.sec_fields.push({label:sec_fields_A[i],value:i});
                }
            },
            choose_pro(){
                //当清空次领域选项时，显示领域图表
                if(this.cho_sec_fields==null||$.trim(this.cho_sec_fields)==""){
                    this.sec_fields = [];
                    this.choose_sec_fields();
                    return;
                }
                this.tidata1 = [];
                this.tdata=[];
                this.projects=[];
                this.choose_project = '';
                let ch_pro = this.sec_fields[this.cho_sec_fields].label;
                let  stu_info = JSON.parse(this.$store.state.stuinfo[this.stu_id_index].Courses);
                let pro_filed_aver_score = [];
                let pro_field_score_all = [];
                let echarts_name = [];
                for(let i = 0;i < this.term_location.length;i++){
                    let evalu = stu_info[this.term_location[i]].evaluation;
                    echarts_name.push(stu_info[this.term_location[i]].schoolYear+"--"+stu_info[this.term_location[i]].term);
                    let pro_filed_aver_score_r =[];
                    let count=0;
                    for(let i = 0;i < evalu.length;i++){
                        if(evalu[i].次领域 == ch_pro){
                            let score_1 = evalu[i].长期目标;
                            if(score_1.length === 0){
                                pro_filed_aver_score_r.push({filed1:evalu[i].项目,score1:0,num:1});
                                pro_field_score_all.push({filed1:evalu[i].项目,score1:0,num:1});
                            }else {
                                let count1 = 0;
                                let score = 0;
                                for (let i in score_1) {
                                    score += score_1[i].score;
                                    count1++;
                                }
                                pro_filed_aver_score_r.push({filed1: evalu[i].项目, score1: score, num: count1});
                                pro_field_score_all.push({filed1: evalu[i].项目, score1: score, num: count1});
                            }
                            this.projects.push({label:evalu[i].项目,value:count});
                            count++;
                        }
                    }
                    pro_filed_aver_score.push({label:i,value:pro_filed_aver_score_r});
                }
                pro_field_score_all = this.remove_repeat(pro_field_score_all,0);
                let ss = [];
                for(let i = 0;i < pro_filed_aver_score.length;i++) {
                    let tmp = pro_filed_aver_score[i].value;
                    let s = [];
                    for (let j = 0; j <  pro_field_score_all.length; j++) {
                        let score = 0;
                        let num = 0;
                        for (let k = 0; k < tmp.length; k++) {
                            if (tmp[k].filed1 ==  pro_field_score_all[j]) {
                                score += tmp[k].score1;
                                num += tmp[k].num;
                            }
                        }
                        if (num !== 0) {
                            s.push({filed1:pro_field_score_all[j], score1: score, num: num})
                        } else {
                            s.push({filed1:pro_field_score_all[j], score1: 0, num: 1})
                        }
                    }
                    ss.push(s);
                }
                let score_field_all =[];
                for(let i = 0;i < ss.length;i++){
                    let temp = ss[i];
                    let score_field = [];
                    for(let k in temp){
                        score_field.push((temp[k].score1/temp[k].num).toFixed(2));
                    }
                    score_field_all.push({
                        barGap: 0,
                        name: echarts_name[i],
                        type: 'bar',
                        barWidth: 16,
                        data: score_field,
                    });
                }
                let title =  pro_field_score_all;
                this.tidata1.push(score_field_all);
                this.tidata1.push(title);
                this.tidata1.push(ch_pro);
                this.$nextTick(function () {
                    this.$refs.tdata.drawLine(this.tidata1);
                });
            },
            getdata(){
                //当清空项目选项时显示次领域的图表
                if(this.choose_project==null||$.trim(this.choose_project)==""){
                    this.projects=[];
                    this.choose_pro();
                    return;
                }
                this.tidata1 = [];
                this.tdata=[];
                let ch_fie = this.fields[this.cho_fields].label;
                let sec_fie = this.sec_fields[this.cho_sec_fields].label;
                let pro = this.projects[this.choose_project].label;
                let  stu_info = JSON.parse(this.$store.state.stuinfo[this.stu_id_index].Courses);
                let fie_filed_aver_score = [];
                let fie_field_score_all = [];
                let echarts_name = [];
                for(let i = 0;i < this.term_location.length;i++) {
                    let evalu = stu_info[this.term_location[i]].evaluation;
                    echarts_name.push(stu_info[this.term_location[i]].schoolYear + "--" + stu_info[this.term_location[i]].term);
                    let fie_filed_aver_score_r =[];
                    for(let i = 0;i < evalu.length;i++){
                        if((evalu[i].领域 == ch_fie)&&(evalu[i].次领域 == sec_fie)&&(evalu[i].项目 == pro)){
                            let score_1 = evalu[i].长期目标;
                            if(score_1.length === 0){
                                // fie_filed_aver_score_r.push({filed1:evalu[i].领域,score1:0,num:1});
                                // fie_field_score_all.push({filed1:evalu[i].领域,score1:0,num:1});
                                continue;
                            }else {
                                // let count = 0;
                                // let score = 0;
                                for (let i in score_1) {
                                    fie_filed_aver_score_r.push({filed1: score_1[i].title, score1: score_1[i].score, num: 1});
                                    fie_field_score_all.push({filed1: score_1[i].title, score1: score_1[i].score, num: 1});
                                }
                            }
                        }
                    }
                    fie_filed_aver_score.push({label:i,value:fie_filed_aver_score_r});
                }
                fie_field_score_all = this.remove_repeat(fie_field_score_all,0);
                let ss = [];
                for(let i = 0;i < fie_filed_aver_score.length;i++) {
                    let tmp = fie_filed_aver_score[i].value;
                    let s = [];
                    for (let j = 0; j <  fie_field_score_all.length; j++) {
                        let score = 0;
                        let num = 0;
                        for (let k = 0; k < tmp.length; k++) {
                            if (tmp[k].filed1 ==  fie_field_score_all[j]) {
                                score += tmp[k].score1;
                                num += tmp[k].num;
                            }
                        }
                        if (num !== 0) {
                            s.push({filed1:fie_field_score_all[j], score1: score, num: num})
                        } else {
                            s.push({filed1:fie_field_score_all[j], score1: 0, num: 1})
                        }
                    }
                    ss.push(s);
                }
                let score_field_all =[];
                for(let i = 0;i < ss.length;i++){
                    let temp = ss[i];
                    let score_field = [];
                    for(let k in temp){
                        score_field.push((temp[k].score1/temp[k].num).toFixed(2));
                    }
                    score_field_all.push({
                        barGap: 0,
                        name: echarts_name[i],
                        type: 'bar',
                        barWidth: 16,
                        data: score_field,
                    });
                }
                let title =  fie_field_score_all;
                this.tidata1.push(score_field_all);
                this.tidata1.push(title);
                this.tidata1.push(ch_fie);
                this.$nextTick(function () {
                    this.$refs.tdata.drawLine(this.tidata1);
                });
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
                this.$router.replace({path:'/evaluationAnalysis', query:{currentPage: this.$route.query.currentPage}});
            },
            async eval_submit(){
                //console.log(this.LRTable)
                var Courses = JSON.parse(this.$store.state.stuinfo[this.stu_id_index].Courses);
                var year;
                var term;
                var status;

                //识别当前选择的学年和学期以定位分析描述LRTable（appraisal）在课程评量列表Courses中的位置
                for (var i = 0; i < this.school_year.length; i++)
                    if (this.school_year[i].value == this.sch_year){
                        year = this.school_year[i].label.split('--')[0];
                        term = this.school_year[i].label.split('--')[1];
                    }

                //将编辑好的LRTable赋给课程评量列表Courses中对应评量的appraisal
                for (var i = 0; i < Courses.length; i++)
                    if (Courses[i].schoolYear == year && Courses[i].term == term)
                        Courses[i].appraisal = this.LRTable;

                //将编辑好的评量分析上传至服务端数据库进行保存
                await this.$http.post('/api/stu/upStuCourse', {
                    Course:Courses,
                    stuID:this.stu_id
                }, {}).then((response) => {
                    status = response.status;
                });

                if (status == 200) {
                    this.$http.post('/api/stu/queryStuinfo',{
                        AStuID:this.stu_id
                    },{}).then((response) => {
                        this.$store.dispatch("setstuinfo", response.bodyText);
                        this.choose_fields();
                        this.$message({
                            message: year + '--' + term + '的评量分析描述保存成功！',
                            type: 'success'
                        });
                    });
                }
                else
                    this.$message.error("发生错误，错误码："+status);

            }

        }
    }
</script>

<style scoped>

    #appraisal_title{
        align-self: center;
        font-weight: bold;
        font-size: large;
        font-family: 楷体;
        color: #000000;
        letter-spacing: 3px;
    }
    #appraisal_title:hover{
        color: #1d8ce0;
    }

</style>
