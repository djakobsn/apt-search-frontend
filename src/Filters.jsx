
import React, {useReducer} from 'react';


export default function FilterContainer({maxTravel, setMaxTravel, minSize, setMinSize, setArticles }) {
  return (
    <div id="header" >
      <div className="filter">
        <p>Maks reisevei:</p>
        <input type="range" min="600" max="10800" value={maxTravel} onChange={e => setMaxTravel(e.target.value)} />
        <p>{timeify(maxTravel)}</p>
      </div>
      <div className="filter">
        <p>Minimum størrelse:</p>
        <input type="range" min="30" max="300" value={minSize} onChange={e => setMinSize(e.target.value)} />
        <p>{minSize} m²</p>
      </div>
      <div className="weights">
        <p>Score-komponenter:</p>
        <label htmlFor="size">Størrelse:</label>
        <input name="size" type="range" min="0" max="4" step="0.2" value="2" disabled />
        <br />
        <label htmlFor="price">Pris:</label>
        <input name="price" type="range" min="0" max="4" step="0.2" value="1" disabled />
        <br />
        <label htmlFor="time">Reisevei:</label>
        <input name="time" type="range" min="0" max="4" step="0.2" value="2" disabled />
      </div>
      <button onClick={setArticles}>Oppdater</button>
    </div>
  );
}

function timeify(seconds) {
  let text = '';
  let hours = Math.floor(seconds / 3600);
  if (hours >= 1)  {
    text += `${hours} timer`
    seconds -= hours * 3600;
  }
  let minutes = Math.floor(seconds / 60);
  if (minutes >= 1) {
    if (hours >= 1) {text += ' og '}
    text += `${minutes} minutter`;
  }
  return text
}