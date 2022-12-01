// import listRings from "./list-rings";
// import {modal} from "./modals";
import {header} from "./header";
import { resizer } from "./resizer";
import { handlePPIRule } from "./ruler";

// import {camera} from "./camera";

(async ()=> {
    // listRings.init();
    header.init()
    resizer.init()
    handlePPIRule.init();
    // camera.init()
    window.addEventListener('DOMContentLoaded', ()=>{
        // modal.init();
    })
})()