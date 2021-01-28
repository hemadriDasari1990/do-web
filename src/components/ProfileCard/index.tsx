import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import FacebookIcon from '@material-ui/icons/Facebook'
import IconButton from '@material-ui/core/IconButton'
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  media: {
    height: 100,
    width: 100,
    float: "right"
  },
  contentStyle: {
    marginLeft: 20,
    height:"fit-content"
  },
  actions: {
    marginLeft: 15,
  },
  boxStyle: {
    backgroundColor: "#ecf4ff",
    borderRadius: 15,
    width: "fit-content"
  },
  titleStyle: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    color: "#0976fe"
  }
})

function ProfileCard(props: any) {
    const {
      path,
      title,
      subTitle,
      fbPath,
      linkedinPath,
      content,
      button,
      tagLine
    } = props;
    const { media, contentStyle, boxStyle, titleStyle, actions } = useStyles();

    const handleButton = (path: string) => {
        // history.push(path)
    }
    return (
        <React.Fragment>
            <Card>
                <CardActionArea>
                  <Avatar
                    alt={title}
                    src={path}
                    className={media}
                  />
                  <CardContent className={contentStyle}>
                      <Box ml={-1} className={boxStyle}>
                      <Typography className={titleStyle} gutterBottom variant="h5" component="h5">
                        {title}
                      </Typography>
                      </Box>
                      <Typography gutterBottom variant="h5" component="h4">
                      {subTitle}
                      </Typography>
                      <Box>
                        <Typography component="h6" variant="h6">
                          {tagLine}
                        </Typography>
                      </Box>
                      <Box mt={2}>
                        <Typography component="h6" variant="h6">
                          {content}
                        </Typography>
                      </Box>
                  </CardContent>
                </CardActionArea>
                {button && (
                <CardActions className={actions}>
                  <Box>
                    <Typography component="h6" variant="h6">
                      Social Profiles
                    </Typography>
                  </Box>
                  <Box>
                    {fbPath && (
                      <IconButton
                        onClick={() => handleButton(fbPath)}
                      >
                        <FacebookIcon color="primary" />
                      </IconButton>
                      )}
                      {linkedinPath && (
                      <IconButton
                        onClick={() => handleButton(linkedinPath)}
                      >
                        <LinkedInIcon color="primary" />
                      </IconButton>
                      )}
                  </Box>
                </CardActions>
                )}
            </Card>
        </React.Fragment>
    )
}

export default ProfileCard;
