import { useState } from "react";
import '../../styles.css';
import { ModalsEdits } from "../Components/ModalsEdit";

export const Item = ({item, deleteitem, editItem}) => {
    const [openModal, setOpenModal] = useState(false);
    
    return (
        <div className="card">
            <img src={item.image} alt={item.name}/>
            <h1>{item.name}</h1>
            <p>Especie: {item.species}</p>
            <button className="open-modal-button" onClick={() => deleteitem(item)}>Eliminar</button>
            <button className="open-modal-button" onClick={() => setOpenModal(true)}>Editar</button>
            {openModal && <ModalsEdits openModal={openModal} setOpenModal={setOpenModal} updateItem={editItem} item={item}/>}
        </div>
    )
}