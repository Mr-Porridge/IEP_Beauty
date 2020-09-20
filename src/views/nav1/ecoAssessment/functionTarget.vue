<template>
  <section id="t3">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/newContact', query:{currentPage:this.$route.query.currentPage} }">生态评量
      </el-breadcrumb-item>
      <el-breadcrumb-item
          :to="{path:'/checkNEdit', query:{isEdit:this.$route.query.isEdit,currentPage:this.$route.query.currentPage},}">
        学生信息
      </el-breadcrumb-item>
      <el-breadcrumb-item
          :to="{path:'/checkNEdit/devTarget', query:{isEdit:this.$route.query.isEdit,currentPage:this.$route.query.currentPage},}">
        家长自评
      </el-breadcrumb-item>
      <el-breadcrumb-item>专项评估</el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.$store.state.stuinfo[0].FuBiao.split('(^o~)')[0] == 'true' " :to="{path:'/checkNEdit/materprehis'}">母亲孕史</el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.$store.state.stuinfo[0].FuBiao.split('(^o~)')[1] == 'true' " :to="{path:'/checkNEdit/stuInterest'}">兴趣爱好</el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.$store.state.stuinfo[0].FuBiao.split('(^o~)')[2] == 'true' " :to="{path:'/checkNEdit/healthstatus'}">健康状况</el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.$store.state.stuinfo[0].FuBiao.split('(^o~)')[3] == 'true' " :to="{path:'/checkNEdit/capacitystatus_1'}">能力现状-1</el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.$store.state.stuinfo[0].FuBiao.split('(^o~)')[4] == 'true' " :to="{path:'/checkNEdit/capacitystatus_2'}">能力现状-2</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider content-position="center"></el-divider>

    <!--发展性评估-->
<!--    <h2>发展性评估</h2>-->

    <div class="buttons">
      <el-checkbox-group v-model="checked" @change="handleChecked">
        <el-checkbox v-for="item in tables" :label="item" :key="item" border>{{item}}</el-checkbox>
      </el-checkbox-group>
    </div>

    <div class="buttons">
      <el-button type="primary" @click="beginAssess">开始评估</el-button>
    </div>

  </section>

</template>

<script>
    import VueCkeditor from 'vue-ckeditor5'
    import ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block'
    import '@ckeditor/ckeditor5-build-balloon-block/build/translations/zh-cn'
    import RadarChart from '../../../components/tools/echarts/radar-chart'

    export default {
        components: {},
        name: "function_target",
        data() {
            return {
                checked: [],
                tables: ["母亲孕史", "兴趣爱好", "健康状况", "能力现状-1", "能力现状-2"],
            };
        },
        mounted() {
          this.checked = this.getFuBiao();
          console.log(this.checked)
        },
        methods: {
            handleChecked() {
                // console.log(this.checked);
            },

            getFuBiao(){
              var c = [];
              if(this.$store.state.stuinfo[0].FuBiao != null) {
                var FuBiao = this.$store.state.stuinfo[0].FuBiao.split('(^o~)');
                var index = 0;
                for (var i = 0; i < FuBiao.length; i++)
                  if(FuBiao[i] == "true")
                    c[index++] = parseInt(i+1);
              }
              return c;
            },

            async beginAssess() {
                console.log(this.checked);
                var FuBiao = [];
                for(var i = 0; i < 5; i++)
                  FuBiao[i] = false;
                for (var i = 0; i < this.checked.length; i++)
                  FuBiao[this.checked[i]-1] = true;

                await this.$http.post('/api/stu/setStuFuBiao', {
                  FuBiao:FuBiao.join('(^o~)'),
                  stuID:this.$store.state.stuinfo[0].student_id
                });
                await this.$http.post('/api/stu/queryStuinfo',{
                  AStuID:this.$store.state.stuinfo[0].student_id
                },{}).then((response) => {
                  this.$store.dispatch("setstuinfo", response.bodyText);
                });
            },

        }
    }
</script>

<style scoped>
  .buttons {
    margin-top: 1%;
    text-align: center;
  }
</style>
