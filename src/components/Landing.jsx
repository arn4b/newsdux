import React from 'react'

import { Box, Grid, Button } from '@material-ui/core';

export default function Landing() {
    return (
        <div style={{ 'height': '90vh' }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container>
                    <Grid item xs={12} md={6} style={{ 'display': 'flex', 'flexDirection': 'column', 'height': '90vh', 'align-items': 'center', 'justify-content': 'center' }}>
                        <h1 style={{ 'fontSize': '4rem' }}>Welcome to NewsDux</h1>
                        <h1>News by GNews API</h1>
                        <h1>Login to get Started</h1>
                        <Button variant="contained" href="/login">Login</Button>

                    </Grid>
                    <Grid item xs={12} md={6} style={{ 'display': 'flex', 'height': '90vh', 'align-items': 'center', 'justify-content': 'center' }}>
                        <img src="https://img.freepik.com/free-vector/news-concept-landing-page_52683-20522.jpg?size=626&ext=jpg" />
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}
