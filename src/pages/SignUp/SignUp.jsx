import { Link } from 'react-router-dom';
import SignUpImage from '../../assets/Gossinbari SignUp picture 2.jpg';

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
                        <h4 className='mb-20 mt-6 font-roboto text-2xl font-bold text-[#000080]'>Sign Up</h4>
                        <form className='grid grid-cols-8 gap-4'>
                            <div className='flex flex-col gap-1.5 col-span-4'>
                                <label htmlFor="name">Username</label>
                                <input type="text" name="name" id="name" className="border p-2 placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder='Enter your username'/>
                            </div>
                            <div className='flex flex-col col-span-4'>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" className="border p-2" />
                            </div>
                            <div className='flex flex-col col-span-8'>
                                <label htmlFor="file">Upload File</label>
                                <input type="file" name="file" id="file" className="border p-2" />
                            </div>
                            <div className='flex flex-col col-span-4'>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" className="border p-2" />
                            </div>
                            <div className='flex flex-col col-span-4'>
                                <label htmlFor="role">Role</label>
                                <select name="role" id="role" className="border p-2">
                                    <option value="user">User</option>
                                    <option value="seller">Seller</option>
                                </select>
                            </div>
                            <input type="submit" className='col-span-8 bg-blue-500 text-white p-2' value="Sign Up" />
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;