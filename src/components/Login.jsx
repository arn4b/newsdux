import React from 'react'
import { SignInAndUp } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import Grid from '@material-ui/core/Grid';

export default function Login() {
    return (
        <div>
            <Grid container>
                <Grid item xs={12} sm={4}>
                    <SignInAndUp />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <img src="https://www.dailydot.com/wp-content/uploads/2018/10/olli-the-polite-cat.jpg" height="100%" width="100%" />
                </Grid>
            </Grid>
        </div>
    )
}
