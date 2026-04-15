import { GameManager } from './game-manager';
import { Warrior, Mage, Archer, GuildStash } from './hero-types';
import { HeroRole, Weapon } from './models';
import { CriticalStrike } from './decorators';

async function main() {
    //Example 1: Heroes
    // const manager = new GameManager();
    // const warrior = new Warrior(1, "Arthur", 10, 50); // id, name, level, strength
    // const mage = new Mage(2, "Gandalf", 20, 100); // id, name, level, mana

    // console.log(manager.addHero(warrior));
    // console.log(manager.addHero(mage));


    //Example 2: Stash and Equipment
    // const manager = new GameManager();
    // const warrior = new Warrior(1, "Arthur", 10, 50); // id, name, level, strength
    // const mage = new Mage(2, "Gandalf", 20, 100); // id, name, level, mana

    // console.log(manager.addHero(warrior));
    // console.log(manager.addHero(mage));

    // const sword: Weapon = { id: 101, name: "Excalibur", damage: 120 };
    // const staff: Weapon = { id: 102, name: "Elder Staff", damage: 150 };

    // console.log(manager.addWeaponToStash(sword));
    // console.log(manager.addWeaponToStash(staff));

    // console.log(manager.equipWeapon(1, 101));
    // console.log(manager.equipWeapon(99, 102)); // Invalid hero
    // console.log(manager.equipWeapon(2, 999)); // Invalid weapon

    // manager.listAllHeroes().forEach(line => console.log(line));

    //Example 3: Decorator and Combat Test
    // const manager = new GameManager();
    // const warrior = new Warrior(3, "Conan", 15, 60); // Base attack = 60 * 2 = 120
    // const archer = new Archer(4, "Legolas", 15, 60); // Base attack = 60 * 2 = 120
    // const mage = new Mage(2, "Gandalf", 20, 100); // Base attack = 100 * 2 = 200


    // // Archer attack: 60 * 2 = 120 (No decorator)
    // console.log(`Archer Attack: ${archer.attack()}`);

    // // Mage attack: 60 * 2 = 120 (No decorator)
    // console.log(`Mage Attack: ${mage.attack()}`);

    // // Warrior attack: (60 * 2) * 1.5 = 180 (Decorator applied)
    // console.log(`Warrior Attack (Critical): ${warrior.attack()}`);

    //Example 4: Stamina Calculation 
    const manager = new GameManager();
    const warrior = new Warrior(3, "Conan", 15, 60); 
    const archer = new Archer(4, "Legolas", 15, 60); 
    const mage = new Mage(2, "Gandalf", 20, 100); 
    // Warrior stamina: (15 * 10) + (60 * 5) = 150 + 300 = 450
    console.log(`Warrior Stamina: ${warrior.calculateStamina()}`);

    // Archer stamina: (15 * 8) + (60 * 4) = 120 + 240 = 360
    console.log(`Archer Stamina: ${archer.calculateStamina()}`);

    // Mage stamina: (20 * 5) + (100 * 2) = 100 + 200 = 300
    console.log(`Mage Stamina: ${mage.calculateStamina()}`);
}

main();

export { 
    GameManager, 
    Warrior, 
    Mage, 
    Archer, 
    GuildStash, 
    HeroRole, 
    CriticalStrike
};