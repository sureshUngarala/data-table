class BodyRow extends HTMLElement {

    constructor(countryObj, minColWidth, columns) {
        super();
        this.countryObj = countryObj;
        this.minColWidth = minColWidth;
        this.columns = columns;
    }

    connectedCallback() {
        let html = `<div class="table-body-row">`;
        let country = this.countryObj;

        for (let key of this.columns) {
            html += `<div style="min-width:${this.minColWidth}">${country[key]}</div>`;
        }
        html += `</div >`;
        this.innerHTML = html;
    }

    disconnectedCallback() {

    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
}

window.customElements.define('body-row', BodyRow);