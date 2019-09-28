class HeaderColumn extends HTMLElement {

    constructor(colTitle, maxColWidth, sortAndUpdate) {
        super();
        this.colTitle = colTitle;
        this.maxColWidth = maxColWidth;
        this.sortAndUpdate = sortAndUpdate;
        let sortDirection = 'desc';
        this.addEventListener('click', event => {
            sortDirection = sortDirection === 'desc' ? 'asc' : 'desc';
            sortAndUpdate(event.target.value, colTitle, sortDirection);
        });
    }

    connectedCallback() {
        let html = ``;
        html += `<div style="min-width:${this.maxColWidth}"><span>${this.colTitle}</span><span></span></div>`;
        this.innerHTML = html;
    }

    disconnectedCallback() {

    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
}

window.customElements.define('header-column', HeaderColumn);