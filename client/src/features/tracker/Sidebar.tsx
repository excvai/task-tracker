import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Avatar from '../../assets/avatar.jpg';
import { getCurrentUser, logout } from '../auth/authSlice';

export const Sidebar = () => {
	const currentUser = useAppSelector(getCurrentUser)!;
	const dispatch = useAppDispatch();

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<div className='sidebar'>
			<div className='sidebar__profile'>
				<div className='sidebar__profile-icon'>
					<img src={Avatar} alt='avatar' />
				</div>
				<div className='sidebar__profile-nickname'>
					{currentUser.nickname}
				</div>
				<div className='sidebar__profile-lvl'>88lvl</div>
				<div className='sidebar__status-bar'>
					<div className='sidebar__status-bar-percent'>33%</div>
					<div className='sidebar__status-bar-scale'></div>
				</div>
			</div>
			<div className='sidebar__achievements achievements'>
				<div className='achievements__header'>
					<div className='achievements__icon'>
						<img
							src='https://pics.freeicons.io/uploads/icons/png/19795616721571183081-512.png'
							alt='achievements icon'
						/>
					</div>
					<p>Achievements</p>
				</div>
				<div className='achievements__list'></div>
			</div>
			<button onClick={logoutHandler} className='sidebar__logout'>
				Logout
			</button>
		</div>
	);
};
