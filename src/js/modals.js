export const modal = {
    modalContainer: ()=> document.querySelector('[data-modal]') ,
    setLink() {
        let link = document.querySelector('[data-modal-link]')
    },
    open() {
        let modal = this.modalContainer()
        let cards = document.querySelectorAll('[data-card]') 
        cards.forEach(card => {
           card.addEventListener('click', ()=> {
                let getRing = card.querySelector('.circle')
                let setRing = modal.querySelector('[data-ring]')
                setRing.style.width  = getRing.style.width
                setRing.style.height = getRing.style.height

                modal.classList.add('--opened')
           }); 
        });
    },
    close() {
        let modal = this.modalContainer()
        let buttonClose = modal.querySelector('.close')
        buttonClose.addEventListener('click', ()=> {
            modal.classList.remove('--opened')
        })

        modal.addEventListener('click', (e)=> {
            e.stopPropagation();
            if (e.target.classList.contains('modal')) {
                modal.classList.remove('--opened')
            }
        })

        window.addEventListener('keyup', (e)=> {
            e.stopPropagation();
            if( modal.classList.contains('--opened') && e.key === "Escape") {
                modal.classList.remove('--opened')
            }
        })
    },
    async init() {
        if (this.modalContainer()) {
            this.close();
            this.open();
        }
    }
}