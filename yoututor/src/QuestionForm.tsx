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

export default function QuestionForm(props) {
    const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    card: {
        background:(props.isDark)?('#000000'):('#f2f3f5')
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

    function _handleTextFieldChange(e){
        setTag(
            e.target.value
        )
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
    
    return (
        <div>
        <Container maxWidth='md'>
        <Card className={classes.card}>
        <FormGroup className={classes.form}>
            <Grid container spacing={2}>
                {
                    (props.email != 'null')
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
                                control={<Checkbox name="email" color="primary"/>} 
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
                            accept="image/*, .pdf, .doc, .docx, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
                            onChange={_handleTextFieldChange}
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
                    (props.email != 'null')
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
                                id="start-time"
                                label="Start Time"
                                type="datetime-local"
                                defaultValue="2021-01-01T08:00"
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
                                defaultValue="2021-01-01T10:00"
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
                        <Button variant="outlined">{(props.email != 'null')
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