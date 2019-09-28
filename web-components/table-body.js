//Custom-Element to display matched user details
class TableBody extends HTMLElement {

    //accepts matched user object, search query-input and index of user object to set tabindex(for performant keyboard navigation)
    constructor(userObj, search, index) {
        super();
    }

    //func to mount custom element and update the content in it.
    connectedCallback() {
        let html = `<div class="user-item" tabindex=-1>`;

        html += `</div >`;
        this.innerHTML = html;
    }

    disconnectedCallback() {

    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
}

window.customElements.define('table-body', TableBody);