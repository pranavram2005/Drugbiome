import { useState } from "react";
import pan from './pan_meta.json';
import otutab from './pan_otutab.json';
import tax from './pan_taxonomy.json';

const Microbes = () => {
    const Cities = [];
    let total = 0;
    const [inputs, setInputs] = useState({
        city: "",
        zone: "",
        gender: "",
        age: "",
        lifestyle: "",
        bmi: "",
        obesity: ""
    });
    const [filteredSpecies, setFilteredSpecies] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const filteredDemo = pan.filter(u => 
            (!inputs.city || u["Geographical Location"] === inputs.city) &&
            (!inputs.zone || u["Geographical zone in India"] === inputs.zone) &&
            (!inputs.gender || u["Gender"] === inputs.gender) &&
            (!inputs.age || u["AGE  in years"] === parseInt(inputs.age)) &&
            (!inputs.lifestyle || u["Life style pattern"] === inputs.lifestyle) &&
            (!inputs.bmi || 
                (inputs.bmi === "Underweight" && u["BMI"] < 18.5) || 
                (inputs.bmi === "Normal" && u["BMI"] >= 18 && u["BMI"] < 24) ||
                (inputs.bmi === "Overweight" && u["BMI"] >= 24 && u["BMI"] < 30) ||
                (inputs.bmi === "Obese" && u["BMI"] >= 30)
            ) &&
            (!inputs.obesity || u["Obese-Non Obese"] === inputs.obesity)
        );

        let count = [];
        filteredDemo.forEach((user) => {
            const name = user.Subject_ID;
            
            const Project = otutab.filter((i) => i[name] > 0)
                .sort((b, a) => parseFloat(a[name]) - parseFloat(b[name]));

            Project.slice(0, 10).forEach((u) => {
                const taxonomy = tax.filter((t) => (t.OTUID === u.OTU_ID));
                taxonomy.forEach((t) => {
                    const Percentage = (parseFloat(u[name]) * 100).toFixed(6);
                    count.push({ ...t, Percent: Percentage });
                });
            });
        });

        const sortedCount = count.sort((b, a) => parseFloat(a.Percent) - parseFloat(b.Percent));
        const uniqueSpecies = [];
        const seenSpecies = new Set();

        for (const item of sortedCount) {
            if (!seenSpecies.has(item.Species)) {
                seenSpecies.add(item.Species);
                uniqueSpecies.push(item);
                if (uniqueSpecies.length >= 10) break;
            }
        }

        setFilteredSpecies(uniqueSpecies);
        
    };
    
    pan.forEach((u) => {
        Cities.push(u["Geographical Location"]);
    });

    const ucity = [];
    const seenCity = new Set();
    for (const i of Cities) {
        if (!seenCity.has(i)) {
            seenCity.add(i);
            ucity.push(i);
        }
    }
    filteredSpecies.forEach((p)=>total = total+parseFloat(p.Percent))


    return (
        <div className="flex flex-col lg:flex-row bg-gray-900 p-8 gap-10 min-h-screen h-auto -mt-32">
            <div className="lg:w-1/3 bg-gray-800 rounded-lg p-6 shadow-lg text-white mt-32">
                <h1 className="text-3xl font-semibold mb-6">Filter Microbes</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <select className="form-select w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-300"
                                name="city" value={inputs.city} onChange={handleInputChange}>
                            <option value="">Select a City</option>
                            {ucity.map((c) => (
                                <option value={c} key={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select className="form-select w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-300"
                                name="gender" onChange={handleInputChange} value={inputs.gender}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div>
                        <input type="number" className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-300" 
                               name="age" placeholder="AGE in years" onChange={handleInputChange} />
                    </div>
                    <div>
                        <select className="form-select w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-300" 
                                name="lifestyle" onChange={handleInputChange} value={inputs.lifestyle}>
                            <option value="">Select Life Style Pattern</option>
                            <option value="Sedentary">Sedentary</option>
                            <option value="Non Sedentary">Non Sedentary</option>
                        </select>
                    </div>
                    <div>
                        <select className="form-select w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-300" 
                                name="bmi" onChange={handleInputChange} value={inputs.bmi}>
                            <option value="">Select BMI Category</option>
                            <option value="Underweight">Underweight</option>
                            <option value="Normal">Normal</option>
                            <option value="Overweight">Overweight</option>
                            <option value="Obese">Obese</option>
                        </select>
                    </div>                        
                    <button type="submit" className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold">
                        Submit
                    </button>
                </form>
            </div>
            
            <div className="lg:w-2/3 mt-32">
                <div className="overflow-auto bg-gray-800 rounded-lg p-6 shadow-lg">
                <h1 className="text-3xl font-semibold text-white mb-6">Microbial Data</h1>
                    <table className="w-full text-left text-white">
                        <thead>
                            <tr>
                                <th className="p-3 text-xl border-b text-center border-gray-700">Species</th>
                                <th className="p-3 text-xl border-b text-center border-gray-700">Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSpecies.length > 0 ? (
                                filteredSpecies.map((user, id) => { 
                                    return(<tr key={id}>
                                        <td className="p-3 border-b text-center border-gray-700"><i className="text-lg">{user.Species}</i></td>
                                        <td className="p-3 border-b text-center border-gray-700">{((parseFloat(user.Percent)/total)*100).toFixed(4)}%</td>
                                    </tr>)
})
                            ) : (
                                <tr>
                                    <td colSpan="2" className="p-3 text-center text-gray-500">No Data Available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Microbes;
