const Controller = {
    players: 0,
    counters: [], 
    format: "60-Card",
    addPlayer(){
        this.players++; 
    },
    removePlayer(){
        this.players--;
    }
};

//class to contian counter object
class Counter{
    constructor(count=20){
        //create counter elements
        this.background = document.createElement('div');
        this.group = document.createElement('div');
        this.name = document.createElement('textarea');
        this.minus = document.createElement('button');
        this.text = document.createElement('p');
        this.plus = document.createElement('button');

        //initialize count variable
        this.count = count;

        //give wrapper class for styling
        this.background.className = "grid_cell";
        this.background.id = "ctr"+Controller.players;

        //give object an id and class
        this.group.className = "counter";

        //create name label, make it editable, disable spell check
        this.name.rows = 2;
        this.name.maxLength = 20;
        this.name.textContent = "Player "+Controller.players
        this.name.contentEditable = true;
        this.name.spellcheck = false;
        this.name.addEventListener('click', () => this.name.select())
    
        //add text and functionality to - button; Call decrement on click
        this.minus.textContent = "-";
        this.minus.addEventListener('click', this.decrement.bind(this));

        //update number text to match count make text editable
        this.text.textContent = this.count;
        this.text.contentEditable = true;
        


        //add text and functionality to + button; Call increment on click
        this.plus.textContent = "+";
        this.plus.addEventListener('click', this.increment.bind(this));

        //set cell to default color
        this.setColor();

        //group elements together as children of container
        this.group.appendChild(this.minus);
        this.group.appendChild(this.text);
        this.group.appendChild(this.plus);
        this.background.appendChild(this.name);
        this.background.appendChild(this.group);

        //attach contianer to html body
        document.getElementById("container").appendChild(this.background);
    }

    //increase count by one on button press
    increment(){
        this.count++;
        this.text.textContent = this.count;    
    }

    //decrease count by one on button press
    decrement(){
        this.count--;
        this.text.textContent = this.count;    
    }

    setColor(){
        switch(Controller.players){
            case 1:
                this.background.style.backgroundColor = "rgb(64, 105, 218)";
                this.group.style.backgroundColor = "rgb(0, 36, 136)";
                break;
            case 2:
                this.background.style.backgroundColor = "rgb(218, 64, 64)";
                this.group.style.backgroundColor = "rgb(122, 0, 0)";
                break;
            case 3:
                this.background.style.backgroundColor = "rgb(69, 218, 64)";
                this.group.style.backgroundColor = "rgb(3, 83, 0)";
                break;
            case 4:
                this.background.style.backgroundColor = "rgb(218, 190, 64)";
                this.group.style.backgroundColor = "rgb(131, 107, 0)";
                break;
            case 5:
                this.background.style.backgroundColor = "rgb(156, 64, 218)";
                this.group.style.backgroundColor = "rgb(65, 0, 109)";
                break;
            case 6:
                this.background.style.backgroundColor = "rgb(64, 218, 198)";
                this.group.style.backgroundColor = "rgb(0, 104, 90)";
                break;
        }
    }
};


addPlayer = () =>{
    if(Controller.players < 6){
        Controller.addPlayer();
        if(Controller.format === "Edh"){
            const ctr = new Counter(40);
            Controller.counters.push(ctr);
        }
        else{
            const ctr = new Counter();
            Controller.counters.push(ctr);
        }
        ArrangeColumns();
    }
}

removePlayer = () =>{
    if(Controller.players > 1){
        const ctr = Controller.counters.pop()
        Controller.removePlayer();
        ctr.background.remove();
        ArrangeColumns(container);
    }
}

reset = ()=>{
    for(let i =0; i < Controller.counters.length; i++){
            const counter = Controller.counters[i];
            if(Controller.format === "60-Card"){
                            counter.count = 20;
            }
            else if(Controller.format === "Edh"){
                            counter.count = 40;
            }
            counter.text.textContent = counter.count;
        }
}

ResetAreas = () =>{
    for(let i = 0; i<Controller.counters.length; i++){
        Controller.counters[i].background.style.gridArea = "auto";
    }
}

ArrangeColumns = () =>{
    const num_players = Controller.players; 
    const container = document.getElementById("container");

    switch(num_players){
        case 1:
            container.style.gridTemplateColumns = "1fr";
            container.style.gridTemplateRows = "1fr";
            break;
        case 2:
            container.style.gridTemplateColumns = "1fr 1fr";
            container.style.gridTemplateRows = "1fr";
            ResetAreas();
            break;
        case 3:
            container.style.gridTemplateColumns = "1fr 1fr";
            container.style.gridTemplateRows = "1fr 1fr";
            document.getElementById("ctr1").style.gridArea = "1 / 1 / 2 / 2";
            document.getElementById("ctr2").style.gridArea = "1 / 2 / 2 / 3";
            document.getElementById("ctr3").style.gridArea = "2 / 1 / 3 / 3";
            break;
        case 4:
            container.style.gridTemplateColumns = "1fr 1fr";
            container.style.gridTemplateRows = "1fr 1fr";
            ResetAreas();
            break;
        case 5:
            container.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr 1fr";
            container.style.gridTemplateRows = "1fr 1fr";
            document.getElementById("ctr1").style.gridArea = "1 / 1 / 2 / 3";
            document.getElementById("ctr2").style.gridArea = "1 / 3 / 2 / 5";
            document.getElementById("ctr3").style.gridArea = "1 / 5 / 2 / 7";
            document.getElementById("ctr4").style.gridArea = "2 / 1 / 3 / 4";
            document.getElementById("ctr5").style.gridArea = "2 / 4 / 3 / 7";
            break;
        case 6:
            container.style.gridTemplateColumns = "1fr 1fr 1fr";
            container.style.gridTemplateRows = "1fr 1fr";
            ResetAreas();
            break;
    }
}

getFormatSelect = () => {
    let fs = document.getElementById("format-select");
    if(fs.checked ){
        for(let i =0; i < Controller.counters.length; i++){
            const counter = Controller.counters[i];
            counter.count += 20;
            counter.text.textContent = counter.count;
            Controller.format = "Edh";
        }
    }
    else{
        for(let i =0; i < Controller.counters.length; i++){
            const counter = Controller.counters[i];
            counter.count -= 20;
            counter.text.textContent = counter.count;
            Controller.format = "60-Card";
        }
    }
}

//create counter instance on content load
document.addEventListener('DOMContentLoaded', () => {
    addPlayer();
});

document.getElementById("format-select").addEventListener('change', () => {getFormatSelect()});