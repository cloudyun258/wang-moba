<template>
  <div id="hero-edit">
    <el-form label-position="right" label-width="100px">
      <el-tabs type="border-card" v-model="tabIndex">
        <el-tab-pane name="one" label="基本信息" class="tab-pane-one">
          <el-form-item label="名称">
            <el-input v-model="model.name" placeholder="请输入英雄名称"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.alias" placeholder="请输入英雄称号"></el-input>
          </el-form-item>
          <el-form-item label="热门">
            <el-switch v-model="model.hot"></el-switch>
          </el-form-item>
          <el-form-item label="所属分类" class="star-left">
            <el-select v-model="model.categories" multiple placeholder="请选择">
              <el-option
                v-for="item in heroCate"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="铭文推荐" class="star-right">
            <el-select v-model="model.storeRecommend" filterable multiple placeholder="请选择">
              <el-option
                v-for="item in storeList"
                :key="item._id"
                :label="item.categoryInfo[0].name+ ' -- ' + item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度" class="star-left">
            <el-rate :max="9" :show-score="true" v-model="model.score.difficult"></el-rate>
          </el-form-item>
          <el-form-item label="技能" class="star-right">
            <el-rate :max="9" :show-score="true" v-model="model.score.skill"></el-rate>
          </el-form-item>
          <el-form-item label="攻击" class="star-left">
            <el-rate :max="9" :show-score="true" v-model="model.score.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存" class="star-right">
            <el-rate :max="9" :show-score="true" v-model="model.score.survive"></el-rate>
          </el-form-item>
          <el-form-item label="头像" class="star-left">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :headers="uploadHeaders"
              :on-success="uploadAvatar">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="大图" class="star-right">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :headers="uploadHeaders"
              :on-success="uploadBanner">
              <img v-if="model.banner" :src="model.banner" class="banner">
              <i v-else class="el-icon-plus banner-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="顺风出装" class="star-left">
            <el-select v-model="model.luckyEquip" filterable multiple placeholder="请选择">
              <el-option
                v-for="item in equipList"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装" class="star-right">
            <el-select v-model="model.shitEquip" filterable multiple placeholder="请选择">
              <el-option
                v-for="item in equipList"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="介绍视频" class="star-left">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :headers="uploadHeaders"
              :on-success="uploadVideo"
              :before-upload="beforeVideo">
              <video v-if="model.showVideo" controls :src="model.showVideo" class="banner"></video>
              <i v-else class="el-icon-plus banner-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="介绍图片" class="star-right">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :headers="uploadHeaders"
              :on-success="uploadImage">
              <img v-if="model.showImage" :src="model.showImage" class="banner">
              <i v-else class="el-icon-plus banner-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" :rows="3" v-model="model.usageTips" placeholder="请输入使用技巧"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" :rows="3" v-model="model.battleTips" placeholder="请输入对抗技巧"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" :rows="3" v-model="model.teamTips" placeholder="请输入团战思路"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="two" label="技能" class="tab-pane-two">
          <el-button type="primary" size="small" @click="addSkill">
            <i class="el-icon-plus" style="margin-right:5px"></i>添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap" :gutter="30">
            <el-col :md="12" v-for="(item, index) in model.skills" :key="index" style="margin-top: 30px">
              <el-form-item label="名称">
                <el-input v-model="item.name" placeholder="请输入技能名称"></el-input> 
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :headers="uploadHeaders"
                  :on-success="uploadSkill">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" @click="uploadSkillIndex=index"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.cooling" placeholder="请输入冷却值"></el-input> 
              </el-form-item>
              <el-form-item label="消耗值">
                <el-input v-model="item.consume" placeholder="请输入消耗值"></el-input> 
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" :rows="3" v-model="item.description" placeholder="请输入技能描述"></el-input> 
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="delSkill(index)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane name="three" label="皮肤" class="tab-pane-three">
          <el-button type="primary" size="small" @click="addSkin">
            <i class="el-icon-plus" style="margin-right:5px"></i>添加皮肤
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap" :gutter="30">
            <el-col :md="12" v-for="(item, index) in model.skins" :key="index" style="margin-top: 30px">
              <el-form-item label="名称">
                <el-input v-model="item.name" placeholder="请输入皮肤名称"></el-input> 
              </el-form-item>
              <el-form-item label="设计图">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :headers="uploadHeaders"
                  :on-success="uploadSkin">
                  <img v-if="item.banner" :src="item.banner" class="banner">
                  <i v-else class="el-icon-plus banner-uploader-icon" @click="uploadSkinIndex=index"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="delSkin(index)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>          
        </el-tab-pane>
        <el-tab-pane name="four" label="英雄关系" class="tab-pane-four">

          <el-button type="primary" size="small" @click="addHeroRelate('partners')">
            <i class="el-icon-plus" style="margin-right:5px"></i>最佳搭档
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap" :gutter="30">
            <el-col :md="12" v-for="(item, index) in model.partners" :key="index" style="margin-top: 30px">
              <el-form-item label="名称">
                <el-select v-model="item.hero" filterable  placeholder="请选择">
                  <el-option
                    v-for="item in heroList"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" :rows="3" v-model="item.description" placeholder="请输入搭档描述"></el-input> 
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="delHeroRelate(index, 'partners')">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <el-divider content-position="center">hero</el-divider>

          <el-button type="primary" size="small" @click="addHeroRelate('enemies')">
            <i class="el-icon-plus" style="margin-right:5px"></i>被谁克制
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap" :gutter="30">
            <el-col :md="12" v-for="(item, index) in model.enemies" :key="index" style="margin-top: 30px">
              <el-form-item label="名称">
                <el-select v-model="item.hero" filterable placeholder="请选择">
                  <el-option
                    v-for="item in heroList"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" :rows="3" v-model="item.description" placeholder="请输入被克制描述"></el-input> 
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="delHeroRelate(index, 'enemies')">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <el-divider content-position="center">hero</el-divider>

          <el-button type="primary" size="small" @click="addHeroRelate('preies')">
            <i class="el-icon-plus" style="margin-right:5px"></i>克制谁
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap" :gutter="30">
            <el-col :md="12" v-for="(item, index) in model.preies" :key="index" style="margin-top: 30px">
              <el-form-item label="名称">
                <el-select v-model="item.hero" filterable placeholder="请选择">
                  <el-option
                    v-for="item in heroList"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" :rows="3" v-model="item.description" placeholder="请输入克制描述"></el-input> 
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="delHeroRelate(index, 'preies')">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>                

        </el-tab-pane>
        <el-tab-pane name="five" label="英雄攻略" class="tab-pane-five">
          <el-button type="primary" size="small" @click="addStrategy">
            <i class="el-icon-plus" style="margin-right:5px"></i>添加攻略
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap" :gutter="30">
            <el-col :md="12" v-for="(item, index) in model.strategies" :key="index" style="margin-top: 30px">
              <el-form-item label="标题">
                <el-input v-model="item.title" placeholder="请输入视频标题"></el-input> 
              </el-form-item>
              <el-form-item label="上传日期">
                <el-date-picker
                  v-model="item.date"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker> 
              </el-form-item>
              <el-form-item label="播放量">
                <el-input v-model="item.play" placeholder="请输入视频播放量"></el-input> 
              </el-form-item>
              <el-form-item label="封面">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :headers="uploadHeaders"
                  :on-success="uploadStrategy">
                  <img v-if="item.cover" :src="item.cover" class="banner">
                  <i v-else class="el-icon-plus banner-uploader-icon" @click="uploadStrategyIndex=index"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="视频">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :headers="uploadHeaders"
                  :on-success="uploadStrategy">
                  <video v-if="item.video" controls :src="item.video" class="banner"></video>
                  <i v-else class="el-icon-plus banner-uploader-icon" @click="uploadStrategyIndex=index"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="delStrategy(index)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>                    
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div class="save">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { saveHero, updateHero, fetchHeroItem, fetchHeroTwo, getHero } from "@/api/hero"
  import { getEquip, getStore } from '@/api/goods'
  import mixins_upload from '@/assets/javascript/mixins_upload'

  // 返回一个英雄数据对象
  function hero () {
    return {
      name: '',
      avatar: '',
      alias: '',
      hot: false,
      categories: [],
      score: {
        difficult: 0,
        skill: 0,
        attack: 0,
        survive: 0
      },
      luckyEquip: [],
      shitEquip: [],
      storeRecommend: [],
      banner: '',
      showVideo: '',
      showImage: '',
      usageTips: '',
      battleTips: '',
      teamTips: '',
      skills: [],
      skins: [],
      strategies: [],
      partners: [],
      enemies: [],
      preies: []
    }
  }

  export default {
    name: 'HeroEdit',
    mixins: [mixins_upload],
    props: ['id'],
    data () {
      return {
        model: hero(),
        tabIndex: 'one',
        heroCate: [], // 英雄分类
        heroList: [],  // 英雄列表
        equipList: [],  // 装备列表
        storeList: [],  // 铭文列表
        uploadSkillIndex: 0, // 用来标记上传的是哪个技能图标
        uploadSkinIndex: 0, // 用来标记上传的是哪个皮肤设计图
        uploadStrategyIndex: 0,  // 用来标记上传的是哪个攻略的视频或封面
      }
    },
    watch: {
      $route () {
        this.tabIndex = 'one'
        if (this.id) {
          this.getHeroItem()
        } else {
          this.model = hero()
        }
      }
    },
    mounted () {
      this.fetchEquip()
      this.fetchStore()
      this.fetchHeroTwo()
      this.fetchHero()
      this.id && this.getHeroItem()
    },
    methods: {
      // 新建或修改英雄
      async save () {
        let heroItem = this.model
        let id = this.id
        if (!heroItem.name) {
          this.$message.error('名称不能为空')
          return
        }
        let res
        if (id) {   
          res = await updateHero({ id, heroItem })
        } else {
          res = await saveHero({ heroItem })
        }
        // 该英雄已存在
        if (res.status == 1) {
          this.$message.error(res.msg)
          return
        }
        this.$message.success(res.msg)
        this.$router.push('/hero/heroList')
      },
      // 获取要修改的英雄数据
      async getHeroItem () {
        const res = await fetchHeroItem({ id: this.id })
        this.model = res.data
      },
      // 获取装备列表
      async fetchEquip () {
        const res = await getEquip({ page: 1, pageSize: 999 })
        this.equipList = res.data.equipList
      },
      // 获取铭文列表
      async fetchStore () {
        const res = await getStore({ page: 1, pageSize: 999 })
        this.storeList = res.data.storeList
      },
      // 获取英雄二级分类
      async fetchHeroTwo () {
        const res = await fetchHeroTwo()
        this.heroCate = res.data
      },
      // 获取所有英雄
      async fetchHero () {
        const res = await getHero({ page:1, pageSize: 999})
        this.heroList = res.data.heroList
      },
      // 添加一个技能
      addSkill () {
        this.model.skills.push({
          name: '',
          icon: '',
          cooling: '',
          consume: '',
          description: ''
        })
      },
      // 删除一个技能
      delSkill (index) {
         this.$confirm(`确认要删除该技能?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 先前端删除数据，点保存时再提交
          this.model.skills.splice(index, 1)
          this.$message.success('删除成功')
        })
      },
      // 添加一个皮肤
      addSkin () {
        this.model.skins.push({
          name: '',
          banner: ''
        })
      },
      // 删除一个皮肤
      delSkin (index) {
         this.$confirm(`确认要删除该皮肤?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 先前端删除数据，点保存时再提交
          this.model.skins.splice(index, 1)
          this.$message.success('删除成功')
        })
      },
       // 添加一个攻略
      addStrategy () {
        this.model.strategies.push({
          title: '',
          cover: '',
          play: '',
          date: '',
          video: ''
        })
      },
      // 删除一个攻略
      delStrategy (index) {
        this.$confirm(`确认要删除该攻略?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 先前端删除数据，点保存时再提交
          this.model.strategies.splice(index, 1)
          this.$message.success('删除成功')
        })
      },
      // 添加一个英雄关系
      addHeroRelate (type) {
        this.model[type].push({
          hero: '',
          description: ''
        })
      },
      // 删除一个英雄关系
      delHeroRelate (index, type) {
        this.$confirm(`确认要删除该英雄关系?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 先前端删除数据，点保存时再提交
          this.model[type].splice(index, 1)
          this.$message.success('删除成功')
        })
      },
      // 文件上传之前做些判断
      beforeVideo (file) {
        if (file.type.indexOf('video') == -1) {
          this.$message.error('上传的文件不符合格式')
          return false
        }
      },
      // 文件上传成功的回调函数
      uploadAvatar (res) {
        this.model.avatar = res.data.url
      },
      uploadBanner (res) {
        this.model.banner = res.data.url
      },
      uploadImage (res) {
        this.model.showImage = res.data.url
      },
      uploadVideo (res) {
        this.model.showVideo = res.data.url
      },
      uploadSkill (res) {
        this.model.skills[this.uploadSkillIndex].icon = res.data.url
      },
      uploadSkin (res) {
        this.model.skins[this.uploadSkinIndex].banner = res.data.url
      },
      uploadStrategy (res) {
        res = res.data
        if (res.mimetype.indexOf('video') != -1) {
          this.model.strategies[this.uploadStrategyIndex].video = res.url
        } else {
          this.model.strategies[this.uploadStrategyIndex].cover = res.url
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/stylus/variable.styl"
  #hero-edit
    .el-tabs
      width: 1000px
      margin: 0 auto
      box-shadow: none
      >>> .el-tabs__content
        padding: 50px 30px
    .el-rate
      margin-top: 11px
    .tab-pane-one
      .el-form-item
        width: 80%
        margin: 0 auto
        margin-bottom: 30px
      .el-form-item:last-child
        margin-bottom: 0 
      .el-form-item.star-left
        margin: 0 0 20px 94px
        width: 40%
        display: inline-block
      .el-form-item.star-right
        width: 40%
        margin: 0
        margin-bottom: 20px 
        display: inline-block
    .tab-pane-two, .tab-pane-three, 
    .tab-pane-four, .tab-pane-five
       .el-form-item:last-child
         text-align: right 
         margin-bottom: 0 
    .save
      width: 1000px
      margin: 50px auto
      margin-top: 30px 
      text-align: right 

</style>