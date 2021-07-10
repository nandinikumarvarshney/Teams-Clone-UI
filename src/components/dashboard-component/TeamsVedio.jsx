import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import VideoPlayer from '../vedioCall/components/VideoPlayer';
import Sidebar from '../vedioCall/components/Sidebar';
import Notifications from '../vedioCall/components/Notifications';

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '600px',
        border: '2px solid black',

        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
    },
    image: {
        marginLeft: '15px',
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
}));

const TeamsVedio = () => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <VideoPlayer />
            <Sidebar>
                <Notifications />
            </Sidebar>
        </div>
    );
};

export default TeamsVedio;
