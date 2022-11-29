import rings from "../data/rings.json";
import toPx from "./to-px";

const remCalc = (px, base = 20) => {
    let tempPx = px
    if (typeof px === 'string' || px instanceof String)
      tempPx = tempPx.replace('px', '')
  
    tempPx = parseInt(tempPx)
    return (1 / base) * tempPx + 'em'
}

const runner = (index)=> {  
    let value = rings[index];
    let circle = document.querySelector('[data-modal-sizer] #image');
    let ringSize = document.querySelector('[data-modal-sizer] .ringsize');
    let tableSize = document.querySelector('[data-modal-sizer] [data-size]');
    let tableMm = document.querySelector('[data-modal-sizer] [data-mm]');
    let tableCirc = document.querySelector('[data-modal-sizer] [data-circ]');

    let size = (value.mm * 3.779528).toFixed(2)
    // console.log('VAL', value.size.toFixed(2));
    // console.log('VAL', val);
    // console.log('VAL', (0.264583 * val).toFixed(2));

    circle.style.width   = size /16 + 'em' ;
    circle.style.height  = size /16 + 'em';
    
    ringSize.textContent = value.size;
    tableSize.textContent = value.size;
    tableMm.textContent = value.mm;
    tableCirc.textContent = value.circunference;
}

export const resizer = {
    sliderBar: ()=> document.querySelector(`[data-resizer] .slider`),
    setMin: rings[0].size,
    setMax: rings.length - 1,
    startValue: 14,
    setDefaultValue() { runner(this.startValue) },
    rangebar() {
        const _this = this
        // console.log(rings[0]);
        const slider = _this.sliderBar()
        slider.oninput = function() {
            slider.max = _this.setMax;
            slider.min = _this.setMin;
            runner(this.value);
        }
    },

    modalContainer: ()=> document.querySelector('[data-modal-sizer]') ,
    open() {
        let modal = this.modalContainer()
        let cards = document.querySelectorAll('[data-open-resizer]') 
        cards.forEach(card => {
           card.addEventListener('click', ()=> {
                modal.classList.add('--opened')
                document.body.classList.add('--no-scroll')
           }); 
        });
    },
    close() {
        let modal = this.modalContainer()
        let buttonClose = modal.querySelector('.close')
        buttonClose.addEventListener('click', ()=> {
            modal.classList.remove('--opened')
            document.body.classList.remove('--no-scroll')
        })

        modal.addEventListener('click', (e)=> {
            e.stopPropagation();
            if (e.target.classList.contains('modal')) {
                modal.classList.remove('--opened')
                document.body.classList.remove('--no-scroll')
            }
        })

        window.addEventListener('keyup', (e)=> {
            e.stopPropagation();
            if( modal.classList.contains('--opened') && e.key === "Escape") {
                modal.classList.remove('--opened')
                document.body.classList.remove('--no-scroll')
            }
        })
    },
    init() {
        const _this = this
        if (this.modalContainer()) {
            let canvas = document.createElement('canvas')
            const size = Math.floor(rings[this.startValue].mm * 3.77) /16 + 'rem';
            const ctx = canvas.getContext('2d');
            canvas.style.width = size;
            canvas.style.height = size;
            ctx.fillStyle = "#bada55";
            ctx.fillRect(0, 0, 300, 300);
            const imageElement  = document.querySelector("#image");
            imageElement.width  = rings[this.startValue].mm * 3.77
            imageElement.height = rings[this.startValue].mm * 3.77
            
            imageElement.src = canvas.toDataURL("image/png");

            _this.setDefaultValue();
            _this.rangebar();
            _this.close();
            _this.open();
        }
    }
}