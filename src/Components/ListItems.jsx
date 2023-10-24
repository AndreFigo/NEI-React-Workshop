import React, { useState } from "react";

function ListItems({ items, setItems }) {
    const [selectedItem, setSelectedItem] = useState(-1);



    function selectItem(item, index) {
        console.log(item);
        setSelectedItem(index);
    }

    function removeItem(item, index) {
        console.log(item);

        setSelectedItem(-1);
        setItems((prevItems) => {
            prevItems.splice(index, 1)
            return [...prevItems]
        });

    }


    return (
        <>
            <h1>My List</h1>
            <ul className="list-container">
                {items.length === 0 && "No items"}
                {items.map((item, index) => (
                    <li
                        className={
                            index === selectedItem
                                ? "list-item highlighted"
                                : "list-item"
                        }
                        key={index}
                        onClick={() => selectItem(item, index)}
                        onDoubleClick={() => removeItem(item, index)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ListItems