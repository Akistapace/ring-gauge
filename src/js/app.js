// import listRings from "./list-rings";
// import {modal} from "./modals";
import { header } from "./header";
import { resizer } from "./resizer";
import { handlePPIRule } from "./ruler";
import { tabela } from "./tabela";

(async ()=> {
    const page = document.body.classList
    header.init();

    if (page.contains('barbante') || page.contains('regua')) {
        tabela.init();
    }

    if (page.contains('home')) {
        resizer.init();
        handlePPIRule.init();
    }
})()