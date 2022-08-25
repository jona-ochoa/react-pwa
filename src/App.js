import React, { useState } from "react";
import "./App.css";
import { withServiceWorkerUpdater } from '@3m1/service-worker-updater';


const App = (props) => {
  const {newServiceWorkerDetected, onLoadNewServiceWorkerAccept} = props;
  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [item, setItem] = useState([]);

  const addNewItem = () => {
      setItem([...item, newTitle + ' ' + newMessage]);
      setNewTitle("");
      setNewMessage("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>**Ejercicio React Avanzado**</h1>
        {newServiceWorkerDetected &&  <div style={{marginBottom: '20px', backgroundColor: 'red', padding: 20 }}>
          <h3>¡Nueva actualizacion! ¿Quieres actualizar?</h3>
          <button onClick={onLoadNewServiceWorkerAccept }>Actualizar</button>
        </div>}
        <label>Title</label>
        <input
          
          type="text"
          value={newTitle}
          onKeyPress={(e) => e.key === "Enter" && addNewItem()}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <label>Message</label>
        <input
          type="text"
          value={newItemMessage}
          onKeyPress={(e) => e.key === "Enter" && addNewItem()}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" onClick={addNewItem}>
          Añadir
        </button>
        <ul>
          {item.map((item, key) => (
            <li key={key}>{item}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default withServiceWorkerUpdater(App);

