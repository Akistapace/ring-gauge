import { fetchRings } from "./utils";
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
                <!--<span class="circle"></span>-->
                <canvas class="circle-canva"></canvas>
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

        // let rings=this.rings
        const ring = document.querySelectorAll('.circle-canva');
        ring.forEach((ring, index) => {
            // const index = ring.parentElement.getAttribute('data-card')
            // // const size = rings[index]?.mm * mmToPx;
            const size = rings[index]?.mm * mmToPx
            
         
            // // console.log('size',rings[index], rings[index]?.mm);
            // const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry ring.
            // // ring.style.width = Math.floor(size * scale)+'px';
            // // ring.style.height = Math.floor(size * scale)+'px';

            // ring.style.width  = this.conversion(size) * scale +'cm';
            // ring.style.height = this.conversion(size) * scale +'cm';
        
        
            const canvas = ring
            const ctx = canvas.getContext('2d');

            // Set display size (css pixels).
            // const size = 200;
            canvas.style.width = `${size}px`;
            canvas.style.height = `${size}px`;

            // Set actual size in memory (scaled to account for extra pixel density).
            const scale = this.pixelRatio; // Change to 1 on retina screens to see blurry canvas.
            canvas.width = Math.floor(size * scale);
            canvas.height = Math.floor(size * scale);

            // Normalize coordinate system to use CSS pixels.
            ctx.scale(scale, scale);

            ctx.fillStyle = "#bada55";
            ctx.fillRect(0, 0, 300, 300);
        });
    },
    updatePixelRatio() {
        let pr = window.devicePixelRatio;
        let prString = (pr * 100).toFixed(0);
        console.log(`${prString}% (${pr.toFixed(2)})`)
        this.pixelRatio = pr
        matchMedia(`(resolution: ${pr}dppx)`).addEventListener("change", this.updatePixelRatio, { once: true })
    },
    conversion(pixel) {
        if(pixel) {
            // let rem = 0.0625 * pixel;
            let em = 0.0625 * pixel;
            // console.log('REM',em);
            return em;
        }
    },
    init() {
        this.mount()
        this.updatePixelRatio()
    }
}

export default listRings;
