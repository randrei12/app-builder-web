export default interface Project {
    _id: string;
    title: string;
    platforms: string[];
    data: {
        design: string;
        blocks: string;
    }
}