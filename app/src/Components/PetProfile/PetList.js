import { useEffect, useState } from "react";
import PetCard from "./PetCard";

function PetList() {
  const [petList, setPetList] = useState([]);
  const [myPetList, setMyPetList] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  console.log(myPetList);
  let user = localStorage.getItem("username");
  console.log(localStorage.getItem("username"));
  useEffect(() => {
    fetch(
      "http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("got data");
        setPetList(data.petsList);
        if (user) {
          console.log("getting user data too");
          fetch(`http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com/:8080/api/pets?owner=${user}`)
            .then((res) => res.json())
            .then((Mydata) => {
              setMyPetList(Mydata.petsList);
            });
        }
      });
  }, []);

  return (
    <>
      <button
        onClick={() =>
          user ? setIsClicked(!isClicked) : alert("Please Sign In")
        }
      >
        {isClicked ? "Show All Pets" : "Show My Pets"}
      </button>
      <h1>List of All Pets</h1>

      <div
        style={{
          width: 800,
          height: 500,
          marginLeft: "20%",
          marginTop: "30px",
        }}
      >
        {/* {console.log(typeof petList)}
        {console.log(petList)} */}
        {isClicked
          ? myPetList.map((petObj) => (
              <PetCard
                id={petObj.petId}
                key={petObj.petId}
                owner={petObj.owner}
                name={petObj.name}
                location={petObj.location}
                type={petObj.type}
                description={petObj.description}
              />
            ))
          : petList.map((petObj) => (
              <PetCard
                id={petObj.petId}
                key={petObj.petId}
                owner={petObj.owner}
                name={petObj.name}
                location={petObj.location}
                type={petObj.type}
                description={petObj.description}
              />
            ))}
      </div>
    </>
  );
}

export default PetList;
