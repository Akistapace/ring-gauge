export const Tabs = {
    tabs: () => document.querySelectorAll('.tab'),
    eventsTabs() {
        let tabs = this.tabs();
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                tabs.forEach((_tab) => {
                    if (_tab.classList.contains('active')) {
                        _tab.classList.remove('active')
                    }  
                });
                tab.classList.add('active');

                let index = tab.getAttribute('data-tab');

                if(document.querySelector(`[data-tabcontent].active`)) {
                    document.querySelector(`[data-tabcontent].active`).classList.remove('active');
                }

                let mainContent = document.querySelector(`[data-tabcontent="${index}"]`)
                if (mainContent) {
                    mainContent.classList.add('active');
                    mainContent.scrollIntoView({
                        behavior:'smooth',
                        block: 'nearest',
                        inline: 'nearest'
                    });
                }
            })
        });
    },
    init() {
        this.eventsTabs();
        document.querySelector('.tab').click()
    }
}