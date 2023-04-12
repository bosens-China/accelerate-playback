import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.resolve(fileURLToPath(import.meta.url), '../');

const { version } = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json'), 'utf-8'))

const prefix = `// ==UserScript==
// @name         中国石油华东视频学习倍速播放工具
// @namespace    https://github.com/bosens-China/accelerate-playback
// @version      ${version}
// @description  倍速播放和支持自动点击下一页
// @author       yliu
// @match        https://cj1047-kfkc.webtrn.cn/*
// @match        http://cj1047-kfkc.webtrn.cn/*
// @grant        none
// ==/UserScript==`


export default () => {
  return {
    name: 'increase',
    generateBundle(_, bundle) {
      for (const file in bundle) {
        if (bundle[file].type === 'chunk') {
          bundle[file].code = `${prefix}\n\n${bundle[file].code}`
        }
      }
    },
  };
}
