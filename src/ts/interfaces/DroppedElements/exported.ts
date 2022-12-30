export default interface ExportedDE {
    name: string,
    type: string,
    styles: { [key: string]: any },
    text: string,
    src: string,
    id: string,
    childs: ExportedDE[]
}