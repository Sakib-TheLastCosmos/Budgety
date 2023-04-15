import React from "react";
import { Component } from "react";

class AddItem extends Component {
    state = {
        description: '',
        value: 0,
        type: 'inc'
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.name != 'value' ? e.target.value : parseFloat(e.target.value)
        })
    }

    handleClearAll = e => {
        this.setState({
            description: '',
            value: 0,
            type: 'inc'
        })

        console.log('a')
    }

    handleSubmit = async e => {
        e.preventDefault()

        if (this.state.description != '' && this.value != 0) {
            await this.setState({
                id: Math.random()
            })

            this.props.addItem(this.state)
            
            this.setState({
                description: '',
                value: 0,
            })
    
        }
        
        this.descriptionInputRef.current.focus()
    }


    descriptionInputRef = React.createRef()
    render () {
        return (
            <form className="input-cont" onSubmit={this.handleSubmit}>
                <button type="button" className="clear-all" onClick={ this.handleClearAll }>
                    <svg className="svg-icon clear-all-btn-icon">
                        <use href="./icons.svg#icon__clear-all"></use>
                    </svg>
                </button>

                    
                <select name="type" className="type input" value={ this.state.type } onChange={ this.handleChange }>
                    <option value="inc">+</option>
                    <option value="exp">-</option>
                </select>
                

                <input name="description" type="text" className="desc input" placeholder="Add Description" value={ this.state.description } onChange={ this.handleChange } ref={ this.descriptionInputRef } />
                <input name="value" type="number" className="val input" placeholder="Value" value={ this.state.value }  onChange={ this.handleChange } />
                <button type="submit" className="add-btn no-border">
                    <svg className="svg-icon add-btn-icon">
                        <use href="./icons.svg#icon__add-btn"></use>
                    </svg>
                </button>
            </form>
        )
    }
}


export default AddItem;