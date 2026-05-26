const Controller = {
    players: 0,
    counters: [], 
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
    
        //add text and functionality to - button; Call decrement on click
        this.minus.textContent = "-";
        this.minus.addEventListener('click', this.decrement.bind(this));

        //update number text to match count
        this.text.textContent = this.count;

        //add text and functionality to + button; Call increment on clcik
        this.plus.textContent = "+";
        this.plus.addEventListener('click', this.increment.bind(this));

        //group elements together as children of container
        this.group.appendChild(this.minus);
        this.group.appendChild(this.text);
        this.group.appendChild(this.plus);
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
};

addPlayer = () =>{
    if(Controller.players < 6){
        Controller.addPlayer();
        const ctr = new Counter();
        Controller.counters.push(ctr);
        ArrangeColumns(container);
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

//create counter instance on content load
document.addEventListener('DOMContentLoaded', () => {
    addPlayer();
});