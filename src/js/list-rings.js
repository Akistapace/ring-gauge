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
            
            this.setCircle(rings)
        }
    }, 
    template(ring) {
        const template = /*html*/`
            <div class="card" data-card="${ring.id}">
                <div class="ringsize">${ring.size}</div>
                <span class="circle"></span>
                <Table class="small">
                    <thead>
                        <tr>
                        <th>Tamanho</th>
                        <th>Milímetros</th>
                        ${ring.circunference ? `<th>Circ.</th>` : ''}
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                        <td>${ring.size}</td>
                        <td>${ring.mm}</td>
                        ${ring.circunference ? `<td>${ring.circunference}</td>`:''}
                        </tr>
                    </tbody>
                </Table>
            </div>
        `;

        return template
    },
    setCircle(rings) {
        let mmToPx = 3.779527559055
        const ring = document.querySelectorAll('.circle');
        ring.forEach(ring => {
            const index = ring.parentElement.getAttribute('data-card')
            const size = rings[index]?.mm * mmToPx;
            
         
            // console.log('size',rings[index], rings[index]?.mm);
            const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry ring.
            // ring.style.width = Math.floor(size * scale)+'px';
            // ring.style.height = Math.floor(size * scale)+'px';

            ring.style.width  = this.conversion(size)/ scale +'em';
            ring.style.height = this.conversion(size)/ scale +'em';
        });
    },
    conversion(pixel) {
        if(pixel) {
            // let rem = 0.0625 * pixel;
            let em = 0.0625 * pixel;
            console.log('REM',em);
            return em;
        }
    },
    init() {
        this.mount()
    }
}

export default listRings;
