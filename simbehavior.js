let flocc = require('flocc');

//this function handles the bulk of actual behavior of each agent
function motion(data,eco,options){
    //handle the "vehicle" locomotion (ref: Craig Reynolds)
    let local = data;
    let speed = data.speed;
    let pos = data.position;
    speed = speed.add(flocc.utils.clamp(data.acceleration,-options.maxforce,options.maxforce));
    speed.x = flocc.utils.clamp(speed.x,-options.maxspeed,options.maxspeed);
    speed.y = flocc.utils.clamp(speed.y,-options.maxspeed,options.maxspeed);
    local.speed = speed;
    local.position = pos.add(speed);
    local.acceleration = new flocc.Vector(0,0);
    local = gas(local,options);
    local = steering(local,eco,options);
    local = bounds(local,options);
    return local;
}

//this function manages the "flocking" behaviors like attraction to nearby, avoidance when too close, etc.
function steering(data,eco,options){
    let local = data;
    let neighbors = eco.getAgents();
    let accum = new flocc.Vector(0,0);
    let accum_speed = new flocc.Vector(0,0);
    let accum_avoid = new flocc.Vector(0,0);
    let nearby = 0;
    let nearby_pos = 0;
    let nearby_avoid = 0;
    let nearby_together = 0;

    //loop through all the other agents to get nearby values
    neighbors.forEach(other => {
        let friend = other.getData();
        const pos_diff = flocc.utils.distance(local.position,friend.position);
        if (pos_diff< options.awareness_range){
            if (pos_diff>options.too_close){
                accum.add(friend.position);
                nearby_pos++;
            }
            else {
                let avoidx = (local.position.x - friend.position.x);
                let avoidy = (local.position.y - friend.position.y);
                accum_avoid.add(new flocc.Vector(avoidx,avoidy).normalize());
                nearby_avoid++;
            }
            accum_speed = accum_speed.add(friend.speed);
            nearby++;
            if (pos_diff < options.near) nearby_together++;
        }
    });
    //only run if there are some nearby agents
    if (nearby > 0){
        let pos = local.position;
        let acc = local.acceleration;

        //steer toward or away from center of the group depending on "love" value
        let avg_pos = new flocc.Vector(0,0);
        if (nearby_pos > 0) {
            avg_pos.x = accum.x/nearby_pos - pos.x;//vector pointing to average position
            avg_pos.y = accum.y/nearby_pos - pos.y;
            avg_pos = avg_pos.normalize().multiplyScalar(local.love);
        }

        //steer away from agents that are too close based on the "avoid" value
        let avg_avoid = new flocc.Vector(0,0);
        if (nearby_avoid > 0) {
            avg_avoid = accum_avoid.normalize().multiplyScalar(local.avoid);
        }
        
        //try to align with the direction/speed of others depending on "alignment" value
        let avg_speed = new flocc.Vector(0,0);
        accum_speed.normalize();
        avg_speed.x = accum_speed.x-local.speed.x;//vector pointing toward average speed
        avg_speed.y = accum_speed.y-local.speed.y;
        avg_speed = avg_speed.normalize().multiplyScalar(local.alignment);
        avg_pos = avg_pos.add(avg_speed).add(avg_avoid);

        //add it all up
        acc = acc.add(avg_pos);
        local.acceleration = acc;
    }
    local = arrive(local,options);

    //increment or decrement "together" value depending on if agent is close to others
    if (nearby_together > 1) local.together = Math.min(local.together+1,options.solitude);
    else local.together = Math.max(local.together-1,-options.solitude);
    return local;
}

//bounce off the walls
function bounds(data,options){
    let local = data;
    let pos = local.position;
    let bound = options.bounds;
    let bounce = new flocc.Vector(0,0);
    if (pos.x > bound) {
        bounce.x += -1;
    } 
    else if (pos.x < -bound) {
        bounce.x += 1;
    }
    if (pos.y > bound) {
        bounce.y += -1;
    } 
    else if (pos.y < -bound) {
        bounce.y += 1;
    }
    local.speed = local.speed.add(bounce);
    return local;
}

//this is called "arrive" but really it's "seek" behavior
function arrive(data,options){
    let local = data;
    const target_delta = new flocc.Vector(options.target.x-local.position.x,options.target.y-local.position.y);
    target_delta.normalize().multiplyScalar(options.goal);
    local.acceleration.add(target_delta);
    return local;
}

//amplify the current motion direction depending on the "drive" value
function gas(data){
    let local = data;
    let direction = local.speed;
    direction.normalize().multiplyScalar(local.drive);
    local.acceleration.add(direction);
    return local;
}

module.exports={
    motion,
    steering,
    arrive,
    bounds,
    gas
}