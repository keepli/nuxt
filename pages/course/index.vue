<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#" @click.prevent="selectAll(1)" :class="{active:oneIndex == -1}">全部</a>
                </li>
                <li v-for="(subject,index) in subjectParent" :key="subject.id">
                  <a :title="subject.title" href="#" @click.prevent="getSubjectChildById(subject.id,index)" :class="{active:oneIndex == index}">{{subject.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li v-for="(subject,index) in subjectChild" :key="subject.id">
                  <a :title="subject.title" href="#"  @click.prevent="selectSubjectChildId(subject.id,index)" :class="{active:twoIndex == index}">{{subject.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':conditionIndex == 1}">
                <a title="销量" href="javascript:void(0);" @click="searchBuyCount()">销量
                <span v-show="this.courseQuery.buyCountSort.toUpperCase()=='DESC'" >↓</span>
                <span v-show="this.courseQuery.buyCountSort.toUpperCase()=='ASC'" >↑</span>
                </a>
              </li>
              <li :class="{'current bg-orange':conditionIndex == 2}">
                <a title="最新" href="javascript:void(0);" @click="searchGmtCreate()">时间
                <span v-show="this.courseQuery.gmtCreateSort.toUpperCase()=='DESC'" >↓</span>
                <span v-show="this.courseQuery.gmtCreateSort.toUpperCase()=='ASC'" >↑</span>
                </a>
              </li>
              <li :class="{'current bg-orange':conditionIndex == 3}">
                <a title="价格" href="javascript:void(0);" @click="searchPrice()">价格&nbsp;
                  <span v-show="this.courseQuery.priceSort.toUpperCase()=='DESC'" >↓</span>
                <span v-show="this.courseQuery.priceSort.toUpperCase()=='ASC'" >↑</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="isShow">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="course in data.list" :key="course.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="course.cover" class="img-responsive" :alt="course.title">
                    <div class="cc-mask">
                      <a :href="'/course/'+course.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+course.id" :title="course.title" class="course-title fsize18 c-333">{{course.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA" v-if="course.price == 0">免费</i>
                      <i class="c-fff fsize12 f-fA" v-if="!course.price == 0">收费</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{course.viewCount}}人观看</i>
                      |
                      <i class="c-999 f-fA">{{course.buyCount}}购买</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
    <!-- 公共分页 开始 -->
    <div>
      <div class="paging">
        <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
        <a
          :class="{undisable: !data.hasPrevious}"
          href="#"
          title="首页"
          @click.prevent="gotoPage(1)">首</a>
        <a v-show="data.hasPrevious"
          :class="{undisable: !data.hasPrevious}"
          href="#"
          title="前一页"
          @click.prevent="gotoPage(data.current-1)">&lt;</a>
        <a
          v-for="page in data.pages"
          :key="page"
          :class="{current: data.current == page, undisable: data.current == page}"
          :title="'第'+page+'页'"
          href="#"
          @click.prevent="gotoPage(page)">{{ page }}</a>
        <a v-show="data.hasNext"
          :class="{undisable: !data.hasNext}"
          href="#"
          title="后一页"
          @click.prevent="gotoPage(data.current+1)">&gt;</a>
        <a
          :class="{undisable: !data.hasNext}"
          href="#"
          title="末页"
          @click.prevent="gotoPage(data.pages)">末</a>
        <div class="clear"/>
      </div>
    </div>
    <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import course from '@/api/course.js'
import subject from '@/api/subject.js'

export default {
  data () {
    return {
      data: {},
      page: 1,
      subjectParent: [],
      subjectChild: [],
      courseQuery:{
        buyCountSort: '',
        gmtCreateSort: '',
        priceSort: ''
      },
      oneIndex: -1,
      twoIndex: -1,
      conditionIndex: -1
    }
  },
  created(){
    this.gotoPage(this.page)
    this.getParentSubject()
    //console.log(this.data)
  },
  computed: {
    isShow(){
      if(this.data.total<=0) {
        return true
      }else{
        return false
      }
    }
  },
  methods: {
    //获取分页
    gotoPage(page){
      course.findByPage(page,8,this.courseQuery)
      .then(response => {
        this.data = response.data.map
      })
    },
    //获取父分类
    getParentSubject(){
      subject.findParentSubject()
      .then(response => {
        this.subjectParent = response.data.list
      })
    },
    //选择父分类和获取父分类下的子分类
    getSubjectChildById(pid,oneIndex){
      subject.findChildrenSubject(pid)
      .then(response => {
        this.initTwoSubjectData()//初始化子分类
        this.oneIndex = oneIndex //设置选择背景色
        this.courseQuery.subjectParentId = pid//赋值父分类id
        this.subjectChild = response.data.list
        this.gotoPage(1)//获取数据
      })
    },
    //选择子分类
    selectSubjectChildId(id,twoIndex){
      this.twoIndex = twoIndex //设置选择背景色
      this.initConditionData()
      this.courseQuery.subjectId = id//赋值子分类id
      this.gotoPage(1)//获取数据
    },
    //获取课程数据
    getCourseListByPageAndCondition(){
      this.gotoPage(this.page)
    },
    //初始化父分类
    initOneSubjectData(){
      this.oneIndex = -1
      this.initConditionData()
      this.courseQuery = {
        buyCountSort: '',
        gmtCreateSort: '',
        priceSort: ''
      }
    },
    //初始化子分类
    initTwoSubjectData(){
        this.twoIndex = -1 
        this.initConditionData()
        this.courseQuery.subjectId = ''
    },
    //初始化条件排序查询
    initConditionData(){
        this.conditionIndex = -1
        this.courseQuery.buyCountSort = ''
        this.courseQuery.gmtCreateSort = ''
        this.courseQuery.priceSort = ''
    },
    // 查询全部
    selectAll(page){
      this.initOneSubjectData()
      this.initTwoSubjectData()
      this.gotoPage(1)
    },
    // 根据销量排序查询
    searchBuyCount(){
      this.courseQuery.buyCountSort = this.conditionSortSwitch(this.courseQuery.buyCountSort,1)
      console.log(this.courseQuery.buyCountSort)
      this.gotoPage(1)
    },
    // 根据发布时间排序查询
    searchGmtCreate(){
      this.courseQuery.gmtCreateSort = this.conditionSortSwitch(this.courseQuery.gmtCreateSort,2)
      console.log(this.courseQuery.gmtCreateSort)
      this.gotoPage(1)
    },
    // 根据价格排序查询
    searchPrice(){
      this.courseQuery.priceSort = this.conditionSortSwitch(this.courseQuery.priceSort,3)
      console.log(this.courseQuery.priceSort)
      this.gotoPage(1)
    },
    // 条件排序切换
    conditionSortSwitch(conditionSort,conditionIndex){
      if(!conditionSort || conditionSort.toUpperCase() == 'ASC'){
          conditionSort = 'DESC'
      }else{
        conditionSort = 'ASC'
      }
      // 初始化排序
      this.conditionIndex = conditionIndex
      if(conditionIndex == 1){
        this.courseQuery.gmtCreateSort = ''
        this.courseQuery.priceSort = ''
      }
      if(conditionIndex == 2){
        this.courseQuery.buyCountSort = ''
        this.courseQuery.priceSort = ''
      }
      if(conditionIndex == 3){
        this.courseQuery.buyCountSort = ''
        this.courseQuery.gmtCreateSort = ''
      }
      return conditionSort
    }
  }
}
</script>
<style scoped>
  .active {
    background: #bdbdbd;
  }
  .hide {
    display: none;
  }
  .show {
    display: block;
  }
</style>