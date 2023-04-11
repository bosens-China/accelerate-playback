import { PLAYER, MAXIMUM_SPEED } from './constant';
import { storage } from './utils/storage';

export interface Props {
  currentSpeed: string;
}

const style = `
position: absolute;
z-index: 99;
right: 0;
top: 0;`;

// 生成元素
export const createdElement = () => {
  const select = document.createElement('select');
  const { currentSpeed } = storage.get<Props>(PLAYER, {
    currentSpeed: '1',
  });
  storage.set<Props>(PLAYER, {
    currentSpeed,
  });

  // 插入元素
  Array.from({
    length: MAXIMUM_SPEED,
  }).forEach((_, index) => {
    const option = document.createElement('option');
    option.value = `${index + 1}`;
    option.innerText = `${option.value} 倍速`;
    select.appendChild(option);
  });
  // 监听变化
  select.addEventListener('change', (e) => {
    const el = e.target as HTMLSelectElement;
    storage.set(PLAYER, {
      currentSpeed: el.value,
    });
  });
  select.style.cssText = style;

  select.value = currentSpeed;

  return select;

  //   const html = `
  // <select name="select">
  //   <option value="value1">Value 1</option>
  //   <option value="value2" selected>Value 2</option>
  //   <option value="value3">Value 3</option>
  // </select>`;
};
