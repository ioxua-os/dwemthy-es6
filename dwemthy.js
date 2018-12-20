
const rand = (max) => Math.floor(Math.random() * max);

class Creature {
    constructor() {
        this.traits("life", "strength", "charisma", "weapon");
    }
    
    get name() {
        return this.constructor.name;
    }
    
    traits() {
        Array.from(arguments).forEach(name => {
            const key = "_" + name;
            Object.defineProperties(this, {
                [key]: {
                    enumerable: false,
                    writable: true
                },
                [name]: {
                    set(val) {
                        this[key] = val;
                    },
                    get() {
                        return this[key];
                    },
                }
            });
        });
    }
    
    /**
    * Applies a hit taken during a fight
    */
    hit(damage) {
        const prob = rand(this.charisma);
        if (prob % 9 == 7) {
            this.life += prob / 4;
            console.log(`[${this.name} magick powers up ${prob}!]`);
        }
        
        this.life -= damage;
        
        if (this.life <= 0) console.log(`[${this.name} has died.]`);
    }
    
    /**
    * This method takes one turn in a fight
    */
    fight(enemy, weapon = this.weapon) {
        if (this.life <= 0) {
            console.log(`[${this.name} is too dead to fight!]`);
            return;
        }
        
        // Attaaaaaaaaack!
        const hit = rand(this.strength + weapon);
        console.log(`[You hit with ${hit} points of damage!`);
        enemy.hit(hit);
        
        // Retaliation
        //console.log(enemy) // ?
        if (enemy.life > 0) {
            const enemyHit = rand(enemy.strength + enemy.weapon);
            console.log(`[${enemy.name} hit with ${enemyHit} points of damage!`);
            this.hit(enemyHit);
        }
    }
}

// Our hero:
class Rabbit extends Creature {
    constructor() {
        super();
        this.traits("bombs");
        this.life = 10;
        this.strength = 2;
        this.charisma = 44;
        this.weapon = 4;
        this.bombs = 3;
    }
    
    // Unfortunately, there can be no special characters on method names in JS
    // We can use something like creature["^"](enemy) but it's ugly
    boomerang(enemy) {
        this.fight(enemy, 13);
    }
    
    sword(enemy) {
        this.fight(enemy, rand(4 + Math.pow(enemy.life % 10, 2)));
    }
    
    lettuce(enemy) {
        const lettuce = rand(this.charisma);
        console.log(`[Healthy lettuce gives you ${lettuce} life points!!]`);
        this.life += lettuce;
        fight(enemy, 0);
    }
    
    bomb(enemy) {
        if (this.bombs == 0) {
            console.log("[UHN!! You're out of bombs!!]");
            return;
        }
        
        this.bombs -= 1;
        this.fight(enemy, 86);
    }
}

// Our enemies
class IndustrialRaverMonkey extends Creature {
    constructor() {
        super();
        this.life = 46;
        this.strength = 35;
        this.charisma = 91;
        this.weapon = 2;
    }
}

class DwarvenAngel extends Creature {
    constructor() {
        super();
        this.life = 540;
        this.strength = 6;
        this.charisma = 144;
        this.weapon = 58;
    }
}

class AssistantViceTentacleAndOmbudsman extends Creature {
    constructor() {
        super();
        this.life = 320;
        this.strength = 6;
        this.charisma = 144;
        this.weapon = 50;
    }
}

class TeethDeer extends Creature {
    constructor() {
        super();
        this.life = 655;
        this.strength = 192;
        this.charisma = 19;
        this.weapon = 109;
    }
}

class IntrepidDecomposedCyclist extends Creature {
    constructor() {
        super();
        this.life = 901;
        this.strength = 560;
        this.charisma = 422;
        this.weapon = 105;
    }
}

class Dragon extends Creature {
    constructor() {
        super();
        this.life = 1340;
        this.strength = 451;
        this.charisma = 1020;
        this.weapon = 939;
    }
}

const dwemthysArrayOf = function() {
    return new Proxy(Array.from(arguments), {
        get: function(target, prop, _) {
            if (target.length == 0) {
                console.log("[Whoa.  You decimated Dwemthy's Array!]");
                return;
            }
            
            let enemy = target[0];
            if (enemy.life <= 0) {
                target.shift();
                enemy = target[0];
                console.log(`[Get ready. ${enemy.name} has emerged.]`)
            }
            
            const value = enemy[prop];

            if (typeof value === "function") {
                return value.bind(enemy)
            }

            return value;
        }
    });
};

// And then.. SHALL THE CARNAGE BEGIN!
const dwarr = dwemthysArrayOf(
        new IndustrialRaverMonkey(),
        new DwarvenAngel(),
        new AssistantViceTentacleAndOmbudsman(),
        new TeethDeer(),
        new IntrepidDecomposedCyclist(),
        new Dragon());

const aliveRabbit = new Rabbit();
aliveRabbit.boomerang(dwarr);
aliveRabbit.boomerang(dwarr);
aliveRabbit.boomerang(dwarr);
aliveRabbit.boomerang(dwarr);
aliveRabbit.boomerang(dwarr);
