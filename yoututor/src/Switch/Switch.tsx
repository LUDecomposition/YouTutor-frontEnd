import React from 'react';
import Switch from '@material-ui/core/Switch';

export default function Switches(props: any) {
    return (
        <div>
            <Switch
            checked={props.isTutor}
            onChange={props.onChange}
            name="isTutor"
            inputProps={{ 'aria-label': 'primary checkbox'}}
            id='switch'
            />         
        </div>
    );
}