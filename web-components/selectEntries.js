class SelectEntries extends HTMLElement {

    constructor(dataSize, initEntryCount, reRender) {
        super();
        this.dataSize = dataSize;
        this.initEntryCount = initEntryCount;
        this.addEventListener('change', event => {
            reRender(event.target.value);
        });
    }

    connectedCallback() {
        let html = `<div class="select-entries">`;
        html += `<div> <span>show </span><select>`;
        let counter = this.initEntryCount;
        while (this.dataSize > counter) {
            html += `<option>${counter}</option>`;
            counter *= 5;
        }
        html += `</select></div>`;
        html += `</div>`;
        this.innerHTML = html;
    }

    disconnectedCallback() {

    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
}

window.customElements.define('select-entries', SelectEntries);