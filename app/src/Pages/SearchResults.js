import React, {useState, useEffect} from 'react';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import Search from '../Components/Search/Search';
import Results from '../Components/Search/Results';
import AdvSearch from '../Components/Search/AdvSearch';
import SearchTopBar from '../Components/Search/SearchTopBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function SearchResults() {
  const [result, setResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);
  const [zipcode, setZipcode] = useState("");
  const [radius, setRadius] = useState("10");

  return (
    <>
      <Container>
        <Header/>
      </Container>
      <Navigationbar/>
      <Container>
        <Row
        className="justify-content-md-center">
          <div data-testid="search_results">
            <div data-testid="searchBars"> <Search setResult={setResult} searchQuery={searchQuery} setSearchQuery={setSearchQuery} zipcode={zipcode} setZipcode={setZipcode}/> </div>
            <SearchTopBar searchQuery={searchQuery} radius={radius} setRadius={setRadius} zipcode={zipcode}/>
            <div data-testid="results_inPage"> <Results zipcode={zipcode} searchQuery={searchQuery} setResult={setResult} matches={result}/> </div>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default SearchResults;