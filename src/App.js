import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {

  
  /* Access to fetch at 'http://localhost:5000/users/' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource */

  //port 5000 theke data port 3000 te dekhate chacchi kintu uporer error show kore. mane server side theke client side e data share er access CORS policy diye bondho kora .
  //Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.
  
  //Express website e middleware e CORS use korar description ache.

  //Middleware is software that lies between an operating system and the applications running on it. Essentially functioning as hidden translation layer, middleware enables communication and data management for distributed applications.
  //install cors on server side

  const [users, setUsers] = useState([]);
  useEffect(() => {
    //this api url is created in my server side and the data is also from there and it is being called by the client side .
    fetch("http://localhost:5000/users/")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };

    //post data to server

    //here use use fetch to post the new data, - by default fetch's method get - so we mention the method to POST in case where we are posting - and also we write some more staff with that
    fetch('http://localhost:5000/user', {
      method: "POST",
      headers: {
        'content-type':'application/json'
      },
      body:JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        console.log(data);
    })


  }
  return (
    <div className="App">
      <h1>Our users length {users.length}</h1>

      {/* This form will take the input data and send or post to the server side database */}
      <form onSubmit={handleAddUser} action="">
        <input type="text" name="name" id="" placeholder="Name" />
        <input type="text" name="email" id="" placeholder="Email" />
        <input type="submit"  id="" value='Add User'/>
      </form>

      <ul>
        {
          users.map(user => <li>{user.name} id:{user.id} email:{user.email} </li>)
        }
      </ul>
    </div>
  );
}

export default App;
