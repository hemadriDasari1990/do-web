import React, { useEffect } from "react";

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { showCreateBoardButton } from "../../redux/actions/common"
import { useDispatch } from "react-redux";

const useStyles = makeStyles(() => ({
    containerStyle: {
      minHeight: '90vh'
    }
  }));
  
const Home = () => {
    const { containerStyle } = useStyles();
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(showCreateBoardButton(true));
    }, []);
    
    return (
        <React.Fragment>
            <Container className={containerStyle}>
            
            </Container>
        </React.Fragment>
    )
}

export default Home;
