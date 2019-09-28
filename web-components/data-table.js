class DataTable extends HTMLElement {

    constructor(filtercallback) {
        super();
    }
    connectedCallback() {
        let html = `<div id="dt-filter-bar"></div>
        <div id="dtheader">
            <div class="table-header-titles"></div>
            <div class="table-header-filter"></div>
        </div>
        <div id="dtbody"></div>
        <div id="paginator"></div>`;
        this.innerHTML = html;
    }

    disconnectedCallback() {

    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
}

window.customElements.define('data-table', DataTable);