function getItem(val) {
  let obj = {
    key: val.href,
    icon: val['menu_logo'],
    label: val.name,
  };
  if (val.menus !== undefined) {
    obj.children = val.menus.map((val) => getItem(val));
  }

  return obj;
}
function setItems(arr) {
  let items = arr;
  // console.log(items)
  let handle = items.map((val) => {
    return getItem(val);
  });
  console.log(handle);
}
module.exports = { setItems };
