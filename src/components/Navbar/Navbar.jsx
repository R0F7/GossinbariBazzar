import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='bg-cyan-600 bg-opacity-50 py-4 text-white font-bold flex justify-center gap-6'>
            <NavLink>Home</NavLink>
            <NavLink>Shop</NavLink>
            <NavLink>cart icon</NavLink>
            <NavLink to="/login" className='bg-rose-500 py-1.5 px-4 rounded-lg shadow-lg hover:shadow-xl'>Join US</NavLink>
        </div>
    );
};

export default Navbar;