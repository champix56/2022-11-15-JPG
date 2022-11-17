const initRoutes=(evt) => {
    const path=location.pathname;
    if(path.startsWith('/thumbnail'))
    {
        linkThumbnailEvt(evt);
    }
    else if(path.startsWith('/creator')){
        linkCreateEvt(evt);
    }
    else{
        linkHomeEvt(evt);
    }
};

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
    if (setActiveparentli) { 
        
        evt.target.parentElement.classList.add('active');
     }
}
function linkCreateEvt(evt,memeid) {
    //echapement du comportement par defaut de la balise déclenchant l'evenement 
    evt.preventDefault();
    history.pushState('','meme creator',undefined!==memeid?`/creator/${memeid}`:'/creator');
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
    history.pushState('','meme home','/');

    console.log('fonction liens home', evt);
    setActiveLinkInNavbar(evt, false);
    loadPage('home.html', 1);

}
function linkThumbnailEvt(evt) {
    //echapement du comportement par defaut de la balise déclenchant l'evenement 
    evt.preventDefault();
    history.pushState('','meme creator','/thumbnail');

    console.log('fonction liens thumbnail', evt);
    setActiveLinkInNavbar(evt);
    const primages = fetch(`${REST_ADR}/images`).then(r => r.json());
    const prmemes = fetch(`${REST_ADR}/memes`).then(r => r.json());
    //synchro d'execution des then de promise avec 2 promises
    Promise.all([primages, prmemes])
        .then(arr => {
            images = arr[0];
            memes = arr[1];
            loadPage('thumbnail.html', container => {
                //recup du model present dans la vue
                var memeModelNode = container.querySelector('#meme-');
                //suppr. du model vide
                memeModelNode.remove();
                memes.forEach(meme => {
                    //creation d'un doublon du noeud de model
                    const memeNode = memeModelNode.cloneNode(true);
                    //mise en place de l'id dynamique sur le clone
                    memeNode.id = `meme-${meme.id}`;

                    const imageDuMeme = images.find(img => img.id === meme.imageId);

                    memeNode.querySelector('image').setAttribute('xlink:href', '/img/' + imageDuMeme.href);

                    //ternaire    (cond)?vrai:faux;
                    const text=memeNode.querySelector('text');
                    text.style.textDecoration = meme.underline?'underline':'none';
                    text.style.fontStyle = meme.underline?'italic':'normal';
                    text.style.fontWeight = meme.fontWeight;
                    text.style.fontSize = meme.fontSize;
                    text.style.fill = meme.color;

                    memeNode.querySelector('svg').setAttribute('viewBox','0 0 '+imageDuMeme.w+' '+imageDuMeme.h);

memeNode.addEventListener('click',(evt)=>{
    linkCreateEvt(evt,meme.id);
})
                    //ajout du clone dans le container
                    container.querySelector('#thumbnail').append(memeNode);

                    console.log(meme, imageDuMeme)
                });
            });


        });
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
