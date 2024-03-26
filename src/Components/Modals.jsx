import { useState } from "react";


export const Modals = ({openModal, setOpenModal, addItem, ultimoId}) => {

    const [input, setInput] = useState("");

    const [inputEspecie, setinputEspecie] = useState("")

    const [nameSend, setNameSend] = useState(false);

    const AddItem = () => {
        const Item = {
            id: ultimoId +1,
            name: input,
            species: inputEspecie,
            image: `https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/minion.jpg`
        };
        addItem(Item);
    }

    

    const sendItem = () => {

        AddItem()
       
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
                            placeholder="Nombre"
                            className="model-input"
                            label={input}
                            type="text"
                            onChange={(event) => setInput(event.target.value)}
                        />
                    <label className="modal--imput-text">Especie</label>
                        <input
                            placeholder="Especie"
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
