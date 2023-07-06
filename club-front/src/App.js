import './App.css';
import 'antd/dist/reset.css';
import { BrowserRouter } from 'react-router-dom';
import { RootStoreProvider } from './stores/RootStore';
import IndexRouter from './router/IndexRouter';
function App() {
  return (
    <BrowserRouter>
      <RootStoreProvider>
        <IndexRouter />
      </RootStoreProvider>
    </BrowserRouter>
  );
}

export default App;
