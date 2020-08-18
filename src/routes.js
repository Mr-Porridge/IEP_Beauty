let routes = [
    {
        path: '/login',
        component:() => import('./views/Login.vue') ,
        name: '登录',
        authority: [1, 1, 1, 1, 1],
        hidden: true
    },
    {
        path: '/404',
        component:() => import('./views/404.vue') ,
        name: '404',
        authority: [1, 1, 1, 1, 1],
        hidden: true
    },

    {
        path: '/',
        component:() => import('./views/Home.vue') ,
        name: '首页',
        hidden:true,
        authority: [1, 1, 1, 1, 1],
        iconCls: 'fa fa-list-alt',
        children: [
            {
                path: '/HomePage',
                component:() => import('./views/HomePage.vue'),
                name: '首页',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-school',
            },
        ]
    },

    //{ path: '/main', component:() => import('.views/') Main },
    //原来的nav4
    {
        path: '/',
        component:() => import('./views/Home.vue') ,
        name: '系统管理',
        authority: [1, 1, 1, 1, 0],
        iconCls: 'fa fa-bar-chart',
        children: [
            {path: '/echarts', component:() => import('./views/charts/echarts.vue'), name: '图标', authority: [1, 1, 1, 1, 1], hidden: true},
            {
                path: '/schoolManagement',
                component:() => import('./views/nav4/schoolManagement.vue'),
                name: '学校管理',
                authority: [1, 1, 1, 1, 0],
                iconCls: 'el-icon-school',
            },
            {
                path: '/classManagement',
                component:() => import('./views/nav1/classManagement.vue'),
                authority: [1, 1, 1, 1, 1],
                name: '班级管理',
                iconCls: 'el-icon-s-home',
            },
            {
                path: '/userManagement',
                component:() => import('./views/nav4/userManagement.vue'),
                name: '用户管理',
                authority: [1, 1, 1, 1, 0],
                iconCls: 'el-icon-user',
            },
            {
                path: '/dataManagement',
                component:() => import('./views/nav4/dataManagement.vue'),
                name: '指标管理',
                authority: [1, 1, 1, 1, 0],
                iconCls: 'el-icon-notebook-1',
            },
            {
                path: '/subjectManagement',
                component:() => import('./views/nav4/subjectManagement.vue'),
                name: '课标管理',
                authority: [1, 1, 1, 1, 0],
                iconCls: 'el-icon-notebook-2',
            },
            {
                path: '/courseManagement',
                component:() => import('./views/nav4/courseManagement.vue'),
                name: '课程设置',
                authority: [1, 1, 1, 1, 0],
                iconCls: 'el-icon-collection',
            },

        ]
    },
    //原来的nav1
    {
        path: '/',
        component:() => import('./views/Home.vue') ,
        name: '评估管理',
        iconCls: 'fa fa-list-alt',//图标样式class
        authority: [1, 1, 1, 1, 1],
        children: [
            {path: '/main', component:() => import('./views/Main.vue') , name: '主页', authority: [1, 1, 1, 1, 1], hidden: true},
            // {path: '/data', component:() => import('.views/') data, name: '指标选择', authority: [1, 1, 1, 1, 1], iconCls: 'el-icon-edit'},
            /*{path: '/table', component:() => import('.views/') Table, name: '生态评量', authority: [1, 1, 1, 1, 1], hidden: true},*/
            // {path: '/page6', component:() => import('.views/') Page6, name: '指标选择test', authority: [1, 1, 1, 1, 1], hidden: true},
            // {path: '/studentManagement', component:() => import('.views/') studentManagement, authority: [1, 1, 1, 1, 1], name: '学生管理'},
            {
                path: '/research',
                component:() => import('./views/nav1/research.vue'),
                name: '评估量表',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-edit-outline'
            },
            {
                path: '/newContact',
                component:() => import('./views/nav1/ecoAssessment/newContact.vue'),
                name: '多元评估',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-document'
            },
            {path: '/checkNEdit', component:() => import('./views/nav1/ecoAssessment/CheckNEdit.vue'), name: '查询/编辑', authority: [1, 1, 1, 1, 1], hidden: true},
            {
                path: '/checkNEdit/devTarget',
                component:() => import('./views/nav1/ecoAssessment/developTarget.vue') ,
                name: '发展性指标',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/checkNEdit/funcTarget',
                component:() => import('./views/nav1/ecoAssessment/functionTarget.vue') ,
                name: '功能性指标',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/checkNEdit/growTarget',
                component:() => import('./views/nav1/ecoAssessment/growTarget.vue'),
                name: '成长性指标',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/checkNEdit/materprehis',
                component:() => import('./views/nav1/ecoAssessment/MaterPreHis'),
                name: '母亲孕史情况',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/checkNEdit/stuInterest',
                component:() => import('./views/nav1/ecoAssessment/StuInterest'),
                name: '学生兴趣爱好',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/checkNEdit/healthstatus',
                component:() => import('./views/nav1/ecoAssessment/HealthStatus'),
                name: '学生健康情况',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/checkNEdit/capacitystatus_1',
                component:() => import('./views/nav1/ecoAssessment/CapacityStatus_1'),
                name: '学生能力现状_1',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/checkNEdit/capacitystatus_2',
                component:() => import('./views/nav1/ecoAssessment/CapacityStatus_2'),
                name: '学生能力现状_2',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {path: '/createAssess', component:() => import('./views/nav1/ecoAssessment/Create.vue'), name: '创建学生', authority: [1, 1, 1, 1, 1], hidden: true},

            {
                path: '/analysis',
                component:() => import('./views/nav1/analysis.vue'),
                name: '评估报告',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-receiving'
            },
        ]
    },
    //原来的nav2
    {
        path: '/',
        component:() => import('./views/Home.vue') ,
        name: '课程管理',
        iconCls: 'fa fa-list-alt',
        authority: [1, 1, 1, 1, 1],
        children: [
            {
                path: '/courseEdit',
                component:() => import('./views/nav2/courses/courseEdit.vue'),
                name: '课程设置',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/courseEvaluation',
                component:() => import('./views/nav2/courses/courseEvaluation.vue'),
                name: '课程评量',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-s-claim',
            },
            {
                path: '/stuEvalList',
                component:() => import('./views/nav2/courses/stuEvalList.vue'),
                name: '学生课程评量',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/analysisEdit',
                component:() => import('./views/nav2/courses/analysisEdit.vue'),
                name: '分析编辑',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/evaluationAnalysis',
                component:() => import('./views/nav2/courses/evaluationAnalysis.vue'),
                name: '评量分析',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-s-marketing',
            },
            {
                path: '/evalAnaList',
                component: evalAnaList,
                name: '学生评量分析',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/schoolTables',
                component:() => import('./views/nav2/schoolTables/schoolTables.vue'),
                name: '课程选择',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-date',
            },
            {
                path: '/showSchoolTables',
                component:() => import('./views/nav2/schoolTables/showSchoolTables.vue'),
                name: '展示课程表',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/createSchoolTables',
                component:() => import('./views/nav2/schoolTables/createSchoolTables.vue'),
                name: '创建课程表',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/editSchoolTables',
                component:() => import('./views/nav2/schoolTables/editSchoolTables.vue'),
                name: '修改课程表',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path:'/periodicAnalysis',
                component:() => import('./views/nav2/periodic_assess/assess_analysis'),
                name:'定期评估分析',
                authority:[1, 1, 1, 1, 1],
                iconCls: 'el-icon-s-flag',
            },
            {
                path:'/assessEdit',
                component:() => import('./views/nav2/periodic_assess/assess_edit'),
                name:'定期评估编辑',
                authority:[1, 1, 1, 1, 1],
                hidden:true
            },


        ]
    },
    //新增的IEP一级标题 文件在nav2中
    {
        path: '/',
        component:() => import('./views/Home.vue') ,
        name: 'IEP管理',
        authority: [1, 1, 1, 1, 0],
        iconCls: 'fa fa-list-alt',
        children: [
            {
                path: '/iepMeeting',
                component:() => import('./views/nav2/IEP/iep_meeting.vue'),
                name: 'IEP会议',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-s-flag',

            },
            {
                path: '/iepMeetingEdit',
                component:() => import('./views/nav2/IEP/iepmeeting_edit.vue'),
                name: 'IEP编辑',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/iepMeetingCreate',
                component:() => import('./views/nav2/IEP/iepmeeting_create.vue'),
                name: 'IEP新建',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },


        ]
    },
    //原来的nav3
    {
        path: '/',
        component:() => import('./views/Home.vue') ,
        name: '教学实施',
        iconCls: 'fa fa-list-alt',
        // leaf: true,//只有一个节点
        authority: [1, 1, 1, 1, 1],
        children: [
            /*{
                path: '/page4', component:() => import('.views/') Page4, name: '页面4',
                goon: true,
                authority: [1, 1, 1, 1, 1],
                hidden: true,
                children: [
                    //{path: '/form', component:() => import('.views/') Form, name: 'Form'},
                    //{path: '/user', component:() => import('.views/') user, name: '列表'},
                ],
            },*/
            {
                path: '/groupSubject',
                component:() => import('./views/nav3/groupSubject.vue'),
                name: '集体学科计划',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-data-line'
            },
            {
                path: '/groupSubjectEdit',
                component:() => import('./views/nav3/groupSubjectEdit.vue'),
                name: '集体学科计划编辑',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },

            {
                path: '/indSubject',
                component:() => import('./views/nav3/individualSubject.vue'),
                name: '个训学科计划',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-data-line'
            },
            {
                path: '/indSubjectEdit',
                component:() => import('./views/nav3/individualSubjectEdit.vue'),
                name: '个训学科计划编辑',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },

            {
                path: '/teaTheme',
                component:() => import('./views/nav3/longShortGoal/teaTheme.vue'),
                name: '单元目标',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-data-analysis'
            },
            {path: '/teaThemeEdit', component:() => import('./views/nav3/longShortGoal/teaThemeEdit.vue'), name: '单元目标编辑', authority: [1, 1, 1, 1, 1], hidden: true},

            //{path:'/teachingPlan', name:'教学计划', goon:true, authority: [1, 1, 1, 1, 1], children: [],},

            {
                path: '/groupSubjectTea',
                component:() => import('./views/nav3/groupSubjectTea.vue'),
                name: '集体学科教学设计',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-collection-tag'
            },
            {
                path: '/groupSubjectTeaEdit',
                component:() => import('./views/nav3/groupSubjectEdit.vue'),
                name: '集体学科教学设计编辑',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },

            {
                path: '/indSubjectTea',
                component:() => import('./views/nav3/individualSubjectTea.vue'),
                name: '个训学科教学设计',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-collection-tag'
            },
            {
                path: '/indSubjectTeaEdit',
                component:() => import('./views/nav3/individualSubjectTeaEdit.vue'),
                name: '个训学科教学设计编辑',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },

            {
                path: '/learningReport',
                component:() => import('./views/nav3/learningReport.vue'),
                name: '学业评鉴报告',
                authority: [1, 1, 1, 1, 1],
                iconCls: 'el-icon-s-data'
            },
            {
                path: '/learningReportEdit',
                component:() => import('./views/nav3/learningReportEdit.vue'),
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
