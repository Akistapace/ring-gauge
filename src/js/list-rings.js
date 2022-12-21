import { fetchRings } from "./utils";
import toPX from "./to-px"; 

const listRings = {
    rings: fetchRings(), 
    pixelRatio: window.devicePixelRatio,
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
                        ${ring.cm ? `<th>Centímetros</th>` : ''}
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                        <td>${ring.size}</td>
                        <td>${ring.mm}</td>
                        ${ring.cm ? `<td>${ring.cm}</td>`:''}
                        </tr>
                    </tbody>
                </Table>
            </div>
        `;

        return template
    },
    setCircle(rings) {
        const ring = document.querySelectorAll('.circle');
        // alert('PIXEL RATIO '+this.pixelRatio)
        ring.forEach((ring, index) => {
            let size = rings[index]?.mm*3.78
            const scale = this.pixelRatio; 

            if (scale == 2) {
                ring.style.transform = 'scale(0.8)';
            }

            ring.style.width = `${size * scale}px`;
            ring.style.height = `${size * scale}px`;           
        });
    },
    updatePixelRatio() {
        let pr = window.devicePixelRatio;
        let prString = (pr * 100).toFixed(0);
        console.log(`${prString}% (${pr.toFixed(2)})`)
        this.pixelRatio = pr
        matchMedia(`(resolution: ${pr}dppx)`)
        .addEventListener("change",this.setCircle, { once: true })
    },
    updateSize() {
        let rings = this.rings
        const ring = document.querySelectorAll('.circle-canva');
        ring.forEach((ring, index) => {
            
        })
    },
    conversion(pixel){
        let rem = 0.0625 * pixel;
        let em = 0.0625 * pixel;
        return rem;
    },
    init() {
        this.mount()
        this.updatePixelRatio()
    }
}

export default listRings;
