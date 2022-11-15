/**
 * Fonction de loader de js pour suppression du bandeau js loaded
 * 
 */
function loadJS() {
    var divJsIsLoaded = document.querySelector('#js-is-loaded');
    console.log(divJsIsLoaded);
    /*
    //manipulation sur le contenu de la balise
    divJsIsLoaded.innerHTML="JS ok";
    
    //manip du style en ligne de la balise
    divJsIsLoaded.style.backgroundColor="green";
    divJsIsLoaded.style.color="white";
    divJsIsLoaded.style.textDecoration="underline blue";
    divJsIsLoaded.style.display="none"
    */
    //manip dom de supression du noeud dans la structure affichée
    divJsIsLoaded.remove();

}
loadJS();