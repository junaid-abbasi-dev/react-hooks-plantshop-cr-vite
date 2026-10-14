import React, { useState } from "react";

function NewPlantForm({onAddPlant}) {

  // catch inputs from the form
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState("")

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        image: image,
        price: price,
      }),
    })
      .then(r => {
        if (!r.ok) {throw new Error("Error Sending data...")}
        return r.json()
      })
      .then((newPlant) => onAddPlant(newPlant))
  }
  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>

        <input 
        type="text" 
        name="name"
        value={name} 
        placeholder="Plant name" 
        onChange={(event) => setName(event.target.value)} 
        />

        <input 
        type="text" 
        name="image"
        value={image} 
        placeholder="Image URL"
        onChange={(event) => setImage(event.target.value)}
        />
        <input 
        type="number" 
        name="price"
        value={price} 
        step="0.01" 
        placeholder="Price"
        onChange={(event) => setPrice(event.target.value)}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
