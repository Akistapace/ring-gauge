import rings from "../data/rings.json";

export const resizer = {
    runner() {

    },
    sliderBar: ()=> document.querySelector(`[data-resizer-ruler] .slider`),
    setMin: rings[0].size,
    setMax: rings.length - 1,
    startValue: 100.7,
    rangebar() {
        const _this = this
        const slider = _this.sliderBar()
        slider.value=this.startValue
        slider.oninput = function() {
            slider.max = _this.setMax;
            slider.min = _this.setMin;
            this.runner(this.value);
        }


        let minus = document.querySelector('[data-resizer] .minus')
        let plus = document.querySelector('[data-resizer] .plus')
        plus.addEventListener('click', ()=> {
            let input = document.querySelector('[data-resizer] input')
            input.stepUp()
            this.runner(input.value);
        })
        minus.addEventListener('click', ()=> {
            let input = document.querySelector('[data-resizer] input')
            if (input.value > 0) {
                input.stepDown()
                this.runner(input.value);
            }
        })
    },
    init() {
        const _this = this
        if (this.sliderBar()) {     
            _this.rangebar();
        }
    }
}

