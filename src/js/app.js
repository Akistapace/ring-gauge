// import listRings from "./list-rings";
// import {modal} from "./modals";
import {header} from "./header";
import { resizer } from "./resizer";
import { handlePPIRule } from "./ruler";

(async ()=> {
    const page = document.body.classList
    header.init()
    if (page.contains('home')) {
        resizer.init();
        handlePPIRule.init();
    }
})()