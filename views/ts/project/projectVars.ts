const ID = location.href.substring(location.href.indexOf('projects/') + 9, location.href.lastIndexOf('/'));
let elements: [string, string][] = [];
let updateELements = (elem: [string, string][]) => elements = elem;

export { ID, elements, updateELements };