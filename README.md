# Vue Plugin
## Example is used Vue3 with TypeScript

1. 建立 Component (Create a Component)

```
<template>
  <button
    :id="id"
    :class="[className]"
    @click="clickFn"
  >
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

type TProps = {
  id: string;
  className: string;
}

export default defineComponent({
  name: 'SfButton',
  setup(props: TProps) {
    const { id, className } = ref(props).value;

    const clickFn = (evt: MouseEvent) => {
      console.log(evt);
    };
    return {
      id,
      className,
      clickFn,
    };
  },
});
</script>
<style lang="scss" scoped>
button {
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #d04a02;
  color: #d04a02;
  background-color: #fff;
  transition: .5s;

  &:hover {
    background-color: #d04a02;
    color: #fff;
  }
}
</style>
```

2.建立 install function 用於註冊插件 (Create install function using to register plugin)
```
import { App, Component } from 'vue';
import SFButton from '@/components/SFButton.vue';

const SmartFormComponents: { [key: string]: Component } = {
  [SFButton.name]: SFButton,
};

export default function install(app: App): void {
  Object.keys(SmartFormComponents).forEach((name) => {
    app.component(name, SmartFormComponents[name]);
  });
}
```
3. 編輯 build script (Edit build script in package.json)

```
// package.json
/* tips:
 *   --target app | lib | wc | wc-async (default: app)
 *   use for configure compile to what kind file
 *   用於設定要編譯成哪種類型的檔案，
 *   in here configure to library, because we will compile to plugin
 *   這邊因為要做成 plugin 所以設定成 lib。
 * 
 *   --name  name for lib or web-component mode (default: "name" in package.json or entry filename)
 *   configure file name and variable name which after compiling
 *   設定轉譯出來的檔案名稱與 lib 的變數名稱。
 * 
 */
{
    "build": "vue-cli-service build --target lib ./src/index.ts --name SmartForm",
    // ...
}
```

4. 建立 vue.config.js 設定編譯後的 output (Create vue.config.js to configure compiled output setting)
```
// vue.config.js
/*
 * tips:
 *   
 *   轉譯出來的檔案如果沒有做以下設定，
 *   需要使用 [Library Name].default 呼叫到 install function，
 *   例如：app.use(SmartForm.default)
 *   使用以下設定則會把 [Library Name].default 設定到預設變數名稱。
 *   (上面有使用 --name 的話會是 --name 設定的名稱)
 * 
 *   if not configure below setting, needing to
 *   use [Library Name].default to call install function 
 *   when after compiling.
 *   e.g. app.use(SmartForm.default)
 *   configure below setting will set [Library Name].default to
 *   default variable name.
 *   if command with `--name`, will use parameter after `--name`
 *   to assign.
 */
module.exports = {
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  }
}
```
