			
var my={hp:Math.floor(Math.random()*10000)+5000,str:Math.floor(Math.random()*50)+5,dp:Math.floor(Math.random()*80)+10}
var enemy={hp:3000,str:1,dp:5}

var s = 0; //her saldırıda gelen stat
var ss = 0;//zamanla gelen stat
var es = 0;//rakibin hasar artış değişkeni
var totalenemyhp = enemy.hp;
var totalmyhp = my.hp;
function attack() { //saldırı kısmı
    if (enemy.hp > 0) {
        var newenemyhp = enemy.hp - my.str;
        enemy.hp = newenemyhp;
        document.getElementById('bar').style.width = ((newenemyhp / totalenemyhp) * 190);
        document.getElementById('hit').style.width = ((my.str / totalenemyhp) * 190);
        enemyattackstack();
        statstack();
        enemyattack();
        if (enemy.hp <= 0) {
/*             document.getElementById("rakipbilgi").innerHTML = "Rakip öldü!";
            document.getElementById("rakip").innerHTML = ""; */
            window.location.href="youwon.html";
            return;
        }
        document.getElementById("hpinf").innerHTML =Math.floor(my.hp);
        document.getElementById("strinf").innerHTML =my.str;
        document.getElementById("dpinf").innerHTML =my.dp;

    }}
    function addhp() {  //hp arttırma
        if (s > 0) {
            document.getElementById("notstat").innerHTML = ""
            my.hp+=100
            s=s-1;
            
        } else document.getElementById("notstat").innerHTML = "DAĞITILACAK YETERLİ STATÜ PUANI YOK"
        document.getElementById("hpinf").innerHTML =Math.floor(my.hp);
        document.getElementById("strinf").innerHTML = my.str;
        document.getElementById("dpinf").innerHTML = my.dp;
        document.getElementById("statinfo").innerHTML = s;
        document.getElementById('bar2').style.width= ((my.hp / totalmyhp) * 190);
        document.getElementById('hit2').style.width= ((enemy.str / totalmyhp) * 190);
    }
    function addstr() {  //str arttırma
        if (s>0) {
            document.getElementById("notstat").innerHTML = ""
            my.str+=2;
            s=s-1;
            
        } else document.getElementById("notstat").innerHTML = "DAĞITILACAK YETERLİ STATÜ PUANI YOK"
        document.getElementById("hpinf").innerHTML =Math.floor(my.hp);
        document.getElementById("strinf").innerHTML = my.str;
        document.getElementById("dpinf").innerHTML = my.dp;
        document.getElementById("statinfo").innerHTML = s;
    }
    function adddp() {     //dp arttırma
        if (s > 0) {
            document.getElementById("notstat").innerHTML = ""
            my.dp+=2;
            s=s-1;
            
        } else document.getElementById("notstat").innerHTML = "DAĞITILACAK YETERLİ STATÜ PUANI YOK"
        document.getElementById("hpinf").innerHTML =Math.floor(my.hp);
        document.getElementById("strinf").innerHTML = my.str;
        document.getElementById("dpinf").innerHTML = my.dp;
        document.getElementById("statinfo").innerHTML = s;
    }
    function startgame() {  //oyunu başlatır, diğer fonksiyonları tetikler
        setInterval("enemyattacktimebytime()", 100); 
        document.getElementById("hpinf").innerHTML =Math.floor(my.hp);
        document.getElementById("strinf").innerHTML = my.str;
        document.getElementById("dpinf").innerHTML = my.dp;
        document.getElementById("statinfo").innerHTML = s;

    }
    function enemyattack() { //oyunun bize saldıracağı kısım
        if (my.hp > 0) {
            var newmyhp = my.hp - enemy.str/(1+my.dp/33);
            my.hp = newmyhp;
            document.getElementById('bar2').style.width= ((newmyhp / totalmyhp) * 190);
            document.getElementById('hit2').style.width= ((enemy.str / totalmyhp) * 190);
            if (my.hp <= 0) {
                window.location.href="enemywon.html";
                return;
            }
  

        }
}
function enemyattackstack() {	 //statü dağıtma üst kısım
    if (es < 100) {
        es++;
        enemy.str = enemy.str + es;
        return;
       // document.getElementById("myinfo").innerHTML = es;
    }
}
function statstack() {	 //statü dağıtma üst kısım
    if (s < 100) {
        s++;
        document.getElementById("statinfo").innerHTML = ss+s;
        if (s > 0) {
            document.getElementById("notstat").innerHTML = ""
        }
    }
}
function enemyattacktimebytime(){
    my.hp-=5;
    document.getElementById("hpinf").innerHTML =Math.floor(my.hp);
    document.getElementById('bar2').style.width= ((my.hp / totalmyhp) * 190);
    document.getElementById('hit2').style.width= ((enemy.str / totalmyhp) * 190);
}
 /* var colors=['#FF0000','#FFA500'];
function hiteffect(){
    var hit=document.createElement("div");
    document.body.appendChild(hit);

    hit.style.position="absolute";
    var l=150;
    var t=150;

    hit.style.left=l+'px';
    hit.style.top=t+'px';
    hit.innerText=c;
     var color=Math.floor(Math.random()* colors.length);
     hit.style.color=color;

hit.style.transition="all 0.5s linear0s";
hit.style.left=hit.offsetLeft - 30 + 'px';
hit.style.top=hit.offsetTop-30+'px';
hit.style.fontSize="100px";
hit.style.opacity=0;
}  
 */

//keypress playing sound and effect part
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }

  function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (!audio) return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
    console.log(e.keyCode);
    switch(e.keyCode){
        case 13:
            startgame();
            break;
        case 81:
        addhp();
        break;
            case 87:
            addstr();
            break;
                case 69:
                adddp();
                break;
                    case 72:
                        attack();
                        break;
                        case 27:
                                window.location.href="index.html";
                                break;

    }
  }

  const keys = Array.from(document.querySelectorAll('.key'));
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));
  window.addEventListener('keydown', playSound);

