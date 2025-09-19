<template>
  <div class="demo-page-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="back-button" @click="goBack">← 返回</div>
      <div class="page-title">YGrid 宫格</div>
    </div>

    <!-- 基础用法 -->
    <div class="demo-section">
      <div class="section-title">基础用法</div>
      <YGrid>
        <YGridItem v-for="(item, index) in basicItems" :key="index" :index="index" @click="handleItemClick">
          <div class="grid-content">
            <div class="grid-icon">{{ item.icon }}</div>
            <div class="grid-text">{{ item.text }}</div>
          </div>
        </YGridItem>
      </YGrid>
    </div>

    <!-- 自定义列数 -->
    <div class="demo-section">
      <div class="section-title">自定义列数 (4列)</div>
      <YGrid>
        <YGridItem v-for="(item, index) in gridItems4" :key="index" :cell="4" :index="index" @click="handleItemClick">
          <div class="grid-content">
            <div class="grid-icon">{{ item.icon }}</div>
            <div class="grid-text">{{ item.text }}</div>
          </div>
        </YGridItem>
      </YGrid>
    </div>

    <!-- 5列布局 -->
    <div class="demo-section">
      <div class="section-title">5列布局</div>
      <YGrid>
        <YGridItem v-for="(item, index) in gridItems5" :key="index" :cell="5" :index="index" @click="handleItemClick">
          <div class="grid-content">
            <div class="grid-icon">{{ item.icon }}</div>
            <div class="grid-text">{{ item.text }}</div>
          </div>
        </YGridItem>
      </YGrid>
    </div>

    <!-- 无边框 -->
    <div class="demo-section">
      <div class="section-title">无边框</div>
      <YGrid :unlined="true">
        <YGridItem v-for="(item, index) in basicItems" :key="index" :border="false" :bottom-line="false" :index="index" @click="handleItemClick">
          <div class="grid-content">
            <div class="grid-icon">{{ item.icon }}</div>
            <div class="grid-text">{{ item.text }}</div>
          </div>
        </YGridItem>
      </YGrid>
    </div>

    <!-- 自定义背景色 -->
    <div class="demo-section">
      <div class="section-title">自定义背景色</div>
      <YGrid>
        <YGridItem v-for="(item, index) in colorItems" :key="index" :background-color="item.bgColor" :index="index" @click="handleItemClick">
          <div class="grid-content">
            <div class="grid-icon">{{ item.icon }}</div>
            <div class="grid-text">{{ item.text }}</div>
          </div>
        </YGridItem>
      </YGrid>
    </div>

    <!-- 禁用点击效果 -->
    <div class="demo-section">
      <div class="section-title">禁用点击效果</div>
      <YGrid>
        <YGridItem v-for="(item, index) in basicItems" :key="index" :hover="false" :index="index" @click="handleItemClick">
          <div class="grid-content">
            <div class="grid-icon">{{ item.icon }}</div>
            <div class="grid-text">{{ item.text }}</div>
          </div>
        </YGridItem>
      </YGrid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { YGrid, YGridItem } from '@you-web/ui-core'

// 基础网格数据
const basicItems = ref([
  { icon: '📱', text: '手机充值' },
  { icon: '💰', text: '理财' },
  { icon: '🎫', text: '电影票' },
  { icon: '🚗', text: '滴滴出行' },
  { icon: '🍔', text: '美团外卖' },
  { icon: '✈️', text: '机票' }
])

// 4列网格数据
const gridItems4 = ref([
  { icon: '🏠', text: '房产' },
  { icon: '🚙', text: '汽车' },
  { icon: '📚', text: '教育' },
  { icon: '💊', text: '医疗' },
  { icon: '🎮', text: '游戏' },
  { icon: '🛍️', text: '购物' },
  { icon: '🍕', text: '美食' },
  { icon: '🎵', text: '音乐' }
])

// 5列网格数据
const gridItems5 = ref([
  { icon: '📧', text: '邮件' },
  { icon: '📞', text: '电话' },
  { icon: '💬', text: '消息' },
  { icon: '📷', text: '相机' },
  { icon: '🎨', text: '设计' },
  { icon: '⚙️', text: '设置' },
  { icon: '📊', text: '统计' },
  { icon: '🔒', text: '安全' },
  { icon: '🌐', text: '网络' },
  { icon: '🔧', text: '工具' }
])

// 自定义背景色数据
const colorItems = ref([
  { icon: '❤️', text: '红色', bgColor: '#ffebee' },
  { icon: '💚', text: '绿色', bgColor: '#e8f5e8' },
  { icon: '💙', text: '蓝色', bgColor: '#e3f2fd' },
  { icon: '💛', text: '黄色', bgColor: '#fffde7' },
  { icon: '💜', text: '紫色', bgColor: '#f3e5f5' },
  { icon: '🧡', text: '橙色', bgColor: '#fff3e0' }
])

// 处理网格项点击
const handleItemClick = (payload: { index: number }) => {
  console.log('点击了网格项:', payload.index)
  console.log(`点击了第 ${payload.index + 1} 个网格`)
  alert(`点击了第 ${payload.index + 1} 个网格`)
}

// 返回上一页
const goBack = () => {
  history.back()
}
</script>

<style scoped lang="scss">
@import '../../styles/common.scss';

.grid-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.grid-icon {
  font-size: 48rpx;
  margin-bottom: 16rpx;
}

.grid-text {
  font-size: 24rpx;
  color: #333;
  line-height: 1.2;
}
</style>