# dwemthy-es6

## Motivation
First of all, this is a challenge I always wanted to tackle: first in Rust (didn't work well but I will try again) and after, in JavaScript.

There is [another implementation](https://sea-region.github.com/bpo/dwemthyjs) in JS but I wanted to do it using ES6 features (like string interpolation, Proxies and of course, classes).

## What now?
I don't think this implementation is perfect. There are lots of ways to improve it.

~~In fact I don't want to use classes at all: maybe creatures resulting of a function call would be better:~~ **(DONE)**

```js
const creatureFactory = (name, traits) => {
  const creature = { name };
  
  Object.entries(traits).forEach(trait => {
    const key = "_" + trait;
    
    Object.defineProperties(this, {
      [key]: {
        enumerable: false,
        writable: true
      },
      [trait]: {
        set(val) {
          this[key] = val;
        },
        get() {
          return this[key];
        },
      }
    });
    
  });
  
  return creature;
};

const dwarvenAngel = creatureFactory("DwarvenAngel", {
  life: 540,
  strength: 6,
  charisma: 144,
  weapon: 58
});
```

~~Maybe there is no need for backing properties on the creatures and this is enough:~~**(DONE)**

```js
Object.entries(traits).forEach(trait => {
  Object.defineProperties(this, {
    [trait]: {
      writable: true
    },
  });
});
```

Maybe there is a way to implement a generic builder (with proxies) able to make this work:

```js
const creature = (name) => {
  const obj = { name };
  return new Proxy({ name }, {
    get: (target, prop) => {
      const key = "_" + prop;
      if (!target[prop]) Object.defineProperties(target, {
        [key]: {
          writable: true
        },
        // I know setting both value and (get or set) is invalid syntax. This is here just for explaining purposes
        [prop]: {
          value: (val) => target[key] = val;
          get() { returh target[key] },
          set(val) { target[key] = val }
        }
      });
    }
  });
}
const rabbit = creature("Rabbit").life(10).strength(2).charisma(44).weapon(3).bombs(3)
```

Nonetheless, I'm happy with my results.
