# accelerate-playback

油猴倍速播放插件，使用前提必须安装浏览器拓展程序

- https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd

> 上面为 Edge 商店

## 使用方式

1. 修改 [increase.mjs](./increase.mjs) 文件，将 `match` 范围调整为需要倍速播放的网站
2. 修改 [effect.ts](./src/effect.ts) 文件，按照默认逻辑找到 video 元素
3. 运行 `npm run build`

## 后续开发计划

- 完善 storage 部分逻辑，对边界情况进行校验；
- 完善 effect 部分，支持点击下一项（针对自己）

## 协议

MIT License
