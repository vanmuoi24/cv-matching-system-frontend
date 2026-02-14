import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import 'antd/dist/reset.css';
import './index.css';
import viVN from 'antd/locale/vi_VN';
import App from './App.tsx';
import { ConfigProvider } from 'antd';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ConfigProvider locale={viVN}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ConfigProvider>
	</StrictMode>,
);
