import rings from "../data/rings.json";
export const fetchRings = async ()=> {
    // const response = await fetch(`/api/rings`)
    // const data = await response.json();
    // console.log('data', data);
    
    return rings;
}