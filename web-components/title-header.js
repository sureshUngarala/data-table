class HeaderColumn extends HTMLElement {

    constructor(colTitle, key) {
        super();
        this.colTitle = colTitle;
        this.containerWidth = document.getElementById('dtContainer').offsetWidth;
    }

    connectedCallback() {
        let html = `<div class="table-header-titles">`;
        let country = this.countryObj[0], colCount = 0, maxColCount = 5,
            colWidth = (this.containerWidth / maxColCount - 5) + 'px';

        for (let key in country) {
            html += `<div><span>${key}</span><span></span></div>`;
            colCount++;
            if (colCount >= maxColCount)
                break;
        }
        html += `</div >`;
        this.innerHTML = html;
    }

    disconnectedCallback() {

    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
}

window.customElements.define('header-column', HeaderColumn);