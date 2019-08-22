<template>
  <form enctype="multipart/form-data">
    <div class="field">
      <input type="file" @change="selectFile" ref="file" style="display: none" />
      <md-button @click="$refs.file.click()" class="md-icon-button md-raised pull-right">
        <md-icon>attach_file</md-icon>
      </md-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      file: ""
    };
  },
  name: "SimpleUpload",
  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0];
    }
  }
};
</script>

<style scoped>
</style>

