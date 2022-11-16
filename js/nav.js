function setNavbarEvent() {
    document.getElementById('link-create').addEventListener('click', linkCreateEvt);
    document.getElementById('link-thumb').addEventListener('click', linkThumbnailEvt);
    document.getElementById('link-home').addEventListener('click', linkHomeEvt);
}
/**
 * gestion des active de navbar
 * @param {object} evt event declencheur 
 * @param {boolean} setActiveparentli mettre le parent actif ou non 
 */
function setActiveLinkInNavbar(evt, setActiveparentli = true) {
    var tousLesLi = document.querySelectorAll('nav>.navbar li');
    // for(var i=0;i<tousLesLi;i++){
    //     tousLesLi[i].classList.remove('active');
    // }
    tousLesLi.forEach(function (element) {
        element.classList.remove('active');
    })
    if (setActiveparentli) { evt.target.parentElement.classList.add('active'); }
}
function linkCreateEvt(evt) {
    //echapement du comportement par defaut de la balise déclenchant l'evenement 
    evt.preventDefault();
    console.log('fonction liens create', evt);
    setActiveLinkInNavbar(evt);
    loadPage('create.html', function (nodeBase) {
        var form = nodeBase.querySelector('form');
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            console.log('formulaire soumis');
        })
    });

}
function linkHomeEvt(evt) {
    //echapement du comportement par defaut de la balise déclenchant l'evenement 
    evt.preventDefault();
    console.log('fonction liens home', evt);
    setActiveLinkInNavbar(evt, false);
    loadPage('home.html', 1);

}
function linkThumbnailEvt(evt) {
    //echapement du comportement par defaut de la balise déclenchant l'evenement 
    evt.preventDefault();
    console.log('fonction liens thumbnail', evt);
    setActiveLinkInNavbar(evt);
    fetch(`${REST_ADR}/memes`).then(r => r.json()).then(arr => {
        loadPage('thumbnail.html');
        console.log(arr);
    })


}
/**
 * loader de vues
 * @param {string} pageHref filename de la page a wrapper
 * @param {Function} callback function pour l'ajout des eventslistener
 */
function loadPage(pageHref, callback) {
    var pagePath = `/vues/${pageHref}`;
    fetch(pagePath)
        .then(function (resp) {
            return resp.text();
        })
        .then(function (html) {
            var wrapperNode = document.querySelector('#wrapper');
            wrapperNode.innerHTML = "";
            var container = document.createElement('div');
            container.innerHTML = html;
            if (typeof callback === 'function') { callback(container); }
            container.childNodes.forEach(element => {
                wrapperNode.append(element);
            });

            return html;
        })

}
