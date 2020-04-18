import * as React from "react";
import {useContext} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {Delete, Edit} from "@material-ui/icons";
import {AuthContext} from "../AuthProvider";
import {isAdmin} from "../../constants/roles";

export const Sensor = ({sensor, onDelete}) => {
    const authContext = useContext(AuthContext);
    return (
        <>
            <TableRow key={sensor.name}>
                <TableCell>
                    <IconButton>
                        <Edit/>
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    <Tooltip title={sensor.description}>
                        <Typography>
                            {sensor.name}
                        </Typography>
                    </Tooltip>
                </TableCell>
                <TableCell align="right">{sensor.model}</TableCell>
                <TableCell align="right">{sensor.type.name}</TableCell>
                <TableCell align="right">{`${sensor.rangeFrom} - ${sensor.rangeTo} `}</TableCell>
                <TableCell align="right">{sensor.unit.name}</TableCell>
                <TableCell align="right">{sensor.location}</TableCell>
                <TableCell>
                    {
                        isAdmin(authContext.currentUser) ?
                            <IconButton onClick={() => onDelete(sensor.id)} color='secondary'>
                                <Delete/>
                            </IconButton> : <React.Fragment/>
                    }
                </TableCell>
            </TableRow>
        </>
    )
}

