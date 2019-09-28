class dtRenderer {
    constructor(config) {
        let dtContainer = document.getElementById('dtContainer'),
            dtWrapper = customElements.get('data-table');
        dtContainer.appendChild(new dtWrapper());
        this.filterBar = document.getElementById('dt-filter-bar');
        this.dtTitleHeader = document.querySelector('#dtheader .table-header-titles');
        this.dtFilterHeader = document.querySelector('#dtheader .table-header-filter');
        this.dtBody = document.getElementById('dtbody');
        this.paginator = document.getElementById('paginator');

        this.containerWidth = document.getElementById('dtContainer').offsetWidth;
        this.apiData = [];
        this.columns = config.columns;
        this.entryVal = config.initEntryCount;
        this.maxbodyHeight = config.tableHeight;
        if (this.maxbodyHeight) {
            this.dtBody.style.maxHeight = this.maxbodyHeight;
        }
        this.pageNum = 1;
        this.filterAndUpdate = this.filterAndUpdate.bind(this);
        this.reRenderPage = this.reRenderPage.bind(this);
        this.fetchData();
    }
    fetchData() {
        fetch('https://restcountries.eu/rest/v2/all').then((data) => {
            data.json().then((data) => {
                this.apiData = data;

                let selectEntries = customElements.get('select-entries'),
                    tableFilter = customElements.get('table-filter'),
                    tableTitleHeader = customElements.get('header-column'),
                    tableHeaderFilter = customElements.get('header-filter'),
                    pagination = customElements.get('page-ids'),
                    page = customElements.get('page-num');

                this.filterBar.appendChild(new selectEntries(data.length, this.entryVal, this.reRender));
                this.filterBar.appendChild(new tableFilter(this.filterAndUpdate));
                let country = data[0], maxColCount = 5, minColWidth = Math.floor(this.containerWidth / maxColCount - 10) + 'px';
                for (let key of this.columns) {
                    this.dtTitleHeader.appendChild(new tableTitleHeader(key, minColWidth, this.filterAndUpdate));
                    this.dtFilterHeader.appendChild(new tableHeaderFilter(key, minColWidth, this.filterAndUpdate));
                }
                this.renderComponents(data, this.entryVal, 1);
                //this.paginator.appendChild(new pagination(this.entryVal, data.length, this.reRenderPage));
                let lastPage = Math.ceil(data.length / this.entryVal);
                if (lastPage > 6) {
                    let pageCount = 1;
                    while (pageCount < 6) {
                        this.paginator.appendChild(new page(pageCount, data.length, this.reRenderPage));
                        pageCount++;
                    }
                    this.paginator.appendChild(new page(pageCount, data.length, this.reRenderPage, '...'));
                    this.paginator.appendChild(new page(pageCount, data.length, this.reRenderPage));
                } else {
                    let counter = 1;
                    while (lastPage > counter) {
                        this.paginator.appendChild(new page(counter, data.length, this.reRenderPage));
                        counter++;
                    }
                }
            });
        });
    }
    reRender(newEntryVal) {
        this.entryVal = newEntryVal;
        this.clearComponenets();
        this.renderComponents(this.apiData, this.entryVal, this.pageNum);
    }
    reRenderPage(val) {
        this.pageNum = val;
        this.clearComponenets();
        this.renderComponents(this.apiData, this.entryVal, this.pageNum);
    }

    renderComponents(data, entryCount, pageNum) {
        pageNum = parseInt(pageNum);
        if (!isNaN(pageNum)) {
            let maxColCount = 5, minColWidth = Math.floor(this.containerWidth / maxColCount - 10) + 'px',
                tableBodyRow = customElements.get('body-row');
            let filtered = data.slice(entryCount * (pageNum - 1), (entryCount * (pageNum - 1)) + entryCount);
            for (let country of filtered) {
                this.dtBody.appendChild(new tableBodyRow(country, minColWidth, this.columns));
            }
        }else{
            let filtered = data.slice(0, entryCount);
            let maxColCount = 5, minColWidth = Math.floor(this.containerWidth / maxColCount - 10) + 'px',
                tableBodyRow = customElements.get('body-row');
            for (let country of filtered) {
                this.dtBody.appendChild(new tableBodyRow(country, minColWidth, this.columns));
            }
        }
    }
    filterAndUpdate(value, key, sortDirection) {
        let filtered = [];
        if (!sortDirection) {
            filtered = this.apiData.filter((country) => {
                if (key) {
                    return country[key].toString().toLowerCase().includes(value.toLowerCase());
                } else {
                    let match = false;
                    for (let col of this.columns) {
                        match = country[col].toString().toLowerCase().includes(value.toLowerCase());
                        if (match)
                            return match;
                    }
                    return false;
                }
            });
        } else {
            filtered = this.apiData.sort((c1, c2) => {
                if (c1[key] > c2[key]) {
                    return sortDirection === 'asc' ? 1 : -1;
                } else if (c1[key] < c2[key]) {
                    return sortDirection === 'asc' ? -1 : 1;
                } else {
                    return 0;
                }

            });
        }
        this.clearComponenets();
        this.renderComponents(filtered, this.entryVal, this.pageNum);
    }

    clearComponenets() {
        // while (dtTitleHeader.firstChild) {
        //     dtTitleHeader.removeChild(dtTitleHeader.firstChild);
        // }
        // while (dtFilterHeader.firstChild) {
        //     dtFilterHeader.removeChild(dtFilterHeader.firstChild);
        // }
        while (this.dtBody.firstChild) {
            this.dtBody.removeChild(this.dtBody.firstChild);
        }
    }
}



