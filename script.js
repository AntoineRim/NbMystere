top10 = [];
init(top10);
boutoninit();

var divmere;
var boutonlancement;
var nbdor;
var nbTentative;
var res;
var comparaison;
var message;
var tempsfin,tempsdepart,tempspartie;
var scoreTest,tempsTest;
var messagesaisie;
var saisiejoueur;
var divboutons,boutonquitter,boutonrejouer,boutonclassement;

function jouer(){

  divmere = document.createElement("div");
  divmere.id="divmere";
  document.body.appendChild(divmere);

  nbdor = 1 + (Math.floor(Math.random() * 10));
  nbTentative = 0;
  tempsdepart = Date.now();

  var divprincipale = document.createElement("div");
  divprincipale.id="divprincipale";
  document.body.appendChild(divprincipale);

  var consigne = document.createElement("p");
  consigne.innerHTML="Devinez le nombre d'or compris entre 1 et 10";
  divprincipale.appendChild(consigne);

  var reponse = document.createElement("input");
  reponse.id="nombresaisi";
  divprincipale.appendChild(reponse);

  // Enregistrement de la réponse et test avec le résultat

  message = document.createElement("span");
  divprincipale.appendChild(message);

  document.getElementById("nombresaisi").onchange=function(event){
    res = parseInt(this.value);
    nbTentative++;

    if(res != nbdor)
      afficherEcart(res,nbdor,message);

    if (res == nbdor) {
      message.innerHTML="Bravo ! Vous avez gagné !";
      tempsfin = Date.now();
      let finpartie = tempsfin.valueOf();
      let debutpartie = tempsdepart.valueOf();
      tempspartie = finpartie - debutpartie;
    }

    //Test du top 10

    scoreTest = top10[9].score;
    tempsTest = top10[9].temps;

    if (nbTentative < scoreTest && tempspartie < tempsTest && res == nbdor) {
      messagesaisie = document.createElement("p");
      divprincipale.appendChild(messagesaisie);
      messagesaisie.innerHTML="Félicitations ! Vous êtes dans le top 10 ! Votre pseudo svp ?";
    
      saisiejoueur = document.createElement("input");
      saisiejoueur.id="saisiepseudo";
      divprincipale.appendChild(saisiejoueur);
      
      // Enregistrement du joueur dans le tableau à la 10e place
      
      saisiejoueur.onchange=function(event) {
        top10[9].name = String(this.value);
        top10[9].temps = tempspartie;
        top10[9].score = nbTentative;
        
        top10.sort(function(a, b) {
          if (a.score - b.score != 0)
            return a.score - b.score;
          else return a.temps - b.temps
          }); 
      
      divboutons = document.createElement("div");
      divboutons.id="divboutons";
      divprincipale.appendChild(divboutons);

      boutonrejouer = document.createElement("button");
      boutonrejouer.innerHTML="Rejouer";
      divboutons.appendChild(boutonrejouer);
      boutonrejouer.onclick=rejouer;
      
      boutonquitter = document.createElement("button");
      boutonquitter.innerHTML="Quitter";
      divboutons.appendChild(boutonquitter);
      boutonquitter.onclick=quitter;

      boutonclassement = document.createElement("button");
      boutonclassement.innerHTML="Afficher classement";
      divboutons.appendChild(boutonclassement);
      boutonclassement.onclick=genererTableau;
      } 
    }
  }  
}

function afficherEcart(a,b,c){
  if (a > b)
  c.innerHTML="Le nombre recherché est plus petit";
  
  if (a < b)
  c.innerHTML="Le nombre recherché est plus grand";
}

function init(tableau) {
  for (let index = 0; index < 10 ; index++)
    tableau[index] = { "name" : "---", "temps" : 1000000, "score" : 100 }
}

function rejouer() {
  nbTentative = 0;
  var divtop = document.getElementById("divprincipale");
  var divmere = document.getElementById("divmere");

  divtop.parentNode.removeChild(divtop);
  divmere.parentNode.removeChild(divmere);
  jouer();
}

function quitter(){
  var divtop = document.getElementById("divprincipale");
  while (divtop.hasChildNodes()){
    divtop.removeChild(divtop.firstChild);
  }
  document.write("Au revoir et peut-être à bientôt !");
}

function boutoninit(){

  boutonlancement = document.createElement("button");
  boutonlancement.id="jouer";
  boutonlancement.innerHTML="JOUER";
  document.body.appendChild(boutonlancement);
  boutonlancement.onclick=function(event){
    var boutonasupprimer = document.getElementById("jouer");
    boutonasupprimer.parentNode.removeChild(boutonasupprimer);
    jouer();
  }
}

function genererTableau() {
  var table = document.createElement("table");
  table.id="table";
  divboutons.appendChild(table);

  var tr = document.createElement("tr");
  table.appendChild(tr);

  var td1 = document.createElement("td");
  tr.appendChild(td1);
  td1.innerHTML="Rang";
  var td2 = document.createElement("td");
  tr.appendChild(td2);
  td2.innerHTML="Nom";
  var td3 = document.createElement("td");
  tr.appendChild(td3);
  td3.innerHTML="Temps";
  var td4 = document.createElement("td");
  tr.appendChild(td4);
  td4.innerHTML="Score";

  for (let index1 = 0; index1 < 10; index1++){
    var tr = document.createElement("tr");
    table.appendChild(tr);
    for (let index2 = 0; index2 < 4; index2++){
      var td = document.createElement("td");
      tr.appendChild(td);

      if (index2 == 0)
        td.innerHTML=""+(index1+1);
      if(index2 == 1)
        td.innerHTML=""+top10[index1].name;
      if(index2 == 2)
      td.innerHTML=""+top10[index1].temps;
      if(index2 == 3)
      td.innerHTML=""+top10[index1].score;
    }
  }
}