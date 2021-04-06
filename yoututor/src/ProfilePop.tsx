
import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import { TransitionProps } from '@material-ui/core/transitions';
import Slide from '@material-ui/core/Slide';
import ProfileConent from './ProfileContent'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogCustomizedWidth: {
            'max-width': '100%',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            }
    }))
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
return <Slide direction="left" ref={ref} {...props} />;
});

export default function ProfilePop(props) {

    const classes = useStyles()
    return (
        <Dialog
        fullWidth
        classes={{ paperFullWidth: classes.dialogCustomizedWidth }}
        open={props.openStatus}
        onClose={props.closeFunction}
        TransitionComponent={Transition}
        >
        <ProfileConent isDark={props.isDark} 
                        email={props.user_id}
                        editable={props.editable}
                        />
        </Dialog>
    )
    
}