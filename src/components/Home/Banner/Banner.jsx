import banner1 from '../../../assets/fresh vegetable2.avif';
import banner2 from '../../../assets/Footwear.avif';
const Banner = () => {
  return (
    <section className='container mx-auto grid grid-cols-2 gap-6 pb-12'>
      {/* <div>
        <img className='w-full' src={banner4} alt="banner2" />
        <div></div>
      </div> */}
      <div className='h-[287px] relative'>
        <img className='w-full h-full' src={banner1} alt="banner2" />
        <div className='absolute top-0 left-0 g-[rgba(0,0,0,0.25)] text-white w-full h-full p-8'>
            <h4 className='text-2xl font-semibold text-[#2B353F]'>Fresh & Healthy</h4>
            <h3 className='text-3xl font-black mb-6 text-[#00AB54]'>Vegetables</h3>
            <p className='w-[40%] text-[#434C55] font-semibold'>Fresh, nutritious vegetables packed with vitamins and flavor, perfect for a healthy lifestyle!</p>
        </div>
      </div>
      <div className='h-[287px] relative'>
        <img className='w-full h-full' src={banner2} alt="banner2" />
        <div className='absolute top-0 left-0 g-[rgba(0,0,0,0.25)] text-white w-full h-full p-8'>
            <h4 className='text-2xl font-semibold text-[#2B353F]'>Comfortable & Stylish</h4>
            <h3 className='text-3xl font-black mb-6 text-[#00AB54]'>Footwear</h3>
            <p className='w-[50%] text-[#434C55] font-semibold'>Comfortable, stylish footwear designed for all-day support and durability, perfect for any occasion!</p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
