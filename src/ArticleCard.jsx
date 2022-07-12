
import React, {useState} from 'react';


export default function ArticleCard({ details }) {
  const [acceptance, setAcceptance] = useState(null)

  let finn = details.search_result;
  let score = details.score.toFixed(2);

  return <a key={details.search_result.finn_code} className="article-card" href={finn.url} target="_blank" rel="noreferrer">
    <div className="content">
      <div className="score-indicator" style={{ borderColor: getColor(score) }} />
      <h2 className="article-header">{finn.title}</h2>
      <div className="toprow">
        <span className="price">{finn.monthly_price},-</span>
        <span className="size">{finn.size} m²</span>
        <span className="address">{finn.address}</span>
        <EnturLink details={details} />
      </div>
    </div>
    <button
      onClick={(e) => { e.preventDefault(); setAcceptance(false) }}
      className={"reject status-button" + (!acceptance ? " selected" : "")}
    >✕</button>
    <button
      onClick={(e) => { e.preventDefault(); setAcceptance(true) }}
      className={"accept status-button" + (acceptance ? " selected" : "")}
    >✓</button>
  </a>
}

function EnturLink({ details }) {
  let loc = details.detailed_location;
  let url = "https://entur.no/travel-result?transportModes=rail%2Ctram%2Cbus%2Ccoach%2Cwater%2Ccar_ferry%2Cmetro%2Cflytog%2Cflybuss%2Cair&date=1650348000000&walkSpeed=1.3&minimumTransferTime=120&timepickerMode=departAfter&startId=OSM%3ATopographicPlace%3A791775147stopId=NSR%3AStopPlace%3A59651&stopLabel=Sk%C3%B8yen%20stasjon&stopLat=59.922353&stopLon=10.678831";

  if (!loc || !loc.road_number || !loc.location.lon || !loc.location.lat) {
    return <span className="reisetid">{timeify(details.shortest_duration)}</span>
  }

  let startLabel = "&startLabel=" + encodeURIComponent(loc.road + " " + loc.road_number.toString());
  let longitude = "&startLon=" + loc.location.lon.toString();
  let latitude = "&startLat=" + loc.location.lat.toString();

  url += longitude + latitude + startLabel;
  return (
    <a className="reisetid" href={url} target="_blank" rel="noreferrer">
      {timeify(details.shortest_duration)} til Skøyen stasjon
    </a>
  );
}

function timeify(seconds) {
  let text = '';
  let hours = Math.floor(seconds / 3600);
  if (hours >= 1) {
    text += `${hours} timer`
    seconds -= hours * 3600;
  }
  let minutes = Math.floor(seconds / 60);
  if (minutes >= 1) {
    if (hours >= 1) { text += ' og ' }
    text += `${minutes} minutter`;
  }
  return text
}

function getColor(score) {
  let red = Math.round(Math.min(255, score * 25 - 50));
  let green = Math.round(Math.min(163, Math.max(652/score, 20)));
  return `rgb(${red}, ${green}, 40)`;
}
