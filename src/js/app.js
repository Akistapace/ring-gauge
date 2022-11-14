import listRings from "./list-rings";
import {modal} from "./modals";
import {header} from "./header";

(async ()=> {
    listRings.init();
    header.init()
    
    window.addEventListener('DOMContentLoaded', ()=>{
        modal.init();
    })
})()