import rings from "../data/rings.json";

export const tabela = {
    array_chunk(arr, len) {
        let chunks = [], i = 0, n = arr.length
        while (i < n) {
            chunks.push(arr.slice(i, i += len))
        }
        return chunks      
    },
    mountTable() {
        if (window.innerWidth > 768) {
            let arr = this.array_chunk(rings, 18)
            arr.forEach(item => {
                const template = /*html*/ `
                <table class="table">
                    <thead>
                        <tr>
                            <th>Tamanho</th>
                            <th>Milímetro</th>
                            <th>Centímetros</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${ item.map((e)=> {
                            return `
                                <tr>
                                    <td>${e.size}</td>
                                    <td>${e.mm}mm</td>
                                    <td>${e.cm}cm</td>
                                </tr>
                            `
                            }).toString().replace(/,/g, '')
                        }
                    </tbody>
                </table>
            `;
            document.querySelector('#tabela').insertAdjacentHTML('beforeend', template)
            });
        } else {
            const template = /*html*/ `
                <table class="table">
                    <thead>
                        <tr>
                            <th>Tamanho</th>
                            <th>Milímetro</th>
                            <th>Centímetros</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${ rings.map((e)=> {
                            return `
                                <tr>
                                    <td>${e.size}</td>
                                    <td>${e.mm}</td>
                                    <td>${e.cm}</td>
                                </tr>
                            `
                            }).toString().replace(/,/g, '')
                        }
                    </tbody>
                </table>
            `;
            document.querySelector('#tabela').insertAdjacentHTML('beforeend', template)
        }

    },
    init() {
        this.mountTable()
    }
}