<template>
  <view class="y-card" :class="[full ? 'y-card--full' : '', border ? 'y-card--border' : '']" @tap="handleClick"
    @longpress="handleLongClick">
    <slot>
      <view class="y-card-header" :class="{ 'y-card-header--line': header.line }"
        :style="{ background: header.bgcolor || '#fff' }">
        <view class="y-card-header-left">
          <slot name="image">
            <img :src="imageUrl || image.url" class="y-card-image" :class="{ 'y-card-image--circle': image.circle }"
              mode="aspectFill" v-if="imageUrl || image.url"
              :style="{ height: (image.height || 60) + 'rpx', width: (image.width || 60) + 'rpx' }"
              @load="handleImageLoad" @error="handleImageError" />
          </slot>
          <text class="y-card-title" :style="{ fontSize: (title.size || 30) + 'rpx', color: title.color || '#7A7A7A' }"
            v-if="titleText || title.text">
            {{ titleText || title.text }}
          </text>
        </view>
        <view class="y-card-header-right" :style="{ fontSize: (tag.size || 24) + 'rpx', color: tag.color || '#b2b2b2' }"
          v-if="tagText || tag.text">
          {{ tagText || tag.text }}
        </view>
      </view>
    </slot>
    <view class="y-card-body">
      <slot name="body"></slot>
    </view>
    <view class="y-card-footer">
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
interface ImageConfig {
  url: string
  height: number
  width: number
  circle: boolean
}

interface TitleConfig {
  text: string
  size: number
  color: string
}

interface TagConfig {
  text: string
  size: number
  color: string
}

interface HeaderConfig {
  bgcolor: string
  line: boolean
}

interface YCardProps {
  full?: boolean
  imageUrl?: string
  image?: Partial<ImageConfig>
  titleText?: string
  title?: Partial<TitleConfig>
  tagText?: string
  tag?: Partial<TagConfig>
  header?: Partial<HeaderConfig>
  border?: boolean
  index?: number
}

const props = withDefaults(defineProps<YCardProps>(), {
  full: false,
  image: () => ({
    url: '',
    height: 60, // rpx
    width: 60, // rpx
    circle: true, // 默认头像为圆形
  }),
  title: () => ({
    text: '',
    size: 30, // rpx
    color: '#7A7A7A',
  }),
  tag: () => ({
    text: '',
    size: 24, // rpx
    color: '#b2b2b2',
  }),
  header: () => ({
    bgcolor: '#fff',
    line: true, // 默认有底部线条
  }),
  border: false,
  index: 0,
})

const emit = defineEmits<{
  (e: 'click', payload: { index: number }): void
  (e: 'longclick', payload: { index: number }): void
}>()

// Event handlers

const handleClick = () => {
  emit('click', { index: props.index })
}

const handleLongClick = () => {
  emit('longclick', { index: props.index })
}

const handleImageLoad = () => {
  // 图片加载完成，触发重新渲染
}

const handleImageError = () => {
  // 图片加载失败，可以在这里处理错误状态
}
</script>

<style scoped lang="scss">
@import '../../styles/variables.scss';

.y-card {
  margin: 0 $spacing-base;
  font-size: $font-size-base;
  background-color: $color-bg-primary;
  border-radius: $border-radius-base;
  box-shadow: $box-shadow-sm;
  box-sizing: border-box;
  overflow: hidden;
}

.y-card--full {
  margin: 0 !important;
  border-radius: 0 !important;
}

.y-card--full::after {
  border-radius: 0 !important;
}

.y-card--border {
  position: relative;
  box-shadow: none !important;
}

.y-card--border::after {
  content: ' ';
  position: absolute;
  height: 200%;
  width: 200%;
  border: $border-width-thin-px solid $color-border-primary;
  transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  left: 0;
  top: 0;
  border-radius: $spacing-base;
  box-sizing: border-box;
  pointer-events: none;
}

.y-card-header {
  width: 100%;
  padding: $spacing-sm;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  border-top-left-radius: $border-radius-base;
  border-top-right-radius: $border-radius-base;
}

.y-card-header::after {
  content: '';
  position: absolute;
  border-bottom: $border-width-thin solid $color-border-light;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  bottom: 0;
  right: 0;
  left: 0;
  pointer-events: none;
}

.y-card-header--line::after {
  border-bottom: 0 !important;
}

.y-card-header-left {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.y-card-image {
  height: 60rpx;
  width: 60rpx;
  vertical-align: middle;
  margin-right: $spacing-sm;
  border-radius: $border-radius-xs;
  display: block;
  object-fit: cover;
}

.y-card-image--circle {
  border-radius: 50% !important;
}

.y-card-title {
  display: inline-block;
  font-size: $font-size-base;
  color: $color-text-primary;
  vertical-align: middle;
  max-width: 460rpx;
  font-weight: $font-weight-normal;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.y-card-header-right {
  font-size: $font-size-base;
  color: $color-text-secondary;
}

.y-card-body {
  font-size: $font-size-base;
  color: $color-text-primary;
  box-sizing: border-box;
}

.y-card-footer {
  font-size: $font-size-base;
  color: $color-text-secondary;
  border-bottom-left-radius: $border-radius-base;
  border-bottom-right-radius: $border-radius-base;
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: $spacing-sm;
}
</style>
