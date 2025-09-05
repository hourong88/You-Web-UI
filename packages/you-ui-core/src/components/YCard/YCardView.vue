<template>
  <div class="you-card-view" :class="customClass" :style="customStyle">
    <!-- 加载状态 -->
    <div v-if="loading" class="you-card-view__loading">
      <div class="you-card-view__loading-text">{{ loadingText || '加载中...' }}</div>
    </div>

    <!-- 空数据状态 -->
    <div v-else-if="!data || data.length === 0" class="you-card-view__empty">
      <div class="you-card-view__empty-text">{{ emptyText || '暂无数据' }}</div>
    </div>

    <!-- 卡片网格 -->
    <div v-else class="you-card-view__grid" :class="`you-card-view__grid--${columns}`">
      <div v-for="(item, index) in data" :key="getRowKey(item, index)" class="you-card-view__card" :class="{
        'you-card-view__card--selected': isRowSelected(item),
        'you-card-view__card--clickable': clickable,
      }" @click="handleItemClick(item, index)">
        <!-- 选择框 -->
        <div v-if="selectable" class="you-card-view__checkbox">
          <input type="checkbox" :checked="isRowSelected(item)" @change="handleRowSelect(item, $event)" @click.stop />
        </div>

        <!-- 卡片内容 -->
        <div class="you-card-view__content">
          <!-- 自定义插槽 -->
          <slot name="card" :item="item" :index="index" :fields="fields">
            <!-- 默认卡片布局 -->
            <div class="you-card-view__default-layout">
              <!-- 图片区域 -->
              <div v-if="imageField" class="you-card-view__image-container">
                <img :src="item[imageField.key]" :alt="imageField.label" class="you-card-view__image" />
              </div>

              <!-- 信息区域 -->
              <div class="you-card-view__info">
                <div v-for="field in textFields" :key="field.key" class="you-card-view__field"
                  :class="`you-card-view__field--${field.type || 'text'}`">
                  <!-- 字段标签 -->
                  <span v-if="showFieldLabels" class="you-card-view__field-label">{{ field.label }}:</span>

                  <!-- 字段值 -->
                  <div class="you-card-view__field-value">
                    <!-- 自定义字段插槽 -->
                    <slot v-if="field.slotName" :name="field.slotName" :item="item" :field="field" :index="index">
                    </slot>

                    <!-- 默认字段渲染 -->
                    <template v-else>
                      <span v-if="field.type === 'text' || !field.type">{{ item[field.key] }}</span>
                      <span v-else-if="field.type === 'price'" class="you-card-view__price">¥{{ item[field.key]
                        }}</span>
                      <span v-else-if="field.type === 'status'" class="you-card-view__status"
                        :class="`you-card-view__status--${item[field.key]}`">
                        {{ item[field.key] }}
                      </span>
                      <span v-else>{{ item[field.key] }}</span>
                    </template>
                  </div>
                </div>
              </div>

              <!-- 操作区域 -->
              <div v-if="showActions" class="you-card-view__actions">
                <slot name="actions" :item="item" :index="index">
                  <!-- 默认操作按钮 -->
                </slot>
              </div>
            </div>
          </slot>
        </div>
      </div>
    </div>

    <!-- 加载更多 -->
    <div v-if="showLoadMore && !loading" class="you-card-view__load-more" @click="handleLoadMore">
      <div class="you-card-view__load-more-text">{{ loadMoreText || '加载更多' }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DataItem, FieldConfig } from '../../types'

interface Props {
  /** 卡片数据 */
  data: DataItem[]
  /** 字段配置 */
  fields: FieldConfig[]
  /** 列数 */
  columns?: 1 | 2 | 3 | 4
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
  /** 加载状态 */
  loading?: boolean
  /** 加载文本 */
  loadingText?: string
  /** 空数据文本 */
  emptyText?: string
  /** 加载更多文本 */
  loadMoreText?: string
  /** 自定义类名 */
  customClass?: string
  /** 自定义样式 */
  customStyle?: string | Record<string, any>
}

