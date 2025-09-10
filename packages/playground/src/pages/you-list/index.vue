<template>
  <div class="demo-page-container">
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">YList 列表组件</text>
    </view>

    <div class="demo-section">
       <div class="section-title">基础用法</div>
       <div class="demo-card">
         <YList :data="basicData" :fields="basicFields" :loading="loading" @itemClick="handleItemClick" />
       </div>
     </div>

    <div class="demo-section">
       <div class="section-title">可选择模式（含全选）</div>
       <div class="demo-card">
         <YList 
           :data="selectableData" 
           :fields="selectableFields" 
           :selectable="true" 
           :showSelectAll="true"
           :selectedRows="selectedItems"
           @update:selectedRows="handleSelectedItemsUpdate" 
           @itemClick="handleItemClick" 
         />
         <div class="selection-info" v-if="selectedItems.length > 0">
           已选择 {{ selectedItems.length }} 项
         </div>
       </div>
     </div>

    <div class="demo-section">
      <div class="section-title">瀑布流滚动加载</div>
      <div class="demo-card waterfall-container">
        <YList 
          :data="waterfallData" 
          :fields="loadMoreFields" 
          v-model:loading="waterfallLoading"
          v-model:error="waterfallError"
          :finished="waterfallFinished"
          :offset="300"
          :immediateCheck="true"
          @load="handleWaterfallLoad"
          @retry="handleWaterfallRetry"
          @itemClick="handleItemClick" 
        />
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">传统加载更多</div>
      <div class="demo-card">
        <YList 
          :data="loadMoreData" 
          :fields="loadMoreFields" 
          :loading="loadMoreLoading" 
          :showLoadMore="true"
          @loadMore="handleLoadMore" 
          @itemClick="handleItemClick" 
        />
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">自定义渲染</div>
      <div class="demo-card">
        <YList :data="customData" :fields="customFields" @itemClick="handleItemClick">
          <template #avatar="{ item }">
            <div style="display: inline">
              <div class="custom-avatar">
                {{ item.name.charAt(0) }}
              </div>
            </div>
          </template>

          <template #status="{ item }">
            <div class="status-badge" :class="item.status">
              {{ getStatusText(item.status) }}
            </div>
          </template>

          <template #actions="{ item }">
            <div class="item-actions">
              <button class="action-btn" @click.stop="handleCall(item)">📞</button>
              <button class="action-btn" @click.stop="handleMessage(item)">💬</button>
            </div>
          </template>
        </YList>
      </div>
     </div>
   </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { YList } from '@you-web/ui-core'
import type { DataItem, FieldConfig } from '@you-web/ui-core/types'

const router = useRouter()

const goBack = () => {
  router.push('/')
}

// 基础数据
const loading = ref(false)
const selectedItems = ref<DataItem[]>([])
const loadMoreLoading = ref(false)
const hasMore = ref(true)

// 瀑布流相关数据
const waterfallData = ref<DataItem[]>([])
const waterfallLoading = ref(false)
const waterfallError = ref(false)
const waterfallFinished = ref(false)
const waterfallPage = ref(1)

// 基础用法数据
const basicData = ref<DataItem[]>([
  { id: 1, name: '张三', department: '技术部', phone: '138****1234' },
  { id: 2, name: '李四', department: '产品部', phone: '139****5678' },
  { id: 3, name: '王五', department: '设计部', phone: '137****9012' },
  { id: 4, name: '赵六', department: '运营部', phone: '136****3456' },
])

const basicFields: FieldConfig[] = [
  { key: 'name', label: '姓名', type: 'text' },
  { key: 'department', label: '部门', type: 'text' },
  { key: 'phone', label: '电话', type: 'text' },
]

// 可选择数据
const selectableData = ref<DataItem[]>([
  { id: 1, title: '重要会议', time: '09:00', location: '会议室A' },
  { id: 2, title: '项目评审', time: '14:00', location: '会议室B' },
  { id: 3, title: '团队建设', time: '16:00', location: '活动室' },
  { id: 4, title: '技术分享', time: '19:00', location: '大会议室' },
])

const selectableFields: FieldConfig[] = [
  { key: 'title', label: '会议主题', type: 'text' },
  { key: 'time', label: '时间', type: 'text' },
  { key: 'location', label: '地点', type: 'text' },
]

// 加载更多数据
const loadMoreData = ref<DataItem[]>([
  { id: 1, title: '新闻标题1', summary: '这是新闻摘要内容...', publishTime: '2024-01-01' },
  { id: 2, title: '新闻标题2', summary: '这是新闻摘要内容...', publishTime: '2024-01-02' },
  { id: 3, title: '新闻标题3', summary: '这是新闻摘要内容...', publishTime: '2024-01-03' },
])

const loadMoreFields: FieldConfig[] = [
  { key: 'title', label: '标题', type: 'text' },
  { key: 'summary', label: '摘要', type: 'text' },
  { key: 'publishTime', label: '发布时间', type: 'text' },
]

