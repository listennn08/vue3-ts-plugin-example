import { App, Component } from 'vue';
import SFButton from '@/components/SFButton.vue';

const SmartFormComponents: { [key: string]: Component } = {
  [SFButton.name]: SFButton,
};

export default function install(app: App): void {
  Object.keys(SmartFormComponents).forEach((name) => {
    app.component(name, SmartFormComponents[name]);
  });
};