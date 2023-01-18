import rings from "../data/rings.json";
import { handlePPIRule } from "./ruler";

const runner = (index)=> {  
    let value = rings[index];
    let circle = document.querySelector('[data-check-sizer] [data-ring]');
    let ringSize = document.querySelector('[data-check-sizer] [data-ring]');
    let tableSize = document.querySelector('[data-check-sizer] [data-size]');
    let tableMm = document.querySelector('[data-check-sizer] [data-mm]');
    let tableCm = document.querySelector('[data-check-sizer] [data-circ]');
    // Convert the  mm to cm  (mm*0.1) and multiply by the pixels per centmeter
    // add 3 pixels for rounding
    let size = Number((value.mm * 0.1) * window.ppcm + 3).toFixed(2) + 'px' 

    circle.style.width  = size ;
    circle.style.height = size;    
    ringSize.textContent = value.size;
    tableSize.textContent = value.size;
    tableMm.textContent = value.mm;
    tableCm.textContent = value.cm;
}

export const resizer = {
    sliderBar: ()=> document.querySelector(`[data-resizer] .slider`),
    setMin: 0,
    setMax: rings.length - 1,
    startValue: 14,
    setDefaultValue() { runner(this.startValue) },
    rangebar() {
        const _this = this
        const slider = _this.sliderBar()
        slider.value = this.startValue
        slider.oninput = function() {
            slider.max = _this.setMax;
            slider.min = _this.setMin;
            runner(this.value);
        }

        let minus = document.querySelector('[data-resizer] .minus');
        let plus = document.querySelector('[data-resizer] .plus');

        plus.addEventListener('click', ()=> {
            let input = document.querySelector('[data-resizer] input');
            input.stepUp();
            runner(input.value);
        });

        minus.addEventListener('click', ()=> {
            let input = document.querySelector('[data-resizer] input');
            if (input.value > 0) {
                input.stepDown();
                runner(input.value);
            }
        });
    },
    nextStep() {
        const _this = this;
        let buttonNext = document.querySelector('[data-next]');
        
        buttonNext.addEventListener('click', ()=> {
            document.querySelector('[data-first-step]').classList.remove('active');
            document.querySelector('[data-second-step]').classList.add('active');

            _this.backToTop();
        })
    },
    popupAlert() {
        const _this = this;
        let decline = document.querySelector('[data-decline]');
        let accept = document.querySelector('[data-accept]');

        decline.addEventListener('click', ()=> {            
            document.querySelector('.step1').classList.remove('active');
            document.querySelector('.step2').classList.add('active');

            document.querySelector('[data-second-step]').classList.remove('active');
            document.querySelector('[data-first-step]').classList.add('active');
            
            _this.backToTop();
            
        });
        accept.addEventListener('click', ()=> {
            this.setDefaultValue();
            document.querySelector('[data-second-step]').classList.remove('active');
            document.querySelector('[data-last-step]').classList.add('active');
            handlePPIRule.save();

            document.querySelector('.step1').classList.remove('active');
            document.querySelector('.step2').classList.add('active');

            _this.backToTop(document.querySelector('.content'));

            document.body.classList.add('--no-scroll');

            let modal = document.querySelector('[data-alert-modal]');
            modal.classList.add('--opened');
            // document.querySelector('').classList.add('active');

        });
    },
    recalibrate() {
        const _this = this;
        let buttonRecalibrate = document.querySelector('#recalibrate')
        buttonRecalibrate.addEventListener('click', ()=> {
            document.querySelector('[data-last-step]').classList.remove('active');
            document.querySelector('[data-first-step]').classList.add('active');

            document.querySelector('.step1').classList.add('active');
            document.querySelector('.step2').classList.remove('active');
            
            _this.backToTop();
            document.body.classList.remove('--no-scroll');
        })
    },
    backToTop(e) {
       let el = e || document.body
       el.scrollIntoView({block: "start", behavior: "smooth"});
    },
    confirmAlertModal() {
        const _this = this;
        let modal = document.querySelector('[data-alert-modal]');
        let modalButton = document.querySelector('[data-alert-modal] .button');

        modalButton.addEventListener('click', ()=> {
            modal.classList.remove('--opened');
        });
    },
    init() {
        const _this = this;
        
        document.body.classList.add('--no-scroll');
        document.querySelector('header').style.display = 'none';
        document.querySelector('main').style.marginTop = '0';
        _this.rangebar();
        _this.nextStep();
        _this.popupAlert();
        _this.recalibrate();
        _this.confirmAlertModal();
    }
}

