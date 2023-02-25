// import listRings from "./list-rings";
// import {modal} from "./modals";
import { header } from "./header";
import { resizer } from "./resizer";
import { handlePPIRule } from "./ruler";
import { tabela } from "./tabela";
import { Tabs } from "./tabs";
import { Archive } from "./JSON-LD";

(async ()=> {
    const page = document.body.classList;
    header.init();
    
    Archive.init();
    if (page.contains('blog-post')) {
    }

    if (page.contains('barbante') || page.contains('regua') || page.contains('tabela')) {
        tabela.init();
    }

    if (page.contains('medidor-online')) {
        handlePPIRule.init();
        resizer.init();
    }

    if (page.contains('faqs')) {
        Tabs.init();
    }
})()