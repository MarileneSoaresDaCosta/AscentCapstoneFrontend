import React, {useState, useEffect} from 'react';
import './Results.css';


// bar: [Number of matches] search word  distance (arrow)  near <location>

// column left: advanced search (dropdowns)
// column right: cards (mini profiles) - for now just a list of names

function Results({matches}){
    return(
    <div data-testid="results">

        <div>
            <div className="topBar">
                <p> Top bar [# matches] search-word  distance (arrow)  near LOCATION </p>
            </div>
            <div className="main">
                <div className="advancedSearchCol">
                    <p> column left: advanced search (dropdowns)</p>
                </div>
                <div className="searchResultsCol">
                    <p> column right: cards (mini profiles) - for now just a list of names </p>
                    <div>{
                        matches === undefined ? (<div>No matches</div>) :
                        matches.map(match => {
                            return(
                                <div
                                data-testid={`t-${match.zip}${match.name}`}
                                key={`${match.zip}${match.name}`}>{match.name}, {match.type}</div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
     </div>
    )

}

export default Results;
