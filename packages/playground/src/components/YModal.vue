<template>
  <div class="demo-page-container">
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">YModal 弹窗</text>
    </view>

    <!-- 基础用法 -->
    <div class="demo-section">
      <div class="section-title">基础用法</div>
      <div class="modal-group">
        <button class="demo-btn demo-btn--primary" @click="showBasicModal">
          基础弹窗
        </button>
        <button class="demo-btn demo-btn--primary" @click="showNoTitleModal">
          无标题弹窗
        </button>
      </div>
    </div>

    <!-- 不同类型 -->
    <div class="demo-section">
      <div class="section-title">不同类型</div>
      <div class="modal-group">
        <button class="demo-btn demo-btn--success" @click="showSuccessModal">
          成功提示
        </button>
        <button class="demo-btn demo-btn--warning" @click="showWarningModal">
          警告提示
        </button>
        <button class="demo-btn demo-btn--danger" @click="showDangerModal">
          危险提示
        </button>
      </div>
    </div>

    <!-- 自定义按钮 -->
    <div class="demo-section">
      <div class="section-title">自定义按钮</div>
      <div class="modal-group">
        <button class="demo-btn demo-btn--secondary" @click="showSingleButtonModal">
          单个按钮
        </button>
        <button class="demo-btn demo-btn--secondary" @click="showMultiButtonModal">
          多个按钮
        </button>
      </div>
    </div>

    <!-- 自定义样式 -->
    <div class="demo-section">
      <div class="section-title">自定义样式</div>
      <div class="modal-group">
        <button class="demo-btn demo-btn--secondary" @click="showCircleModal">
          圆角弹窗
        </button>
        <button class="demo-btn demo-btn--secondary" @click="showCustomSizeModal">
          自定义尺寸
        </button>
      </div>
    </div>

    <!-- 特殊功能 -->
    <div class="demo-section">
      <div class="section-title">特殊功能</div>
      <div class="modal-group">
        <button class="demo-btn demo-btn--warning" @click="showNonClosableModal">
          不可关闭
        </button>
        <button class="demo-btn demo-btn--warning" @click="showCustomModal">
          自定义内容
        </button>
      </div>
    </div>

    <!-- 弹窗组件 -->
    <YModal
      v-model:visible="modalVisible"
      :title="modalConfig.title"
      :content="modalConfig.content"
      :buttons="modalConfig.buttons"
      :shape="modalConfig.shape"
      :width="modalConfig.width"
      :padding="modalConfig.padding"
      :mask-closable="modalConfig.maskClosable"
      :custom="modalConfig.custom"
      @click="handleModalClick"
      @cancel="handleModalCancel"
    >
      <template v-if="modalConfig.custom" #default>
        <div class="custom-modal-content">
          <div class="custom-icon">🎉</div>
          <h3>自定义内容弹窗</h3>
          <p>这里可以放置任何自定义内容，比如表单、图片、复杂布局等。</p>
          <div class="custom-form">
            <input type="text" placeholder="请输入内容" class="custom-input" />
            <textarea placeholder="请输入备注" class="custom-textarea"></textarea>
          </div>
          <div class="custom-buttons">
            <button class="custom-btn custom-btn--cancel" @click="modalVisible = false">
              取消
            </button>
            <button class="custom-btn custom-btn--confirm" @click="handleCustomConfirm">
              确定
            </button>
          </div>
        </div>
      </template>
    </YModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { YModal } from '@you-web/ui-core'
import type { ModalButton } from '@you-web/ui-core'

const router = useRouter()

const goBack = () => {
  router.push('/')
}

// 弹窗显示状态
const modalVisible = ref(false)

// 弹窗配置
const modalConfig = reactive({
  title: '提示',
  content: '这是一个基础弹窗',
  buttons: [] as ModalButton[],
  shape: 'square' as 'square' | 'circle',
  width: '84%',
  padding: '40px 64px',
  maskClosable: true,
  custom: false
})

