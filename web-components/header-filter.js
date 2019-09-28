class HeaderFilter extends HTMLElement {

    constructor(key, maxColWidth, filterAndUpdate) {
        super();
        this.key = key;
        this.maxColWidth = maxColWidth;
        this.filterAndUpdate = filterAndUpdate;
        // this.containerWidth = document.getElementById('dtContainer').offsetWidth;
        // console.log(this.containerWidth.offsetWidth);
        this.addEventListener('keyup', event => {
            filterAndUpdate(event.target.value, key);
        });
    }

    connectedCallback() {
        let html = ``;
        html += `<input style="min-width:${this.maxColWidth}">`;
        this.innerHTML = html;
    }

    disconnectedCallback() {

    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
}

window.customElements.define('header-filter', HeaderFilter);