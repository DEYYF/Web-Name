export const getItem = async() => {

    const resp = await fetch(`https://rickandmortyapi.com/api/character`);
    const { results } = await resp.json();

    const Items = results.map (item => ({
        id: item.id,
        name: item.name,
        species: item.species,
        image: item.image
    }));

    return Items;
}