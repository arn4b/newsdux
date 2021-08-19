import React from 'react'
import {SignInAndUp} from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import Grid from '@material-ui/core/Grid';

export default function Login() {
    return (
        <div>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <img src="https://www.fansarmy.in/uploads/fans-army/products/untitled-design---2020-12-03t001755499-946370_l.jpg" width="100%"/>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <SignInAndUp/>
                </Grid>            
            </Grid>
        </div>
    )
}
