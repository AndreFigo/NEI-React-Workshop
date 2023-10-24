import React, { useState, useEffect } from "react";
import AddItem from "./AddItem";
import ListItems from "./ListItems";
import Frame from "./Frame";

function List() {
  const [items, setItems] = useState([]);

  const url = 'https://jsonplaceholder.typicode.com/posts'

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        // create an array using only the titles of the retrieved data and use only the first 10 
        var titles = json.map((item) => item.title).slice(0, 10)
        setItems(titles)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }, [])



  return (
    <Frame>
      <AddItem setItems={setItems} />
      <ListItems items={items} setItems={setItems} />
    </Frame>
  );
}

export default List;





