import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {components} from "react-select"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './AdvSearch.css';

//search bar --> any string --> all elk results
//show adv search filters : type, breed, age, gender

function AdvSearch({results, setResult, searchQuery, zipcode, radius}) {

  const [gender, setGender] = useState([])
  const [age, setAge] = useState([])
  const [breed, setBreed] = useState([])
  const [type, setType] = useState([])
  const [matches, setMatches] = useState(results)

  useEffect(()=>{
    if(searchQuery === "" && zipcode === "") return;
    // var zip = zipcode ? zipcode : null
    // var type = searchQuery ? searchQuery : null
    // var radius = zipcode ? radius : null
    var params = {zip: zipcode ? zipcode : null, type: searchQuery ? searchQuery : null, breed: breed ? breed : null, age: age ? age : null, gender: gender ? gender : null, radius: zipcode ? radius : null};
    console.log(params);
    axios.get("api/petSearch?search=*", {params})
    // axios.get("http://localhost:8080/api/petSearch", {params})
    .then((result) =>{
      setResult(result.data.pets)
    })
    .catch(err=>console.log(err))},
    [type, gender, age, breed])

    const handleFilterClick = (e) => {
      console.log('clicked')
    }

    let babyType;
    if (searchQuery === 'dog') babyType = 'Puppy';
    else if (searchQuery === 'cat') babyType = 'Kitten';
    else babyType = 'Baby';

    return (
      <>

      <div data-testid="adv-search" className="advSearchContainer">

      <div className="type filter">
          <h6 className="filterType">Type</h6>
          <select onChange={e=>setType(e.target.value)}>
            <option value="">Any</option>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
          </select>
        </div>
        <div className="breed filter">
          <h6 className="filterType">Breed</h6>
          <select onChange={e=>setBreed(e.target.value)}>
            <option value="">Any</option>
            <option value="ragdoll">Ragdoll</option>
            <option value="british shorthair">British Shorthair</option>
          </select>
        </div>
        <div className="age filter">
          <h6 className="filterType">Age</h6>
          <select onChange={e=>setAge(e.target.value)}>
            <option value="">Any</option>
            <option value={babyType}>{babyType}</option>
            <option value="young">Young</option>
            <option value="adult">Adult</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        <div className="gender filter">
          <h6 className="filterType">Gender</h6>
          <select onChange={(e)=>setGender(e.target.value)}>
            <option value="">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <button
            id="applyFilterButton"
            className="btn btn-primary"
            onClick={handleFilterClick}>Apply Filters</button>
      </div>
      </>
  )
}

export default AdvSearch;