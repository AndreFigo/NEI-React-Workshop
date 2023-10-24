import React, { useState } from "react";

function AddItem({ setItems }) {

    const [newItem, setNewItem] = useState("");

    function addItem(event) {
        event.preventDefault();
        if (newItem === "") return;
        console.log("addItem", newItem);
        setItems((prevItems) => [...prevItems, newItem]);
        setNewItem("");
    }

    return (
        <>
            <h1>Add item</h1>
            <form onSubmit={addItem} className="input-container">
                <input type="text" className="input-field" value={newItem} onChange={(event) => setNewItem(event.target.value)} />
                <button type="submit" className="sub-button">
                    Add
                </button>
            </form>
        </>
    )
}

export default AddItem