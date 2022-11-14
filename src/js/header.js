
export const header = {
    showOnScroll() {
        let lastScroll = 0;
        let header = document.querySelector('.header');

        window.addEventListener("scroll", () => {
            const menu = document.querySelector('[data-menu]')
            if (!menu.classList.contains('--opened-menu')) {
              const currentScroll = window.pageYOffset;
              if (currentScroll <= 0) {
                header.classList.remove('--scroll-up');
                return;
              }
            
              if (currentScroll > lastScroll && !header.classList.contains('--scroll-down')) {
                // down
                header.classList.remove('--scroll-up');
                header.classList.add('--scroll-down');
              } else if (
                currentScroll < lastScroll &&
                header.classList.contains('--scroll-down')
              ) {
                // up
                header.classList.remove('--scroll-down');
                header.classList.add('--scroll-up');
              }
              lastScroll = currentScroll;
            }
        }, {passive: true});
    },
    openMenuMobile() {
      let button = document.querySelector('[data-menu-mobile]')
      let menu = document.querySelector('[data-menu]')
      let fade = document.querySelector('[data-fade]')
      
      button.addEventListener('click', ()=> {
        // button.classList.toggle("--opened");
        menu.classList.add("--opened-menu")
        fade.classList.add("--opened-menu")
      })
      fade.addEventListener('click', ()=> {
        // button.classList.toggle("--opened");
        menu.classList.remove("--opened-menu")
        fade.classList.remove("--opened-menu")
      })
    },
    init() {
        this.openMenuMobile();
        this.showOnScroll();
    }
}
