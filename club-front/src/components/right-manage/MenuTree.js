import React, { useState, useEffect } from 'react'
import { Tree } from 'antd'
import { http } from '@/utils/http'

export default function MenuTree(props) {
  const { selectBoolean } = props
  const { currentRights, setCurrentRights } = props
  const [rightList, setRightList] = useState([])
  const onCheck = (checkedKeys) => {
    if (!selectBoolean && checkedKeys.checked.length > 1) {
      checkedKeys.checked.shift()
    }
    setCurrentRights(checkedKeys.checked)
  }
  useEffect(() => {
    http.post('/menu/roleSelect').then((res) => {
      if (!selectBoolean) {
        res.data.data.unshift({ menu_id: '123456789', name: '无' })
      }
      setRightList(res.data.data)
    })
  }, [selectBoolean])
  return (
    rightList.length > 0 && (
      <Tree
        checkable
        checkStrictly
        defaultExpandAll
        fieldNames={{ title: 'name', key: 'menu_id', children: 'menus' }}
        checkedKeys={currentRights}
        onCheck={onCheck}
        treeData={rightList}
      />
    )
  )
}
