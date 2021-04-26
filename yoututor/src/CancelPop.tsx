import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

var QUESTION = 'https://gr73qrcwnl.execute-api.us-east-1.amazonaws.com/v1/question/'

export default function cancelPop(props){

    function deleteQuestion(){
        var headers = {
            "Access-Control-Allow-Headers": "*",
            'token': props.token.id_token,
            "access_token": props.token.access_token,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            'Access-Control-Allow-Credentials' : 'true',
            "question_keys": props.question_keys
        }
        fetch(
            QUESTION, {
                method:'DELETE',
                headers: headers
            }
        ).then(
            response => response.json()
        ).then(
            data => {
                props.reload()
                alert(data);
            }
        ).catch(
            err => {
                console.log(err);
                alert(err);
                props.reload()
            }
        )
    }

    return (
        <Dialog
        open={props.openStatus}
        onClose={props.handleClose}
        >
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel the question?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={()=>deleteQuestion()} color="secondary">
                Yes
            </Button>
            <Button onClick={props.handleClose} color="primary" autoFocus>
                No
            </Button>
        </DialogActions>
        </Dialog>
    )
}