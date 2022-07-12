import React, {useState} from 'react';
import './App.css';
import articles from './results.json';

import FilterContainer from './Filters';
import CardContainer from './CardContainer';


function App() {
  const [maxTravel, setMaxTravel] = useState(3600);
  const [minSize, setMinSize] = useState(75);
  const [chosenArticles, setChosenArticles] = useState(articles);

function setArticles() {
  let selected = filterArticles(articles, maxTravel, minSize);
  selected.sort()
  setChosenArticles(selected);
}

function filterArticles(articles, maxTravel, minSize) {
  let filtered = articles.filter(e => e.shortest_duration !== null && e.shortest_duration < maxTravel);
  filtered = filtered.filter(e => e.search_result.size > minSize);
  return filtered;
}

  return (
    <div className="App">
      <FilterContainer
        maxTravel={maxTravel}
        setMaxTravel={setMaxTravel}
        minSize={minSize}
        setMinSize={setMinSize}
        setArticles={setArticles}
      />
      <CardContainer article_cards={chosenArticles}/>
    </div>
  );
}






export default App;
