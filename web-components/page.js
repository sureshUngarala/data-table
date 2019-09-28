class Page extends HTMLElement {

    constructor(pageNum, dataSize, reRenderPage, ellipsis) {
        super();
        this.pageNum = pageNum;
        this.dataSize = dataSize;
        this.ellipsis = ellipsis
        this.addEventListener('click', event => {
            reRenderPage(event.target.innerHTML);
        });
    }

    connectedCallback() {
        let html = !this.ellipsis ? `<div class="page">${this.pageNum}</div>` : `<div class="page">...</div>`;
        this.innerHTML = html;
    }

    disconnectedCallback() {

    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
}

window.customElements.define('page-num', Page);