import { useEffect, useState } from "react"
import { Item } from "./Item";
import { getItem } from "../helpers/getItem";
import { Modals } from "../Components/Modals";
import "../../styles.css"


export const ItemGrid = () => {
    
    const [openModal, setOpenModal] = useState(false);

    const [items, setItem] = useState(['']);

    const getitem = async() => {
        const newItem = await getItem();
        setItem(newItem);
    }

    const deleteItem = (itemToDelete) => {
        const updatedItems = items.filter(item => item !== itemToDelete);
        setItem(updatedItems);
    }

    const AddItem = (itemNew) => {
        setItem([...items, itemNew])
    }


    const EditItem = (itemEdit) => {
        const updatedItems = items.map(item => {
            if (item.id === itemEdit.id) {
                return {
                    ...item,
                    name: itemEdit.name,
                    species: itemEdit.species
                }
            }
            return item;
        });
        setItem(updatedItems);
    }

    

    useEffect(() => {
      getitem();
    }, [ '']);


    return (
        <>
            <div className="card-grid">

                {
                    items.map( (item) =>(
                        <Item
                        key={item.id}
                        deleteitem={deleteItem} 
                        item={item}
                        editItem={EditItem}
                        id={item.id}
                        />
                    ))
                }

            </div>


            <button className="fb-more" onClick={()=>{
        setOpenModal(true);
      }}>Crear</button>
      {openModal && <Modals openModal={openModal} setOpenModal={setOpenModal} addItem={AddItem} ultimoId={items.length}/>}
        </>
    )
    
    
}