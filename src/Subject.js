import { useState } from 'react';
import pan from './pan_meta.json'
import otutab from './pan_otutab.json'
import tax from './pan_taxonomy.json'
const Subject = ()=>{
    const [ActiveID,SetActiveID] = useState(null);
  const demo = pan.filter((u)=>(u["AGE  in years"]===24))
    return(
        <div>
              <h1 className='text-center'>GUT MICROBIOME</h1>
      <input/>
     <table className='table'>
      <tr><th>Subject_ID</th><th>Geographical Location</th><th>Geographical zone in India</th><th>Gender</th><th>AGE  in years</th><th>Life style pattern</th><th>BMI</th><th>Obese/Non Obese</th><th>Microbes</th></tr>
      <tbody>
        {demo.map((user)=>{
          const name=user.Subject_ID;
          const Project = otutab.filter((i)=>i[name]>0).sort((b, a) => parseFloat(a[name]) - parseFloat(b[name])); // Sort in ascending order

          return(
          <tr><td >{user.Subject_ID}</td>
          <td>{user["Geographical Location"]}</td>
          <td>{user["Geographical zone in India"]}</td>
          <td>{user["Gender"]}</td>
          <td>{user["AGE  in years"]}</td>
          <td>{user["Life style pattern"]}</td>
          <td>{user.BMI}</td>
          <td>{user["Obese-Non Obese"]}</td>
          <td><button className='btn btn-primary' onClick={()=>{ActiveID===user.Subject_ID?SetActiveID(null):SetActiveID(user.Subject_ID)}}>See Microbes</button>
          <div className={ActiveID===user.Subject_ID?"show box":"hide box"}>
            <h2>{user.Subject_ID}</h2>
          <table className='table'>
                    <tr><th>GENUS</th><th>Species</th><th>Percentage</th></tr>
                    <tbody>
            {Project.slice(0,10).map((u)=>{
              const taxonomy = tax.filter((name)=>(name.OTUID===u.OTU_ID))
                  return(<>
                    {taxonomy.map((t)=>(
                <tr><td>{t.Genus}</td><td>{t.Species}</td><td>{(parseFloat(u[name])*100).toFixed(6)}</td></tr>
              ))}</>
            )})}</tbody></table>
            </div></td>
          </tr>
)})}
        
      </tbody>
     </table>
        </div>
    )
}
export default Subject;