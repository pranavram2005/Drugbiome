import ig1 from './assets/sidharth.jpg'
import ig2 from './assets/eshwar.jpeg'
import ig3 from './assets/profile.jpg'
import ig4 from './assets/mogith.jpg'
const Aboutus = () => {
  return (
    <>
      <div className="h-auto w-full bg-[#03213d] py-8 px-4">
        <div className="w-full text-center">
          <h1 className="text-white text-5xl md:text-6xl lg:text-6xl font-bold font-serif">About Us</h1>
        </div>
        <p className="text-left mt-5 text-lg md:text-xl lg:text-lg fonting antialiased text-white mx-4 md:mx-16">
          Our team is a group of tech and research enthusiasts, currently pursuing undergraduate studies at IIT Madras, working on various aspects of the project under the guidance of Prof. Sanjuktha Patra from the Biotech Department.
        </p>

        <h3 className="text-center mt-10 text-3xl md:text-4xl lg:text-4xl font-serif antialiased text-white mx-4 md:mx-16">Research and Data Analysis</h3>

        {/* Research Section */}
        <div className="flex flex-col lg:flex-row justify-around items-center w-full mt-10 space-y-10 lg:space-y-0 lg:space-x-10 px-4">
          <ProfileCard name="Sidharth Balaji" title="Research and Data Analyst" image={ig1} link1={"imaginary_alchemy"} link={"sidharth-balaji-sridharan-821198286?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"}/>
          <ProfileCard name="K.Eswar Datta sai" title="Research and Data Analyst" image={ig2} link1={"_chaotic.brain_/"} link={"k-eswar-datta-sai-371690264/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"}/>
        </div>

        <h3 className="text-center mt-10 text-3xl md:text-4xl lg:text-4xl font-serif antialiased text-white mx-4 md:mx-16">Web Operations</h3>

        {/* Web Operations Section */}
        <div className="flex flex-col lg:flex-row justify-around items-center lg:items-start w-full mt-10 space-y-10 lg:space-y-0 lg:space-x-10 px-4">
          <ProfileCard name="Pranav Ram PS" title="Web Developer" image={ig3} link1={"pranavram2005"} link={"pranav-ram-40415120b/"}/>
          <ProfileCard name="Mogith Guru" title="Web Developer" image={ig4} link={""} link1={"__m0gith__"}/>
        </div>
      </div>
    </>
  );
};

// ProfileCard Component for reusability
const ProfileCard = ({ name, title,image,link,link1 }) => (
  <div className="w-full lg:w-1/4 bg-white rounded-2xl shadow-lg transition transform hover:scale-105 p-4">
    <div className="flex justify-center px-6 pt-4">
      <img src={image} alt="Profile" className="rounded-full h-40 w-40 object-cover" />
    </div>
    <div className="text-center mt-6">
      <h2 className="text-3xl font-semibold">{name}</h2>
      <h4 className="text-xl text-gray-600 mt-2">{title}</h4>
    </div>
    <div className="w-full flex justify-center mt-4">
      <SocialIcons link={link} link1={link1}/>
    </div>
  </div>
);

// SocialIcons Component for reusability
const SocialIcons = ({link,link1}) => (
  <div className="flex space-x-4 mt-3 text-2xl">
    <a href={`https://www.instagram.com/`+link1} aria-label="Instagram" className="hover:text-pink-500 transition duration-300 text-pink-500" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-instagram"></i>
    </a>
    <a href={`https://www.linkedin.com/in/`+link} aria-label="LinkedIn" className="hover:text-blue-700 transition duration-300 text-blue-700" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-linkedin"></i>
    </a>
  </div>
);

export default Aboutus;
