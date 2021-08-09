import { useState } from "react";
import axios from "axios";


function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showCongrats, setShowCongrats] = useState(false)

  const addUserHandler = () => {
    axios({
      url: 'http://localhost:5000/graphql',
      method: 'POST',
      data: {
        query:`
          mutation {
            addUser (
              userInput: {
                email: "${email}", 
                password: "${password}"
              }){
                _id
                email
                password
              }
        }
        `
      }
    }).then((response) => {
      console.log(response.data);
      setEmail("");
      setPassword("");
      setShowCongrats(true);
    }).catch((error) => console.error(error))
  }

  return (
    <div className="App">
      <h5>Email</h5>
      <input type="text" value={email} onChange={(e) => { setEmail(e.currentTarget.value) }}></input>
      <h5>Password</h5>
      <input type="text" value={password} onChange={(e) => { setPassword(e.currentTarget.value) }}></input>
      <button style={{ display: "block", marginTop: "20px" }} disabled={!email.length && !password.length} onClick={addUserHandler}>Add User</button>
      <div>
        {showCongrats && "well done, you added new user to system"}
      </div>
    </div>
  );
}

export default App;
