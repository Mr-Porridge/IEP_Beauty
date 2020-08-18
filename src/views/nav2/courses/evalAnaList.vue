<template>
    <section>
        <el-divider></el-divider>
        <!--列表-->
        <div class="table">
            <div style="display: inline-block;margin-bottom: 1%">
                <el-button  type="danger" @click="back2list()" >返回列表</el-button>
                <el-button  type="danger" v-show="show3" @click="Tocompare()" >评量对比</el-button>
                <el-button  type="danger" v-show="show4" @click="cancel_com()" >取消对比</el-button>
            </div>
            <div v-show="show1" class="search-Box" style="display: inline-block;">
                <el-input  style="width: 320%"  placeholder="请输入需要查找的关键字" class="search"  v-model="search">
                    <template slot="prepend">模糊搜索</template>
                </el-input>
            </div>
            <div v-show="show1">
                <el-table v-loading="loading" :data="tables" ref="tablesection" @select="handlesection" align="left" stripe>
                    <!--      <el-table-column type="index" align="center"></el-table-column>-->
                    <!--      <el-table-column label="多选">-->
                    <!--        <template slot-scope="s">-->
                    <!--          <el-checkbox @change="getStuid(s.row.stuID)"></el-checkbox>-->
                    <!--        </template>-->
                    <!--      </el-table-column>-->
                    <el-table-column type="selection" label="选择" align="center"></el-table-column>
                    <el-table-column
                            :filters = this.schYear
                            prop="schoolYear"
                            label="学年"
                            sortable
                            column-key="schoolYear"
                            :filter-method = "filterHandler"
                    ></el-table-column>

                    <el-table-column
                            prop="term"
                            label="学期"
                            column-key="term"
                            :filters="[{text:'上学期',value:'上学期'},{text:'下学期',value:'下学期'}]"
                            :filter-method = "filterHandler"
                            sortable></el-table-column>
                    <el-table-column
                            prop="class"
                            label="班级"
                            column-key="class"
                            :filters=this.class_a
                            :filter-method="filterHandler"
                            sortable></el-table-column>
                    <el-table-column
                            prop="courseName"
                            label="课程名称"
                            column-key="courseName"
                            :filters=this.course_name
                            :filter-method="filterHandler"></el-table-column>
                    <el-table-column prop="stuName" label="学生"></el-table-column>
                    <el-table-column prop="stuID" label="学号" sortable></el-table-column>
                    <el-table-column prop="evaDate" label="评量日期" sortable></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-dropdown >
                                <el-button type="danger" icon="el-icon-s-tools">
                                    操 作<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu>
                                    <el-dropdown-item  @click.native="to_edit(scope.row.stuID,scope.row.schoolYear,scope.row.term,1)">编辑</el-dropdown-item>
                                    <el-dropdown-item  @click.native="to_edit(scope.row.stuID,scope.row.schoolYear,scope.row.term,2)">查看</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination-class">
                    <el-pagination
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            :current-page="this.currentPage1"
                            :page-size= "this.pageSize"
                            :total = "this.total"
                            layout="total, prev, pager, next, jumper">
                    </el-pagination>
                </div>
            </div>

        </div>
        <div v-show="show2">
            <el-form>
                <el-form-item  ref="school_year" label="年 度">
                    <el-select   v-model="sch_year" placeholder="请选择"  @change = "choose_fields()" >
                        <el-option v-for="item in school_year"
                                   :label="item.label"
                                   :key="item.value"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item><br>
                <el-form-item  ref="field1" label="领 域">
                    <el-select v-model="field_value" placeholder="请选择" @change="second_traverse()" >
                        <el-option v-for="item in field1"
                                   :label="item.label"
                                   :key="item.value"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item><br>
                <el-form-item label="次领域">
                    <el-select v-model="se_field_value" placeholder="请选择" @change="project_traverse()" >
                        <el-option v-for="item in second_field"
                                   :label="item.label"
                                   :key="item.value"
                                   :value="item.value" @click="this.change(item.value)">
                        </el-option>
                    </el-select>
                </el-form-item><br>
                <el-form-item  label="项 目">
                    <el-select  v-model="project_value"   placeholder="请选择" @change="get_data_draw()">
                        <el-option v-for="item in project"
                                   :label="item.label"
                                   :key="item.value"
                                   :value="item.value" @click="this.change(item.value)">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div>
                <columnarchart ref="tdata" />
            </div>
        </div>

    </section>