// 显示基础弹窗
const showBasicModal = () => {
  modalConfig.title = '提示'
  modalConfig.content = '这是一个基础弹窗，包含标题和内容。'
  modalConfig.buttons = [
    { text: '取消', type: 'gray', plain: false },
    { text: '确定', type: 'primary', plain: false }
  ]
  modalConfig.shape = 'square'
  modalConfig.width = '84%'
  modalConfig.padding = '40px 64px'
  modalConfig.maskClosable = true
  modalConfig.custom = false
  modalVisible.value = true
}

// 显示无标题弹窗
const showNoTitleModal = () => {
  modalConfig.title = ''
  modalConfig.content = '这是一个无标题的弹窗，只显示内容部分。'
  modalConfig.buttons = [
    { text: '知道了', type: 'primary', plain: false }
  ]
  modalConfig.shape = 'square'
  modalConfig.width = '84%'
  modalConfig.padding = '40px 64px'
  modalConfig.maskClosable = true
  modalConfig.custom = false
  modalVisible.value = true
}

// 显示成功弹窗
const showSuccessModal = () => {
  modalConfig.title = '操作成功'
  modalConfig.content = '您的操作已经成功完成！'
  modalConfig.buttons = [
    { text: '取消', type: 'gray', plain: false },
    { text: '确定', type: 'green', plain: false }
  ]
  modalConfig.shape = 'square'
  modalConfig.width = '84%'
  modalConfig.padding = '40px 64px'
  modalConfig.maskClosable = true
  modalConfig.custom = false
  modalVisible.value = true
}

// 显示警告弹窗
const showWarningModal = () => {
  modalConfig.title = '警告'
  modalConfig.content = '请注意，此操作可能会产生一些影响。'
  modalConfig.buttons = [
    { text: '取消', type: 'gray', plain: false },
    { text: '继续', type: 'warning', plain: false }
  ]
  modalConfig.shape = 'square'
  modalConfig.width = '84%'
  modalConfig.padding = '40px 64px'
  modalConfig.maskClosable = true
  modalConfig.custom = false
  modalVisible.value = true
}

// 显示危险弹窗
const showDangerModal = () => {
  modalConfig.title = '危险操作'
  modalConfig.content = '此操作不可逆，请谨慎操作！'
  modalConfig.buttons = [
    { text: '取消', type: 'gray', plain: false },
    { text: '删除', type: 'danger', plain: false }
  ]
  modalConfig.shape = 'square'
  modalConfig.width = '84%'
  modalConfig.padding = '40px 64px'
  modalConfig.maskClosable = true
  modalConfig.custom = false
  modalVisible.value = true
}

// 显示单个按钮弹窗
const showSingleButtonModal = () => {
  modalConfig.title = '通知'
  modalConfig.content = '这是一个只有一个按钮的弹窗。'
  modalConfig.buttons = [
    { text: '知道了', type: 'primary', plain: false }
  ]
  modalConfig.shape = 'square'
  modalConfig.width = '84%'
  modalConfig.padding = '40px 64px'
  modalConfig.maskClosable = true
  modalConfig.custom = false
  modalVisible.value = true
}

// 显示多个按钮弹窗
const showMultiButtonModal = () => {
  modalConfig.title = '选择操作'
  modalConfig.content = '请选择您要执行的操作。'
  modalConfig.buttons = [
    { text: '选项一', type: 'primary', plain: true },
    { text: '选项二', type: 'green', plain: true },
    { text: '选项三', type: 'warning', plain: true },
    { text: '确定', type: 'primary', plain: false }
  ]
  modalConfig.shape = 'square'
  modalConfig.width = '84%'
  modalConfig.padding = '40px 64px'
  modalConfig.maskClosable = true
  modalConfig.custom = false
  modalVisible.value = true
}

// 显示圆角弹窗
const showCircleModal = () => {
  modalConfig.title = '圆角弹窗'
  modalConfig.content = '这是一个圆角样式的弹窗。'
  modalConfig.buttons = [
    { text: '取消', type: '', plain: true },
    { text: '确定', type: 'primary', plain: false }
  ]
  modalConfig.shape = 'circle'
  modalConfig.width = '84%'
  modalConfig.padding = '40px 64px'
  modalConfig.maskClosable = true
  modalConfig.custom = false
  modalVisible.value = true
}

