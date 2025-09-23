<template>
  <div class="y-countdown-box">
    <!-- 天数 -->
    <div
      v-if="days"
      class="y-countdown-item"
      :style="{
        background: backgroundColor,
        borderColor: borderColor,
        width: getWidth(d, width) + 'px',
        height: height + 'px'
      }"
    >
      <div
        class="y-countdown-time"
        :class="{ 'y-countdown-scale': scale }"
        :style="{
          fontSize: size + 'px',
          color: color,
          lineHeight: size + 'px'
        }"
      >
        {{ d }}
      </div>
    </div>
    <div
      v-if="days"
      class="y-countdown-colon"
      :class="{ 'y-colon-pad': borderColor === 'transparent' }"
      :style="{
        lineHeight: colonSize + 'px',
        fontSize: colonSize + 'px',
        color: colonColor
      }"
    >
      {{ isColon ? ':' : '天' }}
    </div>

    <!-- 小时 -->
    <div
      v-if="hours"
      class="y-countdown-item"
      :style="{
        background: backgroundColor,
        borderColor: borderColor,
        width: getWidth(h, width) + 'px',
        height: height + 'px'
      }"
    >
      <div
        class="y-countdown-time"
        :class="{ 'y-countdown-scale': scale }"
        :style="{
          fontSize: size + 'px',
          color: color,
          lineHeight: size + 'px'
        }"
      >
        {{ h }}
      </div>
    </div>
    <div
      v-if="hours"
      class="y-countdown-colon"
      :class="{ 'y-colon-pad': borderColor === 'transparent' }"
      :style="{
        lineHeight: colonSize + 'px',
        fontSize: colonSize + 'px',
        color: colonColor
      }"
    >
      {{ isColon ? ':' : '时' }}
    </div>

    <!-- 分钟 -->
    <div
      v-if="minutes"
      class="y-countdown-item"
      :style="{
        background: backgroundColor,
        borderColor: borderColor,
        width: getWidth(i, width) + 'px',
        height: height + 'px'
      }"
    >
      <div
        class="y-countdown-time"
        :class="{ 'y-countdown-scale': scale }"
        :style="{
          fontSize: size + 'px',
          color: color,
          lineHeight: size + 'px'
        }"
      >
        {{ i }}
      </div>
    </div>
    <div
      v-if="minutes"
      class="y-countdown-colon"
      :class="{ 'y-colon-pad': borderColor === 'transparent' }"
      :style="{
        lineHeight: colonSize + 'px',
        fontSize: colonSize + 'px',
        color: colonColor
      }"
    >
      {{ isColon ? ':' : '分' }}
    </div>

    <!-- 秒数 -->
    <div
      v-if="seconds"
      class="y-countdown-item"
      :style="{
        background: backgroundColor,
        borderColor: borderColor,
        width: getWidth(s, width) + 'px',
        height: height + 'px'
      }"
    >
      <div
        class="y-countdown-time"
        :class="{ 'y-countdown-scale': scale }"
        :style="{
          fontSize: size + 'px',
          color: color,
          lineHeight: size + 'px'
        }"
      >
        {{ s }}
      </div>
    </div>
    <div
      v-if="seconds && !isColon"
      class="y-countdown-colon"
      :class="{ 'y-colon-pad': borderColor === 'transparent' }"
      :style="{
        lineHeight: colonSize + 'px',
        fontSize: colonSize + 'px',
        color: colonColor
      }"
    >
      {{ unitEn ? 's' : '秒' }}
    </div>

    <!-- 毫秒分隔符 -->
    <div
      v-if="seconds && isMs && isColon"
      class="y-countdown-colon"
      :style="{
        lineHeight: colonSize + 'px',
        fontSize: colonSize + 'px',
        color: colonColor
      }"
    >
      .
    </div>

    <!-- 毫秒 -->
    <div
      v-if="seconds && isMs"
      class="y-countdown__ms"
      :style="{
        background: backgroundColor,
        borderColor: borderColor,
        fontSize: msSize + 'px',
        color: msColor,
        height: height + 'px',
        width: msWidth > 0 ? msWidth + 'px' : 'auto'
      }"
    >
      <div :class="{ 'y-ms__list': ani }">
        <div
          v-for="(item, index) in ms"
          :key="index"
          class="y-ms__item"
          :style="{ height: height + 'px' }"
        >
          <div :class="{ 'y-countdown-scale': scale }">
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