interface Emits {
  (e: 'update:selectedRows', rows: DataItem[]): void
  (e: 'itemClick', item: DataItem, index: number): void
  (e: 'loadMore'): void
}

const props = withDefaults(defineProps<Props>(), {
  columns: 2,
  selectable: false,
  selectedRows: () => [],
  rowKey: 'id',
  clickable: true,
  showFieldLabels: false,
  showActions: false,
  showLoadMore: false,
  loading: false,
})

const emit = defineEmits<Emits>()

// 图片字段
const imageField = computed(() => {
  return props.fields.find(field => field.type === 'image')
})

// 文本字段（排除图片字段）
const textFields = computed(() => {
  return props.fields.filter(field => field.type !== 'image')
})

// 获取行键值
const getRowKey = (item: DataItem, index: number): string | number => {
  return item[props.rowKey] || index
}

// 判断行是否被选中
const isRowSelected = (item: DataItem): boolean => {
  return props.selectedRows.some(row => getRowKey(row, 0) === getRowKey(item, 0))
}

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

// 处理加载更多
const handleLoadMore = () => {
  emit('loadMore')
}
</script>

<style lang="scss" scoped>
.you-card-view {
  width: 100%;
  padding: 24rpx;

  &__grid {
    display: grid;
    gap: 24rpx;

    &--1 {
      grid-template-columns: 1fr;
    }

    &--2 {
      grid-template-columns: repeat(2, 1fr);
    }

    &--3 {
      grid-template-columns: repeat(3, 1fr);
    }

    &--4 {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__card {
    background: #fff;
    border-radius: 16rpx;
    overflow: hidden;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
    position: relative;

    &--clickable {
      cursor: pointer;

      &:active {
        transform: scale(0.98);
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.15);
      }
    }

    &--selected {
      border: 4rpx solid #007bff;
      box-shadow: 0 4rpx 16rpx rgba(0, 123, 255, 0.3);
    }
  }

  &__checkbox {
    position: absolute;
    top: 16rpx;
    right: 16rpx;
    z-index: 10;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    padding: 8rpx;
  }

  &__content {
    width: 100%;
  }

  &__default-layout {
    display: flex;
    flex-direction: column;
  }

  &__image-container {
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;

    .you-card-view__card--clickable:hover & {
      transform: scale(1.05);
    }
  }

  &__info {
    padding: 24rpx;
    flex: 1;
  }

  &__field {
    display: flex;
    align-items: flex-start;
    margin-bottom: 12rpx;

    &:last-child {
      margin-bottom: 0;
    }

    &--text {
      .you-card-view__field-value {
        font-size: 26rpx;
        color: #333;
        line-height: 1.4;
      }
    }

    &--price {
      .you-card-view__field-value {
        font-size: 30rpx;
        font-weight: 600;
      }
    }

    &--status {
      .you-card-view__field-value {
        font-size: 22rpx;
      }
    }
  }

  &__field-label {
    font-size: 22rpx;
    color: #666;
    margin-right: 12rpx;
    flex-shrink: 0;
    min-width: 80rpx;
  }

  &__field-value {
    flex: 1;
    min-width: 0;
    word-break: break-all;
  }

  &__price {
    color: #dc3545;
    font-weight: 600;
  }

  &__status {
    padding: 4rpx 8rpx;
    border-radius: 12rpx;
    font-size: 20rpx;
    font-weight: 500;
    display: inline-block;

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
    padding: 16rpx 24rpx;
    border-top: 1rpx solid #f0f0f0;
    background: #f8f9fa;
  }

  &__loading,
  &__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 120rpx 32rpx;
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
    padding: 40rpx;
    margin-top: 24rpx;
    background: #f8f9fa;
    border-radius: 16rpx;
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
}

// 响应式适配
@media (max-width: 480px) {
  .you-card-view {
    &__grid {

      &--3,
      &--4 {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
}
</style>
