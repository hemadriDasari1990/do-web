import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    textfieldStyle: {
        "& .MuiFilledInput-root": {
            background: "#fff",
            borderRadius: 10
        }
    }
}));

export default function SectionUpdate(props: any) {
    const { value, setSectionInput } = props;
    const { textfieldStyle } = useStyles();

    /* Local states */
    const [section, setSection] = useState(value);

    /* Handler functions */
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSection(event.target.value);
        setSectionInput(event.target.value);
    }

  return (
    <React.Fragment>
        <Box mb={1}>
            <TextField 
                variant="filled" 
                fullWidth 
                multiline 
                value={section}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInput(event)}
                className={textfieldStyle}
                InputProps={{
                    style: {
                        minHeight: 90,
                        paddingTop: 40
                    }
                }}
            />
        </Box>
    </React.Fragment>
  );
}