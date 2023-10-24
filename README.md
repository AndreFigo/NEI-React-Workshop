# NEI: React workshop by André Figo

# Guideline for the React workshop

This document is a script for the content presented during the workshop.

## Pre requirements

- Html
- CSS
- JavaScript

## What is react?

- JavaScript interacts with the DOM (_Document Object Model)_ directly. The document is generated from the html code given to the browser.
- Pure JavaScript may be very difficult to use in bigger projects.
- On the other hand React uses components, that can be as small as a button and can be reused as many times as necessary.
- React helps us write reusable, modular and better organized code

## How to setup react

- Install Node.js ([https://nodejs.org/en](https://nodejs.org/en))
  - Check if node is correctly installed
  ```bash
  node -v
  ```
- Install VSCode (optional)
- Create a react app
  - Vite will be used. but other options are available. Faster and less prone to vulnerabilities.
  ```bash
  npm create vite@latest
  ```
  Proceed to install the necessary packages, write the project name, select the framework (React) and the language (javascript)
- Run the app
  ```bash
  cd react_app_name
  npm install
  npm run dev
  ```
- Alternatively, the project can be open in VSCode first and use the integrated terminal to run the project (easier access to the terminal)
  ```bash
  cd react_app_name
  code . # This opens vscode in the current folder
  ```

## Project structure

- Node_modules → contains all the libraries installed (don’t touch)
- Public (keeps the public assets, like images, etc)
- src → keeps our code
- index.html → main file from which our app is going to run
- package.json → keeps info about the project and all its dependencies
- vite.config → configuration file for vite (won’t be necessary for the workshop)
- Components folder → where all components will be located

## Creating our first component

- Create a new file in the src folder called _Hello.jsx_
- Use functions instead of classes (old way of programming react)
- Follow Upper camel case convention to write the name of components (first letter of each word in Capital letter)

```jsx
// Hello.jsx file

function Hello() {
  return <h1>Hello World</h1>;
}

export default Hello;
```

- Rewrite App.jsx file to use the new component

```jsx
// App.jsx file
import Hello from "./Hello";

function App() {
  return (
    <div>
      <Hello />
    </div>
  );
}

export default App;
```

- Explain how variables and logic can be used inside the components’s functions

```jsx
// Hello.jsx file

function Hello() {
  const name = "Figo";
  if (name) return <h1>Hello {name}</h1>;
  return <h1>Hello World</h1>;
}

export default Hello;
```

## How React renders your elements

The index.html page will be the one sent to the browser. It has a root element that will be used in main.jsx (also present in index.html as a script). Main.jsx uses the App component that is where we start writing our components.

## Add new libraries to the project

There are instructions to install Bootstrap in react bellow. After that, you must import a css file, as shown.

```bash
# close the application and then
npm install Bootstrap
# run the application again
npm run dev
```

```jsx
// main.jsx file
import "bootstrap/dist/css/bootstrap.css";
```

## Create a new component

For this new component a bootstrap snippet from their website will be used.
We'll use a list of items with a simple title. However, we can't return multiple components in a single function. To avoid this problem we can encapsulate those element in a fragment, that can be represented simply by "<></>" or by the react keyword Fragment.

```jsx
// Wrong
function Listing() {

	return (
		<h1>List</h1>;
		<ul className="list-group">
		  <li className="list-group-item">An item</li>
		  <li className="list-group-item">A second item</li>
		  <li className="list-group-item">A third item</li>
		  <li className="list-group-item">A fourth item</li>
		  <li className="list-group-item">And a fifth one</li>
		</ul>
);
}

// Right (uses Fragments)
function Listing() {

	return (
	<>
		<h1>List</h1>;
		<ul className="list-group">
		  <li className="list-group-item">An item</li>
		  <li className="list-group-item">A second item</li>
		  <li className="list-group-item">A third item</li>
		  <li className="list-group-item">A fourth item</li>
		  <li className="list-group-item">And a fifth one</li>
		</ul>
	</>
);
}
```

## Map an array instead of using static info

We now want to display an array instead of multiple static items.
We can't use for loops inside html code, so we resort to the javascript map function, as can be seen below:

```jsx
const items = ["a","b", "c"];

//...

{items.map( (item, index)=> (
	<li className="list-group-item" key={index}> {item}<li/>
	))}



```

Import to always include the key attribute, as it works as a way to identify each element of the array.

Conditions can also be used inside the html code:

```jsx
{items.length ===0 ? <p> No item found <p/> : null}

{// This can also be assigned to a boolean variable or be used inside a function to make the code more readable}

const isEmpty = ()=> {
	return items.length ===0 ? <p> No item found <p/> : null;
}
```

## Events

All react elements have certain attributes, like onClick that will trigger when something happens.

```jsx
<li className="list-group-item" key={item} onClick={()=>console.log(item)}> {item}<li/>
{// for index to work, it needs to be passes in the mapping function as well
// items.map((item, index)=> ...

// (event) => console.log(event) for more info regarding the event

//handle function should be seperate
}

import {MouseEvent} from 'react';

const handleClick = (event: MouseEvent)=> console.log(event);

{//.. onClick={handleClick}  // no parenthesis
}
```

In our case, we want to highlight a list item if we click on it. In order to do that, we will need a variable to keep the currently selected item. However, in react we use a different concept to change the state of variables, which we call Hooks.

## React Hooks

We'll be using the "active" bootstrap class to highlight the item for a simpler implementation. Then we want to create an integer variable for the selected item. If we use a const variable we will not be able to change its value and update the page. In order to do that we'll be using the useState react hook. This function returns two variables, which will be used as a setter and a getter, respectively.

```jsx

const [selectedItem, setSelectedItem] = useState(-1);

function selectItem(item, index) {
	console.log(item);
	setSelectedItem(index);
}

//...
	<li
		className = {selectedIndex === index ? "list-group-item active" : "list-group-item"}
		onClick={() => selectItem(item, index)}
		key= {index}
		>
```

## Adding/Removing data to the array

We'll now build a way to add and remove items from the list we built earlier.
In order to do that, we'll use an input field and a button for addition, as well as the double click function for removal.

First we need to use the same hook to create the array. Apart from that we also need a variable to keep the new item and a function to add that item to the list.

```jsx
const [newItem, setNewItem] = useState("");

function addItem(event) {
  // this is used to prevent the page auto reload
  event.preventDefault();
  // dont add empty items
  if (newItem === "") return;
  console.log("addItem", newItem);
  setItems((prevItems) => [...prevItems, newItem]);
  setNewItem("");
}
//...

<>
  <form onSubmit={addItem}>
    <input
      type="text"
      className="form-control"
      value={newItem}
      onChange={(event) => setNewItem(event.target.value)}
    />
    <button type="submit" className="btn btn-primary">
      Add
    </button>
  </form>
</>;

//...
```

Then, to remove an item, we'll need a remove function linked to the onDoubleClick attribute of the item, which will run after a double click is detected, as the name implies.

```jsx
function removeItem(item, index) {
  console.log(item);

  setSelectedItem(-1);
  setItems((prevItems) => {
    prevItems.splice(index, 1);
    return [...prevItems];
  });
}

<li onDoubleClick={() => removeItem(item, index)}> </li>;
//...
```

## Pass data via props

Our list file is getting quite messy and disorganized, so we should divide it into new components. We'll have a component to list the items, and the logic behind it, and a second one containing the form and its logic as well. However, there are items that are used in both components, so we need to pass them as arguments, which is called passing props in react.

This results in a much more clear and readable List file:

```jsx
//List.jsx
function List() {
  const [items, setItems] = useState([]);

  return (
    <>
      <AddItem setItems={setItems} />
      <ListItems items={items} setItems={setItems} />
    </>
  );
}

//AddItem.jsx

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
        <input
          type="text"
          className="form-control"
          value={newItem}
          onChange={(event) => setNewItem(event.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </>
  );
}

//ListItems.jsx

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
      prevItems.splice(index, 1);
      return [...prevItems];
    });
  }

  return (
    <>
      <h1>My List</h1>
      <ul className="list-group">
        {items.length === 0 && "No items"}
        {items.map((item, index) => (
          <li
            className={
              index === selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
            key={index}
            onClick={() => selectItem(item, index)}
            onDoubleClick={() => removeItem(item, index)}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
```

## Fetch info

Now, we'll try to get data from a rest api, using the useEffect hook, which can be used to fetch data while loading the page.
We'll use [https://jsonplaceholder.typicode.com/](https://jsonplaceholder.typicode.com/) as an rest api example.

```jsx
// List.jsx
const url = "https://jsonplaceholder.typicode.com/posts";

useEffect(() => {
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      // create an array using only the titles of the retrieved data and use only the first 10
      var titles = json.map((item) => item.title).slice(0, 10);
      setItems(titles);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}, []);
```

## What to explore next:

- Typescript
- Routing
