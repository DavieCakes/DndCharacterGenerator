import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import action creators for reference in this component
import { actionCreators } from "../store/CharacterGenerator";
import * as DnDCharacter from "../models/DnDCharacter";

import { Button, Card, Icon } from "@blueprintjs/core";

import Generators from "../utils/Generators";

class StoreTester extends Component {
  constructor(props) {
    super(props);
    this.character = DnDCharacter.makeCharacter();
  }

  componentDidMount() {
    Generators.generateDnDCharacter();
  }

  render() {
    return (
      <React.Fragment>
        <Button onClick={Generators.generateDnDCharacter}>Generate</Button>
        <CharacterContainer
          abilities={this.props.abilities}
          skills={this.props.skills}
          saves={this.props.saves}
          proficiencyBonus={this.props.proficiencyBonus}
          updateSkill={this.props.updateSkill}
        />
      </React.Fragment>
    );
  }
}

class CharacterContainer extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <AbilitiesContainer abilities={this.props.abilities} />
        <SavesContainer saves={this.props.saves} updateSave={this.props.updateSave}/>
        <SkillsContainer skills={this.props.skills} updateSkill={this.props.updateSkill} />
        <ProficiencyBonusContainer
          proficiencyBonus={this.props.proficiencyBonus}
        />
      </React.Fragment>
    );
  }
}

class ProficiencyBonusContainer extends React.PureComponent {
  render() {
    return (
      <div>
        <Card>
          <h3
            style={{
              background: "black",
              color: "white"
            }}
          >
            Proficiency Bonus
          </h3>
          <p>{this.props.proficiencyBonus}</p>
        </Card>
      </div>
    );
  }
}

class SkillsContainer extends React.PureComponent {
  render() {
    return (
      <Card>
        <h3
          style={{
            background: "black",
            color: "white"
          }}
        >
          Skills
        </h3>
        <div>
          {Object.keys(this.props.skills).map(e => {
            const skill = this.props.skills[e];
            return (
              <Skill
                key={e}
                name={e}
                modifer={skill.modifier}
                isProficient={skill.isProficient}
                updateSkill={this.props.updateSkill}
              />
            );
          })}
        </div>
      </Card>
    );
  }
}

class Skill extends React.PureComponent {

  flipProficiency(event) {

    event.preventDefault()
    this.props.updateSkill({ name: this.props.name, isProficient: !this.props.isProficient })
  }

  render() {
    return (
      <div onClick={() => this.props.updateSkill({ name: this.props.name, isProficient: !this.props.isProficient })}>
        {this.props.name} | {this.props.modifer}{" "} | {(this.props.isProficient) ? <Icon icon='tick-circle' /> : <Icon icon='circle' />}
      </div >
    );
  }
}

class AbilitiesContainer extends React.PureComponent {
  render() {
    return (
      <Card>
        <h3
          className='section-header'
          style={{
            background: "black",
            color: "white"
          }}
        >
          Abilities:
        </h3>
        <div>
          {Object.keys(this.props.abilities).map(e => {
            const ability = this.props.abilities[e];
            return (
              <Ability
                key={e}
                name={e}
                finalValue={ability.finalValue}
                modifier={ability.modifier}
              />
            );
          })}
        </div>
      </Card>
    );
  }
}

class Ability extends React.PureComponent {
  render() {
    return (
      <div>
        {this.props.name} | {this.props.finalValue} | {this.props.modifier}
      </div>
    );
  }
}

class SavesContainer extends React.PureComponent {
  render() {
    console.log(this.props.saves)
    return (
      <Card>
      <h3 className='section-header' style={{background: 'black', color: 'white'}}>Saves</h3>

      <div>
        {
          Object.keys(this.props.saves).map(e => {

            const save = this.props.saves[e]
            console.log(save)
            return (
              <Save
                key={e}
                name={e}
                finalValue={save.finalValue}
                modifer={save.modifer}
                isProficient={save.isProficient}
                updateSave={this.props.updateSave}
              />
            )
          })

        }
      </div>
      </Card>
    );
  }
}

class Save extends React.PureComponent {
  flipProficiency(event) {
    event.preventDefault()
    this.props.updateSave({name: this.props.name, isProficient: !this.props.isProficient})
  }
  render() {
    return (
      <div onClick={() => this.props.updateSave({name: this.props.name, isProficient: !this.props.isProficient})}>
        {this.props.name} | {this.props.finalValue} | {this.props.modifier} | {(this.props.isProficient) ? <Icon icon='tick-circle' /> : <Icon icon='circle' />}
      </div>
    );
  }
}

export default connect(
  // which part of global state does
  // component recieve as props?
  state => state.characterGenerator,

  // which action creators does
  // component receive as props?
  dispatch => bindActionCreators(actionCreators, dispatch)
)(StoreTester);