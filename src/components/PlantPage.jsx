import React from "react";
import { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const API_URL = 'http://localhost:6001/plants'

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [searchPlants, setSearchPlants] = useState('')

  useEffect(() => {
    fetchPlants()
  },[])

  function fetchPlants() {
    fetch(API_URL)
      .then(r => {
        if(!r.ok) { throw new Error("Error fetching plants..")}
        return r.json()
      })
      .then(plantsData => setPlants(plantsData))
      .catch(err => console.log(err))
  }
  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant])
  }
  const filteredPlants = plants.filter((plant) => plant.name.toLowerCase().includes(searchPlants.toLocaleLowerCase()))
  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search setSearchPlants={setSearchPlants} />
      <PlantList plants={filteredPlants}/>
    </main>
  );
}

export default PlantPage;
