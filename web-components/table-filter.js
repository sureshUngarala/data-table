class TableFilter extends HTMLElement {

    constructor(filtercallback) {
        super();
        this.filtercallback = filtercallback;
        this.data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

        this.addEventListener('keyup', event => {
            filtercallback(event.target.value, "");
        });
    }
    connectedCallback() {
        let html = `<div class="table-filter">`;
        html += `<div> <span>Search: </span><input></div>`;
        html += `</div>`;
        this.innerHTML = html;
    }

    // debounceFunction(event) {
    //     window.clearTimeout(this.debounceTimeout);
    //     this.debounceTimeout = window.setTimeout(() => {
    //         this.children[0] && this.children[0].focus();
    //     }, 200);
    // }

    disconnectedCallback() {

    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
}

window.customElements.define('table-filter', TableFilter);