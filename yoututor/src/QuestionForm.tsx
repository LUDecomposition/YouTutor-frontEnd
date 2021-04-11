import React, { useState, useEffect, useRef} from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { FormGroup } from '@material-ui/core';

var UPLOAD = 'https://gr73qrcwnl.execute-api.us-east-1.amazonaws.com/v1/question/attachment'
var QUESTION = 'https://gr73qrcwnl.execute-api.us-east-1.amazonaws.com/v1/question/'

export default function QuestionForm(props) {
    
    const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    card: {
        background:(props.isDark)?('#424242'):('#f2f3f5')
    },
    headerSize: {
        width:'30ch',
    },
    form: {
        margin: theme.spacing(4)
    }
    }))
    const classes = useStyles();
    const [currTag, setTag] = useState('');
    const [tags, setTags] = useState<string[]>(props.tags);
    // const [chips, setChip] = useState<any[]>([]);
    const [sendEmail, checkEmail] = useState(false);
    const [currTitle, setTitle] = useState('');
    const [currDetail, setDetail] = useState('');
    const [currPath, setPath] = useState('');
    const [currFile, setFile] = useState('');
    const [filetype, setfiletype] = useState('');
    const [currStartTime, setStartTime] = useState('');
    const [currEndTime, setEndTime] = useState('');

    function _handleTextFieldChange(e, setFunc){
        setFunc(
            e.target.value
        )
    }
    function _handleFileInput(e){
        setFile(e.target.files[0]);
        setPath(e.target.value);
        if (e.target.files[0]){
            setfiletype(e.target.files[0].type);
        }
    }
    function handelDeleteTag(currTag:string) {
        setTags(
            tags.filter((tag) => tag !== currTag)
        )
    }
    function handleAddTag() {
        if (tags.includes(currTag) || tags.length >= 5 || currTag.length == 0 || currTag.split(' ').length == 0) {
            return
        }
        else {
            let newtags = tags.concat(currTag);
            setTags(newtags)
        }
    }
    const chips: any[] = [];
    if (props.ask) {
        tags.forEach(
            (tag) => {
                chips.push(
                    <Chip
                    size="small"
                    label={tag}
                    onDelete={() => {handelDeleteTag(tag)}}
                    color="secondary"
                    variant="outlined"
                />
                )
            }
        )
    } else{
        tags.forEach(
            (tag) => {
                chips.push(
                    <Chip
                    size="small"
                    label={tag}
                    color="secondary"
                    variant="outlined"
                />
                )
            }
        )
    }
    function handleSubmit() {
        if (props.ask) {
            const nowTime = Date.now();
            if  (props.email !== 'Null') {
                if (currTitle === '' || currStartTime === '' || currEndTime === '') {
                    alert('please fill in required fields');
                    return
                }
                const startTime = Date.parse(currStartTime);
                const endTime = Date.parse(currEndTime);
                
                if (nowTime >= startTime || nowTime >= endTime) {
                    alert('please fill in times in the future');
                    return
                }
                if (startTime >= endTime) {
                    alert('end time be after start time');
                    return
                }
            }
    
            var file_link = ''
            if (currPath!=='') {
                var filename = props.token.email+ '_'+ String(new Date().getTime())+'_'+ currPath.split('\\')[currPath.split('\\').length-1]
                filename = filename.replace(/\s/g, '');
                
    
                var upload_headers = {
                    "Access-Control-Allow-Headers": "*",
                    'token': props.token.id_token,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "PUT",
                    'Content-Type':  filetype,
                    'Accept': filetype,
                    'Access-Control-Allow-Credentials' : 'true',
                }
                fetch(
                    UPLOAD + '/' + filename, {
                        method: 'PUT',
                        headers: upload_headers,
                        body: currFile
                    }
                ).catch(
                    err => {
                        alert('failed to upload file')
                        return
                    }
                )
                file_link = 'https://ccfinalattachment.s3.amazonaws.com/' + filename.replace(/@/g, '%40')
            }
            var tutor_id = props.email;
    
    
            let body = {
                send_email: sendEmail,
                title: currTitle,
                detail: currDetail,
                attachment: file_link,
                start_time: (props.email !== 'Null') ?(currStartTime) :('Null'),
                end_time: (props.email !== 'Null') ? currEndTime : 'Null',
                tags: tags,
                tutor_id: tutor_id,
                tutor_name: props.name,
                created_at: nowTime
            }
            var put_headers = {
                "Access-Control-Allow-Headers": "*",
                'token': props.token.id_token,
                "access_token": props.token.access_token,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                'Access-Control-Allow-Credentials' : 'true',
            }
            fetch(
                QUESTION, {
                    method: 'PUT',
                    headers: put_headers,
                    body: JSON.stringify(body)
                }
            ).then(
                resp => resp.json()
            ).then(
                resp => {
                    console.log(resp)
                }
            ).catch(
                err => {
                    alert('failed to submit question')
                }
            )
        } else {
            if (currStartTime === '' || currEndTime === '') {
                alert('please fill in required fields');
                return
            }
            const nowTime = Date.now();
            const startTime = Date.parse(currStartTime);
            const endTime = Date.parse(currEndTime);
            if (nowTime >= startTime || nowTime >= endTime) {
                alert('please fill in times in the future');
                return
            }
            if (startTime >= endTime) {
                alert('end time be after start time');
                return
            }
            var post_headers = {
                "Access-Control-Allow-Headers": "*",
                'token': props.token.id_token,
                "access_token": props.token.access_token,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                'Access-Control-Allow-Credentials' : 'true',
            }
            var body = {
                send_email: sendEmail,
                question_id: props.question_id,
                created_at: props.created_at,
                start_time: currStartTime,
                end_time: currEndTime,
                user_id: props.email,
                user_name: props.name
            }
            fetch(
                QUESTION, {
                    method: 'POST',
                    headers: post_headers,
                    body: JSON.stringify(body)
                }
            ).then(() => {alert('request sent')})
            .catch(
                err => {
                    console.log(err)
                    alert('failed to submit question')
                }
            )
        }
    }
    
    return (
        <div>
        <Container maxWidth='md'>
        <Card className={classes.card}>
        <FormGroup className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {
                    (props.email != 'Null')
                    ?(
                        <Grid item xs={12}>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <AccountCircle />
                                </Grid>
                                <Grid item>
                                    <TextField
                                    className={classes.headerSize}
                                    label={(props.ask)?("ask"):("answer")}
                                    defaultValue={props.name}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    />
                                </Grid>
                                <Grid item>
                                <FormControlLabel 
                                control={<Checkbox name="email" color="primary" 
                                            checked={sendEmail} 
                                            onChange={() => {checkEmail(!sendEmail)}}/>} 
                                label="send notification by email" 
                                />
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                    :(
                        <div/>
                    )
                }
                <Grid item xs={12}>
                    {
                        (props.ask)
                        ?(
                            <TextField
                            required
                            className={classes.headerSize}
                            label="Title"
                            value={currTitle}
                            onChange={(e) => {_handleTextFieldChange(e, setTitle)}}
                            />
                        )
                        :(
                            <TextField
                            required
                            className={classes.headerSize}
                            label="Title"
                            defaultValue={props.title}
                            InputProps={{
                                readOnly: true
                            }}
                            />
                        )
                    }
                    
                </Grid>
                <Grid item xs={12}>
                    {
                        (props.ask)
                        ?(
                            <TextField
                            fullWidth
                            multiline
                            label="Detail"
                            rows={6}
                            variant="outlined"
                            value={currDetail}
                            onChange={(e) => {_handleTextFieldChange(e, setDetail)}}
                            />
                        )
                        :(
                            <TextField
                            fullWidth
                            multiline
                            label="Detail"
                            rows={6}
                            variant="outlined"
                            defaultValue={props.detail}
                            InputProps={{
                                readOnly: true
                            }}
                            />
                        )
                    }
                </Grid>
                <Grid item xs={12}>
                    {
                        (props.ask)
                        ?(
                            <input type="file"
                            accept="image/png, .pdf, image/jpeg, image/jpg"
                            value={currPath}
                            onChange={(e) => {_handleFileInput(e)}}
                            />
                        )
                        :(
                            <a href={props.attachment}>attachment</a>
                        )
                    }
                </Grid>
                {
                    (props.ask)
                    ?(
                        <Grid item xs={12} direction="row">
                            <TextField 
                            size="small"
                            className={classes.headerSize} 
                            value={currTag}
                            label="Tag"
                            onChange={(e) => {_handleTextFieldChange(e, setTag)}}
                        />
                        <Button size="small" onClick={handleAddTag}>add</Button>
                        </Grid>
                    )
                    :(
                        <div/>
                    )
                }
                <Grid item xs={12}>
                {chips}
                </Grid>
                
                {
                    (props.email != 'Null')
                    ?(
                        <div>
                        <Grid item xs={12}>
                            <Typography variant='body2' color="textSecondary">
                                    Requested Time
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                        <form noValidate>
                            <TextField
                                required
                                id="start-time"
                                label="Start Time"
                                type="datetime-local"
                                value = {currStartTime}
                                onChange = {(e) => {_handleTextFieldChange(e, setStartTime)}}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </form>
                        </Grid>
                        <Grid item xs={6}>
                        <form noValidate>
                            <TextField
                                required
                                id="end-time"
                                label="End Time"
                                type="datetime-local"
                                value = {currEndTime}
                                onChange = {(e) => {_handleTextFieldChange(e, setEndTime)}}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </form>
                    </Grid>
                    </div>
                    )
                    :(
                        <div/>
                    )
                }
                
                <Grid container direction="row">
                    <Grid item xs={11}></Grid>
                    <Grid item xs={1}>
                        <Button variant="outlined"
                        type="submit" onClick={() => {handleSubmit()}}
                        >{(props.email != 'null')
                                                        ?((props.ask)?'Ask':'Enter')
                                                        :'Post'}</Button>
                    </Grid>
                </Grid>
            </Grid>
        </FormGroup>
        </Card>
        </Container>
        </div>
    )
}