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

export const Sensor = ({sensor, onDelete,onUpdate}) => {
    const authContext = useContext(AuthContext);
    return (
        <>
            <TableRow key={sensor.id}>
                <TableCell align="center">
                    {
                        isAdmin(authContext.currentUser) ?
                            <IconButton onClick={()=>onUpdate(sensor.id)}>
                                <Edit/>
                            </IconButton> : <React.Fragment/>
                    }
                </TableCell>
                <TableCell align="center"  >
                    <Tooltip title={sensor.description}>
                        <Typography>
                            {sensor.name}
                        </Typography>
                    </Tooltip>
                </TableCell>
                <TableCell align="center" >{sensor.model}</TableCell>
                <TableCell align="center" >{sensor.type.name}</TableCell>
                <TableCell align="center" >{`${sensor.rangeFrom} - ${sensor.rangeTo} `}</TableCell>
                <TableCell align="center" >{sensor.unit.name}</TableCell>
                <TableCell align="center" >{sensor.location}</TableCell>
                <TableCell align="center" >
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

