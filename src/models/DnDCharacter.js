const makeObserver = () => {
    return {
        notify: () => {
            console.log('implement this')
        }
    }
}

const makeObservable = () => {
    const observers = []
    return {
        notifyObservers: () => {
            observers.forEach(element => {
                element.notify()
            });        
        }
    }
}

function makeAbility(name, baseValue) {

    baseValue = baseValue || 10
    const bonuses = []

    const observable = makeObservable()

    return {
        name: name,
        get Value() {
            return baseValue + bonuses.reduce( (sum, current) => sum + current.value, 0 )
        },
        get Modifier() {
            return Math.floor(this.Value/2) - 5
        },
        set BaseValue(value){
            baseValue = value
            observable.notifyObservers()
        },
        addBonus: (bonus) => {
            bonuses.push(bonus)
            observable.notifyObservers()
        },
        addObserver: (skill) => {
            observable.observers.push(skill)
        }
    }
}

function makeSkill (params){ 
    // name, isProficient, derivedAbility, derivedProficiency
    // const name = params.name
    const derivedAbility = params.derivedAbility
    // const isProficient = params.isProficient
    const derivedProficiency = params.derivedProficiency
     
    const abilityObserver = makeObserver()

    function abilityChanged() {}
    function proficiencyChanged() {}

    return {
        get Value() {
            let val = (this.isProficient)?derivedProficiency.Value:0
            return derivedAbility.Modifier + val
        },
        name : params.name,
        isProficient: params.isProficient
    }
}

export function makeCharacter() {

    let proficiency = {
        Value: 0
    }

    const abilities = {
            strength: makeAbility('strength'),
            dexterity: makeAbility('dexterity'),
            intelligence: makeAbility('intelligence'),
            constitution: makeAbility('constitution'),
            charisma: makeAbility('charisma'),
            wisdom: makeAbility('wisdom'),
    }

    const skills = {
            athletics: makeSkill({derivedProficiency: proficiency, derivedAbility: abilities.strength, name: 'athletics', isProficient: false}),
            acrobatics: makeSkill({derivedProficiency: proficiency, derivedAbility: abilities.dexterity, name: 'acrobatics', isProficient: false}),
            sleight_of_hand: makeSkill({derivedProficiency: proficiency, derivedAbility: abilities.dexterity, name: 'sleight_of_hand', isProficient: false}),
            stealth: makeSkill({derivedProficiency: proficiency, derivedAbility: abilities.dexterity, name: 'stealth', isProficient: false}),
            arcana: makeSkill({derivedProficiency: proficiency, derivedAbility: abilities.intelligence, name: 'arcana', isProficient: false}),
            history: makeSkill({derivedProficiency: proficiency, derivedAbility: abilities.intelligence, name: 'history', isProficient: false}),
            investigation: makeSkill({derivedProficiency: proficiency, derivedAbility: abilities.intelligence, name: 'investigation', isProficient: false}),
            nature: makeSkill({derivedProficiency: proficiency, derivedAbility: abilities.intelligence, name: 'nature', isProficient: false}),
            religion: makeSkill({derivedProficiency: proficiency, derivedAbility: abilities.intelligence, name: 'religion', isProficient: false}),
            animal_handling: makeSkill({derivedProficiency: proficiency, derivedAbility: abilities.wisdom, name: 'animal_handling', isProficient: false}),
            insight: makeSkill({derivedProficiency: proficiency, derivedAbility: abilities.wisdom, name: 'insight', isProficient: false}),
            medicine: makeSkill({derivedProficiency: proficiency, derivedAbility: abilities.wisdom, name: 'medicine', isProficient: false}),
            perception: makeSkill({derivedProficiency: proficiency, derivedAbility: abilities.wisdom, name: 'perception', isProficient: false}),
            survival: makeSkill({derivedProficiency: proficiency, derivedAbility: abilities.wisdom, name: 'survival', isProficient: false}),
            deception: makeSkill({derivedProficiency: proficiency, derivedAbility: abilities.charisma, name: 'deception', isProficient: false}),
            intimidation: makeSkill({derivedProficiency: proficiency, derivedAbility: abilities.charisma, name: 'intimidation', isProficient: false}),
            performance: makeSkill({derivedProficiency: proficiency, derivedAbility: abilities.charisma, name: 'performance', isProficient: false}),
            persuasion: makeSkill({derivedProficiency: proficiency, derivedAbility: abilities.charisma, name: 'persuasion', isProficient: false})
    }
    
    const abilityGetters = {
        get strength() {
            let temp = abilities.strength
            
            return 
        }
    }

    return {
        // ability score access
        getAbility(name) {
            return abilities[name]
        },
        getAbilities() {
            const toReturn = []
            
            Object.keys(abilities).forEach(element => {
                toReturn.push(abilities[element])    
            });

            return toReturn
        },
        setAbilityBaseScore: (name, value) => {
            abilities[name].BaseValue = value
        },
        getSkill: (name) => {
            return skills[name]
        },
        getSkills: () => {
            const toReturn = []

            Object.keys(skills).forEach(element =>
                toReturn.push(skills[element]))

            return toReturn
        },
        setIsProficient: (type, name, isProficient) => {
            switch(type) {
                case 'skill':
                    skills[name].isProficient = isProficient
                    break
                case 'ability':
                    abilities[name].isProficient = isProficient
                    break
                default:
                    console.log('No such trait type: ' + type)
            }
        },
        setProficiency: (value) => { proficiency.Value = value },
        get ProficiencyBonus () {
            return proficiency.Value
        }
    }
}

if (typeof require !== 'undefined' && require.main === module) {
    const character = makeCharacter()

    character.setProficiency(4)
    character.setIsProficient('skill', 'athletics', true)
    character.getAbility('strength').BaseValue = 16
    character.getAbility('strength').addBonus({value: 4})
    console.log(character.getAbility('strength').Modifier)
    console.log(character.getSkill('athletics').Value)
}