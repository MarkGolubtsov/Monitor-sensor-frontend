import * as React from "react";
import TextField from "@material-ui/core/TextField";
import './search.css';
import IconButton from "@material-ui/core/IconButton";
import {Search} from '@material-ui/icons';

export default class TextSearch extends React.Component {

    onChange = (e) => {
        this.props.onChange(e.target.value);
    }

    onSearch = () => {
        this.props.onSearch();
    }

    render() {
        return (
            <div className='search'>
                <TextField onChange={this.onChange} size='small' autoComplete='false' id="outlined-basic"
                           label="Enter text to search." value={this.props.value}
                           variant="outlined"/>
                <IconButton onClick={this.onSearch}>
                    <Search/>
                </IconButton>
            </div>
        );
    }
}

