// 副作用代码

import { core } from './core';
// import { Monitor } from './utils/monitor';

// if (iframe) {
//   const monitor = new Monitor(iframe);

//   monitor.add((video) => {
//     console.log(video);

//     core(video);
//   });
// }

const checkUp = () => {
  const iframe = [...document.querySelectorAll('iframe')].find((f) => {
    return f.id === 'mainFrame';
  });
  const videos = iframe?.contentWindow?.document.querySelectorAll('video');
  if (!videos?.length) {
    return;
  }
  videos.forEach((video) => core(video));
};
setInterval(checkUp, 3000);
