// 副作用代码

import { core } from "./core";
import { hasMark, mark } from "./utils/play";
import { debounce, flatten } from "./utils/universal";

// 是否播放结束
let finish = false;

const cycle = (fn: () => void) => {
  return setTimeout(() => {
    fn();
  }, 1000);
};

// 播放下一条数据
const next = () => {
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
    return;
  }

  const all = flatten(
    li.slice(current + 1).map((f) => [...f.querySelectorAll("a")])
  );
  return all[0];
};

const tabsSwitch = () => {
  const iframe = window.parent.document.querySelector(
    "iframe.contentIframe"
  ) as HTMLIFrameElement | null;
  const tabs = [
    ...(iframe?.contentWindow?.document.querySelectorAll(".menub") || []),
  ].filter((f) => f) as HTMLDivElement[];
  // 找到后续的位置
  const index = tabs.findIndex((f) => f.classList.contains("menubu"));
  if (index < 0) {
    return;
  }
  return tabs.slice(index + 1)[0];
};

const nextVideo = () => {
  if (!finish) {
    return;
  }
  const result = tabsSwitch() || next();
  if (!result) {
    return cycle(nextVideo);
  }
  result.click();
  finish = false;
};

// 清理弹窗，会提示学习多久了之类的
const clear = () => {
  // https://cj1047-kfkc.webtrn.cn/learnspace/resource/common/js/plugins/scrom/studyTime.js?=20220601
  const iframeScripts = flatten(
    Array.from(document.querySelectorAll("iframe")).map((f) => [
      ...(f.contentWindow?.document.querySelectorAll("script") || []),
    ])
  );

  const scripts = [
    ...document.querySelectorAll("script"),
    ...iframeScripts,
  ].filter((f) => f.src.includes("studyTime"));

  // 移除掉相关的元素
  scripts.forEach((f) => {
    f.innerHTML = ``;
  });
};

const checkUp = () => {
  const iframe = document.querySelector(
    "iframe#mainFrame"
  ) as HTMLIFrameElement | null;

  const video = iframe?.contentWindow?.document.querySelector("video");
  if (!video) {
    return;
  }

  if (hasMark(video)) {
    return;
  }
  // 进行一个标识，标识已经处理过了
  mark(video);
  core(video);
  // 为了防止其他js执行暂停时间，直接屏蔽
  // video._pause = video.pause;
  video.pause = () => {
    //
  };
  // 播放结束之后，直接点击下一个视频
  video.addEventListener(
    "timeupdate",
    debounce(() => {
      // 浮点数，给一个安全区间即可
      if (Math.abs(video.currentTime - video.duration) < 0.5) {
        finish = true;
        nextVideo();
      }
    }, 300)
  );
};
setInterval(() => {
  clear();
  checkUp();
}, 3000);
