import { Link } from 'react-router-dom';
import Aboutus from './Aboutus';
import background from './assets/background.jpg';
import Description from './Desription';
const Home =()=>{
    return(<>
    <div className="w-full h-screen -mt-28 bg-black">
        <div className='h-full absolute opacity-40 w-full z-100 bg-black flex justify-center items-center'>
        </div>
        <div className='absolute h-full w-full flex justify-center md:justify-end items-center md:px-36'>
            <div className='flex flex-col'><h2 className='text-white z-100 md:text-5xl text-4xl z-1000'>Gut Microbiome<br/>Index</h2><div>
                <Link to="/microbes"><button className='rounded-full bg-blue-500 mt-5 p-3 hover:bg-blue-700 md:text-xl text-xl text-white'>Check your Microbiomes</button></Link>
                </div></div>
            
        </div>
        <img src={background} className='h-full w-full'/></div>

    <Description/>
    <Aboutus/>
    </>)
}
export default Home;