import { useEffect, useState } from "react"
import { getItem } from "../helpers/getItem";
import { Modals } from "../Components/Modals";
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ModalsEdits } from "../Components/ModalsEdit";
import "../../styles.css"


export const ItemGrid = () => {
    
    const [openModal, setOpenModal] = useState(false);

    const [openModal2, setOpenModal2] = useState(false);

    const [selectedItem, setSelectedItem] = useState(null)

    const [items, setItem] = useState(['']);

    const [copyitems, setCopyItem] = useState(['']);

    const navigate = useNavigate();



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



    const goBack = (event) => {
        event.preventDefault(); 

        navigate('/'); 
    }



    const Buscador = (event) => {

        if (event.target.value.length >= 3) {
            const search = event.target.value.toLowerCase();

            const buscandoItem = items.filter(item => item.name.toLowerCase().includes(search));
        
            setItem(buscandoItem)
        }else {
            setItem(copyitems)
        }
        
        
    }

    

    useEffect(() => {
      getitem();
      
    }, []);



    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Items</span>
            
        </div>
    );

    const imageBody = (item) => {
        return <img src={item.image} alt={item.image} className="w-6rem shadow-2 border-round"/>;
    }

    const buttonDeleteBody = (item) => {
        return <button className="bt-eliminar" onClick={() =>deleteItem(item)}>Eliminar</button>
    }

   




    return (
        <>
            <div className="card-grid">

                <button className="GoBack" onClick={goBack}>Exit</button>

                <input 
                type="text" 
                className="Searcher"
                placeholder="Search"
                onChange={Buscador}/>

                <DataTable value={items} selectionMode="single" onSelectionChange={(e) =>{setSelectedItem(e.value);}  } header={header} tableStyle={{minWidth: '50rem'}}>
                    
                    <Column field="name" header="Name"></Column>
                    <Column header="Image" body={imageBody}></Column>
                    <Column field="species" header="Species"></Column>
                    <Column header= "Eliminar" body={buttonDeleteBody}></Column>
                </DataTable>

                <button className="fb-more" onClick={()=>{setOpenModal(true);}}>Crear</button>
                {openModal && <Modals setOpenModal={setOpenModal} addItem={AddItem} ultimoId={items.length}/>}

                <button className="fb-edit" onClick={()=>{setOpenModal(true);}}>Editar</button>
                {openModal && selectedItem != null && <ModalsEdits setOpenModal={setOpenModal} item={selectedItem} updateItem={EditItem}/>}
                

            </div>


            
        </>
    )
    
    
}