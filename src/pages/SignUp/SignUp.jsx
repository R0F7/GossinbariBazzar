import { Link } from 'react-router-dom';
import SignUpImage from '../../assets/Gossinbari SignUp picture 2.jpg';
import GoogleLogo from '../../assets/google.png';
import FacebookLogo from '../../assets/facebook.png';
import Twiter from '../../assets/twiter.png';
import SignUpBG from '../../assets/gossingbari bazzar signUp bg .jpg';
import UnknownIMG from '../../assets/unknown Image.jpg';
import { MdOutlineFileUpload } from 'react-icons/md';
import { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

const SignUp = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <div
            className='flex justify-center items-center min-h-screen shadow-2xl relative z-50'>
            {/* BG */}
            <div className='w-full h-full absolute top-0 left-0 -z-50'><img src={SignUpBG} className='w-full h-full' alt="" /></div>

            <div className='w-[70%] h-[750px] border flex g-[#FBF6F0] bg-[#dee2e6] bg-opacity-70 gap-10'>
                {/* image */}
                <div className='w-1/2 h-full relative'>
                    <img className='w-full h-full' src={SignUpImage} alt="" />
                    <div className='absolute top-14 left-12'>
                        {/* TODO react text type */}
                        {/* Discover the Finest in Food, Fashion & Everyday Essentials. Shop with Ease!" */}
                        <h4 className='text-logo-font-family text-[#006400] text-lg mb-14'>Gossainbari<span className='text-[#4B0082]'>Bazzar</span></h4>
                        <h3 className='text-2xl font-semibold text-[#000080] font-roboto mb-1.5'>Discover the Finest in Food, Fashion &<br></br>Everyday Essentials.</h3>
                        <p className='text-[#4B0082] font-medium'>Shop Smarter with GossainBazzer</p>
                        {/* <p>shop smarter,Live better</p> */}
                    </div>
                </div>

                {/* form */}
                <div className='w-1/2 p-10'>
                    <p className='text-end p-6 text-[#333333] font-medium italic'>Already a member? <Link to='/login' className='text-[#4B0082] font-bold underline hover:text-[#2E8DD8]'>Sign In</Link></p>
                    <div>
                        <h4 className='mb-10 mt-4 font-roboto text-2xl font-bold text-[#000080]'>Sign Up</h4>
                        <form className='grid grid-cols-8 gap-4'>

                            <div className='flex flex-col gap-1 col-span-4'>
                                <label htmlFor="name" className='font-roboto font-semibold text-[#333333] opacity-95'>Username</label>
                                <input type="text"
                                    required
                                    name="name"
                                    id="name"
                                    placeholder='Enter your username'
                                    className="p-2 shadow rounded-md placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2 bg-white bg-opacity-40" />
                            </div>

                            <div className='flex flex-col gap-1 col-span-4'>
                                <label htmlFor="email" className='font-roboto font-semibold text-[#333333] opacity-95'>Email</label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder='Enter your email address'
                                    className="p-2 shadow rounded-md placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2 bg-white bg-opacity-40" />
                            </div>

                            <div className='col-span-8 flex justify-between items-center'>
                                <div className='font-roboto w-max text-sm font-medium text-[#333333] opacity-95 border border-[#3992D9] shadow-md shadow-[rgba(0,0,0,.1)] py-2.5 px-10 rounded'>
                                    <label htmlFor="file" >
                                        <input
                                            required
                                            type="file"
                                            name="file"
                                            id="file"
                                            hidden
                                            accept='image/*'
                                            className='text-sm cursor-pointer w-36 hidden' />
                                        <div className='py-1.5 px-7 cursor-pointer bg-[#2E8DD8] shadow-lg shadow-[rgba(46,141,216,.25)] text-white rounded active:scale-95 scale-100 transform duration-150 hover:shadow-md flex items-center gap-1'>
                                            <i className='text-lg font-semibold'><MdOutlineFileUpload /></i>
                                            <h4>Upload Image</h4>
                                        </div>
                                    </label>
                                </div>
                                <div className='w-[70px] border rounded p-2'>
                                    <img className='w-full' src={UnknownIMG} alt="" />
                                </div>
                            </div>

                            <div className='flex flex-col gap-1 col-span-4'>
                                <label htmlFor="password" className='font-roboto font-semibold text-[#333333] opacity-95'>Password</label>
                                <div className='relative'>
                                    <input
                                        required
                                        type={toggle ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        placeholder='*******'
                                        className="p-2 shadow rounded-md placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2 bg-white bg-opacity-40 w-full" />
                                    <i
                                        className='absolute top-3 right-3'
                                        onClick={()=> setToggle(!toggle)}
                                    >
                                        { toggle ? <IoEyeOutline /> : <IoEyeOffOutline />}
                                    </i>
                                </div>
                            </div>

                            <div className='flex flex-col gap-1 col-span-4'>
                                <label htmlFor="role" className='font-roboto font-semibold text-[#333333] opacity-95'>Role</label>
                                <select
                                    required
                                    name="role"
                                    id="role"
                                    className="p-2 shadow rounded-md placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2 bg-white bg-opacity-40">
                                    <option value="" disabled selected className=''>role</option>
                                    <option value="user">user</option>
                                    <option value="seller">seller</option>
                                </select>
                            </div>

                            <div className='flex col-span-8 gap-2.5'>
                                <input
                                    required
                                    type="checkbox"
                                    name="check"
                                    id="check"
                                    className='relative bottom-1.5 text-xl w-6 ' />
                                <p htmlFor="check" className='italic text-sm'>Creating an account means you're okay with our <span className='text-[#4B0082] font-semibold'>Terms of Service, Privacy Policy, </span>and our <span className='text-[#4B0082] font-semibold'>default Notification Settings</span></p>
                            </div>

                            <div className='col-span-8 flex items-center justify-between mt-2.5'>
                                <input
                                    type="submit"
                                    className=' font-medium bg-[#2E8DD8] shadow-lg shadow-[rgba(46,141,216,.25)] text-white p-2.5 px-20 rounded-md transform duration-150 active:scale-95 scale-100 hover:shadow-md' value="Create account" />
                                <h4 className='font-bold text-2xl text-[#4B0082]'>OR</h4>
                                <h6 className='text-[#4B0082] font-medium pr-4'>Use the platforms below</h6>
                            </div>

                        </form>

                        <div className='w-full h-[1.5px] bg-[#4B0082] my-8'></div>

                        <div>
                            <div className='flex gap-7'>
                                <button className='flex items-center gap-2 bg-white shadow-md shadow-[rgba(0,0,0,.2)] py-2 px-6 font-semibold rounded active:scale-95 scale-100 transform duration-150 hover:shadow-md'>
                                    <img className='w-5' src={GoogleLogo} alt="" />
                                    <h4>Sign Up with Google</h4>
                                </button>
                                <button className='flex items-center gap-2 bg-white shadow-md shadow-[rgba(0,0,0,.23)] py-2 px-3 font-semibold rounded active:scale-95 scale-100 transform duration-150 hover:shadow-md'>
                                    <img className='w-5' src={FacebookLogo} alt="" />
                                </button>
                                <button className='flex items-center gap-2 bg-white shadow-md shadow-[rgba(0,0,0,.23)]  py-2 px-3 font-semibold rounded active:scale-95 scale-100 transform duration-150 hover:shadow-md'>
                                    <img className='w-5' src={Twiter} alt="" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;