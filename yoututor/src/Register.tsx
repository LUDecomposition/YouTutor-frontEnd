import React, { useState, useRef } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { TransitionProps } from '@material-ui/core/transitions';
import Dialog from '@material-ui/core/Dialog';
import { FormGroup, Icon } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
return <Slide direction="left" ref={ref} {...props} />;
});

var UPLOAD = 'https://gr73qrcwnl.execute-api.us-east-1.amazonaws.com/v1/user/picture'
var EDIT = 'https://gr73qrcwnl.execute-api.us-east-1.amazonaws.com/v1/user'

// props id_token, access_token, isDark, email, profile

export default function Register(props) {
    const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogCustomizedWidth: {
            'max-width': '100%',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            },
        card: {
            background:(props.isDark)?('#424242'):('#f2f3f5')
        },
        form: {
            margin: theme.spacing(4)
        }
    }))
    const classes = useStyles()
    const profile = props.profile

    const iconRef = useRef<HTMLInputElement>(null);
    const [firstName, setfirstName] = useState(profile.first_name);
    const [lastName, setlastName] = useState(profile.last_name);
    const [gender, setGender] = useState(profile.gender);
    const [school, setSchool] = useState(profile.school);
    const [degree, setDegree] = useState(profile.degree);
    const [major, setMajor] = useState(profile.major);
    const [tutor, setTutor] = useState(String(profile.tutor));
    const [availability, setAvailability] =  useState<string[]>(profile.availability);
    const [currTag, setTag] = useState('');
    const [tags, setTags] = useState<string[]>(profile.tags);
    const [intro, setIntro] = useState(profile.introduction)
    const [fromTime, setFromTime] = useState('08:00');
    const [toTime, setToTime] = useState('08:30');
    const [weekDay, setDay] = useState('Monday');
    const [currIcon, setIcon] = useState(profile.picture)

    function _handleTextFieldChange(e, setFunc){
        setFunc(
            e.target.value
        )
    }
    const _handleOptionChange = (event: React.ChangeEvent<{ value: unknown }>, funct) => {
        funct(event.target.value);
    };
    const _handleSelectionChange = (event: React.ChangeEvent<HTMLInputElement>, funct) => {
        funct((event.target as HTMLInputElement).value);
    };
    function _handleFileInput(e){
        var currPath = e.target.value;
        var filename = profile.user_id+ '_'+ String(new Date().getTime())+'_'+ currPath.split('\\')[currPath.split('\\').length-1]
        filename = filename.replace(/\s/g, '');
        var currFile = e.target.files[0];
        if (currFile) {
            console.log(currFile);
            console.log(filetype);
            var filetype = currFile.type;
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
            )
            .then(
                () =>{
                var file_link = 'https://ccfinalprofilephoto.s3.amazonaws.com/' + filename.replace(/@/g, '%40')
                setIcon(file_link)
            })
            .catch(
                err => {
                    alert('failed to upload file')
                }
            )
        }
    }
    function handelDeleteTag(currTag:string, setFunc, targetlist) {
        setFunc(
            targetlist.filter((tag) => tag !== currTag)
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
    function handleAddTime() {
        var fromHour = Number(fromTime.split(':')[0]); 
        var fromMinute = Number(fromTime.split(':')[1]); 
        var toHour = Number(toTime.split(':')[0]); 
        var toMinute = Number(toTime.split(':')[1]); 
        if (fromHour <= toHour){
            if (fromHour === toHour){
                if (fromMinute <= toMinute){
                    let newTime = fromTime + '-' + toTime + ',' + weekDay;
                    if (!availability.includes(newTime)){
                        let newTimes = availability.concat(newTime);
                        setAvailability(newTimes);
                    }
                }
            }else{
                let newTime = fromTime + '-' + toTime + ',' + weekDay;
                if (!availability.includes(newTime)){
                    let newTimes = availability.concat(newTime);
                    setAvailability(newTimes);
                }
            }
        }
    }

    var availabilityChips: any[] = []
    availability.forEach(
        (element) => {
            availabilityChips.push(
                <Chip
                    key={element}
                    size="small"
                    label={element}
                    onDelete={() => {handelDeleteTag(element, setAvailability, availability)}}
                    color="primary"
                    variant="outlined"
                />
            )
        }
    )
    var tagsChips: any[] = []
    tags.forEach(
        (element) => {
            tagsChips.push(
                <Chip
                    key={element}
                    size="small"
                    label={element}
                    onDelete={() => {handelDeleteTag(element,setTags, tags)}}
                    color="secondary"
                    variant="outlined"
                />
            )
        }
    )
    function handleSubmit(){
        if (firstName===''||lastName===''||school===''||major===''){
            alert('please fill in required fields')
            return
        }
        var headers = {
            "Access-Control-Allow-Headers": "*",
            'token': props.token.id_token,
            'access_token': props.token.access_token,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            'Content-Type':  'application/json',
            'Access-Control-Allow-Credentials' : 'true',
        }
        var body = {
            isRegister: props.isRegister,
            user_id: profile.user_id,
            availability: availability,
            degree: degree,
            first_name: firstName,
            gender: gender,
            introduction: intro,
            last_name: lastName,
            major: major,
            picture: currIcon,
            school: school,
            tags: tags,
            tutor: tutor === "true"
        }
        fetch(
            EDIT, {
                method: 'POST',
                headers:headers,
                body:JSON.stringify(body)
            }
        )
        .then(resp => resp.json())
        .then(datum => {
            alert(datum)
            props.close()
            props.reload()
        })
        .catch(
            () => {
                alert('failed to register/edit')
            }
        )
    }
    return (
        <Dialog
        fullWidth
        classes={{ paperFullWidth: classes.dialogCustomizedWidth }}
        open={props.openStatus}
        onClose={props.closeFunction}
        TransitionComponent={Transition}
        >
        <Container maxWidth='md'>
            <Card className={classes.card}>
                <FormGroup className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="flex-end">
                    <Grid item xs={12}>
                        <Tooltip title="edit" arrow>
                            <IconButton
                            onClick={()=>{iconRef.current?.click()}}
                            >
                                <Avatar 
                                alt = {profile.first_name + ' ' + profile.last_name}
                                src = {currIcon}
                                ></Avatar>
                            </IconButton>
                        </Tooltip>
                        <input
                            accept="image/*"
                            type="file"
                            id="icon-button-file"
                            hidden
                            value={""}
                            onChange={(e) => {
                                _handleFileInput(e);
                                console.log(Icon);
                            }}
                            ref={iconRef}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                        label="email"
                        disabled
                        value={profile.user_id}
                        required
                        />
                    </Grid>
                    <Grid item xs={3}>
                    <FormControl component="fieldset" required>
                        <FormLabel component="legend">gender</FormLabel>
                        <RadioGroup  row value={gender} onChange={(e)=>{_handleSelectionChange(e, setGender)}}>
                        <FormControlLabel value="F" control={<Radio />} label="F" />
                        <FormControlLabel value="M" control={<Radio />} label="M" />
                        </RadioGroup>
                    </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            // className={classes.headerSize}
                            label="first name"
                            value={firstName}
                            required
                            onChange={(e) => {_handleTextFieldChange(e, setfirstName)}}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            // className={classes.headerSize}
                            label="last name"
                            value={lastName}
                            required
                            onChange={(e) => {_handleTextFieldChange(e, setlastName)}}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            required
                            label="school"
                            value={school}
                            onChange={(e) => {_handleTextFieldChange(e, setSchool)}}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl required>
                        <Select
                        value={degree}
                        onChange={(e) => {_handleOptionChange(e, setDegree)}}
                        >
                        <MenuItem value={'B.S'}>B.S</MenuItem>
                        <MenuItem value={'B.A'}>B.A</MenuItem>
                        <MenuItem value={'M.S'}>M.S</MenuItem>
                        <MenuItem value={'M.A'}>M.A</MenuItem>
                        <MenuItem value={'M.F.A'}>M.F.A</MenuItem>
                        <MenuItem value={'PhD'}>Ph.D</MenuItem>
                        <MenuItem value={'Others'}>Others</MenuItem>
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            required
                            label="major"
                            value={major}
                            onChange={(e) => {_handleTextFieldChange(e, setMajor)}}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">discovered as tutor</FormLabel>
                            <RadioGroup row value={tutor} onChange={(e)=>{_handleSelectionChange(e, setTutor)}}>
                            <FormControlLabel value={'true'} control={<Radio />} label="Yes" />
                            <FormControlLabel value={'false'} control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                            <TextField
                            fullWidth
                            multiline
                            label="Introduction"
                            rows={6}
                            variant="outlined"
                            value={intro}
                            onChange={(e) => {_handleTextFieldChange(e, setIntro)}}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        {availabilityChips}
                    </Grid>
                    <Grid item xs={12}>
                        {tagsChips}
                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex' }}>
                        <TextField
                            type="time"
                            label="from"
                            value={fromTime}
                            onChange={(e) => {_handleTextFieldChange(e, setFromTime)}}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            inputProps={{
                            step: 1800, // 5 min
                            }}
                        />
                        <TextField
                            type="time"
                            label="to"
                            value={toTime}
                            onChange={(e) => {_handleTextFieldChange(e, setToTime)}}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            inputProps={{
                            step: 1800, // 5 min
                            }}
                        />
                        <Select
                        value={weekDay}
                        onChange={(e) => {_handleOptionChange(e, setDay)}}
                        displayEmpty
                        >
                        <MenuItem value="">
                        </MenuItem>
                        <MenuItem value={'Monday'}>Monday</MenuItem>
                        <MenuItem value={'Tuesday'}>Tuesday</MenuItem>
                        <MenuItem value={'Wednesday'}>Wednesday</MenuItem>
                        <MenuItem value={'Thursday'}>Thursday</MenuItem>
                        <MenuItem value={'Friday'}>Friday</MenuItem>
                        <MenuItem value={'Saturday'}>Saturday</MenuItem>
                        <MenuItem value={'Sunday'}>Sunday</MenuItem>
                        </Select>
                        <Button size='small'
                        onClick={() => {handleAddTime()}}
                        >add</Button>
                    </Grid>
                    <Grid item xs={4} style={{ display: 'flex' }}>
                        <TextField 
                            size="small"
                            value={currTag}
                            label="Add tag"
                            onChange={(e) => {_handleTextFieldChange(e, setTag)}}
                        />
                        <Button size='small'
                        onClick={() => {handleAddTag()}}
                        >add</Button>
                    </Grid>
                    <Grid item xs={2} style={{ display: 'flex' }}>
                        <Button size='small'
                        onClick={() => {handleSubmit()}}
                        color='secondary'
                        >Submit</Button>
                    </Grid>
                </Grid>
                </FormGroup>
            </Card>
        </Container>
        </Dialog>
    )
}