// 树化
function menuTree(arr) {
  let tree = arr.filter((item) => {
    // 判断当前菜单是不是根菜单
    if (item['parent_id'] == null || item['parent_id'] == undefined || item['parent_id'] == '') {
      return true
    } else {
      // 当前菜单遍历查找上级菜单
      for (let i = 0; i < arr.length; i++) {
        if (arr[i]['menu_id'] === item['parent_id']) {
          arr[i].menus = arr[i].menus || []
          arr[i].menus.push(item)
        }
      }
    }
  })
  return tree
}
function menuSortTree(arr) {
  // 对整体排序
  arr.sort((a, b) => b.sort - a.sort)
  // 再对儿子排序
  arr.forEach((val) => {
    if (val.menus != undefined && val.menus != null) {
      // 递归排序子菜单
      val.menus = menuSortTree(val.menus)
    }
  })
  return arr
}
// 总开关
function menuOrderTree(arr) {
  // 先树化
  let tree = menuTree(arr)
  // 后排序
  menuSortTree(tree)
  return tree
}
module.exports = { menuOrderTree }
