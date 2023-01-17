<template>
  <div class="modal" 
      :id="'modal-dialog-' + this.uid" 
      v-show="Show" 
      :class="this.cssClassesList"  ref="draggableContainer" >
      <div class="modal__wrapper"></div>
      <div class="modal__container draggable">
          <div class="modal__header" 
              @mousedown="dragMouseDown">
              {{ title }}
          </div>
          <div class="modal__content">
              <slot></slot>
          </div>
          <div class="modal__controls" 
               v-if="showOk | showClose">
              <button v-on:click="CloseCallback()" 
                      ref="closebtn" 
                      v-show="showClose" 
                      class="modal__button modal__close-btn">
                      {{cancelText}}
              </button>
              <button autofocus 
                      ref="okbtn" 
                      v-on:click="CloseCallback(true)" 
                      v-show="showOk" 
                      class="modal__button modal__confirm-btn" 
                      :class="theme">
                      {{okText}}
              </button>
          </div>
      </div>
  </div>
</template>
<script>
 export default {
  name:'ekzo-basic-dialog',
  props: {
      title: {
          type: String,
          default: undefined
      },
      theme: {
          type: String,
          default: 'default'
      },
      okText: {
          type: String,
          default: 'OK'
      },
      cancelText: {
          type: String,
          default: 'Close'
      },
      enableEsc: {
          type: Boolean,
          default: true
      },
      showOk: {
          type: Boolean,
          default: false
      },
      cssClasses:{
          type: String,
          default: ''
      },
      showClose: {
          type: Boolean,
          default: true
      },
      autoShow: {
          type: Boolean,
          default: false
      },
      closeOnClick:{
        type: Boolean,
        default: true
      }
  },
  emits: ['dialog:result'],
  data() {
      return {
          uid: Math.round(Math.random() * 10),
          Show: false,
          positions: {
              clientX: undefined,
              clientY: undefined,
              movementX: 0,
              movementY: 0
          }
      }
  },
  mounted() {
      this.init();
  },
  methods: {
      init() {
          var comp = this
          if (this.enableEsc)
              document.addEventListener('keyup', function (e) {
                  if (comp.Show && e.keyCode == 27)
                      comp.CloseCallback()
              });

          if (this.autoShow)
              this.Open()

      },
      CloseCallback: function (value = false) {
          this.$emit('dialog:result', value)
          if(this.closeOnClick)
            this.Show = false
      },
      Open: function () {
          this.Show = true;
      },
      EnableOk: function () {
          this.showOk = true;
      },
      DisableOk: function () {
          this.showOk = false;
      },
      dragMouseDown: function (event) {
          event.preventDefault()
          // get the mouse cursor position at startup:
          this.positions.clientX = event.clientX
          this.positions.clientY = event.clientY
          document.onmousemove = this.elementDrag
          document.onmouseup = this.closeDragElement
      },
      elementDrag: function (event) {
          event.preventDefault()
          this.positions.movementX = this.positions.clientX - event.clientX
          this.positions.movementY = this.positions.clientY - event.clientY
          this.positions.clientX = event.clientX
          this.positions.clientY = event.clientY
          // set the element's new position:
          this.$refs.draggableContainer.style.top = (this.$refs.draggableContainer.offsetTop - this.positions.movementY) + 'px'
          this.$refs.draggableContainer.style.left = (this.$refs.draggableContainer.offsetLeft - this.positions.movementX) + 'px'
      },
      closeDragElement() {
          document.onmouseup = null
          document.onmousemove = null
      }
  },
  computed: {
      cssClassesList() {
          var classes = []
          if(this.cssClasses.length > 0)
            classes = this.cssClasses.split(' ');
          return [ 'modal-' + this.theme, ...classes ]
      }
  },
 }
</script>
<style scoped>
  @import url('../assets/css/style.css');
</style>