import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import action creators for reference in this component
import { actionCreators } from "../store/CharacterStore";

import { Card, Icon } from "@blueprintjs/core";

class StoreTester extends Component {
  render() {
    return (
      <React.Fragment>
        <button onClick={this.props.generate}>Generate</button>
        <CharacterContainer
          abilities={this.props.characterData.abilities}
          proficiencyBonus={this.props.characterData.proficiencyBonus}
          skills={this.props.characterData.skills}
          saves={this.props.characterData.saves}
          updateSkill={this.props.updateSkill}
          updateSave={this.props.updateSave}
          updateAbility={this.props.updateAbility}
        />
      </React.Fragment>
    );
  }
}

class CharacterContainer extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <ProficiencyBonusContainer
          proficiencyBonus={this.props.proficiencyBonus}
        />
        <AbilitiesContainer
          abilities={this.props.abilities}
          updateAbility={this.props.updateAbility}
        />
        <SkillsContainer
          skills={this.props.skills}
          updateSkill={this.props.updateSkill}
        />
        <SavesContainer
          saves={this.props.saves}
          updateSave={this.props.updateSave}
        />
      </React.Fragment>
    );
  }
}

class ProficiencyBonusContainer extends React.PureComponent {
  render() {
    return (
      <AttributeContainer
        attributeTitle="Proficiency Bonus"
        attributeCollection={this.props.proficiencyBonus}
      />
    );
  }
}

class SkillsContainer extends React.PureComponent {
  render() {
    return (
      <AttributeContainer
        attributeTitle="Skills"
        attributeCollection={Object.keys(this.props.skills).map(e => {
          const skill = this.props.skills[e];
          return (
            <Skill
              key={e}
              name={e}
              modifier={skill.modifier}
              isProficient={skill.isProficient}
              updateSkill={this.props.updateSkill}
            />
          );
        })}
      />
    );
  }
}

class Skill extends React.PureComponent {
  render() {
    return (
      <div
        onClick={() => {
          this.props.updateSkill({
            name: this.props.name,
            isProficient: !this.props.isProficient
          });
        }}
      >
        {this.props.isProficient ? (
          <Icon icon="tick-circle" />
        ) : (
          <Icon icon="circle" />
        )}{" "}
        {this.props.name} {(this.props.modifier>=0)?`+${this.props.modifier}`:`${this.props.modifier}`}
      </div>
    );
  }
}

class AttributeContainer extends React.PureComponent {
  render() {
    return (
      <Card className="attribute-container">
        <h3 className="attribute-header">{this.props.attributeTitle}</h3>
        <div className="attribute-list">{this.props.attributeCollection}</div>
      </Card>
    );
  }
}

class AbilitiesContainer extends React.PureComponent {
  render() {
    return (
      <AttributeContainer
        attributeTitle="Abilities"
        attributeCollection={Object.keys(this.props.abilities).map(e => {
          const ability = this.props.abilities[e];
          return (
            <Ability
              key={e}
              name={e}
              finalValue={ability.finalValue}
              modifier={ability.modifier}
              updateAbility={this.props.updateAbility}
            />
          );
        })}
      />
    );
  }
}

class Ability extends React.PureComponent {
  onValueChange = event => {
    event.preventDefault();
    this.props.updateAbility({
      name: this.props.name,
      baseValue: parseInt(event.target.value)
    });
  };
  render() {
    return (
      <div>
        {this.props.name} {" "}
        <input
          className="ability-base-value-input"
          type="number"
          value={this.props.finalValue}
          onChange={this.onValueChange}
          max="20"
          min="0"
        />{" "}
         { (this.props.modifier>=0)?`+${this.props.modifier}`:`${this.props.modifier}` }
      </div>
    );
  }
}

class SavesContainer extends React.PureComponent {
  render() {
    return (
      <AttributeContainer
        attributeTitle="Saves"
        attributeCollection={Object.keys(this.props.saves).map(e => {
          const save = this.props.saves[e];
          return (
            <Save
              key={e}
              name={e}
              finalValue={save.finalValue}
              modifier={save.modifier}
              isProficient={save.isProficient}
              updateSave={this.props.updateSave}
            />
          );
        })}
      />
    );
  }
}

class Save extends React.PureComponent {
  flipProficiency(event) {
    event.preventDefault();
    this.props.updateSave({
      name: this.props.name,
      isProficient: !this.props.isProficient
    });
  }
  render() {
    return (
      <div
        onClick={() =>
          this.props.updateSave({
            name: this.props.name,
            isProficient: !this.props.isProficient
          })
        }
      >
        {this.props.isProficient ? (
          <Icon icon="tick-circle" />
        ) : (
          <Icon icon="circle" />
        )}{" "}
        {this.props.name} {(this.props.modifier>=0)?`+${this.props.modifier}`:this.props.modifier}
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
