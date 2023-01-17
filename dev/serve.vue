<script>
import Vue from 'vue';
import EkzoBasicDialog from '@/ekzo-basic-dialog.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    EkzoBasicDialog
  },
  methods:{
    dialogResultCallback(value){
      console.log(value ? 'Ok button clicked' :'Cancel button clicked');
    }
  }
});
</script>

<template>
  <div id="app">
    <ekzo-basic-dialog title="Dialog title"
      :autoShow="true"
      :showOk="true"
      :showClose="true"
      @dialog:result="dialogResultCallback"
      :closeOnClick="false"
    >
      <div>
          <p>Here is dialog content</p>
          <p>With some <b>HTML</b>.</p>
      </div>
    </ekzo-basic-dialog>
  </div>
</template>