export interface YCountdownProps {
  /** 数字框宽度，单位px */
  width?: number
  /** 数字框高度，单位px */
  height?: number
  /** 数字框border颜色 */
  borderColor?: string
  /** 数字框背景颜色 */
  backgroundColor?: string
  /** 数字框字体大小，单位px */
  size?: number
  /** 数字框字体颜色 */
  color?: string
  /** 是否缩放 0.9 */
  scale?: boolean
  /** 冒号大小，单位px */
  colonSize?: number
  /** 冒号颜色 */
  colonColor?: string
  /** 剩余时间 (单位：秒) */
  time?: number | string
  /** 是否包含天 */
  days?: boolean
  /** 是否包含小时 */
  hours?: boolean
  /** 是否包含分钟 */
  minutes?: boolean
  /** 是否包含秒 */
  seconds?: boolean
  /** 单位用英文缩写表示 仅seconds秒数有效 */
  unitEn?: boolean
  /** 是否展示为冒号,false为文字 */
  isColon?: boolean
  /** 是否返回剩余时间 */
  returnTime?: boolean
  /** 是否显示毫秒 */
  isMs?: boolean
  /** 毫秒框宽度，单位px */
  msWidth?: number
  /** 毫秒字体大小，单位px */
  msSize?: number
  /** 毫秒字体颜色 */
  msColor?: string
}

const props = withDefaults(defineProps<YCountdownProps>(), {
  width: 32,
  height: 32,
  borderColor: '#333',
  backgroundColor: '#fff',
  size: 24,
  color: '#333',
  scale: false,
  colonSize: 28,
  colonColor: '#333',
  time: 0,
  days: false,
  hours: true,
  minutes: true,
  seconds: true,
  unitEn: false,
  isColon: true,
  returnTime: false,
  isMs: false,
  msWidth: 32,
  msSize: 24,
  msColor: '#333'
})

const emit = defineEmits<{
  end: []
  time: [{ seconds: number }]
}>()

// 响应式数据
const countdown = ref<NodeJS.Timeout | null>(null)
const d = ref('0')
const h = ref('00')
const i = ref('00')
const s = ref('00')
const ms = ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
const ani = ref(false)

// 计算数字框宽度
const getWidth = (num: string | number, width: number): number => {
  const numStr = num.toString()
  return Number(numStr) > 99 ? (width / 2) * numStr.length : width
}

// 清除定时器
const clearTimer = () => {
  if (countdown.value) {
    clearInterval(countdown.value)
    countdown.value = null
  }
}

// 倒计时结束
const endOfTime = (isStop = false) => {
  ani.value = false
  clearTimer()
  if (!isStop) {
    emit('end')
  }
}

// 开始倒计时循环
const doLoop = (time = 0) => {
  let seconds = time || Number(props.time || 0)
  ani.value = true
  countDown(seconds)
  
  countdown.value = setInterval(() => {
    seconds--
    countDown(seconds)
    
    if (props.returnTime) {
      emit('time', { seconds })
    }
    
    if (seconds <= 0) {
      endOfTime()
      return
    }
  }, 1000)
}

// 倒计时计算
const countDown = (seconds: number) => {
  let [day, hour, minute, second] = [0, 0, 0, 0]
  
  if (seconds > 0) {
    day = props.days ? Math.floor(seconds / (60 * 60 * 24)) : 0
    hour = props.hours ? Math.floor(seconds / (60 * 60)) - day * 24 : 0
    minute = props.minutes ? Math.floor(seconds / 60) - hour * 60 - day * 24 * 60 : 0
    second = Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60
  }
  
  const hourStr = hour < 10 ? '0' + hour : hour.toString()
  const minuteStr = minute < 10 ? '0' + minute : minute.toString()
  const secondStr = second < 10 ? '0' + second : second.toString()
  
  d.value = day.toString()
  h.value = hourStr
  i.value = minuteStr
  s.value = secondStr
}

// 重置倒计时
const reset = (seconds = 0) => {
  const time = seconds || Number(props.time)
  clearTimer()
  if (time > 0) {
    doLoop(time)
  }
}

// 监听时间变化
watch(() => props.time, () => {
  clearTimer()
  doLoop()
})

// 组件挂载
onMounted(() => {
  clearTimer()
  const seconds = Number(props.time || 0)
  if (seconds > 0) {
    doLoop()
  }
})

// 组件卸载
onBeforeUnmount(() => {
  clearTimer()
})

// 暴露方法
defineExpose({
  reset,
  clearTimer
})
</script>

<style scoped lang="scss">
.y-countdown-box {
  display: flex;
  align-items: center;
}

.y-countdown-item {
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  white-space: nowrap;
  transform: translateZ(0);
}

.y-countdown-time {
  margin: 0;
  padding: 0;
}

.y-countdown-colon {
  display: flex;
  justify-content: center;
  padding: 0 2.5px;
}

.y-colon-pad {
  padding: 0 !important;
}

.y-countdown-scale {
  transform: scale(0.9);
  transform-origin: center center;
}

.y-countdown__ms {
  border: 1px solid;
  overflow: hidden;
  border-radius: 3px;
}

/* ms使用css3代替js频繁更新操作，性能优化 */
.y-ms__list {
  animation: loop 1s steps(10) infinite;
}

@keyframes loop {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
}

.y-ms__item {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>