// 显示自定义尺寸弹窗
const showCustomSizeModal = () => {
  modalConfig.title = '自定义尺寸'
  modalConfig.content = '这是一个自定义尺寸的弹窗，宽度更小，内边距也不同。'
  modalConfig.buttons = [
    { text: '关闭', type: 'primary', plain: false }
  ]
  modalConfig.shape = 'square'
  modalConfig.width = '70%'
  modalConfig.padding = '30px 40px'
  modalConfig.maskClosable = true
  modalConfig.custom = false
  modalVisible.value = true
}

// 显示不可关闭弹窗
const showNonClosableModal = () => {
  modalConfig.title = '重要提示'
  modalConfig.content = '这个弹窗点击遮罩无法关闭，必须点击按钮才能关闭。'
  modalConfig.buttons = [
    { text: '我知道了', type: 'primary', plain: false }
  ]
  modalConfig.shape = 'square'
  modalConfig.width = '84%'
  modalConfig.padding = '40px 64px'
  modalConfig.maskClosable = false
  modalConfig.custom = false
  modalVisible.value = true
}

// 显示自定义内容弹窗
const showCustomModal = () => {
  modalConfig.title = ''
  modalConfig.content = ''
  modalConfig.buttons = []
  modalConfig.shape = 'square'
  modalConfig.width = '90%'
  modalConfig.padding = '30px'
  modalConfig.maskClosable = true
  modalConfig.custom = true
  modalVisible.value = true
}

// 处理弹窗按钮点击
const handleModalClick = ({ index }: { index: number }) => {
  const button = modalConfig.buttons[index]
  modalVisible.value = false
}

// 处理弹窗取消
const handleModalCancel = () => {
  // 弹窗取消回调
}

// 处理自定义弹窗确定
const handleCustomConfirm = () => {
  modalVisible.value = false
}
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
@import '../styles/common.scss';

.modal-group {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-base;
  align-items: center;
}

.demo-btn {
  padding: $spacing-sm $spacing-base;
  border: none;
  border-radius: $border-radius-base;
  font-size: $font-size-base;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
  
  &--primary {
    background-color: $color-primary;
    color: white;
    
    &:hover {
      opacity: 0.8;
    }
  }
  
  &--success {
    background-color: #07c160;
    color: white;
    
    &:hover {
      opacity: 0.8;
    }
  }
  
  &--warning {
    background-color: #ff7900;
    color: white;
    
    &:hover {
      opacity: 0.8;
    }
  }
  
  &--danger {
    background-color: #EB0909;
    color: white;
    
    &:hover {
      opacity: 0.8;
    }
  }
  
  &--secondary {
    background-color: #f4f4f5;
    color: #606266;
    border: 1px solid #dcdfe6;
    
    &:hover {
      background-color: #ecf5ff;
      border-color: $color-primary;
      color: $color-primary;
    }
  }
}

// 自定义弹窗内容样式
.custom-modal-content {
  text-align: center;
  
  .custom-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }
  
  h3 {
    margin: 0 0 16px 0;
    color: #333;
    font-size: 18px;
  }
  
  p {
    margin: 0 0 24px 0;
    color: #666;
    line-height: 1.5;
  }
}

.custom-form {
  margin-bottom: 24px;
  
  .custom-input,
  .custom-textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    margin-bottom: 12px;
    box-sizing: border-box;
    
    &:focus {
      outline: none;
      border-color: $color-primary;
    }
  }
  
  .custom-textarea {
    height: 80px;
    resize: vertical;
  }
}

.custom-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  
  .custom-btn {
    flex: 1;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &--cancel {
      background-color: #f4f4f5;
      color: #606266;
      
      &:hover {
        background-color: #e6e6e6;
      }
    }
    
    &--confirm {
      background-color: $color-primary;
      color: white;
      
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>