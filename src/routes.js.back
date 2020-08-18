import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
//import Table from './views/nav1/Table.vue'
//import Form from './views/nav2/Form.vue'
//import user from './views/nav2/user.vue'
//import Page4 from './views/nav3/Page4.vue' // for vuex test
import Page6 from './views/nav1/test/Page6.vue'
import echarts from './views/charts/echarts.vue'
//二次开发
import data from './views/nav1/data.vue'
import studentManagement from './views/nav1/studentManagement.vue'
import classManagement from './views/nav1/classManagement.vue'
import schoolTables from './views/nav2/schoolTables/schoolTables.vue'
import showSchoolTables from './views/nav2/schoolTables/showSchoolTables.vue'
import createSchoolTables from './views/nav2/schoolTables/createSchoolTables.vue'
import editSchoolTables from './views/nav2/schoolTables/editSchoolTables.vue'
import courseEdit from './views/nav2/courses/courseEdit.vue'
import schoolManagement from './views/nav4/schoolManagement.vue'
import userManagement from './views/nav4/userManagement.vue'
import dataManagement from './views/nav4/dataManagement.vue'
import courseManagement from './views/nav4/courseManagement.vue'
import subjectManagement from './views/nav4/subjectManagement.vue'
import courseEvaluation from './views/nav2/courses/courseEvaluation.vue'
import stuEvalList from './views/nav2/courses/stuEvalList.vue'
import evaluationAnalysis from './views/nav2/courses/evaluationAnalysis.vue'
import analysisEdit from './views/nav2/courses/analysisEdit.vue'
import iepMeeting from './views/nav2/IEP/iep_meeting.vue'
import iepMeetingEdit from './views/nav2/IEP/iepmeeting_edit.vue'
import iepMeetingCreate from './views/nav2/IEP/iepmeeting_create.vue'
import assess_analysis from "./views/nav2/periodic_assess/assess_analysis";
import assess_edit from "./views/nav2/periodic_assess/assess_edit";
import newContact from './views/nav1/ecoAssessment/newContact.vue'
import devTarget from './views/nav1/ecoAssessment/developTarget.vue'
import funcTarget from './views/nav1/ecoAssessment/functionTarget.vue'
import growTarget from './views/nav1/ecoAssessment/growTarget.vue'
import createAssess from './views/nav1/ecoAssessment/Create.vue'
import CheckNEdit from './views/nav1/ecoAssessment/CheckNEdit.vue';
import MaterPreHis from "./views/nav1/ecoAssessment/MaterPreHis";
import StuInterest from "./views/nav1/ecoAssessment/StuInterest";
import HealthStatus from "./views/nav1/ecoAssessment/HealthStatus";
import CapacityStatus_1 from "./views/nav1/ecoAssessment/CapacityStatus_1";
import CapacityStatus_2 from "./views/nav1/ecoAssessment/CapacityStatus_2";
import teaTheme from './views/nav3/longShortGoal/teaTheme.vue'
import teaThemeEdit from './views/nav3/longShortGoal/teaThemeEdit.vue'
import indSubjectTea from './views/nav3/individualSubjectTea.vue'
import indSubjectTeaEdit from './views/nav3/individualSubjectTeaEdit.vue'
import indSubject from './views/nav3/individualSubject.vue'
import indSubjectEdit from './views/nav3/individualSubjectEdit.vue'
import groupSubject from './views/nav3/groupSubject.vue'
import groupSubjectEdit from './views/nav3/groupSubjectEdit.vue'
import groupSubjectTea from './views/nav3/groupSubjectTea.vue'
import groupSubjectTeaEdit from './views/nav3/groupSubjectTeaEdit.vue'
import learningReport from './views/nav3/learningReport.vue'
import learningReportEdit from './views/nav3/learningReportEdit.vue'
import research from './views/nav1/research.vue'
import analysis from './views/nav1/analysis.vue'


