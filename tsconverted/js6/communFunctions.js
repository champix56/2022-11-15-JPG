/**
 * loader de vues
 * @param {string} pageHref filename de la page a wrapper
 * @param {Function} callback function pour l'ajout des eventslistener
 * @returns {Promise<Element>} assemble elements loaded in a div element container
 */
export function loadPageByPromise(pageHref) {
    var pagePath = `/vues/${pageHref}`;
    return fetch(pagePath)
        .then(function (resp) {
        return resp.text();
    })
        .then(function (html) {
        var container = document.createElement('div');
        container.innerHTML = html;
        return container;
    });
}
//# sourceMappingURL=communFunctions.js.map