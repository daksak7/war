			
var my={hp:10000,str:10,dp:10}
var enemy={hp:5000,str:14,dp:5}
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
        document.getElementById("rakipbilgi").innerHTML = enemy.hp;
        document.getElementById("rakip").innerHTML = "DEV ÖLÜM ÇİÇEĞİ";
    }}
    function addhp() {  //hp arttırma
        if (ss+s > 0) {
            document.getElementById("notstat").innerHTML = ""
            var newmyhp = my.hp + 100;
            s=s-1;
            my.hp = newmyhp;""
        } else document.getElementById("notstat").innerHTML = "DAĞITILACAK YETERLİ STATÜ PUANI YOK"
        document.getElementById("hpinf").innerHTML = my.hp;
        document.getElementById("strinf").innerHTML = my.str;
        document.getElementById("dpinf").innerHTML = my.dp;
        document.getElementById("statinfo").innerHTML = ss+s;
        document.getElementById('bar2').style.width= ((newmyhp / totalmyhp) * 190);
        document.getElementById('hit2').style.width= ((enemy.str / totalmyhp) * 190);
    }
    function addstr() {  //str arttırma
        if (ss+s > 0) {
            document.getElementById("notstat").innerHTML = ""
            var newmystr = my.str + 2;
            s=s-1;
            my.str = newmystr;
        } else document.getElementById("notstat").innerHTML = "DAĞITILACAK YETERLİ STATÜ PUANI YOK"
        document.getElementById("hpinf").innerHTML = my.hp;
        document.getElementById("strinf").innerHTML = my.str;
        document.getElementById("dpinf").innerHTML = my.dp;
        document.getElementById("statinfo").innerHTML = ss+s;
    }
    function adddp() {     //dp arttırma
        if (ss+s > 0) {
            document.getElementById("notstat").innerHTML = ""
            var newmydp = my.dp + 2;
            s=s-1;
            my.dp = newmydp;
        } else document.getElementById("notstat").innerHTML = "DAĞITILACAK YETERLİ STATÜ PUANI YOK"
        document.getElementById("hpinf").innerHTML = my.hp;
        document.getElementById("strinf").innerHTML = my.str;
        document.getElementById("dpinf").innerHTML = my.dp;
        document.getElementById("statinfo").innerHTML = ss+s;
    }
    function startgame() {  //oyunu başlatır, diğer fonksiyonları tetikler
        setInterval("statstackbytime()", 4000);
        document.getElementById("hpinf").innerHTML = my.hp;
        document.getElementById("strinf").innerHTML = my.str;
        document.getElementById("dpinf").innerHTML = my.dp;
        document.getElementById("statinfo").innerHTML = s;

    }
    function enemyattack() { //oyunun bize saldıracağı kısım
        if (my.hp > 0) {
            var newmyhp = my.hp - enemy.str;
            my.hp = newmyhp;
            document.getElementById('bar2').style.width= ((newmyhp / totalmyhp) * 190);
            document.getElementById('hit2').style.width= ((enemy.str / totalmyhp) * 190);
            if (my.hp <= 0) {
                window.location.href="enemywon.html";
                return;
            }
            document.getElementById("benbilgi").innerHTML = my.hp;

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
function statstackbytime() {	 //statü dağıtma üst kısım
    if (ss < 15) {
        ss++;
        document.getElementById("statinfo").innerHTML = ss+s;
        if (ss > 0) {
            document.getElementById("notstat").innerHTML = ""
        }
    }
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

/*   
function exitgame(){
    
} */