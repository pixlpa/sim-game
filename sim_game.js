const flocc = require('flocc');
const sim = require('./simbehavior');
const Max = require('max-api');

//Set up the flocc environment
const eco = new flocc.Environment();

Max.addHandlers({
    focus: (x,y) =>{
        options.target.x = x;
        options.target.y = y;
    },
    settings: (data) =>{
        options = Object.assign(options,data);
    } 
});

// global settings for the simulation
let options = {
    maxspeed: 10,
    maxforce: 5,
    goal: 0.2,
    awareness_range: 20,
    near: 5,
    bounds: 100,
    too_close: 2,
    solitude: 20,
    target: new flocc.Vector(0,0),
    count: 50
}

//initialize the agents
createAgents(options.count);

//simulation loop
setInterval(()=>{
    //run the flocc simulation
    eco.tick();

    //get all the agents into an array
    const payload = eco.getAgents();

    //set up the Max dictionary output
    let data = {
        x: [],
        y: [],
        xspeed: [],
        yspeed: [],
        together: []
    };
    //pack the dictionary
    payload.forEach(agent=>{
        const entry = agent.getData();
        data.x.push(entry.position.x*0.01);
        data.y.push(entry.position.y*0.01);
        data.xspeed.push(entry.speed.x);
        data.yspeed.push(entry.speed.y);
        data.together.push(entry.together);
    });
    //send to Max
    Max.outlet('agents',data);
},30);

//Initialize the Agents
function createAgents(count){
    for (i = 0; i < count; i++){
        let agent = new flocc.Agent();
        //Set the initial state of the Agent
        agent.set({
            position: new flocc.Vector(Math.random()*100-50,Math.random()*100-50),
            speed: new flocc.Vector(Math.random()*6-3,Math.random()*6-3),
            acceleration: new flocc.Vector(0,0),
            love: 0,
            avoid: Math.random()*0.1+0.008,
            alignment: Math.random()*0.1+0.005,
            drive: Math.random()*0.5+0.1,
            together: 0
        });
        //add rules that run for each agent each tick
        agent.addRule(agt => {
            // do behaviors
            agt.set(sim.motion(agt.getData(),eco,options));
        });
        agent.addRule(agt=>{
            // simulate a transition from attraction to avoidance depending on time spent near others
            const together = agt.get("together");
            if (together == options.solitude) agt.set("love",agt.get("love")-0.001);
            else if (together == -options.solitude) agt.set("love",agt.get("love")+0.001);
        });
        //once the Agent is set up, add it to the environment
        eco.addAgent(agent);
    }
}

