import React, { ReactElement } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import BarChartIcon from '@material-ui/icons/BarChart';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => ({
   
}));

interface Props {
    list: Array<string>,
    header?: string | ReactElement
}

const FAQList = (props: Props) => {
    const { list, header } = props;
    const { } = useStyles();

    return (
        <React.Fragment>
            <List subheader={header ? <ListSubheader>{header}</ListSubheader>: <></>} disablePadding>
                {list.map((l: string, index: number) => (
                    <ListItem key={"Key-"+index} disableGutters>
                        <ListItemIcon>
                            <BarChartIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary={<Typography variant="body2">{l}</Typography>} />
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    )
}

export default FAQList;