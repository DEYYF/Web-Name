import { useEffect, useState } from "react"
import { getItem } from "../helpers/getItem";
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../../styles.css"
import { Button, FloatButton, Input, Modal } from "antd";


export const ItemGrid = () => {
    
    const [openModal, setOpenModal] = useState(false);

    const [openModal2, setOpenModal2] = useState(false);

    const [selectedItem, setSelectedItem] = useState({
        id: 0,
        name: '',
        species: '',
        image: ''
    })

    const [items, setItem] = useState([]);

    const [DeleteItem, setDeleteItem] = useState([])

    const [copyitems, setCopyItem] = useState([]);

    const [RowSelected, setRowSelected] = useState(null)

    const [input, setInput] = useState("");

    const [inputEspecie, setinputEspecie] = useState("")

    const [inputImage, setinputImage] = useState("")

    const navigate = useNavigate();

    const item = {
        id: items.length +1,
        name: input,
        species: inputEspecie,
        image: inputImage
    };

    const updateItem = {
        id: selectedItem?.id,
        name: input.trim() === '' ? selectedItem?.name : input,
        species: inputEspecie.trim() === '' ? selectedItem?.species : inputEspecie,
        image: selectedItem?.image
    }
    


    



    const getitem = async() => {

        if(localStorage.getItem("data")){
            const newItem = await getItem();
            localStorage.setItem("data",JSON.stringify(newItem));
            setItem(JSON.parse(localStorage.getItem("data")));
            setCopyItem(newItem);
        }
    }

    const deleteItem = (itemToDelete) => {

        const updatedItems = items.filter(item => item !== itemToDelete);
        setItem(updatedItems);
        setDeleteItem([...DeleteItem, itemToDelete]);
    }

    const AddItem = (itemNew) => {
        setItem([...items, itemNew])
    }

    const RecuperarItem = (itemRecuperar) => {
        setItem([...items, itemRecuperar])
        
        const updatedeleteItems = DeleteItem.filter(item => item != itemRecuperar);
        setDeleteItem(updatedeleteItems)
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




    const imageBody = (item) => {
       
        return <img src={item.image} alt={item.image} className="w-6rem shadow-2 border-round"/>;
    }

    const buttonDeleteBody = (item) => {
        return <button className="bt-eliminar" onClick={() =>deleteItem(item)}>Eliminar</button>
    }


    const buttonRecuperaBody = (item) => {
        return <button className="bt-recuperar" onClick={() =>RecuperarItem(item)}>Recuperar</button>
    }

    const headerRecuperado = () => {
        return <h1 className="header">Datos Borrados</h1>
    }

    const changeColor = (event) => {

        if (RowSelected != null && RowSelected.originalEvent != null) {

            RowSelected.originalEvent.target.style.background = "White"
        
        }

        setRowSelected(event)

        if (event.originalEvent != null) {
            event.originalEvent.target.style.background = '#ADD8E6';
        }

    }




    

    return (
        <>
            <div className="card-grid">

                <Button type="primary" className="GoBack" onClick={goBack}>Back</Button>

                
                <Input type="text" placeholder="Search" onChange={Buscador}></Input>

                    <DataTable value={items} selectionMode="single"  selection= {selectedItem} onSelectionChange={(e) =>{ setSelectedItem(e.value)}}
                     onRowClick={changeColor}>
                        
                        <Column field="name" header="Name"></Column>
                        <Column header="Image" body={imageBody}></Column>
                        <Column field="species" header="Species"></Column>
                        <Column header= "Eliminar" body={buttonDeleteBody}></Column>
                    </DataTable>
                

                    <Button type="primary" onClick={() => setOpenModal(true)}>Crear</Button>
                    <Modal title="Crear" open={openModal} onOk={() => {setOpenModal(false); AddItem(item)}} onCancel={() => setOpenModal(false)}>
                        <label>Nombre</label>
                        <Input type="text" placeholder="Nombre" onChange={(event) => setInput(event.target.value)} ></Input>
                        <label>Especies</label>
                        <Input type="text" placeholder="Especies" onChange={(event) => setinputEspecie(event.target.value)} ></Input>
                        <label>Imagen</label>
                        <Input type="text" placeholder="Imagen" onChange={(event) => setinputImage(event.target.value)} ></Input>
                    </Modal>


                    <Button type="primary" onClick={() =>{if (selectedItem != null) {setOpenModal2(true)}} }>Editar</Button>
                    {selectedItem !=null}<Modal title="Editar" open={openModal2} onOk={() => {setOpenModal2(false); EditItem(updateItem); items.map(item => {if (item.id === updateItem.id) {console.log(item);}}); RowSelected.originalEvent.target.style.background = 'White';}} onCancel={() => {setOpenModal2(false); RowSelected.originalEvent.target.style.background = 'White'; setSelectedItem(null)}}>
                        <label>Nombre</label>
                        <Input type="text" placeholder={selectedItem?.name} onChange={(event) => setInput(event.target.value)} ></Input>
                        <label>Especies</label>
                        <Input type="text" placeholder={selectedItem?.species} onChange={(event) => setinputEspecie(event.target.value)} ></Input>
                    </Modal>

                    

                    <DataTable value={DeleteItem}  header={headerRecuperado}>
                        
                        <Column field="name" header="Name"></Column>
                        <Column header="Image" body={imageBody}></Column>
                        <Column field="species" header="Species"></Column>
                        <Column header= "Recuperar" body={buttonRecuperaBody}></Column>
                    </DataTable>

                    
                    

                  
                    

                

            </div>


            
        </>
    )
    
    
}