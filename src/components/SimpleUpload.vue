<template>
  <form enctype="multipart/form-data">
    <div class="field">
      <input type="file" ref="file" style="display: none" />
      <md-button @click="$refs.file.click()" class="md-icon-button md-raised pull-right">
        <md-icon>attach_file</md-icon>
      </md-button>
    </div>
  </form>
</template>

<script>
export default {
  name: "SimpleUpload"
};
</script>

<style scoped>
</style>

