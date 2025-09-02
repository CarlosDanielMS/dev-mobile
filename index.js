import { registerRootComponent } from 'expo';
import App from './app';

// registerRootComponent chama AppRegistry.registerComponent('main', () => App);
// e garante que o ambiente seja configurado corretamente.
registerRootComponent(App);