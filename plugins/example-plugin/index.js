// plugins/example-plugin/index.js

import { registerPlugin } from '../../lib/pluginManager';
import ExampleComponent from './components/ExampleComponent';

const examplePlugin = {
    name: 'Example Plugin',
    component: ExampleComponent,
};

registerPlugin(examplePlugin);