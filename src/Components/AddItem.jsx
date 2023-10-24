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
            <form onSubmit={addItem}>
                <input type="text" className="form-control" value={newItem} onChange={(event) => setNewItem(event.target.value)} />
                <button type="submit" className="btn btn-primary">
                    Add
                </button>
            </form>
        </>
    )
}

export default AddItem