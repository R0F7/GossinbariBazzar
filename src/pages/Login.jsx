import { Link } from 'react-router-dom';
import Logo from '../assets/Gossaigbari_Bazzar_logo_crop-removebg-preview.png';
import GoogleLogo from '../assets/google.png';

const Login = () => {
    return (
        <div className='flex justify-center items-center min-h-screen bg-[#F3F8FC] shadow-2xl relative z-50 overflow-hidden '>
            <div className=''>
                {/* Logo */}
                <Link to="/" className='flex flex-col justify-center items-center gap-1 py-10'>
                    <div>
                        <img src={Logo} className='w-14' alt="Logo" />
                    </div>
                    <h2 className='text-2xl font-semibold'>Goossinbari Bazzar</h2>
                </Link>
                <div className='bg-[#FFFFFF] w-[470px] shadow-lg rounded-xl'>
                    <div className='py-5 px-14 text-xl font-semibold '>
                        <h4 className='text-[#131F2F]'>Sign in to your account</h4>
                    </div>
                    <div className='bg-[#F3F8FC] py-6 flex justify-center'>
                        <button className='flex items-center gap-2 bg-[#FFFFFF] py-3 px-9 rounded-lg shadow-md hover:shadow-xl'>
                            <i><img src={GoogleLogo} className='w-5' alt="Google Logo" /></i>
                            <h4 className='font-semibold'>Google</h4>
                        </button>
                    </div>
                    <div>
                        <form action="#" className='flex flex-col'>
                            <label htmlFor="email" className='flex flex-col gap-1 px-14 py-5'>Email *
                                <input type="email" name="email" id="email" className='border h-[45px] pl-2 rounded-md focus:outline-dotted' placeholder='Your_Email@gmail.com' />
                            </label>
                            <label htmlFor="password" className='flex flex-col gap-1 px-14 '>Password *
                                <input type="password" name="password" id="password" className='border h-[45px] pl-2 rounded-md focus:outline-dashed' placeholder='********' />
                            </label>
                            <div>
                                <h6 className='px-14 underline pt-1.5 text-[#4A4A4A]'>Forgot password?</h6>
                            </div>
                            <button type="submit" className="bg-[#006EDC] mx-14 py-2.5 my-6 text-white font-semibold rounded-md transform duration-150 active:scale-95 scale-100">Sign In</button>
                        </form>
                    </div>
                    <div className='text-center py-5 bg-[#F3F8FC] rounded-b-xl'>
                        <Link to='/'><span className='text-[#4A4A4A]'>Not registered?</span> Create an account</Link>
                    </div>
                </div>
            </div>

            {/* SVG */}
            <div className='w-full h-full absolute top-[495px] left-0 overflow-hidden -z-30'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#273036" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,149.3C672,149,768,171,864,181.3C960,192,1056,192,1152,160C1248,128,1344,64,1392,32L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            </div>
            <div className='w-full h-full absolute top-[495px] left-0 overflow-hidden -z-40'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fillOpacity="1" d="M0,32L40,26.7C80,21,160,11,240,21.3C320,32,400,64,480,96C560,128,640,160,720,149.3C800,139,880,85,960,64C1040,43,1120,53,1200,74.7C1280,96,1360,128,1400,144L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
            </div>
            <div className='w-full h-full absolute top-[495px] left-0 overflow-hidden -z-50'>
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" ><path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill" fill="#4A4A4A" fillOpacity="1"></path></svg>
            </div>
        </div>

    );
};

export default Login;