<template>
  <div class="demo-page-container">
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">YTabs 标签页</text>
    </view>

    <!-- 基础用法 -->
    <div class="demo-section">
      <div class="section-title">基础用法</div>
      <YTabs
        :tabs="basicTabs"
        :current-tab="basicCurrentTab"
        @change="handleBasicChange"
      />
      <div class="tab-content">
        当前选中：{{ basicTabs[basicCurrentTab]?.name }}
      </div>
    </div>

    <!-- 带徽章的标签 -->
    <div class="demo-section">
      <div class="section-title">带徽章的标签</div>
      <YTabs
        :tabs="badgeTabs"
        :current-tab="badgeCurrentTab"
        @change="handleBadgeChange"
      />
      <div class="tab-content">
        当前选中：{{ badgeTabs[badgeCurrentTab]?.name }}
      </div>
    </div>

    <!-- 自定义样式 -->
    <div class="demo-section">
      <div class="section-title">自定义样式</div>
      <YTabs
        :tabs="customTabs"
        :current-tab="customCurrentTab"
        :height="50"
        :size="16"
        :bold="true"
        :scale="1.1"
        selected-color="#ff6b35"
        slider-bg-color="#ff6b35"
        :slider-width="40"
        :slider-height="4"
        @change="handleCustomChange"
      />
      <div class="tab-content">
        当前选中：{{ customTabs[customCurrentTab]?.name }}
      </div>
    </div>

    <!-- 无滑块样式 -->
    <div class="demo-section">
      <div class="section-title">无滑块样式</div>
      <YTabs
        :tabs="noSliderTabs"
        :current-tab="noSliderCurrentTab"
        :is-slider="false"
        selected-color="#07c160"
        @change="handleNoSliderChange"
      />
      <div class="tab-content">
        当前选中：{{ noSliderTabs[noSliderCurrentTab]?.name }}
      </div>
    </div>

    <!-- 固定定位 -->
    <div class="demo-section">
      <div class="section-title">固定定位（演示）</div>
      <div class="fixed-demo-container">
        <YTabs
          :tabs="fixedTabs"
          :current-tab="fixedCurrentTab"
          :is-fixed="true"
          :top="0"
          background-color="#f8f9fa"
          @change="handleFixedChange"
        />
        <div class="fixed-content">
          <div class="content-item" v-for="i in 20" :key="i">
            内容项 {{ i }} - {{ fixedTabs[fixedCurrentTab]?.name }}
          </div>
        </div>
      </div>
    </div>

    <!-- 禁用状态 -->
    <div class="demo-section">
      <div class="section-title">禁用状态</div>
      <YTabs
        :tabs="disabledTabs"
        :current-tab="disabledCurrentTab"
        @change="handleDisabledChange"
      />
      <div class="tab-content">
        当前选中：{{ disabledTabs[disabledCurrentTab]?.name }}
      </div>
    </div>

    <!-- 无底部线条 -->
    <div class="demo-section">
      <div class="section-title">无底部线条</div>
      <YTabs
        :tabs="unlinedTabs"
        :current-tab="unlinedCurrentTab"
        :unlined="true"
        background-color="#f0f0f0"
        @change="handleUnlinedChange"
      />
      <div class="tab-content">
        当前选中：{{ unlinedTabs[unlinedCurrentTab]?.name }}
      </div>
    </div>

    <!-- 自定义字段名 -->
    <div class="demo-section">
      <div class="section-title">自定义字段名</div>
      <YTabs
        :tabs="customFieldTabs"
        :current-tab="customFieldCurrentTab"
        field="title"
        badge-field="count"
        @change="handleCustomFieldChange"
      />
      <div class="tab-content">
        当前选中：{{ customFieldTabs[customFieldCurrentTab]?.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { YTabs } from '@you-web/ui-core'

const router = useRouter()

const goBack = () => {
  router.push('/')
}

// 基础用法
const basicCurrentTab = ref(0)
const basicTabs = ref([
  { name: '首页' },
  { name: '分类' },
  { name: '购物车' },
  { name: '我的' }
])

const handleBasicChange = ({ index }: { index: number }) => {
  basicCurrentTab.value = index
}

// 带徽章的标签
const badgeCurrentTab = ref(0)
const badgeTabs = ref([
  { name: '消息', num: 5 },
  { name: '通知', num: 12 },
  { name: '待办', isDot: true },
  { name: '已完成' }
])

const handleBadgeChange = ({ index }: { index: number }) => {
  badgeCurrentTab.value = index
}

// 自定义样式
const customCurrentTab = ref(0)
const customTabs = ref([
  { name: '热门' },
  { name: '推荐' },
  { name: '最新' },
  { name: '精选' }
])

const handleCustomChange = ({ index }: { index: number }) => {
  customCurrentTab.value = index
}

// 无滑块样式
const noSliderCurrentTab = ref(0)
const noSliderTabs = ref([
  { name: '全部' },
  { name: '进行中' },
  { name: '已完成' },
  { name: '已取消' }
])

const handleNoSliderChange = ({ index }: { index: number }) => {
  noSliderCurrentTab.value = index
}

// 固定定位
const fixedCurrentTab = ref(0)
const fixedTabs = ref([
  { name: '标签一' },
  { name: '标签二' },
  { name: '标签三' }
])

const handleFixedChange = ({ index }: { index: number }) => {
  fixedCurrentTab.value = index
}

// 禁用状态
const disabledCurrentTab = ref(0)
const disabledTabs = ref([
  { name: '可用标签' },
  { name: '禁用标签', disabled: true },
  { name: '正常标签' },
  { name: '也禁用', disabled: true }
])

const handleDisabledChange = ({ index }: { index: number }) => {
  disabledCurrentTab.value = index
}

// 无底部线条
const unlinedCurrentTab = ref(0)
const unlinedTabs = ref([
  { name: '选项A' },
  { name: '选项B' },
  { name: '选项C' }
])

const handleUnlinedChange = ({ index }: { index: number }) => {
  unlinedCurrentTab.value = index
}

// 自定义字段名
const customFieldCurrentTab = ref(0)
const customFieldTabs = ref([
  { title: '产品', count: 8 },
  { title: '服务', count: 3 },
  { title: '支持', isDot: true },
  { title: '关于' }
])

const handleCustomFieldChange = ({ index }: { index: number }) => {
  customFieldCurrentTab.value = index
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
@import '../../styles/common.scss';

.tab-content {
  padding: $spacing-lg;
  text-align: center;
  color: $text-color;
  background-color: #f8f9fa;
  margin-top: $spacing-base;
  border-radius: $border-radius-base;
  font-size: $font-size-base;
}

.fixed-demo-container {
  position: relative;
  height: 300px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  border-radius: $border-radius-base;
}

.fixed-content {
  padding-top: 50px; // 为固定的标签页留出空间
  height: 100%;
  overflow-y: auto;
  background-color: #fff;
}

.content-item {
  padding: $spacing-base $spacing-lg;
  border-bottom: 1px solid #f0f0f0;
  color: $text-color;
  
  &:last-child {
    border-bottom: none;
  }
}

// 自定义演示样式
:deep(.y-tabs-view) {
  margin-bottom: $spacing-base;
}

// 固定定位演示的特殊处理
.fixed-demo-container :deep(.y-tabs-fixed) {
  position: absolute !important;
}
</style>