export class Main {
    constructor(config) {
        this.selectedChanelIndex = 0;
        this.selectedRecordCountIndex = 0;

        this.channels = config.channels;
        this.recordsCount = config.recordsCount;

        this.searchBtn = document.querySelector('#search-btn');
        this.chanelsSelect = document.querySelector('#chanels-select');
        this.recordsSelect = document.querySelector('#records-count-select');
        this.resultConteiner = document.querySelector('#search-result');
        this.loader = document.querySelector('#loader');

        const {apiKey, url} = config;
        this.apiKey = apiKey;
        this.url = url;
    }

    init() {
        this.renderSelect(this.chanelsSelect, this.channels);
        this.renderSelect(this.recordsSelect, this.recordsCount);

        this.searchBtn.addEventListener('click', this.search.bind(this));
        this.chanelsSelect.addEventListener('change', this.updateChanel.bind(this));
        this.recordsSelect.addEventListener('change', this.updateRecordsCount.bind(this));
    }

    renderSelect(target, data) {
        const fragment = document.createDocumentFragment();
        data.forEach(item => {
            const option = document.createElement('option');
            option.setAttribute('value', item.value);
            option.appendChild(document.createTextNode(item.label));
            fragment.appendChild(option);
        });
        target.innerHTML = '';
        target.appendChild(fragment);
    }

    async search() {
        this.switchLoader();

        const channel = this.channels[this.selectedChanelIndex].value;
        const recordsCount = this.recordsCount[this.selectedRecordCountIndex].value;
        try{
            // Lazy loading
            const  NewsApiModule = await import('./NewsApi');
            const api = new NewsApiModule.NewsApi(this.apiKey, this.url);

            const ArticlesModule = await import('./Articles');
            const articles = new ArticlesModule.Articles();

            const jsonData = await api.getData(channel,recordsCount);
            const fragment = articles.parseDataToHtmlFragment(jsonData);
            this.resultConteiner.innerHTML = "";
            this.resultConteiner.appendChild(fragment);
        } catch(error) {
            console.log(error.message)
        } finally {
            this.switchLoader();
        }
        
    }

    switchLoader() {
        this.loader.classList.toggle('hidden');
        this.resultConteiner.classList.toggle('hidden');
    }

    updateChanel(event) {
        this.selectedChanelIndex = event.target.selectedIndex;
    }

    updateRecordsCount(event) {
        this.selectedRecordCountIndex = event.target.selectedIndex;  
    }
}