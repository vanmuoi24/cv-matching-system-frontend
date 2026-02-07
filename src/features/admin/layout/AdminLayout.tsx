import { Outlet } from 'react-router-dom';

import Container from '../../../shared/components/Container';
const AdminLayout = () => {
	return (
		<>
			<div className='flex min-h-screen'>
				<aside className='w-64 border-r'>
					
				</aside>
				<main className='flex-1 '>
					<Container className='py-6'>
						<Outlet />
					</Container>
				</main>
			</div>
		</>
	);
};

export default AdminLayout;
