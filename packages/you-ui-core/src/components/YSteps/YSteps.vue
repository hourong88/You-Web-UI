<template>
  <div class="y-steps" :class="{ 'y-steps--vertical': direction === 'column' }">
    <div 
      v-for="(item, index) in items"
      :key="index"
      class="y-step"
      :class="{
        'y-step--active': index <= current && item.status !== 'error',
        'y-step--current': index === current && item.status !== 'error',
        'y-step--error': item.status === 'error'
      }"
      @click="handleClick(index)"
    >
      <!-- 步骤内容 -->
      <div class="y-step__content">
        <div class="y-step__title">{{ item[titleField] }}</div>
        <div v-if="item[descField]" class="y-step__description">{{ item[descField] }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface StepItem {
  title?: string
  desc?: string
  icon?: string
  status?: 'wait' | 'process' | 'finish' | 'error'
  [key: string]: any
}

export interface YStepsProps {
  /** 当前步骤索引 */
  current?: number
  /** 步骤类型：dot-圆点 number-数字 */
  type?: 'dot' | 'number'
  /** 方向：row-水平 column-垂直 */
  direction?: 'row' | 'column'
  /** 步骤数据 */
  items?: StepItem[]
  /** 标题字段名 */
  titleField?: string
  /** 描述字段名 */
  descField?: string
  /** 主题色 */
  color?: string
  /** 圆圈大小 */
  size?: number
  /** 连接线粗细 */
  lineWidth?: number
}

const props = withDefaults(defineProps<YStepsProps>(), {
  current: 0,
  type: 'dot',
  direction: 'row',
  items: () => [],
  titleField: 'title',
  descField: 'desc',
  color: '#1890ff',
  size: 12,
  lineWidth: 2
})

const emit = defineEmits<{
  click: [{ index: number }]
}>()

const handleClick = (index: number) => {
  emit('click', { index })
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.y-steps {
  display: flex;
  width: 100%;
  list-style: none;
  counter-reset: steps;
  padding: 0;
  margin: 0;
  
  &--vertical {
    flex-direction: column;
  }
}

.y-step {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  cursor: pointer;
  
  // 步骤圆圈（使用 ::before 伪元素）
  &::before {
    content: counter(steps);
    counter-increment: steps;
    
    width: v-bind('size + "px"');
    height: v-bind('size + "px"');
    background: #d9d9d9;
    border-radius: 50%;
    margin: 0;
    
    display: flex;
    color: white;
    justify-content: center;
    align-items: center;
    font-size: v-bind('Math.max(10, size * 0.6) + "px"');
    font-weight: 600;
    position: relative;
    z-index: 2;
    
    transition: all 0.3s ease;
  }
  
  // 连接线（使用 ::after 伪元素）
  &:nth-child(n+2)::after {
    content: '';
    height: v-bind('lineWidth + "px"');
    width: 100%;
    background: #d9d9d9;
    position: absolute;
    left: -50%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    transition: all 0.3s ease;
  }
  
  // 激活状态
  &--active {
    &::before {
      background: v-bind(color);
      color: white;
    }
    
    &:nth-child(n+2)::after {
      background: v-bind(color);
    }
  }
  
  // 错误状态 - 优先级更高，覆盖激活状态
  &--error {
    &::before {
      background: #ff4d4f !important;
      color: white !important;
      content: '✕' !important;
    }
    
    &:nth-child(n+2)::after {
      background: #ff4d4f !important;
    }
    
    // 错误步骤后面的连接线也应该是红色
    & + .y-step:nth-child(n+2)::after {
      background: #ff4d4f !important;
    }
  }
  
  // 当前步骤（正在进行中）
  &--current {
    &::before {
      background: v-bind(color);
      color: white;
      content: '✓';
    }
  }
}

.y-step__content {
  position: absolute;
  top: v-bind('(size + 10) + "px"');
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  white-space: nowrap;
  min-width: 80px;
}

.y-step__title {
  font-size: 14px;
  font-weight: 400;
  color: #666;
  margin-bottom: 2px;
  
  .y-step--active & {
    color: v-bind(color);
    font-weight: 500;
  }
  
  .y-step--current & {
    color: v-bind(color);
    font-weight: 500;
  }
  
  .y-step--error & {
    color: #ff4d4f;
  }
}

.y-step__description {
  font-size: 12px;
  color: #999;
  line-height: 1.2;
  
  .y-step--active & {
    color: #999;
  }
  
  .y-step--current & {
    color: #999;
  }
  
  .y-step--error & {
    color: #ff4d4f;
  }
}

// 垂直布局样式
.y-steps--vertical {
  .y-step {
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0 0 24px 0;
    position: relative;
    
    &::before {
      margin: 0 16px 0 0;
      flex-shrink: 0;
      position: relative;
      z-index: 2;
    }
    
    // 垂直连接线
    &::after {
      content: '';
      width: v-bind('lineWidth + "px"');
      height: calc(100% - 8px);
      background: #d9d9d9;
      position: absolute;
      top: v-bind('size + "px"');
      left: v-bind('(size / 2 - lineWidth / 2) + "px"');
      z-index: 1;
      transition: all 0.3s ease;
    }
    
    // 激活状态的连接线
    &--active::after {
      background: v-bind(color);
    }
    
    // 错误状态的连接线
    &--error::after {
      background: #ff4d4f;
    }
    
    // 最后一个步骤不显示连接线
    &:last-child::after {
      display: none;
    }
    
    // 重置水平连接线
    &:nth-child(n+2)::after {
      content: '';
      width: v-bind('lineWidth + "px"');
      height: calc(100% - 8px);
      background: #d9d9d9;
      position: absolute;
      top: v-bind('size + "px"');
      left: v-bind('(size / 2 - lineWidth / 2) + "px"');
      transform: none;
      z-index: 1;
    }
  }
  
  .y-step__content {
    position: static;
    transform: none;
    text-align: left;
    white-space: normal;
    min-width: auto;
    flex: 1;
    padding-top: 2px;
  }
  
  .y-step__title {
    font-size: 16px;
    font-weight: 500;
    color: #323233;
    margin-bottom: 8px;
    line-height: 1.4;
    
    .y-step--active & {
      color: v-bind(color);
    }
    
    .y-step--current & {
      color: v-bind(color);
    }
    
    .y-step--error & {
      color: #ff4d4f;
    }
  }
  
  .y-step__description {
    font-size: 14px;
    color: #969799;
    line-height: 1.4;
    margin: 0;
    
    .y-step--error & {
      color: #ff4d4f;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .y-step {
    &::before {
      width: v-bind('Math.max(10, size - 2) + "px"');
      height: v-bind('Math.max(10, size - 2) + "px"');
      font-size: v-bind('Math.max(8, (size - 2) * 0.6) + "px"');
    }
  }
  
  .y-step__content {
    top: v-bind('(size + 8) + "px"');
    min-width: 60px;
  }
  
  .y-step__title {
    font-size: 13px;
  }
  
  .y-step__description {
    font-size: 11px;
  }
}
</style>