// 自定义渲染数据
const customData = ref<DataItem[]>([
  { id: 1, name: '张三', status: 'online', lastSeen: '刚刚', phone: '138****1234' },
  { id: 2, name: '李四', status: 'offline', lastSeen: '5分钟前', phone: '139****5678' },
  { id: 3, name: '王五', status: 'busy', lastSeen: '1小时前', phone: '137****9012' },
  { id: 4, name: '赵六', status: 'away', lastSeen: '昨天', phone: '136****3456' },
])

const customFields: FieldConfig[] = [
  { key: 'avatar', label: '头像', type: 'custom', slotName: 'avatar' },
  { key: 'name', label: '姓名', type: 'text' },
  { key: 'status', label: '状态', type: 'custom', slotName: 'status' },
  { key: 'lastSeen', label: '最后在线', type: 'text' },
  { key: 'actions', label: '操作', type: 'custom', slotName: 'actions' },
]

// 事件处理
const handleItemClick = (item: DataItem, index: number) => {
  console.log('Item clicked:', item, index)
  uni.showToast({
    title: `点击了: ${item.name || item.title}`,
    icon: 'none',
  })
}

const handleSelectedItemsUpdate = (items: DataItem[]) => {
  selectedItems.value = items
  console.log('Selected items updated:', items)
}

const handleLoadMore = () => {
  if (loadMoreLoading.value) return

  loadMoreLoading.value = true

  // 模拟加载更多数据
  setTimeout(() => {
    const newData = [
      {
        id: loadMoreData.value.length + 1,
        title: `新闻标题${loadMoreData.value.length + 1}`,
        summary: '这是新闻摘要内容...',
        publishTime: '2024-01-04',
      },
      {
        id: loadMoreData.value.length + 2,
        title: `新闻标题${loadMoreData.value.length + 2}`,
        summary: '这是新闻摘要内容...',
        publishTime: '2024-01-05',
      },
    ]

    loadMoreData.value.push(...newData)
    loadMoreLoading.value = false

    // 模拟没有更多数据
    if (loadMoreData.value.length >= 10) {
      hasMore.value = false
    }
  }, 1000)
}

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    online: '在线',
    offline: '离线',
    busy: '忙碌',
    away: '离开',
  }
  return statusMap[status] || status
}

const handleCall = (item: DataItem) => {
  uni.showToast({
    title: `拨打电话: ${item.phone}`,
    icon: 'none',
  })
}

const handleMessage = (item: DataItem) => {
  uni.showToast({
    title: `发送消息给: ${item.name}`,
    icon: 'none',
  })
}

// 瀑布流加载处理
const handleWaterfallLoad = () => {
  if (waterfallLoading.value || waterfallFinished.value) return

  waterfallLoading.value = true
  waterfallError.value = false

  // 模拟网络请求
  setTimeout(() => {
    // 模拟随机失败
    if (Math.random() < 0.2 && waterfallPage.value > 1) {
      waterfallLoading.value = false
      waterfallError.value = true
      return
    }

    const newData = Array.from({ length: 5 }, (_, index) => ({
      id: waterfallData.value.length + index + 1,
      title: `瀑布流新闻 ${waterfallData.value.length + index + 1}`,
      summary: `这是第${waterfallPage.value}页的新闻摘要内容，内容丰富有趣...`,
      publishTime: new Date().toLocaleDateString(),
    }))

    waterfallData.value.push(...newData)
    waterfallPage.value++
    waterfallLoading.value = false

    // 模拟加载完成
    if (waterfallData.value.length >= 30) {
      waterfallFinished.value = true
    }
  }, 1500)
}

// 瀑布流重试处理
const handleWaterfallRetry = () => {
  console.log('重试加载')
  handleWaterfallLoad()
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '../../styles/common.scss';



.demo-card {
  background: $color-white;
  border-radius: $border-radius-md;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);

  &.waterfall-container {
    height: 600rpx;
    overflow: hidden;
  }
}

.selection-info {
  margin-top: 20rpx;
  padding: 20rpx;
  background-color: $bg-color-grey;
  border-radius: $border-radius-sm;
  font-size: 28rpx;
  color: $text-color;
}

.custom-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background-color: $color-primary;
  color: $color-white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  font-weight: bold;
}

.status-badge {
  padding: 8rpx 16rpx;
  border-radius: $border-radius-sm;
  font-size: 24rpx;
  color: $color-white;

  &.online {
    background-color: $color-success;
  }

  &.offline {
    background-color: $color-grey;
  }

  &.busy {
    background-color: $color-danger;
  }

  &.away {
    background-color: $color-warning;
  }
}

.item-actions {
  display: flex;
  gap: 16rpx;
}

.action-btn {
  width: 60rpx;
  height: 60rpx;
  border: none;
  border-radius: 50%;
  background-color: $bg-color-grey;
  font-size: 24rpx;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    transform: scale(0.9);
    background-color: $color-primary;
  }
}
</style>
