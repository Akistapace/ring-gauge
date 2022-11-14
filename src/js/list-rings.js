import { fetchRings } from "./utils";
const listRings = {
    rings: fetchRings(), 
    async mount() {
        let list = document.querySelector('#list-rings')
        if (list) {
            let rings = await this.rings;
            let container = ''
            rings.forEach(async ring => {
               container += this.template(ring);
            });    
            list.insertAdjacentHTML('afterbegin', container)
        }
    }, 
    template(ring) {
        const template = /*html*/`
            <div class="card" data-card>
                <div class="ringsize">${ring.size}</div>
                <span class="circle" style="width: ${ring.mm}mm;height: ${ring.mm}mm"></span>
                <Table class="small">
                <thead>
                    <tr>
                    <th>Tamanho</th>
                    <th>Milímetros</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                    <td>${ring.size}</td>
                    <td>${ring.mm}</td>
                    </tr>
                </tbody>
                </Table>
            </div>
        `;

        return template
    },
   init() {
       this.mount()
    }
}

export default listRings;
