<template>
  <section class="pptx-parser-module">
    <input
      type="file"
      id="fileInput"
      test-id="pptx-file-input"
      accept=".pptx"
      @change="onFileInputChange"
    />
  </section>
</template>

<script setup>
import { readZipFile } from "./utils/zip_file.js";

const onFileInputChange = async ({ target }) => {
  const file = target.files[0];
  await readZipFile(file)
};
</script>
