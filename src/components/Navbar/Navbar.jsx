import { NavLink } from 'react-router-dom';
import Logo from '../../assets/Gossaigbari_Bazzar_logo_crop-removebg-preview.png';
import { FaCartPlus } from 'react-icons/fa';

const Navbar = () => {
    return (
        <div className='bg-[#dee2e6] bg-opacity-80 py-4 shadow'>
            <div className='container mx-auto text-white font-bold flex items-center justify-between gap-6'>
                {/* name +/- logo */}
                <div>
                    <div className='flex items-center '>
                        {/* <img className='w-14 rop-shadow-2xl' src={Logo} alt="" /> */}
                        <h4 className='text-logo-font-family text-[#006400] text-lg'>Gossainbari<span className='text-[#4B0082]'>Bazzar</span></h4>
                    </div>
                </div>
                {/* menu */}
                <div className='flex items-center gap-6 text-[rgb(46,141,216)]'>
                    {/* <div className='gap-6'> */}
                    <NavLink>Home</NavLink>
                    <NavLink>Shop</NavLink>
                    <NavLink><FaCartPlus /></NavLink>
                    {/* </div> */}
                    {/* join us button */}
                    <div className='ml-14'>
                        <NavLink to="/login" className='bg-[#343a40] text-white py-2 px-2.5 rounded-md shadow-lg hover:shadow-xl'>
                            <button className='join-us-btn'>Join US</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;