

export const Item = ({name, species, image}) => {
  return (
    <div className="card">
      <img src={image} alt={name}/>
      <h1>Nombre: {name}</h1>
      <h3>Especie: {species}</h3>
      <button>+</button>
      <button>-</button>
      <button>edit</button>
    </div>
  )
}
