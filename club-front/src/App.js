import './App.css';
import 'antd/dist/reset.css';
import IndexRouter from './router/IndexRouter';
import { useRootStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
function App() {
  // store
  const { styleStore } = useRootStore();
  return (
    <div style={{ width: styleStore.width }}>
      <IndexRouter />
    </div>
  );
}

export default observer(App);
