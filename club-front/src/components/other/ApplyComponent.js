import { useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';

function ApplyComponent(props) {
  // store
  const { areaStore } = useRootStore();
  const form = props.form;
  useEffect(() => {
    areaStore.getAreaState();
  }, []);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    areaStore.areaStatusList.length > 0 && (
      <Form form={form} layout="vertical" name="form_in_modal" validateTrigger={['onBlur', 'onChange']}>
        <Form.Item
          name="apply_content"
          label="申请理由"
          rules={[
            {
              required: true,
              message: '请输入申请理由!',
              validateTrigger: 'onBlur',
            },
          ]}>
          <Input.TextArea showCount maxLength={130} />
        </Form.Item>
        <Form.Item
          name="area_id"
          label="场地"
          rules={[
            {
              required: true,
              message: '请选择场地!',
              validateTrigger: 'onBlur',
            },
          ]}>
          <Select
            style={{
              width: 150,
            }}
            fieldNames={{ label: 'area_name', value: 'area_id' }}
            onChange={handleChange}
            options={areaStore.areaSortStatusList}
          />
        </Form.Item>
      </Form>
    )
  );
}
export default observer(ApplyComponent);
