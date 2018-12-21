
const rand = (max) => Math.floor(Math.random() * max);

const creatureFactory = (name, life, strength, charisma, weapon, customProps) => function create() { 
    return {
        name, 
        life, 
        strength, 
        charisma, 
        weapon, 
        charisma,

        hit(damage) {
            const prob = rand(this.charisma);
            if (prob % 9 == 7) {
                this.life += prob / 4;
                console.log(`[${this.name} magick powers up ${prob}!]`);
            }
            
            this.life -= damage;
            
            if (this.life <= 0) console.log(`[${this.name} has died.]`);
        },

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
        },

        // Custom props go here to simulate inheritance
        ...customProps
    }
};

// Our hero
const Rabbit = creatureFactory("Rabbit", 10, 2, 44, 4, {
    bombs: 3,

    boomerang(enemy) {
        this.fight(enemy, 13);
    },
    sword(enemy) {
        this.fight(enemy, rand(4 + Math.pow(enemy.life % 10, 2)));
    },
    lettuce(enemy) {
        const lettuce = rand(this.charisma);
        console.log(`[Healthy lettuce gives you ${lettuce} life points!!]`);
        this.life += lettuce;
        fight(enemy, 0);
    },
    bomb(enemy) {
        if (this.bombs == 0) {
            console.log("[UHN!! You're out of bombs!!]");
            return;
        }
        
        this.bombs -= 1;
        this.fight(enemy, 86);
    }
});

// Our enemies
const IndustrialMonkey = creatureFactory("IndustrialMonkey", 46, 35, 91, 2);
const DwarvenAngel = creatureFactory("DwarvenAngel", 540, 6, 144, 58);
const AssistantViceOmbudsman = creatureFactory("AssistantViceOmbudsman", 320, 6, 144, 50);
const TeethDeer = creatureFactory("TeethDeer", 655, 192, 19, 109);
const IntrepidCyclist = creatureFactory("IntrepidCyclist", 901, 560, 422, 105);
const Dragon = creatureFactory("Dragon", 1340, 451, 1020, 939);

const dwemthysArrayOf = (...creatures) => {
    return new Proxy(creatures, {
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
        new IndustrialMonkey(),
        new DwarvenAngel(),
        new AssistantViceOmbudsman(),
        new TeethDeer(),
        new IntrepidCyclist(),
        new Dragon());

const aliveRabbit = new Rabbit();
aliveRabbit.boomerang(dwarr);
aliveRabbit.boomerang(dwarr);
aliveRabbit.boomerang(dwarr);
aliveRabbit.boomerang(dwarr);
aliveRabbit.boomerang(dwarr);
