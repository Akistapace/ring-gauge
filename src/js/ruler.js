export const handlePPIRule = {
    isDragging: false,
    DDX: 0,
    DSV: 0,
    dpi_x: 100.7,
    ppcm: 100.7/2.54,
    begin_x: 20,
    BL_cm: 0.5,
    BL_inch: 129.5,
    width: '',
    rulers: [ "",
    "Cartão de Crédito - vertical","Cartão de Crédito - horizontal"],
    rulers_inch: [0,2.18,3.44],
    ruler: ()=> document.getElementById("ruler"),
    ctx: '',
    clientWidth: '',
    handleMouseDown(e){
        if(document.getElementById("adjuster").value!='') {
            this.isDragging = true;
            this.DDX = e.clientX;
            this.DSV = document.getElementById("ppi").value;
        }
    },
    handleMouseUp:  (e)=> isDragging = false,
    handleMouseOut: (e)=> isDragging = false,
    handleMouseMove(e){
        const _this = this;
        // if((_this.isDragging)&&(document.getElementById("adjuster").value!='')){
        //     const MouseX = parseInt(e.clientX-_this.DDX);
        //     document.getElementById("ppi").value = parseFloat(_this.DSV) + MouseX / 10;
        //     _this.drawruler();
        //     _this.drawAdjuster();
        // }
    },
    rulerEvents() {
        this.ruler().addEventListener("mousedown", this.handleMouseDown);
        this.ruler().addEventListener("mouseup", this.handleMouseUp);
        this.ruler().addEventListener("mouseout", this.handleMouseOut);
        this.ruler().addEventListener("mousemove", this.handleMouseMove);
    },
    gel: (id)=> document.getElementById(id),
    setCookie(c_name,value,exdays){
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
    },
    getCookie(c_name){
        var i = 0
        var x
        var y
        var ARRcookies = document.cookie.split(";");
        
        for (i ;i<ARRcookies.length;i++){
            x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
            x = x.replace(/^\s+|\s+$/g,"");
            if ( x == c_name ){
                return unescape(y);
            }
        }
    },
    drawruler(){ 
        const _this = this;
        if ((_this.gel("ppi").value != '') && (parseFloat(_this.gel("ppi").value) > 50)){
            _this.dpi_x = parseFloat( _this.gel("ppi").value );
        } else {
            _this.gel("ppi").value == _this.dpi_x;
        }
        if ((_this.dpi_x < 50) || (isNaN( _this.dpi_x ))) {
            _this.dpi_x = 100.7;
        }  
        _this.gel('sPPI').innerHTML = _this.dpi_x;
    
        _this.ppcm = _this.dpi_x / 2.54;
    },
    save(){
        if ( (typeof(Storage)!=="undefined") ) {
          localStorage.setItem("pixels_per_inch", this.gel('ppi').value);
        } else {
            // this.setCookie('ppi', this.gel('ppi').value, 365);
        }
        // this.drawruler();
    },
    getLocalstorage() {
        let item = localStorage.getItem("pixels_per_inch");
        if (item) {
            return item
        } else {
            return 0
        }
    },
    restore(){
        this.setCookie('ppi', '', -1);
        localStorage.removeItem("pixels_per_inch");
        this.gel('ppi').value = '100.7';
        this.drawruler();
    },
    adjuster() {
        const _this = this;
        let adjuster = document.getElementById('adjuster');
        let html = '';
        _this.rulers.forEach((item, index) => {
            html += `<option value="${index}" ${ 
                window.innerWidth > 768 ?
                (index == _this.rulers.length - 1 ? 'selected' : '')
                : index == 1 ? 'selected' : ''
            }>${item}</option>`;
        });
        
        adjuster.insertAdjacentHTML('afterbegin', html);
        adjuster.addEventListener('change', ()=> {
            _this.refrest_btnAdjust();
            _this.drawAdjuster();
        })
        
        let _changeppi = document.querySelectorAll('[data-changeppi]')
        _changeppi.forEach(button => {
            button.addEventListener('click', ()=> {
                let option = button.getAttribute('data-changeppi')     
                if (option == 'plus') {
                    _this.changeppi(0.5)
                }
                if (option == 'minus') {
                    _this.changeppi(-0.5)
                }
            })
        }); 
    },
    changeppi(f){
        var ppi = document.getElementById('ppi');
        ppi.value = parseFloat(ppi.value)+f;
        this.drawruler();
        this.drawAdjuster();
        // console.log('PPI', ppi.value = parseFloat(ppi.value)+f);
        // console.log('dpi_x', this.dpi_x);
        window.ppcm = this.ppcm
    },
    refrest_btnAdjust(){
        var adjuster = document.getElementById('adjuster');
        var btnAdjust = document.getElementById('btnAdjust');
        if (adjuster.value>0){
            btnAdjust.style.display='block';
        }else {
            btnAdjust.style.display='none';
        } 
    },
    drawAdjuster(){
        const _this = this;
        var adjuster = document.getElementById("adjuster");
        var ppiv = document.getElementById("ppi").value;
      
        _this.ctx.beginPath();
        _this.ctx.clearRect( _this.begin_x-1,59, _this.ruler().clientWidth,13);
        _this.ctx.stroke();
      
        if (adjuster.value>0){
          var w = ppiv * _this.rulers_inch[adjuster.value];  
        //   window.innerWidth > 768 ? _this.ruler().width = w + 40 : screen.width - 20
          _this.ruler().width = w + 40
          _this.ctx.strokeStyle = '#722faa';
          _this.ctx.fillStyle = "#722faa";
          _this.ctx.font = "14px Arial";
          _this.ctx.lineWidth = 3;
          _this.ctx.beginPath();
          _this.ctx.moveTo(_this.begin_x,60);
          _this.ctx.lineTo(_this.begin_x,70);
          _this.ctx.moveTo(_this.begin_x,65);
          _this.ctx.lineTo(_this.begin_x+w,65);
          _this.ctx.moveTo(_this.begin_x+w,60);
          _this.ctx.lineTo(_this.begin_x+w,70);
          _this.ctx.stroke();
      
          var txt = _this.rulers[adjuster.value];
          var txt_width = _this.ctx.measureText(txt).width;
          _this.ctx.beginPath();
          _this.ctx.clearRect(_this.begin_x+(w/2)-(txt_width/2)-10, 60, txt_width + 20, 10);
          _this.ctx.fillText(txt, _this.begin_x + (w/2) - (txt_width/2), 70);
          _this.ctx.stroke();
        }
    },      
    init() {
        const _this = this;
        let ruler =  _this.ruler()
        _this.ctx = ruler.getContext("2d");
        _this.rulerEvents()

        _this.ruler().width = 300
        _this.clientWidth = _this.ruler().clientWidth;
        
        let item = handlePPIRule.getLocalstorage()
        console.log('ITEM',item);
        
        if (item != 0) {
            document.getElementById("ppi").value = item
        }


        _this.drawruler();
        _this.drawAdjuster();
        _this.refrest_btnAdjust();
        _this.adjuster()

        if (item != 0) {
            document.querySelector('[data-changeppi="plus"]').click()
            document.querySelector('[data-changeppi="minus"]').click()
        } else {
            document.querySelector('[data-changeppi="plus"]').click()
        }

        window.ppcm = this.ppcm
    }
}

// handlePPIRule.init();