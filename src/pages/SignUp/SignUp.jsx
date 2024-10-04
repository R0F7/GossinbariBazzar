import { Link } from 'react-router-dom';
import SignUpImage from '../../assets/Gossinbari SignUp picture 2.jpg';
import GoogleLogo from '../../assets/google.png';
import FacebookLogo from '../../assets/facebook.png';
import Twiter from '../../assets/twiter.png';

const SignUp = () => {
    return (
        <div className='flex justify-center items-center min-h-screen bg-[#F3F8FC] shadow-2xl relative z-50 overflow-hidden '>
            <div className='w-[70%] h-[750px] border flex bg-[#FBF6F0] gap-10'>
                {/* image */}
                <div className='w-1/2 h-full relative'>
                    <img className='w-full h-full' src={SignUpImage} alt="" />
                    <div className='absolute top-14 left-12'>
                        {/* TODO react text type */}
                        <h4 className='text-logo-font-family text-[#006400] text-lg mb-14'>Gossainbari<span className='text-[#4B0082]'>Bazzar</span></h4>
                        <h3 className='text-2xl font-semibold text-[#000080] font-roboto mb-1.5'>Discover the Finest in Food, Fashion &<br></br>Everyday Essentials.</h3>
                        {/* <p>shop smarter,Live better</p> */}
                        <p className='text-[#4B0082] font-medium'>Shop Smarter with GossainBazzer</p>

                        {/* Discover the Finest in Food, Fashion & Everyday Essentials. Shop with Ease!" */}
                    </div>
                </div>

                {/* form */}
                <div className='w-1/2 p-10'>
                    <p className='text-end p-6 text-[#333333] font-medium italic'>Already a member? <Link to='/login' className='text-[#4B0082] font-bold underline'>Sign In</Link></p>
                    <div>
                        <h4 className='mb-10 mt-4 font-roboto text-2xl font-bold text-[#000080]'>Sign Up</h4>
                        <form className='grid grid-cols-8 gap-4'>
                            <div className='flex flex-col gap-1.5 col-span-4'>
                                <label htmlFor="name">Username</label>
                                <input type="text"
                                    name="name"
                                    id="name"
                                    placeholder='Enter your username'
                                    className="p-2 shadow rounded-md placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2" />
                            </div>
                            <div className='flex flex-col gap-1.5 col-span-4'>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder='Enter your email address'
                                    className="p-2 shadow rounded-md placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2" />
                            </div>
                            <div className='flex flex-col gap-1.5 col-span-8'>
                                <label htmlFor="file">Upload File</label>
                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    className="border p-2" />
                            </div>
                            <div className='flex flex-col gap-1.5 col-span-4'>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder='*******'
                                    className="p-2 shadow rounded-md placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2" />
                            </div>
                            <div className='flex flex-col gap-1.5 col-span-4'>
                                <label htmlFor="role">Role</label>
                                <select
                                    name="role"
                                    id="role"
                                    className="p-2 shadow rounded-md placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2">
                                    <option value="" disabled selected className=''>role</option>
                                    <option value="user">user</option>
                                    <option value="seller">seller</option>
                                </select>
                            </div>
                            <div className='flex str col-span-8 gap-2.5'>
                                <input
                                    type="checkbox"
                                    name="check"
                                    id="check"
                                    className='relative bottom-2.5 text-xl' />
                                <p htmlFor="check" className='italic text-sm'>Creating an account means you're okay with our <span className='text-[#4B0082] font-semibold'>Terms of Service, Privacy Policy, </span>and our <span className='text-[#4B0082] font-semibold'>default Notification Settings</span></p>
                            </div>
                            <div className='col-span-8 flex items-center justify-between mt-2.5'>
                                <input type="submit" className=' bg-blue-500 text-white p-2.5 px-20' value="Create account" />
                                <h4 className='font-bold text-2xl text-[#4B0082]'>OR</h4>
                                <h6 className='text-[#4B0082] font-medium'>Use the platforms below</h6>
                            </div>
                        </form>

                        <div className='w-full h-[1.5px] bg-[#4B0082] my-8'></div>

                        <div>
                            <div className='flex gap-10'>
                                <button className='flex items-center gap-2 bg-white shadow-md py-2 px-6 font-semibold'>
                                    <img className='w-5' src={GoogleLogo} alt="" />
                                    <h4>Sign Up with Google</h4>
                                </button>
                                <button className='flex items-center gap-2 bg-white shadow-md py-2 px-4 font-semibold'>
                                    <img className='w-5' src={FacebookLogo} alt="" />
                                </button>
                                <button className='flex items-center gap-2 bg-white shadow-md py-2 px-4 font-semibold'>
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