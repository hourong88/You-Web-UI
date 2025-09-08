<template>
  <div class="you-list" :class="customClass" :style="customStyle" ref="listRef" @scroll="handleScroll">
    <!-- 全选区域 -->
    <div v-if="selectable && showSelectAll" class="you-list__select-all">
      <div class="you-list__select-all-checkbox">
        <input 
          type="checkbox" 
          :checked="isAllSelected" 
          :indeterminate="isIndeterminate"
          @change="handleSelectAll" 
        />
        <span class="you-list__select-all-text">
          {{ isAllSelected ? '取消全选' : '全选' }}
          <span v-if="selectedRows.length > 0" class="you-list__select-count">
            ({{ selectedRows.length }}/{{ data.length }})
          </span>
        </span>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading && data.length === 0" class="you-list__loading">
      <div class="you-list__loading-text">{{ loadingText || '加载中...' }}</div>
    </div>

    <!-- 空数据状态 -->
    <div v-else-if="!data || data.length === 0" class="you-list__empty">
      <div class="you-list__empty-text">{{ emptyText || '暂无数据' }}</div>
    </div>

    <!-- 列表项 -->
    <div v-else v-for="(item, index) in data" :key="getRowKey(item, index)" class="you-list__item" :class="{
      'you-list__item--selected': isRowSelected(item),
      'you-list__item--clickable': clickable,
    }" @click="handleItemClick(item, index)">
      <!-- 选择框 -->
      <div v-if="selectable" class="you-list__checkbox">
        <input type="checkbox" :checked="isRowSelected(item)" @change="handleRowSelect(item, $event)" @click.stop />
      </div>

      <!-- 列表项内容 -->
      <div class="you-list__content">
        <!-- 自定义插槽 -->
        <slot name="item" :item="item" :index="index" :fields="fields">
          <!-- 默认布局 -->
          <div class="you-list__default-layout">
            <!-- 主要信息区域 -->
            <div class="you-list__main">
              <div v-for="field in mainFields" :key="field.key" class="you-list__field"
                :class="`you-list__field--${field.type || 'text'}`">
                <!-- 字段标签 -->
                <span v-if="showFieldLabels" class="you-list__field-label">{{ field.label }}:</span>

                <!-- 字段值 -->
                <div class="you-list__field-value">
                  <!-- 自定义字段插槽 -->
                  <slot v-if="field.slotName" :name="field.slotName" :item="item" :field="field" :index="index"></slot>

                  <!-- 默认字段渲染 -->
                  <template v-else>
                    <span v-if="field.type === 'text' || !field.type">{{ item[field.key] }}</span>
                    <img v-else-if="field.type === 'image'" :src="item[field.key]" class="you-list__image" />
                    <span v-else-if="field.type === 'price'" class="you-list__price">¥{{ item[field.key] }}</span>
                    <span v-else-if="field.type === 'status'" class="you-list__status"
                      :class="`you-list__status--${item[field.key]}`">
                      {{ item[field.key] }}
                    </span>
                    <span v-else>{{ item[field.key] }}</span>
                  </template>
                </div>
              </div>
            </div>

            <!-- 操作区域 -->
            <div v-if="showActions" class="you-list__actions">
              <slot name="actions" :item="item" :index="index">
                <div class="you-list__arrow">
              <div class="you-list__arrow-icon"></div>
            </div>
              </slot>
            </div>
          </div>
        </slot>
      </div>
    </div>

    <!-- 瀑布流加载状态 -->
    <div v-if="data.length > 0" class="you-list__waterfall-status">
      <!-- 加载中 -->
      <div v-if="loading" class="you-list__waterfall-loading">
        <div class="you-list__waterfall-loading-text">{{ loadingText || '加载中...' }}</div>
      </div>
      
      <!-- 加载错误 -->
      <div v-else-if="error" class="you-list__waterfall-error" @click="handleRetry">
        <div class="you-list__waterfall-error-text">{{ errorText || '加载失败，点击重试' }}</div>
      </div>
      
      <!-- 加载完成 -->
      <div v-else-if="finished" class="you-list__waterfall-finished">
        <div class="you-list__waterfall-finished-text">{{ finishedText || '没有更多了' }}</div>
      </div>
    </div>

    <!-- 兼容旧版加载更多 -->
    <div v-if="showLoadMore && !loading && !finished && !error" class="you-list__load-more" @click="handleLoadMore">
      <div class="you-list__load-more-text">{{ loadMoreText || '加载更多' }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue'
import type { DataItem, FieldConfig } from '../../types'

interface Props {
  /** 列表数据 */
  data: DataItem[]
  /** 字段配置 */
  fields: FieldConfig[]
  /** 是否可选择 */
  selectable?: boolean
  /** 已选择的行 */
  selectedRows?: DataItem[]
  /** 行键值字段 */
  rowKey?: string
  /** 是否可点击 */
  clickable?: boolean
  /** 是否显示字段标签 */
  showFieldLabels?: boolean
  /** 是否显示操作区域 */
  showActions?: boolean
  /** 是否显示加载更多 */
  showLoadMore?: boolean
  /** 是否显示全选按钮 */
  showSelectAll?: boolean
  /** 加载状态 */
  loading?: boolean
  /** 加载错误状态 */
  error?: boolean
  /** 是否已加载完成 */
  finished?: boolean
  /** 滚动条与底部距离小于offset时触发load事件 */
  offset?: number | string
  /** 加载文本 */
  loadingText?: string
  /** 空数据文本 */
  emptyText?: string
  /** 加载更多文本 */
  loadMoreText?: string
  /** 加载完成后的提示文案 */
  finishedText?: string
  /** 加载失败后的提示文案 */
  errorText?: string
  /** 是否在初始化时立即执行滚动位置检查 */
  immediateCheck?: boolean
  /** 滚动触发加载的方向 */
  direction?: 'up' | 'down'
  /** 自定义类名 */
  customClass?: string
  /** 自定义样式 */
  customStyle?: string | Record<string, any>
}

interface Emits {
  (e: 'update:selectedRows', rows: DataItem[]): void
  (e: 'update:loading', loading: boolean): void
  (e: 'update:error', error: boolean): void
  (e: 'itemClick', item: DataItem, index: number): void
  (e: 'loadMore'): void
  (e: 'load'): void
  (e: 'retry'): void
}

const props = withDefaults(defineProps<Props>(), {
  selectable: false,
  selectedRows: () => [],
  rowKey: 'id',
  clickable: true,
  showFieldLabels: false,
  showActions: true,
  showLoadMore: false,
  showSelectAll: true,
  loading: false,
  error: false,
  finished: false,
  offset: 300,
  immediateCheck: true,
  direction: 'down',
})

const emit = defineEmits<Emits>()

// 列表容器引用
const listRef = ref<HTMLElement>()

// 主要显示的字段（排除图片等辅助字段）
const mainFields = computed(() => {
  return props.fields.filter(field => field.type !== 'image' || field.key === 'avatar')
})

// 获取行键值
const getRowKey = (item: DataItem, index: number): string | number => {
  return item[props.rowKey] || index
}

// 判断行是否被选中
const isRowSelected = (item: DataItem): boolean => {
  return props.selectedRows.some(row => getRowKey(row, 0) === getRowKey(item, 0))
}

// 是否全选
const isAllSelected = computed(() => {
  return props.data.length > 0 && props.selectedRows.length === props.data.length
})

// 是否半选状态
const isIndeterminate = computed(() => {
  return props.selectedRows.length > 0 && props.selectedRows.length < props.data.length
})

// 处理行选择
const handleRowSelect = (item: DataItem, event: Event) => {
  const target = event.target as HTMLInputElement
  let newSelectedRows = [...props.selectedRows]

  if (target.checked) {
    if (!isRowSelected(item)) {
      newSelectedRows.push(item)
    }
  } else {
    newSelectedRows = newSelectedRows.filter(row => getRowKey(row, 0) !== getRowKey(item, 0))
  }

  emit('update:selectedRows', newSelectedRows)
}

// 处理项目点击
const handleItemClick = (item: DataItem, index: number) => {
  if (props.clickable) {
    emit('itemClick', item, index)
  }
}

// 处理全选
const handleSelectAll = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.checked) {
    // 全选
    emit('update:selectedRows', [...props.data])
  } else {
    // 取消全选
    emit('update:selectedRows', [])
  }
}

