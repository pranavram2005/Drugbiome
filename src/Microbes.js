import { useState } from "react";
import pan from './pan_meta.json';
import otutab from './pan_otutab.json';
import tax from './pan_taxonomy.json';

const Microbes = () => {
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
        e.preventDefault(); // Prevent default form submission

        const filteredDemo = pan.filter(u => 
            (!inputs.city || u["Geographical Location"] === inputs.city) &&
            (!inputs.zone || u["Geographical zone in India"] === inputs.zone) &&
            (!inputs.gender || u["Gender"] === inputs.gender) &&
            (!inputs.age || u["AGE  in years"] === parseInt(inputs.age)) &&
            (!inputs.lifestyle || u["Life style pattern"] === inputs.lifestyle) &&
            (!inputs.bmi || 
                (inputs.bmi === "Underweight" && u["BMI"] < 18.5) || // Underweight
                (inputs.bmi === "Normal" && u["BMI"] >= 18 && u["BMI"] < 24) || // Normal
                (inputs.bmi === "Overweight" && u["BMI"] >= 24 && u["BMI"] < 30) || // Overweight
                (inputs.bmi === "Obese" && u["BMI"] >= 30) // Obese
            ) &&
            (!inputs.obesity || u["Obese-Non Obese"] === inputs.obesity)
        );

        let count = [];
        filteredDemo.forEach((user) => {
            const name = user.Subject_ID;
            const Project = otutab.filter((i) => i[name] > 0)
                .sort((b, a) => parseFloat(a[name]) - parseFloat(b[name])); // Sort in descending order

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
                if (uniqueSpecies.length >= 10) break; // Limit to 10 unique species
            }
        }

        setFilteredSpecies(uniqueSpecies); // Update the state with filtered species
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="city" placeholder="Geographical Location" onChange={handleInputChange} />
                <input type="text" name="zone" placeholder="Geographical zone in India" onChange={handleInputChange} />
                
                <select name="gender" onChange={handleInputChange} value={inputs.gender}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <input type="number" name="age" placeholder="AGE in years" onChange={handleInputChange} />
                
                <select name="lifestyle" onChange={handleInputChange} value={inputs.lifestyle}>
                    <option value="">Select Life Style Pattern</option>
                    <option value="Sedentary">Sedentary</option>
                    <option value="Non Sedentary">Non Sedentary</option>
                </select>

                <select name="bmi" onChange={handleInputChange} value={inputs.bmi}>
                    <option value="">Select BMI Category</option>
                    <option value="Underweight">Underweight</option>
                    <option value="Normal">Normal</option>
                    <option value="Overweight">Overweight</option>
                    <option value="Obese">Obese</option>
                </select>
                
                <select name="obesity" onChange={handleInputChange} value={inputs.obesity}>
                    <option value="">Select Obesity Status</option>
                    <option value="Obese">Obese</option>
                    <option value="Non Obese">Non Obese</option>
                </select>

                <button type="submit">Submit</button> {/* Submit button */}
            </form>
            <div>
                {filteredSpecies.map((user, id) => (
                    <p key={id}>{user.Species}, {user.Percent}</p>
                ))}
            </div>
        </div>
    );
};

export default Microbes;