let routes = [
    {
        path: '/login',
        component: Login,
        name: '登录',
        authority: [1, 1, 1, 1, 1],
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '404',
        authority: [1, 1, 1, 1, 1],
        hidden: true
    },
    //{ path: '/main', component: Main },
    //原来的nav4
    {
        path: '/',
        component: Home,
        name: '系统管理',
        authority: [1, 1, 1, 1, 0],
        iconCls: 'fa fa-bar-chart',
        children: [
            {path: '/echarts', component: echarts, name: '图标', authority: [1, 1, 1, 1, 1], hidden: true},
            {
                path: '/schoolManagement',
                component: schoolManagement,
                name: '学校管理',
                authority: [1, 1, 1, 1, 0],
                iconCls: 'el-icon-school',
            },
            {
                path: '/classManagement',
                component: classManagement,
                authority: [1, 1, 1, 1, 1],
                name: '班级管理',
                iconCls: 'el-icon-s-home',
            },
            {
                path: '/userManagement',
                component: userManagement,
                name: '用户管理',
                authority: [1, 1, 1, 1, 0],
                iconCls: 'el-icon-user',
            },
            {
                path: '/dataManagement',
                component: dataManagement,
                name: '指标管理',
                authority: [1, 1, 1, 1, 0],
                iconCls: 'el-icon-notebook-1',
            },
            {
                path: '/subjectManagement',
                component: subjectManagement,
                name: '课标管理',
                authority: [1, 1, 1, 1, 0],
                iconCls: 'el-icon-notebook-2',
            },
            {
                path: '/courseManagement',
                component: courseManagement,
                name: '课程设置',
                authority: [1, 1, 1, 1, 0],
                iconCls: 'el-icon-collection',
            },

        ]
    },
    //原来的nav1
    {
        path: '/',
        component: Home,
        name: '评估管理',
        iconCls: 'fa fa-list-alt',//图标样式class
        authority: [1, 1, 1, 1, 1],
        children: [
            {path: '/main', component: Main, name: '主页', authority: [1, 1, 1, 1, 1], hidden: true},
            // {path: '/data', component: data, name: '指标选择', authority: [1, 1, 1, 1, 1], iconCls: 'el-icon-edit'},
            /*{path: '/table', component: Table, name: '生态评量', authority: [1, 1, 1, 1, 1], hidden: true},*/
            // {path: '/page6', component: Page6, name: '指标选择test', authority: [1, 1, 1, 1, 1], hidden: true},
            // {path: '/studentManagement', component: studentManagement, authority: [1, 1, 1, 1, 1], name: '学生管理'},
            {
                path: '/research',
                component: research,
                name: '评估量表',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-edit-outline'
            },
            {
                path: '/newContact',
                component: newContact,
                name: '多元评估',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-document'
            },
            {path: '/checkNEdit', component: CheckNEdit, name: '查询/编辑', authority: [1, 1, 1, 1, 1], hidden: true},
            {
                path: '/checkNEdit/devTarget',
                component: devTarget,
                name: '发展性指标',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/checkNEdit/funcTarget',
                component: funcTarget,
                name: '功能性指标',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/checkNEdit/growTarget',
                component: growTarget,
                name: '成长性指标',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/checkNEdit/materprehis',
                component: MaterPreHis,
                name: '母亲孕史情况',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/checkNEdit/stuInterest',
                component: StuInterest,
                name: '学生兴趣爱好',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/checkNEdit/healthstatus',
                component: HealthStatus,
                name: '学生健康情况',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/checkNEdit/capacitystatus_1',
                component: CapacityStatus_1,
                name: '学生能力现状_1',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/checkNEdit/capacitystatus_2',
                component: CapacityStatus_2,
                name: '学生能力现状_2',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {path: '/createAssess', component: createAssess, name: '创建学生', authority: [1, 1, 1, 1, 1], hidden: true},

            {
                path: '/analysis',
                component: analysis,
                name: '评估报告',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-receiving'
            },
        ]
    },
    //原来的nav2
    {
        path: '/',
        component: Home,
        name: '课程管理',
        iconCls: 'fa fa-list-alt',
        authority: [1, 1, 1, 1, 1],
        children: [
            {
                path: '/courseEdit',
                component: courseEdit,
                name: '课程设置',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/courseEvaluation',
                component: courseEvaluation,
                name: '课程评量',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-s-claim',
            },
            {
                path: '/stuEvalList',
                component: stuEvalList,
                name: '学生课程评量',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/analysisEdit',
                component: analysisEdit,
                name: '分析编辑',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/evaluationAnalysis',
                component: evaluationAnalysis,
                name: '评量分析',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-s-marketing',
            },
            {
                path: '/schoolTables',
                component: schoolTables,
                name: '课程选择',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-date',
            },
            {
                path: '/showSchoolTables',
                component: showSchoolTables,
                name: '展示课程表',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/createSchoolTables',
                component: createSchoolTables,
                name: '创建课程表',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/editSchoolTables',
                component: editSchoolTables,
                name: '修改课程表',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path:'/periodicAnalysis',
                component:assess_analysis,
                name:'定期评估分析',
                authority:[1, 1, 1, 1, 1],
                iconCls: 'el-icon-s-flag',
            },
            {
                path:'/assessEdit',
                component:assess_edit,
                name:'定期评估编辑',
                authority:[1, 1, 1, 1, 1],
                hidden:true
            },


        ]
    },
    //新增的IEP一级标题 文件在nav2中
    {
        path: '/',
        component: Home,
        name: 'IEP管理',
        authority: [1, 1, 1, 1, 0],
        iconCls: 'fa fa-list-alt',
        children: [
            {
                path: '/iepMeeting',
                component: iepMeeting,
                name: 'IEP会议',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-s-flag',

            },
            {
                path: '/iepMeetingEdit',
                component: iepMeetingEdit,
                name: 'IEP编辑',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/iepMeetingCreate',
                component: iepMeetingCreate,
                name: 'IEP新建',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },


        ]
    },
    //原来的nav3
    {
        path: '/',
        component: Home,
        name: '教学实施',
        iconCls: 'fa fa-list-alt',
        // leaf: true,//只有一个节点
        authority: [1, 1, 1, 1, 1],
        children: [
            /*{
                path: '/page4', component: Page4, name: '页面4',
                goon: true,
                authority: [1, 1, 1, 1, 1],
                hidden: true,
                children: [
                    //{path: '/form', component: Form, name: 'Form'},
                    //{path: '/user', component: user, name: '列表'},
                ],
            },*/
            {
                path: '/groupSubject',
                component: groupSubject,
                name: '集体学科计划',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-data-line'
            },
            {
                path: '/groupSubjectEdit',
                component: groupSubjectEdit,
                name: '集体学科计划编辑',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },

            {
                path: '/indSubject',
                component: indSubject,
                name: '个训学科计划',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-data-line'
            },
            {
                path: '/indSubjectEdit',
                component: indSubjectEdit,
                name: '个训学科计划编辑',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },

            {
                path: '/teaTheme',
                component: teaTheme,
                name: '单元目标',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-data-analysis'
            },
            {path: '/teaThemeEdit', component: teaThemeEdit, name: '单元目标编辑', authority: [1, 1, 1, 1, 1], hidden: true},

            //{path:'/teachingPlan', name:'教学计划', goon:true, authority: [1, 1, 1, 1, 1], children: [],},

            {
                path: '/groupSubjectTea',
                component: groupSubjectTea,
                name: '集体学科教学设计',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-collection-tag'
            },
            {
                path: '/groupSubjectTeaEdit',
                component: groupSubjectTeaEdit,
                name: '集体学科教学设计编辑',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },

            {
                path: '/indSubjectTea',
                component: indSubjectTea,
                name: '个训学科教学设计',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-collection-tag'
            },
            {
                path: '/indSubjectTeaEdit',
                component: indSubjectTeaEdit,
                name: '个训学科教学设计编辑',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },

            {
                path: '/learningReport',
                component: learningReport,
                name: '学业评鉴报告',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-s-data'
            },
            {
                path: '/learningReportEdit',
                component: learningReportEdit,
                name: '学习报表编辑',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
        ]
    },

    {
        path: '*',
        authority: [1, 1, 1, 1, 1],
        hidden: true,
        redirect: {path: '/404'}
    }
];

export default routes;
