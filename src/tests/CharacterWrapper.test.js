import Character from '../models/DNDCharacter'
import {skill, ability, proficiency} from '../models/CharacterWrapper'



describe('skill wrapper function', () => {
    /**
     * args = {abilityName: '', baseValue}
     * dispatch({ type: 'updateCharacter', id: args.id, newState: CharacterWrapper(oldState, {args} )})
     */
    test('wrapper functions work with no input by setting default values', () => {
      const _character = Character()
      const _skill = skill()
      const _ability = ability()
      const _proficiency = proficiency()
    })

})