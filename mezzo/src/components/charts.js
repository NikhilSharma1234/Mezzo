import './../App.css';
import chart_data from './chart_table.json';
import DOMPurify from 'dompurify'

const Charts = () => {  
  function createTable() {
    let table = "<table border=1>";
    table += `<tr>
                <th>Position</th>
                <th>Title</th>
                <th>Album</th>
                <th>Artist</th>
                <th>Length</th>
                <th>Date Added</th>
              </tr>`;
    let tr = "";
    for(let i = 0; i < chart_data.entries.length; i++) {
      tr += "<tr>";
      tr += `<td>${chart_data.entries[i].position}</td>`;
      for (let key in chart_data.entries[i].description) {
        tr += `<td>${chart_data.entries[i].description[key]}</td>`;
      }
      tr += "</tr>"
    }
    table += tr + "</table>";
    return table;
  }

  const Table_html = createTable();

  return (
    <section className="main_closed main">
        {<div className="charts_main" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(Table_html) }} />}
    </section>
  );
};

export default Charts;