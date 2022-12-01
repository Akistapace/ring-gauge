import rings from "../data/rings.json";

const runner = (index)=> {  
    let value = rings[index];
    let circle = document.querySelector('[data-modal-sizer] [data-ring]');
    let ringSize = document.querySelector('[data-modal-sizer] .ringsize');
    let tableSize = document.querySelector('[data-modal-sizer] [data-size]');
    let tableMm = document.querySelector('[data-modal-sizer] [data-mm]');
    let tableCirc = document.querySelector('[data-modal-sizer] [data-circ]');
    let size = Number((value.mm * 0.1) * window.ppcm + 2).toFixed(2) + 'px' 

    circle.style.width  = size ;
    circle.style.height = size;
    
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
        const slider = _this.sliderBar()
        slider.value=this.startValue
        slider.oninput = function() {
            slider.max = _this.setMax;
            slider.min = _this.setMin;
            runner(this.value);
        }


        let minus = document.querySelector('[data-resizer] .minus')
        let plus = document.querySelector('[data-resizer] .plus')
        plus.addEventListener('click', ()=> {
            let input = document.querySelector('[data-resizer] input')
            input.stepUp()
            runner(input.value);
        })
        minus.addEventListener('click', ()=> {
            let input = document.querySelector('[data-resizer] input')
            if (input.value > 0) {
                input.stepDown()
                runner(input.value);
            }
        })

    },
    modalSizer: ()=> document.querySelector('[data-modal-sizer]'),
    modalRuler: ()=> document.querySelector('[data-modal-ruler]'),
    open() {
        let modalRuler = this.modalRuler()
        let modalSize  = this.modalSizer()
        let button = document.querySelector('[data-open-resizer]') 
        let buttonNext = document.querySelector('[data-next]') 

        button.addEventListener('click', ()=> {
            modalRuler.classList.add('--opened')
            document.body.classList.add('--no-scroll')
        });

        buttonNext.addEventListener('click', ()=> {
            modalRuler.classList.remove('--opened') 
            document.body.classList.add('--no-scroll')
            document.querySelector('[data-popup]').classList.add('--show')
            
            this.popupAlert(modalSize);
        })
    },
    popupAlert(modalSize) {
        let getPopup = document.querySelector('[data-popup]')
        let decline = getPopup.querySelector('[data-decline]')
        let accept = getPopup.querySelector('[data-accept]')

        decline.addEventListener('click', ()=> {
            document.querySelector('[data-popup]').classList.remove('--show')
            
        });
        accept.addEventListener('click', ()=> {
            document.querySelector('[data-popup]').classList.remove('--show')
            this.setDefaultValue();
            modalSize.classList.add('--opened')
        });
    },
    close() {
        let modalRuler = this.modalRuler();
        let modalSize  = this.modalSizer();

        modalSize.querySelector('.close')
        .addEventListener('click', ()=> {
            modalSize.classList.remove('--opened')
            document.body.classList.remove('--no-scroll')
        });

        modalRuler.querySelector('.close')
        .addEventListener('click', ()=> {
            modalRuler.classList.remove('--opened')
            document.body.classList.remove('--no-scroll')
        });

        modalSize.addEventListener('click', (e)=> {
            e.stopPropagation();
            if (e.target.classList.contains('modal')) {
                modalSize.classList.remove('--opened')
                document.body.classList.remove('--no-scroll')
            }
        });

        modalRuler.addEventListener('click', (e)=> {
            e.stopPropagation();
            if (e.target.classList.contains('modal')) {
                modalRuler.classList.remove('--opened')
                document.body.classList.remove('--no-scroll')
            }
        });

        window.addEventListener('keyup', (e)=> {
            e.stopPropagation();
            if( modalRuler.classList.contains('--opened') && e.key === "Escape") {
                modalRuler.classList.remove('--opened')
                document.body.classList.remove('--no-scroll')
            }
            if( modalSize.classList.contains('--opened') && e.key === "Escape") {
                modalSize.classList.remove('--opened')
                document.body.classList.remove('--no-scroll')
            }
        })
    },
    init() {
        const _this = this
        if (this.modalSizer()) {      
            
            _this.rangebar();
            _this.close();
            _this.open();
        }
    }
}

