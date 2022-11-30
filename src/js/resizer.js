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
    let circle = document.querySelector('[data-modal-sizer] .custom');
    let ringSize = document.querySelector('[data-modal-sizer] .ringsize');
    let tableSize = document.querySelector('[data-modal-sizer] [data-size]');
    let tableMm = document.querySelector('[data-modal-sizer] [data-mm]');
    let tableCirc = document.querySelector('[data-modal-sizer] [data-circ]');

    let size = (value.mm * 3.779528).toFixed(2)

    circle.style.fontSize = size / 16 +'rem'
    // circle.style.width   = size * window.devicePixelRatio  +  'px' ;
    // circle.style.height  = size * window.devicePixelRatio  +  'px';
    
    ringSize.textContent = value.size;
    tableSize.textContent = value.size;
    tableMm.textContent = value.mm;
    tableCirc.textContent = value.circunference;
}

export const resizer = {
    sliderBar: ()=> document.querySelector(`[data-resizer] .slider`),
    setMin: rings[0].size,
    setMax: rings.length - 1,
    startValue: 23,
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

            // let _size = (rings[this.startValue].mm * 3.779528).toFixed(2)

            // const size =  _size * window.devicePixelRatio + 'px';
            // const ctx = canvas.getContext('2d');
            // canvas.style.width = size;
            // canvas.style.height = size;

            // ctx.fillStyle = "#bada55";
            // ctx.fillRect(0, 0, 300, 300);
            const imageElement  = document.querySelector(".custom");
            imageElement.style.fontSize = rings[this.startValue].mm * 3.779528 / 16 +'rem'
            // imageElement.width  = rings[this.startValue].mm * 3.77
            // imageElement.height = rings[this.startValue].mm * 3.77
            
            // imageElement.src = canvas.toDataURL("image/png");

            _this.setDefaultValue();
            _this.rangebar();
            _this.close();
            _this.open();
        }
    }
}




function criarRegua(mm, id){	
    var html = '';
    let _id = document.querySelector('#'+id)
    _id.style.cssText = `
        height: 60px;
        display: flex,
        width:100%;
    `;

    var width = _id.style.width;	
    var scale = width/mm;	
    console.log(scale);	

    html += '<div class="inter-number">';
    html += '<div class="cm-letter-inter"> </div>';
    for(var i = 5; i< mm; i++){	
        if(i % 10 == 0){ 
            html += '<div class="cm-letter">';
    		if(scale > 2){	
                html += (i/10);
            }else{
                if(i % 20 == 0){
                    html += (i/10);	
                }
    		}			
            html += '</div>';		
        }
    }	
    html += '<div class="inter-regua">';	
    for(var i = 0; i< mm; i++){	
        if(i % 10 == 0){
            html += '<div class="cm"><div class="inter"></div></div>';
        }else if(i%5 == 0){	
            html += '<div class="cm2"><div class="inter"></div></div>';
        }else{	
            html += '<div class="mm"><div class="inter"></div></div>';	
        }	
    }	
    html += '</div>';	
    
    _id.innerHTML = html;	
    let _cm = document.querySelector('.cm')
    let _cm2 = document.querySelector('.cm2')
    let _mm = document.querySelector('.mm')

    
    _cm.style.width = (width/mm)+'px'
    _cm2.style.width = (width/mm)+'px'
    _mm.style.width = (width/mm)+'px'

    if(scale < 1){		
        // document.querySelector('.cm2 > .inter').style.background = 'none'
    }	
    if(scale < 2){
        // document.querySelector('.mm > .inter').style.background = 'none'
    }
    document.querySelector('.cm-letter-inter').style.width = (width/mm*5)+'px'
    document.querySelector('.cm-letter').style.width = (width/mm*10)+'px'

}

criarRegua(300, 'regua');

