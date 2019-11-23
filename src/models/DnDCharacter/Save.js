import Ability from "./Ability"
import ProficiencyBonus from "./ProficiencyBonus"

export default function Save ({
  name = '',
  bonuses = [],
  isProficient = false,
  derivedAbility = Ability(),
  derivedProficiency = ProficiencyBonus()
} = {}) {
  return {
    set Bonuses(value) {
      bonuses = value;
    },
    get Bonuses() {
      return bonuses;
    },
    set IsProficient(value) {
      isProficient = value;
    },
    get IsProficient() {
      return isProficient;
    },

    // immutable
    get Name() {
      return name;
    },

    // derived data
    get FinalValue() {
      const profBonus = (this.IsProficient)? derivedProficiency.FinalValue : 0
      return derivedAbility.FinalValue +
        this.Bonuses.reduce((sum, e) => e + sum, 0) + profBonus
    },
    get Modifer() {
      return Math.floor(this.FinalValue / 2) - 5;
    },
    serialize() {
      return {
        bonuses: this.Bonuses,
        isProficient: this.IsProficient,
        finalValue: this.FinalValue,
        modifier: this.Modifer,
        name: this.Name,
        derivedAbility: derivedAbility.Name
      };
    }
  };
}