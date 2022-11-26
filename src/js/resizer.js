import rings from "../data/rings.json";

const runner = (index)=> {    
    let value = rings[index];
    let circle = document.querySelector('[data-modal-sizer] .circle');
    let ringSize = document.querySelector('[data-modal-sizer] .ringsize');
    let tableSize = document.querySelector('[data-modal-sizer] [data-size]');
    let tableMm = document.querySelector('[data-modal-sizer] [data-mm]');
    let tableCirc = document.querySelector('[data-modal-sizer] [data-circ]');

    ringSize.textContent = value.size;
    circle.style.width   = Math.floor(value.mm * 3.77 * window.devicePixelRatio) + 'px';
    circle.style.height  = Math.floor(value.mm * 3.77 * window.devicePixelRatio) + 'px';
    
    tableSize.textContent = value.size;
    tableMm.textContent = value.mm;
    tableCirc.textContent = value.circunference;
}

export const resizer = {
    sliderBar: ()=> document.querySelector(`[data-resizer] .slider`),
    setMin: 0,
    setMax: rings.length - 1,
    startValue: 28,
    setDefaultValue() { runner(this.startValue) },
    rangebar() {
        const _this = this
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
            _this.setDefaultValue();
            _this.rangebar();
            _this.close();
            _this.open();
        }
    }
}