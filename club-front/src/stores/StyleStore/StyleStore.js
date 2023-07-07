import { makeAutoObservable } from 'mobx';
class StyleStore {
  // 页面宽度
  maxWidth = 1536;
  // 有右侧滚动条的宽度
  defaultWidth = 1519;
  width = 1519;
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  setWidth(value) {
    this.width = value;
  }
}
export default StyleStore;
