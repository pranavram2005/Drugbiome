import i1 from './assets/i1.jpg';

const Description = () => {
  return (
    <>
      <div className="w-full px-4 md:px-10 py-10">
        <div className="w-full flex flex-col">
          <div className="flex flex-col md:flex-row mt-4 md:h-[600px]">
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl md:text-6xl lg:text-5xl text-left">Project Description</h2>
              <p className="text-left mt-5 fonting antialiased">
                Our project DMI aims to create a database for the microbial data specific to the Indian subcontinent, by classifying the population based on various parameters like Age, Sex, Location, Health & Disease, Genetic factors, and so on. With this database built, we then use the commonly found strains of bacteria and see how differently they react with antibiotics and drugs. We predict that there must be some change for an Indian gut microbiome hence modeling and complementing it with wet lab experiments could provide us an insight into how drugs react differently for an Indian population compared to a western population.
              </p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center p-3 mt-6 md:mt-0">
              <img src={i1} className="w-full md:w-5/6 rounded-lg" alt="Project illustration" />
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-left fonting antialiased">
              We are essentially paving the way for personalized medication. This project is a steppingstone in showing just how drug modifications for Asia, or specifically India, can help therapeutic drug treatments for Indian patients.
              There is an overall lack of a simple and easily accessible database that structures and groups microbiomes based on various constraints and factors. It would be of great help as an open-source tool for any pharmaceutical company or research lab when developing drugs for the Indian Subcontinent.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
