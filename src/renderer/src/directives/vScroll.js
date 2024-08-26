export const _vScroll = {
  mounted(el) {
    handleScroll(el);
  },
  updated(el) {
    handleScroll(el); // 当内容更新时重新计算滚动
  },
  beforeUnmount(el) {
    // 清理动画
    const span = el.querySelector('span');
    span.style.animation = '';
  },
};

function handleScroll(el) {
  const span = el.querySelector('span');
  const containerWidth = el.clientWidth;
  const spanWidth = span.scrollWidth;

  if (spanWidth > containerWidth) {
    // 设置滚动动画
    span.style.whiteSpace = 'nowrap';
    span.style.position = 'relative';
    span.style.animation = `scroll-animation ${spanWidth / 25}s linear infinite`;
  } else {
    // 如果文本可以完全显示，取消动画
    span.style.animation = '';
  }
};
