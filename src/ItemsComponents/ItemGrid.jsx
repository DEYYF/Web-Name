import { useEffect, useState } from "react"
import { Item } from "./Item";
import { getItem } from "../helpers/getItem";
import { Modals } from "../Components/Modals";
import "../../styles.css"


export const ItemGrid = () => {
    
    const [openModal, setOpenModal] = useState(false);

    const [items, setItem] = useState(['']);

    const [copyitems, setCopyItem] = useState(['']);


    const getitem = async() => {
        const newItem = await getItem();
        setItem(newItem);
        setCopyItem(newItem);
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

    const Buscador_nada = () => {
        return(
        <>
            <h1>Nada encontrado</h1>
        </>
        )
    }

    const Buscador = (event) => {
        
        const search = event.target.value;

        const buscandoItem = search === '' ? copyitems : items.filter(item => item.name.includes(search));
        
        setItem(buscandoItem)
    }

    

    useEffect(() => {
      getitem();
      
    }, []);


    return (
        <>
            <div className="card-grid">

                <input 
                type="text" 
                className="Searcher"
                placeholder="Search"
                onChange={Buscador}/>

                {
                    items.map( (item) =>(
                        <Item
                        key={item.id}
                        deleteitem={deleteItem} 
                        item={item}
                        editItem={EditItem}
                        />
                    ))
                }

            </div>


            <button className="fb-more" onClick={()=>{
        setOpenModal(true);
      }}>Crear</button>
      {openModal && <Modals setOpenModal={setOpenModal} addItem={AddItem} ultimoId={items.length}/>}
        </>
    )
    
    
}