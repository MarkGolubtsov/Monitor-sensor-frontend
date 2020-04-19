import React from "react";
import {RestRequest} from "../../services/requestServices";
import {endpoints} from "../../constants/endpoints";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import './Editor.scss'
import {withRouter} from "react-router";
import {Routes} from "../../constants/routes";

class Editor extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            sensor: {
                id:-1,
                name: '',
                model: '',
                rangeTo: 1,
                rangeFrom: 0,
                unit: {
                    id: -1,
                    name: 'None'
                },
                type: {
                    id: -1,
                    name: 'None'
                },
                location: '',
                description: ''
            },
            isValid: this.getDefaultAll(),
            availableTypes: [],
            availableUnits: []
        }
    }

    getDefaultAll = () => {
        return {
            name: false,
            model: false,
            rangeTo: true,
            rangeFrom: true,
            unit: false,
            type: false,
            location: true,
            description: true,
        }
    }

    getAllValid = (valid,) => {
        return {
            name: valid,
            model: valid,
            rangeTo: valid,
            rangeFrom: valid,
            unit: valid,
            type: valid,
            location: valid,
            description: valid,
        }
    }


    componentDidMount() {
        this._isMounted = true;
        const id = this.props.match.params.id;
        if (id) {
            this.getSensor(id);
        }
        this.getAvailableTypes()
        this.getAvailableUnits()
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    getSensor = (id) => {
        RestRequest.get(endpoints.getSensor(id), {}, {}).then((response) => {
            if (this._isMounted) {
                this.setState({sensor: response.data, isValid: this.getAllValid(true)})
            }
        });
    }
    getAvailableTypes = () => {
        RestRequest.get(endpoints.getTypes, {}, {}).then(response => {
            if (this._isMounted) {
                this.setState({availableTypes: response.data.concat({id: -1, name: 'None'})})
            }
        })
    }
    getAvailableUnits = () => {
        RestRequest.get(endpoints.getUnits, {}, {}).then(response => {
            if (this._isMounted) {
                this.setState({availableUnits: response.data.concat({id: -1, name: 'None'})})
            }
        })
    }

    onChange = (value, checkValidFunc, nameField) => {
        let isValid = checkValidFunc(value);
        this.setState({
            sensor: {
                ...this.state.sensor,
                [nameField]: value
            },
            isValid: {
                ...this.state.isValid,
                [nameField]: isValid
            }
        })
    }
    checkValidName = (value) => {
        return value.length > 0 && value.length < 30
    }

    checkValidModel = (value) => {
        return value.length > 0 && value.length < 16
    }

    checkValidRangeFrom = (value) => {
        return !Number.isNaN(value)
    }
    checkValidRangeTo = (value) => {
        let rangeFrom = this.state.sensor.rangeFrom;
        return !Number.isNaN(value) && Number(rangeFrom) < Number(value)
    }
    checkValidLocation = (value) => {
        return value.length < 41;
    }
    checkValidDescription = (value) => {
        return value.length < 201
    }
    checkValidTypeAndUnit = (value) => {
        return value !== 'None';
    }

    onUpdateUnit = (event) => {
        let value = event.target.value;
        let isValid = this.checkValidTypeAndUnit(value);
        this.setState({
            sensor: {
                ...this.state.sensor,
                'unit': {...this.state.availableUnits.find((element) => element.name === value)}
            },
            isValid: {
                ...this.state.isValid,
                'unit': isValid
            }
        })
    }

    onUpdateType = (event) => {
        let value = event.target.value;
        let isValid = this.checkValidTypeAndUnit(value);
        this.setState({
            sensor: {
                ...this.state.sensor,
                'type': {...this.state.availableTypes.find((element) => element.name === value)}
            },
            isValid: {
                ...this.state.isValid,
                'type': isValid
            }
        })
    }

    isAllFieldsValid = () => {
        return Object.values(this.state.isValid).reduce((acc, current) => acc && current, true)
    }
    onSave = () =>{
        const {sensor} = this.state;
        console.log(sensor)
        if (sensor.id>0) {
            RestRequest.put(endpoints.putSensor(sensor.id),{},sensor).then(response=>{
                this.props.history.push(Routes.sensors);
            }).catch((reason => {
                console.log(reason)
            }));
        } else {
            RestRequest.post(endpoints.createSensor,{},sensor).then(response=>{
                this.props.history.push(Routes.sensors);
            }).catch(reason => {
                console.log(reason)
            })
        }
    }

    render() {
        console.log(this.isAllFieldsValid());
        return (
            <div className='editor-container'>
                <div className='element'>
                    <h2>{this.state.sensor.id>0 ? 'Edit' : 'Add'}</h2>
                </div>
                <div className='container'>
                    <div className='field-name'>
                        Name*
                    </div>

                    <div className='input'>
                        <TextField
                            onChange={(event => this.onChange(event.target.value, this.checkValidName, 'name'))}
                            error={!this.state.isValid.name}
                            fullWidth
                            variant='outlined'
                            name='Name'
                            value={this.state.sensor.name}
                            placeholder='Name'
                            type='text'
                            id='name'
                        />
                    </div>
                </div>

                <div className='container'>
                    <div className='field-name'>
                        Model*
                    </div>
                    <div className='input'>
                        <TextField
                            onChange={(event => this.onChange(event.target.value, this.checkValidModel, 'model'))}
                            fullWidth
                            error={!this.state.isValid.model}
                            variant='outlined'
                            required
                            name='Model'
                            value={this.state.sensor.model}
                            placeholder='Model'
                            type='text'
                            id='model'/>
                    </div>
                </div>

                <div className='container'>
                    <div className='field-name'>
                        Range
                    </div>
                    <div className='range'>
                        <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event => this.onChange(event.target.value, this.checkValidRangeFrom, 'rangeFrom'))}
                            label={'from'}
                            fullWidth
                            size='small'
                            variant='outlined'
                            name='from'
                            value={this.state.sensor.rangeFrom}
                            error={!this.state.isValid.rangeFrom}
                            placeholder=''
                            type='number'
                            id='rangeFrom'
                        />

                        <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label='to'
                            size='small'
                            variant='outlined'
                            onChange={(event => this.onChange(event.target.value, this.checkValidRangeTo, 'rangeTo'))}
                            fullWidth
                            name='to'
                            value={this.state.sensor.rangeTo}
                            error={!this.state.isValid.rangeTo}
                            placeholder='to'
                            type='number'
                            id='to'/>

                    </div>
                </div>

                <div className='container'>
                    <div className='field-name'>
                        Unit*
                    </div>
                    <div className='input'>
                        <TextField
                            fullWidth
                            variant='outlined'
                            required
                            name='Unit'
                            SelectProps={{
                                native: true,
                            }}
                            onChange={this.onUpdateUnit}
                            value={this.state.sensor.unit.name}
                            error={!this.state.isValid.unit}
                            select
                            id='Unit'
                        >
                            {this.state.availableUnits.map(unit => {
                                return <option key={unit.id} value={unit.name}>
                                    {unit.name}
                                </option>
                            })}
                        </TextField>
                    </div>
                </div>

                <div className='container'>
                    <div className='field-name'>
                        Type*
                    </div>
                    <div className='input'>
                        <TextField
                            fullWidth
                            variant='outlined'
                            required
                            name='Type'
                            SelectProps={{
                                native: true,
                            }}
                            onChange={this.onUpdateType}
                            value={this.state.sensor.type.name}
                            error={!this.state.isValid.type}
                            select
                            id='Type'
                        >
                            {this.state.availableTypes.map(type => {
                                return <option key={type.id} value={type.name}>
                                    {type.name}
                                </option>
                            })}
                        </TextField>
                    </div>
                </div>

                <div className='container'>
                    <div className='field-name'>
                        Location
                    </div>
                    <div className='input'>
                        <TextField
                            fullWidth
                            multiline
                            rows={1}
                            rowsMax={3}
                            variant='outlined'
                            name='Location'
                            value={this.state.sensor.location}
                            error={!this.state.isValid.location}
                            onChange={(event => this.onChange(event.target.value, this.checkValidLocation, 'location'))}
                            placeholder='Location'
                            type='text'
                            id='location'
                        />
                    </div>
                </div>

                <div className='description-container'>
                    <div className='field-name'>
                        Description
                    </div>
                    <div className='input'>
                        <TextField
                            fullWidth
                            variant='outlined'
                            name='Description'
                            multiline
                            rows={4}
                            rowsMax={9}
                            onChange={(event => this.onChange(event.target.value, this.checkValidDescription, 'description'))}
                            value={this.state.sensor.description}
                            error={!this.state.isValid.description}
                            placeholder='Description'
                            type='text'
                            id="outlined-multiline-static"
                        />
                    </div>
                </div>

                <div className='container'>
                    <div className='action-button-cancel'>
                        <Button
                            fullWidth
                            onClick={()=>this.props.history.goBack()}
                            variant='contained'
                            color='primary'>
                            Cancel
                        </Button>
                    </div>
                    <div className='action-button-save'>
                        <Button
                            onClick={()=>this.onSave()}
                            disabled={!this.isAllFieldsValid()}
                            fullWidth
                            variant='contained'
                            color='primary'
                        >
                            Save
                        </Button>
                    </div>

                </div>
            </div>


        );
    }
}

export default withRouter(Editor)

