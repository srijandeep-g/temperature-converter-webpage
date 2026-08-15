
import { useState } from 'react';
import './App.css'

function App() {
  const [cel, setCel] = useState("");
  const [far, setFar] = useState("");
  const [kel, setKel] = useState("");
  const [res, setRes] = useState([]);
  const [input, setInput] = useState("");

  const checkInput = () => { 

    let count = 0;
    if (cel !== "") count++;
    if (far !== "") count++;
    if (kel !== "") count++;

    if (count === 0) { 
      return "empty";
    }
    if (count > 1) { 
      return "many";
    }
    if (cel !== "") { 
      return "c";
    }
    if (far !== "") {
      return "f";
    }
    else { 
      return "k";
    }
  }

  const handleSubmit = (e) => { 

    //preventing page refresh
    e.preventDefault();

    //handling 0 and multiple values
    const type = checkInput();
    if (type === "empty") {
      alert("Please enter a value in one box before submitting!")
      return;
    }
    else if (type === "many") { 
      alert("Please enter value in only one box before submitting!")
      return;
    }

    setInput(type);

    //conversion
    if (type === "c") {
      const c = Number(cel);
      const f = ((c * 9) / 5 + 32);
      const k = (c + 273.15);
      setRes([c, f, k]);
    } else if (type === "f") {
      const f = Number(far);
      const c = (f - 32) * 5 / 9;
      const k = (c + 273.15);
      setRes([c, f, k]);
    } else if (type === "k") { 
      const k = Number(kel);
      const c = k - 273.15;
      const f = ((c * 9) / 5 + 32);
      setRes([c, f, k]);
    }
    
  }

  return (
    <>
      <h1>Temperature Changer</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label>Value in Celsius:</label>
          <input type="number" value={cel} onChange={(e) => setCel(e.target.value)}/>
          <label>Value in Fahrenheit:</label>
          <input type="number" value={far} onChange={(e) => setFar(e.target.value)}/>
          <label>Value in Kelvin:</label>
          <input type="number" value={kel} onChange={(e) => setKel(e.target.value)}/>
          <button type="submit">Convert</button>
        </form>
        {res.length > 0 && input === "c" && (
            <div className="temp-card">
              <p>{res[0]}&deg; C is:<br />{res[1]}&deg; F<br />{res[2]} K</p>
            </div>
          )}
          {res.length > 0 && input === "f" && (
            <div className="temp-card">
              <p>{res[1]}&deg; F is:<br />{res[0]}&deg; C<br />{res[2]} K</p>
            </div>
          )}
          {res.length > 0 && input === "k" && (
            <div className="temp-card">
              <p>{res[2]} K is:<br />{res[0]}&deg; C<br />{res[1]}&deg; F</p>
            </div>
          )}
      </div>
    </>
  )
}

export default App
