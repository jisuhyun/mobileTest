

function initNavigation() {
    this.initTabs();
    this.initTabEvent();

}

function initTabs() {
    var navigationHeaderContainer = document.getElementById('navigation-header-container');
    var navigationContentsContainer = document.getElementById('navigaiton-contents-container');
    
    for (let i = 0; i < navigationTabsSrc.length; ++i) {
        // create header tab
        let headerTab = new HTMLLiElement();;
        let aElement = new HTMLAElement();
        aElement.id = "navigaiton-header-" + navigationTabsSrc[i] + "-tab";
        aElement.classList.add('header-tab-' + navigationTabsSrc[i]);
        aElement.classList.add('navigation-header-tab-style');
        aElement.dataset.tooltip = navigationTabsSrc[i];
        aElement.dataset.set = navigationTabsSrc[i];
        headerTab.classList.add('navigation-header-li-style');
        headerTab.appendChild(aElement);
        navigationHeaderContainer.appendChild(headerTab);

        // create contents tab
        let contentsTab = document.createElement("li");
        let divElement = new HTMLDivElement();
        divElement.id = "navigaiton-contents-" + navigationTabsSrc[i] + "-tab";
        divElement.classList.add('contents-tab-' + navigationTabsSrc[i]);
        divElement.classList.add('navigation-contents-tab-style');
        contentsTab.id = "navigaiton-contents-" + navigationTabsSrc[i] + "-li";
        contentsTab.classList.add('navigation-contents-li-style');
        contentsTab.appendChild(divElement);
        navigationContentsContainer.appendChild(contentsTab);
    }
}

function initTabEvent() {
    let headerTab = document.getElementsByClassName("navigation-header-tab-style");
    let contentsTab = document.getElementsByClassName("navigation-contents-li-style");
    let activeTab = null;

    for (let tab of headerTab) {
        tab.addEventListener("click", selectTab.bind(this, tab), false);
        tab.addEventListener("click", onWindowResize, false);
    }

    function selectTab(target, event) {
        for (let tab of headerTab) tab.classList.remove('active');
        for (let contents of contentsTab) contents.classList.remove('active');
        if (activeTab == target.dataset.set) return activeTab = null;
        let tabName = null;

        activeTab = target.dataset.set;
        tabName =  "navigaiton-contents-" + activeTab + "-li";
        document.getElementById(tabName).classList.add('active');
        event.currentTarget.classList.add('active');
    }
}

initNavigation();