import { Upload } from 'antd';
import { MyIcon } from '@/utils/MyIcon';
import { baseURL } from '@/utils/http';

export default function MyUpload(props) {
  // 显示图片地址
  const imageUrl = props.imageUrl;
  const loading = props.loading;
  const uploadButton = (
    <div>
      {loading ? MyIcon('LoadingOutlined') : MyIcon('PlusOutlined')}
      <div
        style={{
          marginTop: 8,
        }}>
        {props.name}
      </div>
    </div>
  );
  return (
    <Upload
      name="file"
      accept="image/*"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      onChange={(info) => props.imageHandleChange(info)}
      action={baseURL + props.href}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          style={{
            width: '100%',
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
}
