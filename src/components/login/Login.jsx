import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom';
import {AuthContext} from "../AuthProvider";
import {Routes} from "../../constants/routes";
import Alert from "../alert/Alert";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error: ''}
    }

    login = (event) => {
        event.preventDefault();
        const email = event.target.elements[0].value;
        const password = event.target.elements[2].value;
        let resultPromise = this.context.login(email, password);
        resultPromise.then(() => {
            this.props.history.push(Routes.sensors);
        }).catch(reason => {
            this.setState({error: reason.response.data.errors.reduce((acc, current) => acc + current, '')})
            setTimeout(() => {
                this.setState({error: ''})
            }, 2000);
        });
    };

    render() {
        return (
            <Container component='main' maxWidth='xs'>
                <CssBaseline/>
                {this.state.error ? <Alert severity="error">{this.state.error}</Alert> : <></>}
                <div>
                    <Typography component='h1' variant='h5'>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.login}>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            autoFocus
                        />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                        >
                            Login
                        </Button>
                    </form>
                </div>
            </Container>
        )
    }
}

Login.contextType = AuthContext;
export default withRouter(Login)
