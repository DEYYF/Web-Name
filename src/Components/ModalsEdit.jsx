import { useState } from "react";



export const ModalsEdits = ({openModal, setOpenModal, updateItem, item}) => {

    const [input, setInput] = useState("");

    const [inputEspecie, setinputEspecie] = useState("")

    const [nameSend, setNameSend] = useState(false);


    const EditItem = () => {
        const updatedItem = {
            id: item.id,
            name: input.trim() === '' ? item.name : input,
            species: inputEspecie.trim() === '' ? item.species : inputEspecie,
            image: item.image
        };
        updateItem(updatedItem);
    }
    

    

    const sendItem = () => {

        EditItem()
       
        setNameSend(true);
        
        setOpenModal(false);
        
        
    }

    

    return (
        <>
        {!nameSend && 
            <div className="main-container">
                <div className="modal-container">
                    <h3 className="">Crear</h3>
                    <label className="modal--imput-text">Nombre</label>
                        <input
                            placeholder={item.name}
                            className="model-input"
                            label={input}
                            type="text"
                            onChange={(event) => setInput(event.target.value)}
                        />
                    <label className="modal--imput-text">Especie</label>
                        <input
                            placeholder={item.species}
                            className="model-input"
                            label={inputEspecie}
                            type="text"
                            onChange={(event) => setinputEspecie(event.target.value)}
                        />
                    
                </div>
                <div>
                
                    <div>
                    <div>
                        <button className="modal-footer-button modal-button-send" onClick={sendItem}>Send</button>
                        <button className="modal-footer-button modal-button-cancel" onClick={() => setOpenModal(false)}>Cancel</button>
                    </div>

                    </div>
                </div>
            </div>
            }
            {nameSend && 
            <div className="model-container-sent">
                <div className="model-text">Added</div>
            </div>
            }
        </>
    )
}