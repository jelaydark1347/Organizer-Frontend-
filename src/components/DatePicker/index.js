import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import TypePicker from './components/TypePicker';
import {connect} from 'react-redux';
import { addEvent } from '../../actions/events';
import PropTypes from 'prop-types';
import moment from 'moment';
import AllEvents from './components/AllEvents';

import 'react-datepicker/dist/react-datepicker.css';

class DatePicker extends Component {

    constructor() {
        super();
        this.state = {
            show: 0,
            start: moment().format('YYYY/MM/DD'),
            end: moment().format('YYYY/MM/DD'),
            title: '',
            desc: ''
        }

        this.eventSubmit = this.eventSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.isValid = this.isValid.bind(this);

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    isValid() {
        const { title } = this.state;
        return title.length !== 0;
    }

    eventSubmit(e) {
        e.preventDefault();

        const input = document.querySelector('input[type="text"]');
        const textarea = document.querySelector('textarea');
        textarea.value = '';
        input.value='';

        if(this.isValid()) {
            let event = {
                title: this.state.title,
                start: this.state.start,
                end: this.state.end,
                desc: this.state.desc,
            }

            this.props.addEvent(event);
        } else {
            return (<h2>Укажите Название События</h2>);
        }

        this.setState({title: '', desc: ''});
    }

    updateDate(config) {
        this.setState(config);
    }

    setType() {
        if(this.state.show === 0) {
            this.setState({show: 1});
        } else {
            this.setState({show: 0});            
        }
    }

    render() {
        let { errors } = this.state;

      return (
            <Grid fluid>
                        <Row >
                            <Col xs={12}>
                                    <Row center="xs">
                                    <Col xs={10}>
                                        <div>
                                            <form onSubmit={this.eventSubmit}>
                                                {/*<p>
                                                    <label className="custom-radio">День<input type="radio" name="type_event" onClick={this.setType.bind(this, 0)} defaultChecked/><div></div></label>
                                                    <label className="custom-radio">Промежуток времени<input type="radio"  name="type_event" onClick={this.setType.bind(this, 1)}/><div></div></label>
                                                </p>*/}
                                                    <p>Event's type switcher:</p>
                                                <div className="onoffswitch">
                                                    <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch" onClick={this.setType.bind(this)}/>
                                                    <label className="onoffswitch-label" htmlFor="myonoffswitch">
                                                        <span className="onoffswitch-inner"></span>
                                                        <span className="onoffswitch-switch"></span>
                                                    </label>
                                                </div>
                                                <TypePicker type={this.state.show} update={this.updateDate.bind(this)}/>
                                                <div>
                                                    <label htmlFor="title" title="Название события/Reason">Event's title [?]:</label>
                                                    <input className="form-control" id="title" type="text" placeholder="Title" name="title" onChange={this.onChange}/>
                                                </div>
                                                <div>
                                                    <label htmlFor="desc" title="Описание события">Description [?]:</label>
                                                        <textarea id="desc" className="form-control" rows="10" cols="45" name="desc" onChange={this.onChange}></textarea>
                                                </div>
                                                <div><button className="btn btn-primary" type="submit">Добавить событие</button></div>
                                                <div className="errors">
                                                    {errors && <span>User already exists!</span>} 
                                                </div>
                                            </form>  
                                        </div>

                                        <div>
                                            <AllEvents />
                                        </div>
                                        </Col>

                                </Row>
                            </Col>
                        </Row>
                </Grid>

      );

    }
}

// AddUser.contextTypes = {
//   store: PropTypes.object.isRequired
// }

export default connect(
  state => ({
      events: state.eventsPanel.events,
  }),
  dispatch => ({
    addEvent: (event) => dispatch(addEvent(event))
})
)(DatePicker)