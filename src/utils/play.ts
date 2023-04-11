// 获取播放的最大倍速
export const maximumSpeed = () => {
  let value = 1;
  const video = document.createElement('video');
  let condition = true;
  while (condition) {
    try {
      video.playbackRate = value;
      value += 1;
    } catch {
      condition = false;
      value -= 1;
    }
  }
  return value;
};
