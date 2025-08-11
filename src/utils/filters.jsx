export const filterAll = (todos) =>
{
    return todos;
}

export const FilterTitle = (todos) =>
{
    console.log('Click')
    return [...todos].sort((a,b) => a.title.localeCompare(b.title))
}

export const AltFilterTitle = (todos) =>
{
    return [...todos].sort((a,b) => b.title.localeCompare(a.title))
}

export const FilterData = (todos) =>
{
    return [...todos].sort((a,b) => new Date(a.date) - new Date(b.date));
}

export const AltFilterData = (todos) =>
{
    return [...todos].sort((a,b) => new Date(b.date) - new Date(a.date));
}

export const FilterCompleted = ( todos ) =>
{
    return [...todos].sort((a,b) => a.complete - b.complete)
}

export const AltFilterCompleted = ( todos ) =>
{
    return [...todos].sort((a,b) => b.complete - a.complete)
}