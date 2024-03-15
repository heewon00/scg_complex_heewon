# template-npm-create-vue-at-latest

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Format with [Prettier](https://prettier.io/)

```sh
npm run format
```

### fake-backend 사용법

```javascript
// path: src/main.js

// 프론트엔드 단독 테스트 시 사용하는 더미 백엔드로 실 테스트 시 주석 처리
import { fakeBackend } from './helpers';
fakeBackend();

const app = createApp(App);
```

### .env 사용법

루트 경로에 .env 생성 후 백엔드 API URL 주소 입력

```sh
VITE_API_URL=http://localhost:3000
```
