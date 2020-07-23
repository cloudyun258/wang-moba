export default {
  data () {
    return {
      options: {
        // 每个swiper项高度自动撑开
        autoHeight: true,
        on: {
          // swiper从当前slide开始过渡到另一个slide时执行
          slideChangeTransitionStart: () => {
            let swiper = this.$refs.mySwiper.$swiper
            let activeIndex = swiper.activeIndex
            this.active = activeIndex
          }
        }
      }
    }
  },
  methods: {
    // 导航切换
    toggleNav (index) {
      this.active = index
      this.$refs.mySwiper.$swiper.slideTo(index, 300, false)
    }
  }
}