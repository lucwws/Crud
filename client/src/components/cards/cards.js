import React from "react";
import "./card.css";
import FormDialog from "../dialog/dialogForm";

export default function Card(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        title={props.name}
        description={props.description}
        date_create={props.date_create}
        date_update={props.date_update}
        cost={props.cost}
        listCard={props.listCard}
        setListCard={props.setListCard}
        id={props.id}
      />
      <div className="card-container" onClick={() => setOpen(true)}>
        <h1 className="card-title">{props.name}</h1>
        <p className="card-id">{props.id}</p>
        <p className="card-cartegory">{props.description}</p>
        <p className="card-date_create">Data de criação{props.date_create}</p>
        <p className="card-date_update">Data de atualização{props.date_update}</p>
        <h3 className="card-cost">R${props.cost}</h3>
      </div>
    </>
  );
}
