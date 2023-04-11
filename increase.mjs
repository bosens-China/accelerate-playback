import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.resolve(fileURLToPath(import.meta.url), '../');

const { version } = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json'), 'utf-8'))

const prefix = `// ==UserScript==
// @name         Video Speed Controller
// @namespace    http://tampermonkey.net/
// @version      ${version}
// @description  Adds a button to control video playback speed
// @author       ChatGPT
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
