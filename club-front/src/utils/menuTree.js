import { MyIcon } from './MyIcon';
function getItem(val) {
  if (!val['is_show']) {
    return null;
  }
  let obj = {
    key: val.href,
    icon: MyIcon(val['menu_logo']),
    label: val.name,
  };
  if (val.menus !== undefined && val.menus !== null) {
    obj.children = val.menus.map((val) => getItem(val));
  }

  return obj;
}
// 设置菜单，让菜单符合antd menu组件
function setItems(arr) {
  return arr.map((val) => {
    return getItem(val);
  });
}
// 设置路径
function setPath(path) {
  let temp = path.split('/').slice(1);
  let a = [];
  a.push('/' + temp[0]);
  for (let i = 1; i < temp.length; i++) {
    a.push('/' + temp[i]);
    a[i] = a[i - 1] + a[i];
  }
  return a;
}
// 清除tree中的某一项
function deleteTree(arr, id) {
  let tree = arr.filter(function test(item) {
    if (item['menu_id'] === id) {
      return false;
    }
    if (item.menus !== undefined && item.menus !== null) {
      item.menus = item.menus.filter(test);
    }
    return true;
  });
  // console.log(tree)
  return tree;
}
export { setItems, setPath, deleteTree };
