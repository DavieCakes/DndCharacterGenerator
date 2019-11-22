import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import action creators for reference in this component
import { actionCreators } from "../store/CharacterStore";

import { Button, Card, Icon } from "@blueprintjs/core";

class StoreTester extends Component {

	render() {
		return (
			<React.Fragment>
				<Button onClick={this.props.generate}>Generate</Button>
				<CharacterContainer
					abilities={this.props.characterData.abilities}
					proficiencyBonus={this.props.characterData.proficiencyBonus}
					skills={this.props.characterData.skills}
					saves={this.props.characterData.saves}
					updateSkill={this.props.updateSkill}
					updateSave={this.props.updateSave}
				/>
			</React.Fragment>
		);
	}
}

class CharacterContainer extends React.PureComponent {
	render() {
		return (
			<React.Fragment>
				<ProficiencyBonusContainer proficiencyBonus={this.props.proficiencyBonus}/>
				<AbilitiesContainer abilities={this.props.abilities} />
				<SkillsContainer skills={this.props.skills} updateSkill={this.props.updateSkill}/>
				<SavesContainer saves={this.props.saves} updateSave={this.props.updateSave}/>
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
						className='attributeTitle'
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
						console.log(skill.modifier)
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
				</div>
			</Card>
		);
	}
}

class Skill extends React.PureComponent {

	render() {
		return (
			<div onClick={() => {
				this.props.updateSkill({name: this.props.name, isProficient:!this.props.isProficient})
			}}>
				{this.props.name} | {this.props.modifier}{" "} | {(this.props.isProficient) ? <Icon icon='tick-circle' /> : <Icon icon='circle' />}
			</div >
		);
	}
}

class AttributeContainer extends React.PureComponent {
	render() {
		return (
			<Card className='attribute-container'>
				<h3 className='attribute-header'>{this.props.attributeTitle}</h3>
				<div className='attribute-list'>
					{this.props.attributeCollection}
				</div>
			</Card>
		);
	}
}

class AbilitiesContainer extends React.PureComponent {
	render() {
		return (
			<AttributeContainer attributeTitle='Abilities' attributeCollection=
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
			/>
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
		return (
			<Card>
				<h3 className='section-header' style={{ background: 'black', color: 'white' }}>Saves</h3>

				<div>
					{
						Object.keys(this.props.saves).map(e => {
							const save = this.props.saves[e]
							return (
								<Save
									key={e}
									name={e}
									finalValue={save.finalValue}
									modifier={save.modifier}
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
		this.props.updateSave({ name: this.props.name, isProficient: !this.props.isProficient })
	}
	render() {
		return (
			<div onClick={() => this.props.updateSave({ name: this.props.name, isProficient: !this.props.isProficient })}>
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
