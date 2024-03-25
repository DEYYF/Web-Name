export const getItem = async() => {

    const url = `https://rickandmortyapi.com/api/character`;
    const resp = await fetch( url );
    const { results } = await resp.json();

    const Items = results.map (item => ({
        id: item.id,
        name: item.name,
        species: item.species,
        image: item.image
    }));

    return Items;
}