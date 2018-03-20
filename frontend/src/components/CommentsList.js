import React from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import DeleteIcon from 'material-ui-icons/Delete';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FaceIcon from 'material-ui-icons/Face';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  background: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

class CommentsList extends React.Component {
  state = {
    dense: false,
    secondary: true,
  };

  render () {
    const { classes } = this.props;
    const { dense, secondary } = this.state;

    return (
      <Grid container spacing={24} style={{flexGrow: 1}}>
        <Grid item md={3} xs={1} />
        <Grid item md={6} xs={10}>
          <Typography variant="subheading" className={classes.title}>
            Comments
          </Typography>
          <div className={classes.background}>
            <List dense={dense}>
              {generate(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FaceIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="This is a comment"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Edit">
                      <ModeEditIcon />
                    </IconButton>
                    <IconButton aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>,
              )}
            </List>
          </div>
        </Grid>
      </Grid>

    )
  }
}

export default withStyles(styles)(CommentsList);