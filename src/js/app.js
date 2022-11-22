import listRings from "./list-rings";
import {modal} from "./modals";
import {header} from "./header";
// import {camera} from "./camera";

(async ()=> {
    listRings.init();
    header.init()
    // camera.init()
    window.addEventListener('DOMContentLoaded', ()=>{
        modal.init();
    })
})()