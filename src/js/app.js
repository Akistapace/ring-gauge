// import listRings from "./list-rings";
// import {modal} from "./modals";
import { header } from "./header";
import { resizer } from "./resizer";
import { handlePPIRule } from "./ruler";
import { tabela } from "./tabela";

(async ()=> {
    const page = document.body.classList
    header.init();

    if (page.contains('barbante') || page.contains('regua') || page.contains('tabela')) {
        tabela.init();
    }

    if (page.contains('medidor-online')) {
            console.log('aqui');
            handlePPIRule.init();
            resizer.init();
    }
})()