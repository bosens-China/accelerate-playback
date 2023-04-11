// 作用是在页面中捕捉所有video标签，然后注入指定元素

type OnChange<T> = (el: T) => void;

// 默认的判定条件
const defaultCondition = (node: Node) => {
  return node.nodeName === 'VIDEO';
};

export class Monitor<T = HTMLVideoElement> {
  private list = new Set<OnChange<T>>();
  private observer = new MutationObserver(this.callback);

  constructor(
    public target = document.body,
    private condition = defaultCondition
  ) {
    const observerOptions = {
      childList: true,
      // 监听子节点的变化
      subtree: true,
      // 监听所有后代节点的变化
    };
    this.observer.observe(target, observerOptions);
  }

  add(fn: OnChange<T>) {
    this.list.add(fn);

    //   // 为了防止错过时机，所以动手把所有节点注入一次
    //   [...document.body.querySelectorAll('video')].forEach((video) => {
    //     props.onChange(video);
    //   });
  }

  finish() {
    this.observer.disconnect();
    this.list.clear();
  }

  private callback(
    mutationsList: MutationRecord[]
    // observer: MutationObserver
  ): void {
    const { list, condition } = this;
    // 循环检查所有变化
    for (const mutation of mutationsList) {
      // 如果变化是子节点的添加
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        console.log(mutation.addedNodes);

        // 循环检查添加的节点
        mutation.addedNodes.forEach((node) => {
          if (condition(node)) {
            const el = node as T;
            list.forEach((f) => f(el));
          }
        });
      }
    }
  }
}
