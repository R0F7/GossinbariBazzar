import { useNavigate } from 'react-router-dom';
import emptyImage from '../../assets/empty-404.jpg';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <section className='container mx-auto flex flex-col items-center justify-center min-h-screen'>
            <h4 className="text-[#7A858C] text-xl">Oops! It seems you got lost.</h4>
            <div className='w-[565px] h-[423px] my-[50px]'>
                <img src={emptyImage} alt="emptyImage"/>
            </div>
            <button onClick={()=> navigate(-1)}  className="text-[#303030] px-8 border py-2.5 font-semibold shadow hover:shadow-lg transition duration-300">Return to stable grounds</button>
        </section>
    );
};

export default ErrorPage;