import * as React from "react";
import {AuthContext} from "../AuthProvider";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import {RestRequest} from "../../services/requestServices";
import {endpoints} from "../../constants/endpoints";
import Typography from "@material-ui/core/Typography";
import './style/sensors.scss'
import Grid from "@material-ui/core/Grid";
import {isAdmin} from "../../constants/roles";
import Button from "@material-ui/core/Button";
import Pagination from '@material-ui/lab/Pagination';
import TextSearch from "../search/TextSearch";
import {Sensor} from "./Sensor";
import {getRouteForCreate, getRouteForUpdate} from "../../helper/routersHelper";
import {Routes} from "../../constants/routes";

class Sensors extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            pageSize: 4,
            totalPages: 0,
            totalElements: 0,
            text: '',
            sensors: []
        }
    }

    componentDidMount() {
        this._isMounted = true;
        const {page, pageSize} = this.state;
        this.loadData(page, pageSize);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    loadData = (page, pageSize, text = '') => {
        RestRequest.get(endpoints.getSensors, {page, pageSize, text}, {}).then((response) => {
            const {content, totalElements, totalPages} = response.data;
            if (this._isMounted) {
                this.setState({sensors: content, totalElements, totalPages})
            }
        })
    }

    setPageSensors = (event, page) => {
        const {text, pageSize} = this.state;
        let newPage = page - 1;
        this.setState({page: newPage})
        this.loadData(newPage, pageSize, text);
    };

    handleCreateSensor = () => {
        this.props.history.push(getRouteForCreate(Routes.sensorEditor));
    };

    handleUpdate = (id) => {
        this.props.history.push(getRouteForUpdate(Routes.sensorEditor, id));
    }

    onSearch = () => {
        const {text, pageSize} = this.state;
        this.setState({page: 0})
        this.loadData(0, pageSize, text);
    }

    onChangeText = (text) => {
        this.setState({text});
    }

    handleDeleteSensor = (id) => {
        const {text, pageSize, page, totalElements} = this.state;
        RestRequest.delete(endpoints.deleteSensor(id), {}, {}).then((response) => {
            let pageValue = page;
            if ((page * pageSize) === (totalElements - 1) && ((page - 1) > -1)) {
                pageValue = pageValue - 1;

                this.setState({page: pageValue})

            }
            this.loadData(pageValue, pageSize, text);
        })
    }

    render() {
        let sensors = this.state.sensors.map((sensor) => {
            return <Sensor onUpdate={this.handleUpdate} onDelete={this.handleDeleteSensor} key={sensor.id}
                           sensor={sensor}/>
        })
        return (
            <div className='table'>
                <TextSearch value={this.state.text} onChange={this.onChangeText} onSearch={this.onSearch}/>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"/>
                                <TableCell align="center"><Typography variant='h5'>Name</Typography></TableCell>
                                <TableCell align="center"><Typography variant='h5'>Mode</Typography></TableCell>
                                <TableCell align="center"><Typography variant='h5'>Type</Typography></TableCell>
                                <TableCell align="center"><Typography variant='h5'>Range</Typography></TableCell>
                                <TableCell align="center"><Typography variant='h5'>Unit</Typography></TableCell>
                                <TableCell align="center"><Typography variant='h5'>Location</Typography></TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sensors}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid className='information'
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center">
                    <Grid item>
                        {
                            isAdmin(this.context.currentUser) ?
                                <Button variant="contained" color="primary" onClick={this.handleCreateSensor}>
                                    Create sensor
                                </Button> : <></>
                        }
                    </Grid>
                    <Grid item>
                        <Pagination
                            count={this.state.totalPages}
                            onChange={this.setPageSensors}
                            page={this.state.page + 1}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant='h4'>Total:{this.state.totalElements}</Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Sensors.contextType = AuthContext;
export default Sensors;
