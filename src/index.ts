import { App, Component } from 'vue';
import SFButton from '@/components/SFButton.vue';
import focus from '@/directives';
import mixins from '@/mixins';

const SmartFormComponents: { [key: string]: Component } = {
  [SFButton.name]: SFButton,
};

export default function install(app: App): void {
  Object.keys(SmartFormComponents).forEach((name) => {
    app.component(name, SmartFormComponents[name]);
  });

  // register global directive
  app.directive('focus', focus);
  // register global mixin.
  app.mixin(mixins);
};