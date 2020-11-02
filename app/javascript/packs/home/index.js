//変数の作成------------------------------------
let none = [];//自分引き配列
let enone = [];//相手引き配列
let min = 0;
let max = 51;
let choice = 0;
let total = 0;
let enemyTotal = 0;
let cardNumber = 1;
let cardNumberE = 1;
let point = 0;
let bet = 0;
let money = 500;
//fetch API-----------------------------------------------------------------------

function moneyPost(){
    fetch("money",{
        method: "POST",
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({money:money,authenticity_token:document.getElementsByName("csrf-token")[0].getAttribute("content")})
    })
    .then(function(res){
        console.log(res);
    })
}

//ベット機能------------------------------------------------------------------------
const moneyBet = ()=>{
    document.getElementById("mm").onclick = ()=> {
        money = money + bet;
        bet = 0;
        document.getElementById("bet").innerHTML =bet;
        document.getElementById("money").innerHTML =money;
    }
    document.getElementById("mt").onclick = ()=> {
        if(bet>=1000){
            bet = bet-1000;
            money = money+1000;
            document.getElementById("bet").innerHTML =bet;
            document.getElementById("money").innerHTML =money;
        }else{
            money = money + bet;
            bet = 0;
            document.getElementById("bet").innerHTML =bet;
            document.getElementById("money").innerHTML =money;
        }
    }
    document.getElementById("mh").onclick = ()=> {
        if(bet>=100){
            bet = bet-100;
            money = money+100;
            document.getElementById("bet").innerHTML =bet;
            document.getElementById("money").innerHTML =money;
        }else{
            money = money + bet;
            bet = 0;
            document.getElementById("bet").innerHTML =bet;
            document.getElementById("money").innerHTML =money;
        }
    }
    document.getElementById("mten").onclick = ()=> {
        if(bet>=10){
            bet = bet-10;
            money = money+10;
            document.getElementById("bet").innerHTML =bet;
            document.getElementById("money").innerHTML =money;    
        }
    }
    document.getElementById("pten").onclick = ()=> {
        if(money>=10){
            bet = bet+10;
            money = money-10;
            document.getElementById("bet").innerHTML =bet;
            document.getElementById("money").innerHTML =money;
        }
    }
    document.getElementById("ph").onclick = ()=> {
        if(money>=100){
            bet = bet+100;
            money = money-100;
            document.getElementById("bet").innerHTML =bet;
            document.getElementById("money").innerHTML =money;    
        }else{
            bet = bet + money;
            money = 0;
            document.getElementById("bet").innerHTML =bet;
            document.getElementById("money").innerHTML =money;
        }
    }
    document.getElementById("pt").onclick = ()=> {
        if(money>=1000){
            bet = bet+1000;
            money = money-1000;
            document.getElementById("bet").innerHTML =bet;
            document.getElementById("money").innerHTML =money;    
        }else{
            bet = bet + money;
            money = 0;
            document.getElementById("bet").innerHTML =bet;
            document.getElementById("money").innerHTML =money;
        }
    }
    document.getElementById("pm").onclick = ()=> {
        bet = bet + money;
        money = 0;
        document.getElementById("bet").innerHTML =bet;
        document.getElementById("money").innerHTML =money;
    }

}
//ゲームの作成-----------------------------------
const gameStart = ()=>{
    //初期化-------------------------------------------------------
    document.getElementById("mt").onclick = ()=> {
    }
    document.getElementById("mh").onclick = ()=> {
    }
    document.getElementById("mten").onclick = ()=> {
    }
    document.getElementById("pten").onclick = ()=> {
    }
    document.getElementById("ph").onclick = ()=> {
    }
    document.getElementById("pt").onclick = ()=> {
    }

    document.getElementById("buttonact1").innerHTML = "カードを引く";
    document.getElementById("buttonact2").innerHTML = "勝負！";
    document.getElementById("again").innerHTML = "　　";

    //お金表示
    document.getElementById("bet").innerHTML =bet;
    document.getElementById("money").innerHTML =money;

    //トランプ表示あなた
    for(let u=1;u<=8;u++){
        document.getElementById("card"+u).innerHTML = "  ";
        document.getElementById("card"+u).style.backgroundColor = "#92cb97";
    }
    //トランプ表示ディーラー
    for(let u=1;u<=8;u++){
        document.getElementById("ecard"+u).innerHTML = "  ";
        document.getElementById("ecard"+u).style.backgroundColor = "#92cb97";
    }

    //トランプの準備----------------------------------------------------
    const symbol = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
    const numberPoint = [11,2,3,4,5,6,7,8,9,10,10,10,10]

    let trump = [];
    for (let i = 0 ; i < 13 ; i++ ){
        trump[i] = {name:"♥"+symbol[i],number:numberPoint[i]};
        trump[i+13] = {name:"♠"+symbol[i],number:numberPoint[i]};
        trump[i+26] = {name:"♦"+symbol[i],number:numberPoint[i]};
        trump[i+39] = {name:"☘"+symbol[i],number:numberPoint[i]};
    };
    //変数の作成-----------------------------------------------------------
    none.splice(0)//自分引き配列
    enone.splice(0)//相手引き配列
    min = 0;
    max = 51;
    choice = 0;
    total = 0;
    enemyTotal = 0;
    cardNumber = 1;
    cardNumberE = 1;
    point = 0;
    //自分のターン関数-----------------------------------------------------
    const myTurn = ()=>{
        choice = Math.floor(Math.random()*(max-min+1))+min;
        document.getElementById("card"+cardNumber).innerHTML = trump[choice].name;
        total = total + trump[choice].number;
        none.push(trump[choice].number);
        trump[choice] = trump[max];
        max = max - 1;
        document.getElementById("card"+cardNumber).style.backgroundColor = "#f67690";
        cardNumber = cardNumber +1;
    };
    //相手のターン関数-----------------------------------------------------
    const enemyTurn = ()=>{
        choice = Math.floor(Math.random()*(max-min+1))+min;
        document.getElementById("ecard"+cardNumberE).innerHTML = trump[choice].name;
        enemyTotal = enemyTotal + trump[choice].number;
        enone.push(trump[choice].number);
        trump[choice] = trump[max];
        max = max - 1;
        document.getElementById("ecard"+cardNumberE).style.backgroundColor = "#00aaff";
        cardNumberE = cardNumberE +1;
    };
    //1か11選択関数-----------------------------------------------------
    const aOrEleven = ()=>{
        if(total >= 22 && true == none.includes(11)){
            total = total - 10;
            point = none.indexOf(11)
            none.splice(point,1)
        }    
    };

    //ゲーム開始-------------------------------------------------
    myTurn();
    enemyTurn();
    myTurn();
    aOrEleven();
    document.getElementById("judgedis1").innerHTML = enemyTotal+"点";
    document.getElementById("judgedis2").innerHTML = total+"点";
    //ブラックジャックの場合--------------------------------------
    if(total == 21){
        document.getElementById("judgedis2").innerHTML ="ブラックジジャックです！";
        document.getElementById("again").innerHTML = "ＷＩＮ！！";
        document.getElementById("money").innerHTML =money+"　+"+bet*1.5;
        money = money+bet+(bet*1.5);
        document.getElementById("buttonact1").innerHTML = "もう1回やる";
        document.getElementById("buttonact1").onclick = ()=> {
            betTime();
        }
        document.getElementById("buttonact2").innerHTML = "記録して退室";
        document.getElementById("buttonact2").onclick = ()=> {
            moneyPost();
        }

    }else{
            //動作選択--------------------------------------------------
        document.getElementById("buttonact1").onclick = ()=> {
            myTurn();
            aOrEleven();
            document.getElementById("judgedis2").innerHTML = total+"点";
            if(total >= 22){
                document.getElementById("judgedis2").innerHTML =total+"点でバーストしました";
                document.getElementById("again").innerHTML = "ＬＯＳＥ";
                document.getElementById("bet").innerHTML =bet+"　-"+bet;
                bet=0;
                document.getElementById("buttonact1").innerHTML = "もう1回やる";
                document.getElementById("buttonact1").onclick = ()=> {
                        betTime();
                    }
                document.getElementById("buttonact2").innerHTML = "記録して退室";
                document.getElementById("buttonact2").onclick = ()=> {
                    moneyPost();
                }
            }        
        };
    }
    document.getElementById("buttonact2").onclick = ()=> {
            while(enemyTotal < 17){
                enemyTurn();
                if(enemyTotal >= 22 && true == enone.includes(11)){
                    enemyTotal = enemyTotal - 10;
                    point = enone.indexOf(11)
                    enone.splice(point,1)
                }
            }
    // 勝敗-----------------------------------------------------------------------
            document.getElementById("judgedis1").innerHTML = enemyTotal+"点";
            document.getElementById("judgedis2").innerHTML =total+"点";

            document.getElementById("buttonact1").innerHTML = "もう1回やる";
            document.getElementById("buttonact2").innerHTML = "記録して退室";
            document.getElementById("buttonact2").onclick = ()=> {
                moneyPost();
            }

            if(22 > total && total > enemyTotal ){
                document.getElementById("again").innerHTML = "ＷＩＮ！！";
                document.getElementById("money").innerHTML =money+"　+"+bet;
                document.getElementById("buttonact1").onclick = ()=> {
                    money = money+bet;
                    betTime();
                }
            }else if(22 > total && enemyTotal > 21){
                document.getElementById("judgedis1").innerHTML = enemyTotal+"点でバーストしました";
                document.getElementById("again").innerHTML = "ＷＩＮ！！";
                document.getElementById("money").innerHTML =money+"　+"+bet;
                document.getElementById("buttonact1").onclick = ()=> {
                    money = money+bet;
                    betTime();
                }
            }else if(22 > enemyTotal && total < enemyTotal || total > 21 ){
                document.getElementById("again").innerHTML = "ＬＯＳＥ";
                document.getElementById("bet").innerHTML =bet+"　-"+bet;
                bet=0;
                document.getElementById("buttonact1").onclick = ()=> {
                        betTime();
                }
            }else if(22 > enemyTotal && total > 21){
                document.getElementById("again").innerHTML = "ＬＯＳＥ";
                document.getElementById("bet").innerHTML =bet+"　-"+bet;
                bet=0;
                document.getElementById("buttonact1").onclick = ()=> {
                        betTime();
                }
            }else{
                document.getElementById("again").innerHTML = "ＤＲＡＷ";
                document.getElementById("buttonact1").onclick = ()=> {
                    betTime();
                }   
            }
    };
}
const betTime = ()=>{
    document.getElementById("judgedis1").innerHTML ="  ";
    document.getElementById("judgedis2").innerHTML ="  ";

    //トランプ表示あなた
    for(let u=1;u<=8;u++){
        document.getElementById("card"+u).innerHTML = "  ";
        document.getElementById("card"+u).style.backgroundColor = "#92cb97";
    }
    //トランプ表示ディーラー
    for(let u=1;u<=8;u++){
        document.getElementById("ecard"+u).innerHTML = "  ";
        document.getElementById("ecard"+u).style.backgroundColor = "#92cb97";
    }
    document.getElementById("again").innerHTML = "お金を掛けてください";
    document.getElementById("bet").innerHTML =bet;
    document.getElementById("money").innerHTML =money;
    document.getElementById("buttonact1").innerHTML = "スタート";
    document.getElementById("buttonact1").onclick = ()=> {
        gameStart();
    }
    document.getElementById("buttonact2").innerHTML = "記録して退室";
    document.getElementById("buttonact2").onclick = ()=>{
        moneyPost();
    }
    moneyBet();
    if(money==0&&bet==0){
        document.getElementById("again").innerHTML = "お金がありません";
        document.getElementById("buttonact1").innerHTML = "サラ金に行く";
        document.getElementById("buttonact1").style.backgroundColor = " #00aaff";
        document.getElementById("buttonact1").onclick = ()=> {
            location.reload();
        }
    }
}

for(let s=0;s<=1;s++){
    betTime();
}