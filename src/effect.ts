// 副作用代码

import { core } from "./core";
import { hasMark, mark } from "./utils/play";
import { debounce, flatten } from "./utils/universal";

// 是否播放结束
let finish = false;

const cycle = () => {
  return setTimeout(() => {
    next();
  }, 1000);
};

// 播放下一条数据
const next = () => {
  if (!finish) {
    return;
  }
  // 这里注意，next方法是在iframe框架内定义
  const iframe = window.parent.document.querySelector(
    ".main_box iframe"
  ) as HTMLIFrameElement;

  const li = [
    ...(iframe?.contentWindow?.document.querySelectorAll("#nav li") || []),
  ];
  // const total = li.length;
  const current = li.findIndex((f) => f.classList.contains("select"));
  // console.log({ current, li, iframe });
  if (current < 0) {
    return cycle();
  }

  const all = flatten(
    li.slice(current + 1).map((f) => [...f.querySelectorAll("a")])
  );
  if (!all.length) {
    return cycle();
  }
  // 播放下一条数据
  all[0].click();
  finish = false;
};

const checkUp = () => {
  const iframe = [...document.querySelectorAll("iframe")].find((f) => {
    return f.id === "mainFrame";
  });
  const videos = iframe?.contentWindow?.document.querySelectorAll("video");
  if (!videos?.length) {
    return;
  }

  videos.forEach((video) => {
    if (hasMark(video)) {
      return;
    }
    // 进行一个标识，标识已经处理过了
    mark(video);
    core(video);
    // 播放结束之后，直接点击下一个视频
    video.addEventListener(
      "timeupdate",
      debounce(() => {
        // 浮点数，给一个安全区间即可
        if (Math.abs(video.currentTime - video.duration) < 0.5) {
          finish = true;
          next();
        }
      }, 300)
    );
  });
};
setInterval(checkUp, 3000);