</template>


<script>
    import columnarchart from '@/components/tools/echarts/columnar-chart'
    export default {
        components: {
            columnarchart
        },
        data() {
            return {
                //filters1:[{text:'2016/2017',value:'2016/2017'},{text:'2018/2019',value:'2018/2019'}],
                checkPermission:localStorage.getItem('Permission')[6],
                editPermission:localStorage.getItem('Permission')[14],

                schYear:[],
                class_a:[],
                course_name:[],
                show1:true,
                show2:false,
                show3:true,
                show4:false,
                options: [
                    {
                        value: '选项1',
                        label: '2019-2020'
                    },
                    {
                        value: '选项2',
                        label: '2018-2019'
                    },
                ],
                value:'',
                tempList:[],
                total:0,
                pageSize:10,
                currentPage1:1,

                search:'',
                tablesection:[],
                dialogVisible:false,

                school_year:[],
                sch_year:'',
                field1: [],
                field_value:'',
                field_label:'',
                second_field:[],
                se_field_value:'',
                se_field_label:'',
                project:[],
                project_value:'',
                project_label:'',
                table_select_courses:[],
                table_slect_courses_y:[],
                tidata1:[],

                loading:true,
            }
        },
        computed:{
            tables:function(){
                var search=this.search;
                if(search.length > 0){
                    return  this.$store.state.stucourseslist.filter(function(dataNews){
                        return Object.keys(dataNews).some(function(key){
                            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                    return this.$store.state.stucourseslist
                }
                else {
                    return  this.tempList.filter(function(dataNews){
                        return Object.keys(dataNews).some(function(key){
                            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                    return this.tempList
                }
            }
        },

        async mounted(){
            this.updateCourse()
        },
        methods:{

            filterHandler(value,row,column){
                const property = column['property'];
                return row[property] === value;
            },

            getStuid(stuID){
                console.log(stuID);
            },


            handlesection(val){
                this.tablesection = val;
            },
            cancel_com(){
                this.show1 = true;
                this.show2 = false;
                this.show3 = true;
                this.show4 = false;
                this.table_select_courses = [];
                this.table_slect_courses_y = [];
                this.school_year=[];
                this.sch_year='';
                this.field1 = [];
                this.field_value = '';
                this.field_label = '';
                this.second_field = [];
                this.se_field_value = '';
                this.se_field_label = '';
                this.project = [];
                this.project_value = '';
                this.project_label = '';
                this.tidata1= [];
                this.$nextTick(function () {
                    this.$refs.tdata.drawLine(this.tidata1);
                });
            },
            async Tocompare() {
                this.show1 = false;
                this.show2 = true;
                this.show3 = false;
                this.show4 = true;
                var shuzu = [];
                this.table_select_courses = [];
                for (let i = 0; i < this.tablesection.length; i++) {
                    shuzu.push(this.tablesection[i].stuID);
                }
                let school_year_repeat_save = [];
                for (let i = 0; i < shuzu.length; i++) {
                    let school_year_repeat = [];
                    await this.$http.post('/api/stu/queryStuinfo', {
                        AStuID: shuzu[i]
                    }, {}).then((response) => {
                        this.$store.dispatch("setstuinfo", response.bodyText);
                    });
                    let stu_info = JSON.parse(this.$store.state.stuinfo[0].Courses);
                    this.table_select_courses.push(stu_info);
                    for (let k = 0; k < stu_info.length; k++) {
                        school_year_repeat.push(stu_info[k].schoolYear + "--" + stu_info[k].term);
                    }
                    if( i == 0){
                        school_year_repeat_save = school_year_repeat;
                    }else{
                        school_year_repeat =  school_year_repeat.concat(school_year_repeat_save);
                        school_year_repeat_save = school_year_repeat.filter(function (ele, index, self) {
                            return self.indexOf(ele) != index;
                        });
                    }
                }
                if(school_year_repeat_save.length == 0){
                    alert("所比较的学生没有学年和学期相同！");
                }else{
                    for (let i = 0; i < school_year_repeat_save.length; i++) {
                        this.school_year.push({label: school_year_repeat_save[i], value: i});
                    }
                }
            },
            remove_repeat(filed_aver_score_r){
                let temp={};
                for(let i in filed_aver_score_r) {
                    let key = filed_aver_score_r[i].filed1;
                    if (temp[key]) {
                        temp[key].field1 = key;
                        temp[key].score1 = 0;
                        temp[key].num = 1;
                    } else {
                        temp[key] = {};
                        temp[key].field1 = key;
                        temp[key].score1 = 0;
                        temp[key].num = 1;

                    }
                }
                let array = [];
                for(let i in temp){
                    array.push(i);
                }
                return array;
            },
          moveSpace(array){
                for(var i = 0 ;i<array.length;i++)
                 {
                     if(array[i] == "" || array[i] == null || typeof(array[i]) == "undefined")
                 {
                        array.splice(i,1);
                    i= i-1;

                 }
             }
             return array;
          },
    choose_fields(){
                this.tidata1 = [];
                this.field1 = [];
                this.field_value = '';
                this.second_field = [];
                this.se_field_value = '';
                this.project = [];
                this.project_value = '';
                this.table_slect_courses_y =[];
                let school_year_term = (this.school_year[this.sch_year].label).split("--");
                let ch_table_list = [];
                for(let i = 0;i < this.table_select_courses.length;i++) {
                    let stu_info = this.table_select_courses[i];
                    for (let j = 0; j < stu_info.length; j++) {
                        if ((stu_info[j].schoolYear === school_year_term[0]) && (stu_info[j].term === school_year_term[1])) {
                            ch_table_list.push(stu_info[j]);
                        }
                    }
                }
                this.table_slect_courses_y = ch_table_list;
                let field_score_all = [];
                let field_aver_score_r = [];
                let fields_B = [];
                let stu_name = [];
               for(let i = 0;i < ch_table_list.length;i++){
                    stu_name.push(ch_table_list[i].stuName);
                    let evalu = ch_table_list[i].evaluation;
                    let field_score = [];
                    for(let k = 0;k < evalu.length;k++){
                        let score_1 = evalu[k].长期目标;
                        if(score_1.length === 0){
                            field_score.push({filed1:evalu[k].领域,score1:0,num:1});
                            field_score_all.push({filed1:evalu[k].领域,score1:0,num:1});
                        }else{
                            let count = 0;
                            let score = 0;
                            for(let j in score_1){
                                score += score_1[j].score;
                                count++;
                            }
                            field_score.push({filed1:evalu[k].领域,score1:score,num:count});
                            field_score_all.push({filed1:evalu[k].领域,score1:score,num:count});
                        }
                        fields_B.push(evalu[k].领域);
                    }
                   field_aver_score_r.push({label:i,value:field_score});
               }
               field_score_all = this.remove_repeat(field_score_all);
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
                let e_title  = this.school_year[this.sch_year].label;
                for(let i = 0;i < ss.length;i++){
                    let temp = ss[i];
                    let score_field = [];
                    for(let k in temp){
                        score_field.push((temp[k].score1/temp[k].num).toFixed(2));
                    }

                    score_field_all.push({
                        barGap: 0,
                        name: stu_name[i],
                        type: 'bar',
                        barWidth: 16,
                        data: score_field,
                    });
                }
                this.tidata1.push(score_field_all);
                this.tidata1.push(title);
                this.tidata1.push(e_title);
                this.$nextTick(function () {
                    this.$refs.tdata.drawLine(this.tidata1);
                });
                fields_B = this.moveSpace(fields_B);
                if(fields_B.length >= 1){
                    let fields_A = fields_B.filter(function(ele,index,self){
                        return self.indexOf(ele) == index;
                    });
                    for(let i = 0; i < fields_A.length;i++){
                        this.field1.push({label:fields_A[i],value:i});
                    }
                }else{
                    alert("领域数据为空！");
                }
            },

            second_traverse(){
                this.tidata1 = [];
                this.second_field = [];
                this.se_field_value = '';
                this.project = [];
                this.project_value = '';
                let ch_fields = this.field1[this.field_value].label;
                let sec_fields_B = [];
                let sec_field_aver_score = [];
                let sec_field_score_all = [];
                let stu_name = [];
                let table_select_courses_y = this.table_slect_courses_y;
                for(let i = 0;i < table_select_courses_y.length;i++){
                    stu_name.push(table_select_courses_y[i].stuName);
                    let evalu = table_select_courses_y[i].evaluation;
                    let sec_field_score_r = [];
                    for(let k = 0;k < evalu.length;k++){
                        if(evalu[k].领域 == ch_fields){
                            let score_1 = evalu[k].长期目标;
                            if(score_1.length === 0){
                                sec_field_score_r.push({filed1:evalu[k].次领域,score1:0,num:1});
                                sec_field_score_all.push({filed1:evalu[k].次领域,score1:0,num:1});
                            }else{
                                let count = 0;
                                let score = 0;
                                for(let j in score_1){
                                    score += score_1[j].score;
                                    count++;
                                }
                                sec_field_score_r.push({filed1:evalu[k].次领域,score1:score,num:count});
                                sec_field_score_all.push({filed1:evalu[k].次领域,score1:score,num:count});
                            }
                            sec_fields_B.push(evalu[k].次领域);
                        }
                    }
                   sec_field_aver_score.push({label:i,value:sec_field_score_r});
                }
                sec_field_score_all = this.remove_repeat(sec_field_score_all,0);
                let ss = [];
                for(let i = 0;i < sec_field_aver_score.length;i++) {
                    let tmp = sec_field_aver_score[i].value;
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
                        name: stu_name[i],
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
                    this.second_field.push({label:sec_fields_A[i],value:i});
                }

            },
            project_traverse(){
                this.tidata1 = [];
                this.project = [];
                this.project_value = '';
                let ch_pro = this.second_field[this.se_field_value].label;
                let table_select_courses_y = this.table_slect_courses_y;
                let pro_field_aver_score = [];
                let pro_field_score_all = [];
                let stu_name=[];
                let ch_project = [];
                for(let i = 0;i < table_select_courses_y.length;i++){
                    let evalu = table_select_courses_y[i].evaluation;
                    stu_name.push(table_select_courses_y[i].stuName);
                    let pro_field_aver_score_r = [];
                    for(let i = 0;i < evalu.length;i++) {
                        if (evalu[i].次领域 == ch_pro) {
                            let score_1 = evalu[i].长期目标;
                            if (score_1.length === 0) {
                                pro_field_aver_score_r.push({filed1: evalu[i].项目, score1: 0, num: 1});
                                pro_field_score_all.push({filed1: evalu[i].项目, score1: 0, num: 1});
                            } else {
                                let count1 = 0;
                                let score = 0;
                                for (let i in score_1) {
                                    score += score_1[i].score;
                                    count1++;
                                }
                                pro_field_aver_score_r.push({filed1: evalu[i].项目, score1: score, num: count1});
                                pro_field_score_all.push({filed1: evalu[i].项目, score1: score, num: count1});
                            }
                            ch_project.push(evalu[i].项目);
                        }
                    }
                    pro_field_aver_score.push({label:i,value:pro_field_aver_score_r});
                }
                pro_field_score_all = this.remove_repeat(pro_field_score_all);
                // console.log(pro_field_score_all);
                let ss = [];
                for(let i = 0;i < pro_field_aver_score.length;i++) {
                    let tmp = pro_field_aver_score[i].value;
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
                        name: stu_name[i],
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
                let ch_project_A = ch_project.filter(function(ele,index,self){
                    return self.indexOf(ele) == index;
                });
                for(let i = 0; i < ch_project_A.length;i++){
                    this.project.push({label:ch_project_A[i],value:i});
                }


            },
            get_data_draw(){
                this.tidata1 = [];

                let ch_fie = this.field1[this.field_value].label;
                let sec_fie = this.second_field[this.se_field_value].label;
                let pro = this.project[this.project_value].label;
                let table_select_courses_y = this.table_slect_courses_y;
                let fie_field_aver_score = [];
                let fie_field_score_all = [];
                let stu_name = [];
                for(let i= 0 ;i < table_select_courses_y.length;i++){
                    let evalu = table_select_courses_y[i].evaluation;
                    stu_name.push(table_select_courses_y[i].stuName);
                    let fie_field_aver_score_r = [];
                    for(let j = 0;j < evalu.length;j++){
                        if((evalu[j].领域 == ch_fie)&&(evalu[j].次领域 == sec_fie)&&(evalu[j].项目 == pro)){
                            let score_1 = evalu[j].长期目标;
                            if(score_1.length === 0){
                                continue;
                            }else{
                                for(let i in score_1){
                                    fie_field_aver_score_r.push({filed1: score_1[i].title, score1: score_1[i].score, num: 1});
                                    fie_field_score_all.push({filed1: score_1[i].title, score1: score_1[i].score, num: 1});
                                }
                            }
                        }
                    }
                    fie_field_aver_score.push({label:i,value:fie_field_aver_score_r});
                }
                fie_field_score_all = this.remove_repeat(fie_field_score_all,0);
                let ss = [];
                for(let i = 0;i < fie_field_aver_score.length;i++) {
                    let tmp = fie_field_aver_score[i].value;
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
                        name: stu_name[i],
                        type: 'bar',
                        barWidth: 16,
                        data: score_field,
                    });
                }
                let title =  fie_field_score_all;
                this.tidata1.push(score_field_all);
                this.tidata1.push(title);
                this.tidata1.push(pro);
                this.$nextTick(function () {
                    this.$refs.tdata.drawLine(this.tidata1);
                });
                // var check = 0;
                // var score_all = [];
                // for(let ij = 0;ij < this.table_select_courses.length;ij++) {
                //     let stu_info = this.table_select_courses[ij];
                //     console.log(stu_info);
                //     for (var i = 0; i < stu_info.length; i++) {
                //         if ((stu_info[i].schoolYear === school_year_term[0]) && (stu_info[i].term === school_year_term[1])) {
                //             let evalu = stu_info[i].evaluation;
                //             let stu_n = stu_info[i].stuName;
                //             console.log(evalu);
                //             console.log(stu_n);
                //             console.log(evalu.length);
                //             for (let j = 0; j < evalu.length; j++) {
                //                 console.log(j);
                //                 if ((evalu[j].领域 === first_field) && (evalu[j].次领域 === second_field) && (evalu[j].项目 === third_project)) {
                //                     var information = evalu[j].长期目标;
                //                     var title = [];
                //                     var score = [];
                //                     for (let k in information) {
                //                         title.push(information[k].title);
                //                         score.push(information[k].score);
                //                     }
                //                     score_all.push({
                //                         barGap: 0,
                //                         name: stu_n,
                //                         type: 'bar',
                //                         barWidth: 16,
                //                         data: score,
                //                     });
                //                 }
                //             }
                //         }
                //     }
                // }
                // this.tidata1.push(score_all);
                // this.tidata1.push(title);
                // this.tidata1.push(third_project);
                // this.$nextTick(function () {
                //     this.$refs.tdata.drawLine(this.tidata1);
                // });
            },

            //跳转至课程评量界面
            async to_edit(stuID,schoolYear,term,isEdit){
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
                    await this.$http.post('/api/stu/checkPLFX',{
                        StuID:stuID
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

                this.$http.post('/api/stu/queryStuinfo',{
                    AStuID:stuID
                },{}).then((response) => {
                    this.$store.dispatch("setstuinfo", response.bodyText);
                    this.$router.push({path:'/analysisEdit',query:{isEdit: isEdit, schoolYear:schoolYear, term:term, currentPage: this.currentPage1}})
                });
            },

            back2list(){
                this.$router.push({path:'/evaluationAnalysis',query:{currentPage: this.currentPage1}});
            },
            //更新课程信息
            async updateCourse(){


                await this.$http.post('/api/stu/queCourse', {
                }, {}).then((response) => {
                    this.$store.dispatch("setcourse", response.bodyText);
                    // console.log(this.$store.state.course);
                });

                await this.$http.post('/api/stu/queStuCourse', {
                    stuID:this.$route.query.stuID
                }, {}).then((response) => {
                    this.$store.dispatch("setstucourses", null);
                    this.$store.dispatch("setstucourseslist", null);
                    let schoolYear_array=[];
                    let class_array=[];
                    let courseName_array=[];
                    for (var i = 0; i < JSON.parse(response.bodyText).length; i++) {
                        if (JSON.parse(response.bodyText)[i].Courses!=null) {
                            for (var j = 0; j < JSON.parse(JSON.parse(response.bodyText)[i].Courses).length; j++) {
                                var t = [];
                                this.$store.dispatch("addstucourses", JSON.parse(JSON.parse(response.bodyText)[i].Courses)[j]);
                                t.schoolYear = JSON.parse(JSON.parse(response.bodyText)[i].Courses)[j].schoolYear;
                                schoolYear_array.push(t.schoolYear);
                                t.term = JSON.parse(JSON.parse(response.bodyText)[i].Courses)[j].term;
                                t.class = JSON.parse(JSON.parse(response.bodyText)[i].Courses)[j].class;
                                class_array.push(t.class);
                                t.courseName = JSON.parse(JSON.parse(response.bodyText)[i].Courses)[j].courseName;
                                courseName_array.push(t.courseName);
                                t.stuName = JSON.parse(JSON.parse(response.bodyText)[i].Courses)[j].stuName;
                                t.evaDate = JSON.parse(JSON.parse(response.bodyText)[i].Courses)[j].evaDate;
                                t.stuID = JSON.parse(JSON.parse(response.bodyText)[i].Courses)[j].stuID;
                                this.$store.dispatch("addstucourseslist", t);
                            }
                        }
                    }
                    this.$store.state.stucourseslist.reverse(); //倒置列表，使最新添加的信息显示在在前面

                    let schoolYear_a = schoolYear_array.filter(function (ele,index,self) {
                        return self.indexOf(ele) === index;
                    });
                    let class_a = class_array.filter(function (ele,index,self) {
                        return self.indexOf(ele) === index;
                    });
                    let courseName_a = courseName_array.filter(function (ele,index,self) {
                        return self.indexOf(ele) === index;
                    });
                    for(let i = 0;i < schoolYear_a.length;i++){
                        this.schYear.push({text:schoolYear_a[i],value:schoolYear_a[i]});
                    }
                    for(let i = 0;i < class_a.length;i++){
                        this.class_a.push({text:class_a[i],value:class_a[i]});
                    }
                    for(let i = 0;i < courseName_a.length;i++){
                        this.course_name.push({text:courseName_a[i],value:courseName_a[i]});
                    }
                    this.total = this.$store.state.stucourseslist.length;
                    if(this.$route.query.currentPage != undefined)
                        this.currentPage1 = parseInt(this.$route.query.currentPage);
                    this.currentChangePage(this.currentPage1);
                });

                this.loading = false;
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
                console.log(this.$store.state.stucourseslist)
                var from = (currentPage - 1) * this.pageSize;
                var to = currentPage * this.pageSize;
                this.tempList = [];
                for (var i = from; i < to; i++) {
                    if (this.$store.state.stucourseslist[i]) {
                        this.tempList.push(this.$store.state.stucourseslist[i]);
                    }
                }
            },
        }
    }


</script>

<style scoped>
    .pagination-class{
        margin-top: 1%;
    }

</style>