// 处理滚动事件
const handleScroll = () => {
  if (props.loading || props.finished || props.error) {
    return
  }

  const container = listRef.value
  if (!container) return

  const { scrollTop, scrollHeight, clientHeight } = container
  const offset = Number(props.offset)

  if (props.direction === 'down') {
    // 向下滚动加载
    if (scrollHeight - scrollTop - clientHeight <= offset) {
      emit('load')
    }
  } else {
    // 向上滚动加载
    if (scrollTop <= offset) {
      emit('load')
    }
  }
}

// 处理重试
const handleRetry = () => {
  emit('update:error', false)
  emit('retry')
  emit('load')
}

// 处理加载更多（兼容旧版）
const handleLoadMore = () => {
  emit('loadMore')
}

// 初始化检查
onMounted(() => {
  if (props.immediateCheck) {
    nextTick(() => {
      handleScroll()
    })
  }
})
</script>

<style lang="scss" scoped>
.you-list {
  width: 100%;
  background: #fff;
  overflow-y: auto;

  &__select-all {
    padding: 24rpx 32rpx;
    border-bottom: 1rpx solid #f0f0f0;
    background: #fafafa;
  }

  &__select-all-checkbox {
    display: flex;
    align-items: center;
    
    input[type="checkbox"] {
      margin-right: 16rpx;
      width: 32rpx;
      height: 32rpx;
    }
  }

  &__select-all-text {
    font-size: 28rpx;
    color: #333;
    font-weight: 500;
  }

  &__select-count {
    color: #666;
    font-weight: normal;
    margin-left: 8rpx;
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 24rpx 32rpx;
    border-bottom: 1rpx solid #f0f0f0;
    transition: background-color 0.2s;

    &:last-child {
      border-bottom: none;
    }

    &--clickable {
      cursor: pointer;

      &:active {
        background: #f8f9fa;
      }
    }

    &--selected {
      background: #e3f2fd;
    }
  }

  &__checkbox {
    margin-right: 24rpx;
    flex-shrink: 0;
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__default-layout {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__main {
    flex: 1;
    min-width: 0;
  }

  &__field {
    display: flex;
    align-items: center;
    margin-bottom: 8rpx;

    &:last-child {
      margin-bottom: 0;
    }

    &--text {
      .you-list__field-value {
        font-size: 28rpx;
        color: #333;
      }
    }

    &--price {
      .you-list__field-value {
        font-size: 32rpx;
        font-weight: 600;
      }
    }

    &--status {
      .you-list__field-value {
        font-size: 24rpx;
      }
    }
  }

  &__field-label {
    font-size: 24rpx;
    color: #666;
    margin-right: 16rpx;
    flex-shrink: 0;
    min-width: 120rpx;
  }

  &__field-value {
    flex: 1;
    min-width: 0;
    word-break: break-all;
  }

  &__image {
    width: 80rpx;
    height: 80rpx;
    object-fit: cover;
    border-radius: 8rpx;
  }

  &__price {
    color: #dc3545;
    font-weight: 600;
  }

  &__status {
    padding: 6rpx 12rpx;
    border-radius: 16rpx;
    font-size: 22rpx;
    font-weight: 500;

    &--success {
      background: #d4edda;
      color: #155724;
    }

    &--warning {
      background: #fff3cd;
      color: #856404;
    }

    &--danger {
      background: #f8d7da;
      color: #721c24;
    }

    &--info {
      background: #d1ecf1;
      color: #0c5460;
    }
  }

  &__actions {
    margin-left: 24rpx;
    flex-shrink: 0;
  }

  &__arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 16rpx;
    width: 32rpx;
    height: 32rpx;
    flex-shrink: 0;
  }

  &__arrow-icon {
    width: 12rpx;
    height: 12rpx;
    border-top: 2rpx solid var(--y-color-text-tertiary, #c8c9cc);
    border-right: 2rpx solid var(--y-color-text-tertiary, #c8c9cc);
    transform: rotate(45deg);
    transition: border-color 0.2s ease;
  }

  &__loading,
  &__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80rpx 32rpx;
    color: #6c757d;
  }

  &__loading-text,
  &__empty-text {
    font-size: 28rpx;
  }

  &__load-more {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32rpx;
    background: #f8f9fa;
    cursor: pointer;
    transition: background-color 0.2s;

    &:active {
      background: #e9ecef;
    }
  }

  &__load-more-text {
    font-size: 28rpx;
    color: #007bff;
  }

  &__waterfall-status {
    padding: 32rpx;
    text-align: center;
  }

  &__waterfall-loading,
  &__waterfall-finished {
    color: #6c757d;
  }

  &__waterfall-loading-text,
  &__waterfall-finished-text {
    font-size: 28rpx;
  }

  &__waterfall-error {
    color: #dc3545;
    cursor: pointer;
    transition: opacity 0.2s;

    &:active {
      opacity: 0.7;
    }
  }

  &__waterfall-error-text {
    font-size: 28rpx;
  }
}
</style>
