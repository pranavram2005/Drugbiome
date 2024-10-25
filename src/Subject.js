import { useState, useMemo } from 'react';
import pan from './pan_meta.json';
import otutab from './pan_otutab.json';
import tax from './pan_taxonomy.json';

const Subject = () => {
    const [Search, SetSearch] = useState(pan);
    const [ActiveID, SetActiveID] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({ city: '', gender: '', searchValue: '' });
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

    const ucity = useMemo(() => [...new Set(pan.map(u => u["Geographical Location"]))], [pan]);

    const rowsPerPage = 10;
    const totalPages = Math.ceil(Search.length / rowsPerPage);
    const currentData = Search.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prevPage => prevPage - 1);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
        filterData({ ...filters, [name]: value });
    };

    const filterData = (filters) => {
        const filteredData = pan.filter((item) => {
            const matchesSearch = Object.values(item).join('').toLowerCase().includes(filters.searchValue.toLowerCase());
            const matchesCity = filters.city === '' || item['Geographical Location'] === filters.city;
            const matchesGender = filters.gender === '' || item['Gender'] === filters.gender;
            return matchesSearch && matchesCity && matchesGender;
        });
        applySorting(filteredData, sortConfig.key, sortConfig.direction);
    };

    const applySorting = (data, key, direction) => {
        if (!key) return SetSearch(data);

        const sortedData = [...data].sort((a, b) => {
            const valueA = key === 'AGE  in years' || key === 'BMI' ? parseFloat(a[key]) : a[key];
            const valueB = key === 'AGE  in years' || key === 'BMI' ? parseFloat(b[key]) : b[key];

            if (valueA < valueB) return direction === 'asc' ? -1 : 1;
            if (valueA > valueB) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        SetSearch(sortedData);
    };

    const handleSort = (key) => {
        const newDirection = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction: newDirection });
        applySorting(Search, key, newDirection);
    };

    const resetFilters = () => {
        setFilters({ city: '', gender: '', searchValue: '' });
        setSortConfig({ key: '', direction: 'asc' });
        setCurrentPage(1);
        SetSearch(pan); // Reset to initial data
    };

    return (
      <div className="bg-gray-100 min-h-screen p-8 w-full">
      <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">Gut Microbiome Analysis</h1>
      <input
          placeholder="Search by Subject ID..."
          type="text"
          name="searchValue"
          onChange={handleInputChange}
          className="w-full p-3 mb-4 text-gray-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
  
      <button
          onClick={resetFilters}
          className="px-4 py-2 mb-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none transition"
      >
          Reset
      </button>
  
      <table className="w-full bg-white shadow-lg rounded-lg overflow-x">
          <thead>
              <tr className="bg-indigo-600 text-white text-md md:text-sm uppercase tracking-wider">
                  <th className="py-3 px-6">Subject_ID</th>
                  <th className="py-3 px-6 flex flex-col">
                      Location
                      <select className="form-select w-full relative z-10 border border-gray-600 rounded"
                          name="city" value={filters.city} onChange={handleInputChange}>
                          <option value="">Select a City</option>
                          {ucity.map((c) => (
                              <option value={c} key={c}>{c}</option>
                          ))}
                      </select>
                  </th>
                  <th className="py-3 px-6 hidden sm:table-cell">Gender</th>
                  <th className="py-3 px-6 cursor-pointer" onClick={() => handleSort('AGE  in years')}>
                      Age {sortConfig.key === 'AGE  in years' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th className="py-3 px-6 hidden sm:table-cell">Lifestyle</th>
                  <th className="py-3 px-6 cursor-pointer" onClick={() => handleSort('BMI')}>
                      BMI {sortConfig.key === 'BMI' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th className="py-3 px-6 hidden sm:table-cell">Obesity</th>
                  <th className="py-3 px-6">Microbes</th>
              </tr>
          </thead>
          <tbody>
              {currentData.map(user => {
                  const name = user.Subject_ID;
                  const Project = otutab.filter(i => i[name] > 0).sort((b, a) => parseFloat(a[name]) - parseFloat(b[name]));
  
                  return (
                      <tr key={user.Subject_ID} className="hover:bg-indigo-50 transition-colors duration-200">
                          <td className="py-3 px-6 text-center">{user.Subject_ID}</td>
                          <td className="py-3 px-6 text-center">{user["Geographical Location"]}</td>
                          <td className="py-3 px-6 text-center hidden sm:table-cell">{user["Gender"]}</td>
                          <td className="py-3 px-6 text-center">{user["AGE  in years"]}</td>
                          <td className="py-3 px-6 text-center hidden sm:table-cell">{user["Life style pattern"]}</td>
                          <td className="py-3 px-6 text-center">{user.BMI}</td>
                          <td className="py-3 px-6 text-center hidden sm:table-cell">{user["Obese-Non Obese"]}</td>
                          <td className="py-3 px-6 text-center">
                              <button
                                  className="px-4 py-1 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 focus:outline-none transition"
                                  onClick={() => {
                                      ActiveID === user.Subject_ID ? SetActiveID(null) : SetActiveID(user.Subject_ID);
                                  }}
                              >
                                  {ActiveID === user.Subject_ID ? "Hide" : "See"} Microbes
                              </button>
                              {ActiveID === user.Subject_ID && (
                                  <div className="mt-3 p-4 bg-gray-50 rounded-lg shadow-md">
                                      <h2 className="text-md font-semibold mb-2 text-indigo-700">{user.Subject_ID} Microbes</h2>
                                      <table className="w-full">
                                          <thead>
                                              <tr className="bg-gray-200 text-xl">
                                                  <th className="py-2 px-4 text-center">Genus</th>
                                                  <th className="py-2 px-4 text-center">Species</th>
                                                  <th className="py-2 px-4 text-center">Percentage</th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                              {Project.slice(0, 10).map(u => {
                                                  const taxonomy = tax.filter(t => t.OTUID === u.OTU_ID);
                                                  return (
                                                      taxonomy.map(t => (
                                                          <tr key={t.OTUID} className='text-lg'>
                                                              <td className="py-2 px-4"><i className="text-lg">{t.Genus}</i></td>
                                                              <td className="py-2 px-4"><i className="text-lg">{t.Species}</i></td>
                                                              <td className="py-2 px-4 text-right">{(parseFloat(u[name]) * 100).toFixed(6)}%</td>
                                                          </tr>
                                                      ))
                                                  );
                                              })}
                                          </tbody>
                                      </table>
                                  </div>
                              )}
                          </td>
                      </tr>
                  );
              })}
          </tbody>
      </table>
  
      <div className="flex justify-center items-center space-x-4 mt-6">
          <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-indigo-400 text-white rounded-md hover:bg-indigo-500 focus:outline-none transition disabled:opacity-50"
          >
              Previous
          </button>
          <span className="text-gray-600">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-indigo-400 text-white rounded-md hover:bg-indigo-500 focus:outline-none transition disabled:opacity-50"
          >
              Next
          </button> 
      </div>
  </div>
  
    );
};

export default Subject;
