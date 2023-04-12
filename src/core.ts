import { MAXIMUM_SPEED, PLAYER } from "./constant";
import { createdElement, Props } from "./ui";
import { storage } from "./utils/storage";

export const core = (video: HTMLVideoElement) => {
  const element = createdElement();

  video.parentNode?.insertBefore(element, video.nextSibling);
  // 设置自动播放
  video.autoplay = true;
  // 监听进度变化
  video.addEventListener("timeupdate", () => {
    let { currentSpeed } = storage.get<Pick<Props, "currentSpeed">>(PLAYER, {
      currentSpeed: "1",
    });
    if (Number.isNaN(+currentSpeed)) {
      currentSpeed = "1";
    }
    if (+currentSpeed > MAXIMUM_SPEED) {
      currentSpeed = `${MAXIMUM_SPEED}`;
    }
    if (video.playbackRate !== +currentSpeed) {
      video.playbackRate = +currentSpeed;
      storage.set(PLAYER, {
        currentSpeed: `${video.playbackRate}`,
      });
    }
  });
};
