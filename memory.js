var coups = 0;
const niveau2 = document.getElementById('niveau');
let niveauActuel = parseInt(niveau2.textContent);
var photos = document.getElementsByTagName('img');
var score2=document.getElementById('score');
const nivUnBtn = document.getElementById('nivUnBtn');
const resetBtn = document.getElementById('resetBtn');

var score=0;
var mvt=1;
var p1,p2;

//liste de 12 images et mélange des img
var nbr_img=[8,9,3,4,5,6,8,9,3,4,5,6] 
    .map(p=>[p,Math.random()])
    .sort((nbr_img,b)=>nbr_img[1]-b[1])
    .map(p=>p[0]);

console.log(nbr_img);

if(niveauActuel === 1){
    //gestion du temps
    var chrono = 60;
    var intervalId = setInterval(function(){
        if (chrono === 0) {
            alert("DOMMAGE!!! Tu as perdu le niveau 1.");
            redirectAuNivPasse();
        }
        chrono--;
        document.getElementById("chrono").innerHTML=chrono;
    }, 1000);
      
}else if(niveauActuel === 2){
    //gestion du temps
    var chrono = 50;
    
    var intervalId = setInterval(function(){
        if (chrono === 0) {
            alert("DOMMAGE!!! Tu as perdu le niveau 2.");
            redirectAuNivPasse();
        }
        chrono--;
        document.getElementById("chrono").innerHTML=chrono;
    }, 1000);
    
}else if(niveauActuel === 3){
    //gestion du temps
    var chrono = 40;
    
    var intervalId = setInterval(function(){
        if (chrono === 0) {
            alert("DOMMAGE!!! Tu as perdu le niveau 3.");
            redirectAuNivPasse();
        }
        chrono--;
        document.getElementById("chrono").innerHTML=chrono;
    }, 1000);
}

//choix des images
for(let i=0; i<photos.length; i++){
    photos[i].src2='./photos/photo'+nbr_img[i]+'.jpg';
    photos[i].clicked = false;
}


document.addEventListener('click',function(e){
    if (chrono <= 0) {
        return;
    }
    
    switch(mvt){
        case 1: //1 er click
            if (e.target.tagName==='IMG' && !e.target.clicked){          
                intervalId;// démarrer le chrono
                e.target.src=e.target.src2;
                e.target.clicked = true;
                p1=e.target;
                mvt=2;
            }           
        break;

        case 2: //2 eme click
            if (e.target.tagName='IMG'&& !e.target.clicked){
                e.target.src=e.target.src2;
                e.target.clicked = true;
                p2=e.target;
                mvt=3;
            }   
        break;

        case 3://dernier click pour verif des cartes
            check();         
        break;       
    }   
});

resetBtn.addEventListener('click', function() {
  // Reinitialisé le jeu
  window.location.reload();
});

nivUnBtn.addEventListener('click', function() {
    window.location.replace("./index1.html");
});

function check(){
    if(p1.src2==p2.src2){
        p1.replaceWith(document.createElement('span'))
        p2.replaceWith(document.createElement('span'))
        score+=50;
        if(niveauActuel === 1){
            if (chrono <= 0) {
                clearInterval(intervalId);
                alert("DOMMAGE!!! Tu as perdu le niveau 1.");
                redirectAuNivPasse();
            }else{
                chrono+=4;
                document.getElementById("chrono").innerHTML=chrono;
            }

        }else if(niveauActuel === 2){
            if (chrono <= 0) {
                clearInterval(intervalId);
                alert("DOMMAGE!!! Tu as perdu le niveau 2.");
                redirectAuNivPasse();
            }else{
                chrono+=3;
                document.getElementById("chrono").innerHTML=chrono;
            }
            
        }else if(niveauActuel === 3){
            if (chrono <= 0) {
                clearInterval(intervalId);
                alert("DOMMAGE!!! Tu as perdu le niveau 3.");
                redirectAuNivPasse();
            }else{
                chrono+=2;
                document.getElementById("chrono").innerHTML=chrono;
            }
        }
    }
    else{
        p2.src=p1.src='./photos/photo0.jpg';
        score=Math.max(0,score-5);
        coups+=1;
        document.getElementById("coups-compt").textContent = coups;

        if(niveauActuel === 1){
            if (chrono <= 0) {
                clearInterval(intervalId);
                alert("DOMMAGE!!! Tu as perdu le niveau 1.");
                redirectAuNivPasse();
            }else{
                chrono-=2;
                document.getElementById("chrono").innerHTML=chrono;
            }

        }else if(niveauActuel === 2){
            if (chrono <= 0) {
                clearInterval(intervalId);
                alert("DOMMAGE!!! Tu as perdu le niveau 2.");
                redirectAuNivPasse();
            }else{
                chrono-=4;
                document.getElementById("chrono").innerHTML=chrono;
            }
            
        }else if(niveauActuel === 3){
            if (chrono <= 0) {
                clearInterval(intervalId);
                alert("DOMMAGE!!! Tu as perdu le niveau 3.");
                redirectAuNivPasse();
            }else{
                chrono-=6;
                document.getElementById("chrono").innerHTML=chrono;
            }
        }
        
    
    }   
    mvt=1;
    score2.textContent=score;
    p1.clicked = false;
    p2.clicked = false;
    //verif si c'est la fin du jeu
    if(document.getElementsByTagName('img').length==0){
        score2.textContent+=' Tu as gagné!!!! :)';
        alert("Tu as gagner!!! :)");
        clearTimeout(intervalId); //arrete le temps
        redirectAuNivProchain() 
    }
}



function redirectAuNivProchain() {
    if (niveauActuel === 1) {
        window.location.href = './index2.html';
    } else if (niveauActuel === 2) {
        window.location.href = './index3.html';
    }else if (niveauActuel === 3) {
        alert("Tu as gagné le jeu!!!");	
        window.location.href = './index0.html';
    }
}

function redirectAuNivPasse() {
    if (niveauActuel === 3) {
        window.location.href = './index2.html';
    } else if (niveauActuel === 2) {
        window.location.href = './index1.html';
    }else if (niveauActuel === 1) {
        alert("Tu as perdu le jeu!!!");	
        window.location.href = './index0.html';
    }
}


