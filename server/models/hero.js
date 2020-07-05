// goods 集合(表) 定义文件
const mongoose = require('./db')

const HeroSchema = mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  alias: { type: String },
  // 英雄分类, 可以有多个分类
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  // 上手分数
  score: {
    difficult: { type: Number },
    skill: { type: Number },
    attack: { type: Number },
    survive: { type: Number }
  },
  // 皮肤
  skins: [{
    name: { type: String },
    banner: { type: String }
  }],
  // 大图
  banner: { type: String },
  // 介绍视频
  showVideo: { type: String },
  // 介绍图片
  showImage: { type: String },
  // 是否热门
  hot: { 
    type: Boolean,
    default: false
  },
  // 技能
  skills: [{
    name: { type: String },
    icon: { type: String },
    cooling: { type: String },
    consume: { type: String },
    description: { type: String }
  }],
  // 出装
  luckyEquip: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equip' }],
  shitEquip: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equip' }],
  // 铭文推荐
  storeRecommend: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Store' }],
  // 提示
  usageTips: { type: String },
  battleTips: { type: String },
  teamTips: { type: String },
  // 英雄关系
  partners: [{
    hero: { type: mongoose.Schema.Types.ObjectId, ref: 'Hero' },
    description: { type: String }
  }],
  enemies: [{
    hero: { type: mongoose.Schema.Types.ObjectId, ref: 'Hero' },
    description: { type: String }
  }],
  preies: [{
    hero: { type: mongoose.Schema.Types.ObjectId, ref: 'Hero' },
    description: { type: String }
  }],
  // 进阶攻略
  strategies: [{
    title: { type: String },
    cover: { type: String },
    video: { type: String },
    play: { type: String, default: '1000' },
    date: { type: String, default: '2020-01-09' }
  }]
})

// 对应集合(表)为 tests
module.exports = mongoose.model('Hero', HeroSchema)
