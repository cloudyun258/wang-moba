<template>
  <div id="hero-detail" v-if="heroDetail">
    <div class="topbar">
      <div class="logo">
        <img @click="$router.push('/home')" src="../../assets/images/logo.png" alt="logo">
      </div>
      <div class="text">
        <span class="name">王者荣耀</span>
        <span class="tips">攻略站</span>
      </div>
      <router-link tag="div" to="/more/heroList" class="more">更多英雄<span class="gt">&gt;</span></router-link>
    </div>
    <!-- end of tapbar -->
    <div class="basic-info" :style="{ backgroundImage: `url(${heroDetail.banner})` }">
      <div class="info-wrap">
        <div class="info">
          <div class="alias">{{ heroDetail.alias }}</div>
          <div class="name">{{ heroDetail.name }}</div>
          <div class="category">{{ heroDetail.categories.map(v => v.name).join('/') }}</div>
          <div class="other">
            <div class="score">
              <div class="score-item">
                难度
                <span class="badge badge-difficult radius-round">{{ heroDetail.score.difficult }}</span>
              </div>
              <div class="score-item">
                技能
                <span class="badge badge-skill radius-round">{{ heroDetail.score.skill }}</span>
              </div>
              <div class="score-item">
                攻击
                <span class="badge badge-attack radius-round">{{ heroDetail.score.attack }}</span>
              </div>
              <div class="score-item">
                生存
                <span class="badge badge-survive radius-round">{{ heroDetail.score.survive }}</span>
              </div>                            
            </div>
            <router-link tag="div" to="/heroSkin" class="skin">
              皮肤 : {{ heroDetail.skins.length }} <span class="gt">&gt;</span>    
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- end of basicInfo -->
    <div class="nav-wrap">
      <div class="nav">
        <div class="nav-item" @click="toggleNav(0)">
          <span class="nav-link" :class="{'active': active == 0}">英雄初识</span>
        </div>
        <div class="nav-item" @click="toggleNav(1)">
          <span class="nav-link" :class="{'active': active == 1}">进阶攻略</span>
        </div>       
      </div>    
    </div>
    <!-- end of nav-->
    <div class="swiper-wrap">
      <swiper ref="mySwiper" :options="options">
        <swiper-slide>
          <div class="detail-info" v-if="heroDetail.skills.length">
            <div class="card-skill">
              <div class="show">
                <div class="show-item" @click="videoPlay(showVideo)">
                  <img class="show-icon" src="../../assets/images/icon_06.png" alt="icon_06">
                  <span class="show-txt">英雄介绍视频</span>
                </div>
                <div class="show-item" @click="heroShow">
                  <img class="show-icon" src="../../assets/images/icon_07.png" alt="icon_07">
                  <span class="show-txt">一图识英雄</span>
                </div>                
              </div>
              <div class="skill">
                <div class="skill-icon">
                  <div class="skill-item radius-round" 
                    v-for="(item, index) in heroDetail.skills" 
                    :key="index"
                    :class="{'skill-active': skillActive == index}"
                    @click="skillActive=index">
                    <img :src="item.icon" class="icon" alt="skill-icon">
                  </div>
                </div>
                <div class="skill-info">
                  <div class="basic">
                    <span class="name">{{ heroDetail.skills[skillActive].name }}</span>
                    <span class="consume">
                      (冷却值: {{heroDetail.skills[skillActive].cooling}} 消耗:  {{heroDetail.skills[skillActive].consume}})
                    </span>
                  </div>
                  <div class="description">{{ heroDetail.skills[skillActive].description }}</div>
                </div>
              </div>
            </div>
            <!-- end of card-skill -->
            <div class="card-equip">
              <m-card title="出装推荐" icon="icon_equip.png" :more="false">
                <template v-slot:content>
                  <div class="equip">
                    <p class="equip-type">顺风出装</p>
                    <div class="equip-wrap border">
                      <div class="equip-item" v-for="(item, index) in heroDetail.luckyEquip" :key="index">
                        <img :src="item.icon" class="icon radius-round" alt="equip-icon">
                        <div class="name">{{ item.name }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="equip">
                    <p class="equip-type">逆风出装</p>
                    <div class="equip-wrap">
                      <div class="equip-item" v-for="(item, index) in heroDetail.shitEquip" :key="index">
                        <img :src="item.icon" class="icon radius-round" alt="equip-icon">
                        <div class="name">{{ item.name }}</div>
                      </div>
                    </div>
                  </div>                  
                </template>
              </m-card>
            </div>
            <!-- end of card-equip -->
            <div class="card-store">
              <m-card title="铭文推荐" icon="icon_store.png" :more="false">
                <template v-slot:content>
                  <div class="store">
                    <div class="store-item" v-for="(item, index) in heroDetail.storeRecommend" :key="index">
                      <div class="icon">
                        <img :src="item.icon" alt="store-icon">
                      </div>
                      <div class="info">
                        <span class="name">{{ item.name }}</span>
                        <div class="attr" v-for="(attr, i) in item.attr" :key="i">{{ attr }}</div>
                      </div>
                    </div>
                  </div>
                </template>
              </m-card>
            </div>
            <!-- end of card-store -->
            <div class="card-usage">
              <m-card title="使用技巧" icon="icon_use.png" :more="false">
                <template v-slot:content>
                  <p class="txt">{{ heroDetail.usageTips }}</p>
                </template>
              </m-card>
            </div>
            <div class="card-battle">
              <m-card title="对抗技巧" icon="icon_battle.png" :more="false">
                <template v-slot:content>
                  <p class="txt">{{ heroDetail.battleTips }}</p>
                </template>
              </m-card>
            </div>
            <div class="card-usage">
              <m-card title="团战思路" icon="icon_team.png" :more="false">
                <template v-slot:content>
                  <p class="txt">{{ heroDetail.teamTips }}</p>
                </template>
              </m-card>
            </div>
            <!-- end of tips -->
            <div class="card-relate">
              <m-card title="英雄关系" icon="icon_partner.png" :more="false">
                <template v-slot:content>
                  <div class="relate">
                    <p class="relate-type">最佳搭档</p>
                    <div class="relate-wrap border">
                      <div class="relate-item" v-for="(item, index) in heroDetail.partners" :key="index">
                        <img :src="item.hero.avatar" class="avatar" alt="hero-avatar">
                        <div class="description">{{ item.description }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="relate">
                    <p class="relate-type">被谁克制</p>
                    <div class="relate-wrap border">
                      <div class="relate-item" v-for="(item, index) in heroDetail.enemies" :key="index">
                        <img :src="item.hero.avatar" class="avatar" alt="hero-avatar">
                        <div class="description">{{ item.description }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="relate">
                    <p class="relate-type">克制谁</p>
                    <div class="relate-wrap border">
                      <div class="relate-item" v-for="(item, index) in heroDetail.preies" :key="index">
                        <img :src="item.hero.avatar" class="avatar" alt="hero-avatar">
                        <div class="description">{{ item.description }}</div>
                      </div>
                    </div>
                  </div>                                    
                </template>
              </m-card>
            </div>
          </div>
          <div v-else 
            style="text-align:center; 
            background-color:#fff;
            height: 43rem;
            padding-top: 5rem">
            <img width="50%" src="../../assets/images/empty_bilibili33.png" alt="empty">
          </div>
        </swiper-slide>
        <!-- end of detailInfo -->
        <swiper-slide>
          <div v-if="heroDetail.skills.length">
            <div class="strategy-item"
            v-for="(item, index) in heroDetail.strategies" 
            :key="index"
            @click="videoPlay(item)">
              <div class="cover">
                <img :src="item.cover" class="cover-img" alt="cover">
                <img src="../../assets/images/video-img.png" class="play-img" alt="video-img">
              </div>
              <div class="info">
                <div class="title">{{ item.title }}</div>
                <div class="other">
                  <div class="play">
                    <img src="../../assets/images/video-fre.png" class="play-img" alt="play">
                    <span class="play">{{ item.play }}</span>
                  </div>
                  <div class="date">{{ item.date.split('T')[0] }}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else 
            style="text-align:center; 
            background-color:#fff;
            height: 43rem;
            padding-top: 5rem">
            <img 
              width="50%" 
              src="../../assets/images/empty_bilibili33.png" 
              alt="empty">
          </div>          
          <div class="loading-more" v-if="heroDetail.skills.length">全部加载完成</div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
  import { fetchHero } from '@/api/index'
  import Card from '@/components/Card'
  import minxins_swiper from '@/assets/javascript/mixins_swiper'
  export default {
    name: 'HeroDetail',
    mixins: [minxins_swiper],
    props: ['id'],
    data () {
      return {
        heroDetail: null,
        active: 0,  // 当前选中的导航项
        skillActive: 0  //当前选中的技能项      
      }
    },
    mounted () {
      this.fetchHero()
    },
    computed: {
      // 构造英雄介绍视频对象
      showVideo () {
        return {
          title: `【英雄介绍】${this.heroDetail.alias}-${this.heroDetail.name}`,
          video: this.heroDetail.showVideo
        }
      }
    },
    methods: {
      // 获取英雄详情
      async fetchHero () {
        const res = await fetchHero({ id: this.id })
        this.heroDetail = res.data
        // 保存皮肤数据到本地
        localStorage.setItem('heroSkins', JSON.stringify(res.data.skins))
      },
      // 一图识英雄
      heroShow () {
        // 保存图片数据到本地
        localStorage.setItem('showImage', this.heroDetail.showImage)
        this.$router.push('/heroShow')        
      },
      // 跳转到视频播放页
      videoPlay (item) {
        // 保存视频数据到本地
        localStorage.setItem('video', JSON.stringify(item))
        this.$router.push('/videoPlay')
      },
    },
    components: {
      'm-card': Card
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/stylus/variable.styl"
  @import "../../assets/stylus/mixins.styl"
  #hero-detail
    padding-top: 4.5rem 
    .topbar
      sprite-icon(100%, 4.5rem, 0, -71.5rem, 
      75rem, 91rem, "../../assets/images/icon/icon.png")
      flex-align(flex-start)
      color: $white
      .text 
        flex: 1
        margin-left: 1rem 
        font-size: $font-sm
        .name
          margin-right: 1.5rem
      .more
        font-size: $font-xs
        .gt
          vertical-align: middle
          margin-left: 1rem
          font-size: $font-xxl
    .basic-info
      bg-img(100%, 19rem, "../../assets/images/icon/icon.png",
      auto, 100%, top, center)
      .info-wrap
        position: relative
        width: 100%
        height: 100%
        padding: 0 1.2rem 1.5rem
        box-sizing: border-box 
        background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)) 
      .info
        pos-base(absolute, 1.2rem, auto, auto, auto, 1.2rem, 1.2rem)
        color: $white
      .alias, .category
        font-size: $font-xs
        line-height: 2em
      .alias
        animation: heroAlias 0.7s
      .category
        animation: heroCate 1s
      .name
        font-size: $font-xl
        font-weight: 700
        animation: heroName 1.2s
      .other
        flex-align()
        .score
          flex-align(flex-start)
          font-size: $font-s
        .score-item
          margin-right: 0.7rem
          &:nth-child(1)
            animation: heroDiff 1.2s 
          &:nth-child(2)
            animation: heroSkill 1.5s 
          &:nth-child(3)
            animation: heroAttack 1.9s 
          &:nth-child(4)
            animation: heroSurvive 2.2s                         
          .badge
            display: inline-block
            width: 1.8rem
            height: 1.8rem
            line-height: 1.8rem
            text-align: center  
            background-color: $white
            color: $grey-b6
            transform: scale(.66)
            font-weight: 200 
          .badge-difficult
            background-color: $brown
          .badge-skill
            background-color: $blue-1f
          .badge-attack
            background-color: $red-79
          .badge-survive
            background-color: $dark-3c
        .skin
          color: $grey-b6
          font-size: $font-xs
          .gt
            vertical-align: top
            font-size: $font-xxl
    .nav-wrap
      margin: 0 1.2rem
      margin-top: -0.5rem 
      border-bottom($grey-9e)
      .nav
        flex-align(flex-start)
        background-color: $white
        margin: 0 -1.2rem
        .nav-item
          flex: 1
          text-align: center
        .nav-link
          position: relative
          display: inline-block
          padding: 1rem 0 1.2rem 0
          font-size: $font-sm
          color: $dark-34
          &:after
            content: ''
            pos-base(absolute, 0, auto, 100%, 0.25rem, auto, 0.9rem)
            background-color: transparent
          &.active
            color: $orange-d5
          &.active:after
            background-color: $orange-d5
    .detail-info
      >>> .card 
        padding: 0 1.2rem
        .title
          font-weight: 700
      .card-skill
        padding: 1rem 1.2rem
        background-color: $white
        .show
          flex-align(flex-start)
          margin-bottom: 1.3rem 
          .show-item
            flex: 1
            text-align: center
            height: 3.7rem
            line-height: 3.7rem
            margin-right: 1rem
            font-size: $font-sm
            color: $dark-34
            background-color: $white-fc
            border-all($grey-e6)
            &:last-child
              margin: 0
          .show-icon
            width: 2rem
            vertical-align: middle 
            margin-right: 1rem
          .show-txt
            vertical-align: middle
        .skill
          padding-top: 1.5rem 
          .skill-icon
            flex-align()
            .skill-item
              margin: 0 0.5rem
              border: 0.25rem solid transparent
              &.skill-active
                border-color: $orange-d5
              .icon
                display: block
                width: 6rem
          .skill-info
            padding-top: 2rem
            color: $dark-34
            .name
              font-size: $font-m 
              font-weight: 700
              margin-right: 1.5rem
            .consume
              color: $grey-7a
            .description
              padding-top: 2rem
              font-size: $font-sm
              line-height: 2rem
      .card-equip
        background-color: $white
        .equip
          color: $dark-34
          .equip-type
            font-size: $font-m
            margin: 0
            margin-bottom: 1.2rem  
          .equip-wrap
            flex-align()
            margin: 0 0.5rem
            text-align: center
            &.border
              border-bottom($grey-ba)
              margin-bottom: 1.3rem 
            .icon
              width: 4.6rem
            .name
              font-size: $font-xxs
              margin: 0.5rem 0 0.2rem 0
      .card-store
        background-color: $white
        .store
          flex-align()
          color: $dark-34
          padding-bottom: 1.4rem
          .store-item
            flex-align()
            margin-right: 0.2rem
            &:last-child
              margin-right: 0   
            .icon img
              width: 3.3rem
              height: 3.9rem
            .info
              margin-left: 1rem
              .name
                font-size: $font-m
              .attr
                font-size: $font-xxs
      .card-usage, 
      .card-battle, 
      .card-team
        .txt
          margin: 0
          padding-bottom: 1rem
          font-size: $font-sm
          line-height: 2rem
      .card-relate
        background-color: $white
        .relate
          color: $dark-34
          padding-top: 1.5rem
          &:first-child
              padding-top: 0
          .relate-type
            font-size: $font-m
            margin: 0
            margin-bottom: 1.2rem
          .relate-wrap
            border-bottom($grey-ba)
          .relate-item
            flex-align(flex-start, flex-start)
            padding-bottom: 1.5rem
            .avatar
              width: 4.8rem
              margin-right: 1rem 
            .description
              font-size: $font-sm
              line-height: 2rem
    .strategy-item
      flex-align(flex-start, flex-start)
      padding: 1rem 0
      margin: 0 1.2rem
      border-bottom($grey-ba)
      &:nth-child(4):after
        height: 0 
      .cover
        position: relative
        margin-right: 1.5rem 
        .cover-img
          display: block
          width: 11.6rem
        .play-img
          pos-base(absolute, 50%, 50%, 3.2rem, auto)
          transform: translate3d(-50%, -50%, 0)
      .info
        flex: 1 
        .title
          font-size: $font-sm
          color: $dark-34
          height: 3.6rem
          text-ellipsis(2) 
          margin-bottom: 2rem 
        .other
          flex-align()
        .play
          font-size: $font-xxs
          color: $grey-7a
          .play-img
            width: 1.2rem
            height: 0.9rem
            margin-right: 0.5rem  
        .date
          float: right
          font-size: $font-xxs
          color: $grey-7a
    .loading-more
      background-color: $white-f1
      color: $grey-7a
      text-align: center
      height: 3rem
      line-height: 3rem 
    .swiper-slide:nth-child(2)
      background-color: $white
        
</style>
