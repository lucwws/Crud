import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/cards";

export default function App() {
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);
  console.log(listCard);
  const handleRegisterProdutos = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      cost: values.cost,
      description: values.description,
      date_create: values.date_create,
      date_update: values.date_update,
    }).then(() => {
      Axios.post("http://localhost:3001/search", {
        name: values.name,
        cost: values.cost,
        description: values.description,
        date_create: values.date_create,
        date_update: values.date_update,
      }).then((response) => {
        setListCard([
          ...listCard,
          {
            name: values.name,
            cost: values.cost,
            description: values.description,
            date_create: values.date_create,
            date_update: values.date_update,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListCard(response.data);
    });
  }, []);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };

  return (
    <div className="app--container">
      <div className="register--container">
        <h1 className="register--title">Cadastro de produtos ICTS</h1>

        <input
          type="text"
          name="name"
          placeholder="Nome"
          className="register--input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Preço"
          name="cost"
          className="register--input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Categoria"
          name="description"
          className="register--input"
          onChange={handleaddValues}
        />
        <h5>Data de criação</h5>
        <input 
          type="date"
          placeholder="Data de criação"
          name="date_create"
          className="register--input"
          onChange={handleaddValues}
        />
        <h5>Data de atualização</h5>
        <input
          type="date"
          placeholder="Data de atualização"
          name="date_update"
          className="register--input"
          onChange={handleaddValues}
        />

        <button onClick={handleRegisterProdutos} className="register-button">
          Cadastrar
        </button>
      </div>

      {listCard.map((val) => (
        <Card
          listCard={listCard}
          setListCard={setListCard}
          key={val.id}
          id={val.id}
          name={val.name}
          cost={val.cost}
          description={val.description}
          date_create={val.date_create}
          date_update={val.date_update}
        />
      ))}
    </div>
  );
}
