import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/Gossaigbari_Bazzar_logo_crop-removebg-preview.png';
import { FaCartPlus } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className='bg-[#dee2e6] bg-opacity-80 py-3.5 shadow'>
            <div className='container mx-auto text-white font-bold flex items-center justify-between gap-6'>
                {/* name +/- logo */}
                <Link to='/'>
                    <div className='flex items-center gap-1'>
                        <img className='w-12 rop-shadow-2xl' src={Logo} alt="" />
                        <h4 className='text-logo-font-family text-[#006400] text-lg'>Gossainbari<span className='text-[#4B0082]'>Bazzar</span></h4>
                    </div>
                </Link>

                {/* menu */}
                {/* <div className='flex items-center gap-8 nav-menu header-menu'>
                    <ul className='flex items-center gap-8'>
                        <li>
                            <NavLink to='/' className={({ isActive }) => isActive ? 'font-black text-[#4B0082] py-1 px-2.5 border-b-2 border-red-600 rounded-md border-0' : "font-semibold text-[rgb(46,141,216)]"}>Home</NavLink>
                        </li>
                        <li><NavLink to='/shop' className={({isActive}) => isActive ? console.log('active') : console.log("inactive")}>Shop</NavLink></li>
                        <li><NavLink to='/cart'>
                            <div className='relative'>
                                <i> <FaCartPlus /></i>
                                <h6 className='absolute -top-3 -right-2.5'>0</h6>
                            </div>
                        </NavLink></li>

                        join us button
                        <div className='ml-14'>
                            <Link to="/login" className='bg-[#343a40] text-white py-2 px-2.5 rounded-md shadow-lg hover:shadow-xl'>
                                <button className='join-us-btn'>Join US</button>
                            </Link>
                        </div>
                    </ul>
                </div> */}
                <div className='flex items-center gap-8 nav-menu header-menu'>
                    <ul className='flex items-center gap-8'>
                        <li>
                            <NavLink
                                to='/'
                                className={({ isActive }) =>
                                    isActive
                                        ? 'font-black text-transparent py-1 px-2.5 border-b-2 active'
                                        : "font-semibold text-[rgb(46,141,216)] py-1 px-2.5"
                                }>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/shop'
                                className={({ isActive }) =>
                                    isActive
                                        ? 'font-black text-transparent py-1 px-2.5 active'
                                        : "font-semibold text-[rgb(46,141,216)] py-1 px-2.5"
                                }>
                                Shop
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/cart'
                                className={({ isActive }) =>
                                    isActive
                                        ? 'font-black active text-[#4B0082]'
                                        : "font-semibold text-[rgb(46,141,216)]"
                                }>
                                <div className='relative flex items-center py-1 px-2.5'>
                                    <i><FaCartPlus /></i>
                                    <h6 className='absolute -top-2.5 -right-0.5'>0</h6>
                                </div>
                            </NavLink>
                        </li>

                        {/* join us button */}
                        <div className='ml-14'>
                            <Link to="/login" className='bg-[#343a40] text-white py-2 px-2.5 rounded-md shadow-lg hover:shadow-xl'>
                                <button className='join-us-btn'>Join US</button>
                            </Link>
                        </div>
                    </ul>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;