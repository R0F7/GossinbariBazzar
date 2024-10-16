import banner1 from '../../../assets/banner-home3-01.jpg';
import banner2 from '../../../assets/banner-home3-02.jpg';
const Banner = () => {
  return (
    <section className='container mx-auto grid grid-cols-2 gap-6 pb-12'>
      <div>
        <img className='w-full' src={banner1} alt="banner1" />
        <div></div>
      </div>
      <div>
        <img className='w-full' src={banner2} alt="banner2" />
        <div></div>
      </div>
    </section>
  );
};

export default Banner;
