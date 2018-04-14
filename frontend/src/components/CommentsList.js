import React from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import DeleteIcon from 'material-ui-icons/Delete';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FaceIcon from 'material-ui-icons/Face';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import { fetchComments } from '../Actions/commentsActions';

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

class CommentsList extends React.Component {
  // state = {
  //   dense: true
  // };
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  componentDidMount() {
    this.props.dispatch(fetchComments(this.props.postId));
  }

  render () {
    const { classes, comments } = this.props;
    const { dense, anchorEl } = this.state;
    
    return (
      <Grid container spacing={24} style={{flexGrow: 1}}>
        <Grid item md={3} xs={1} />
        <Grid item md={6} xs={10}>
          <Typography variant="subheading" className={classes.title}>
            Comments • {comments.length}
          </Typography>
          <div className={classes.background}>
            <List dense={dense}>
              {
                comments &&
                comments.map(comment => 
                  <ListItem key={comment.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <FaceIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={comment.body}
                      secondary={comment.author}
                    />
                    <ListItemSecondaryAction>
                      <Button
                        aria-owns={anchorEl ? 'simple-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                      >
                        <IconButton aria-label="Edit">
                          <ModeEditIcon />
                        </IconButton>
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                      >
                        <MenuItem onClick={this.handleClose}>
                          <IconButton aria-label="Edit">
                            <ModeEditIcon />
                          </IconButton>
                        </MenuItem>
                        <MenuItem onClick={this.handleClose}>
                          <IconButton aria-label="Delete">
                            <DeleteIcon />
                          </IconButton>
                        </MenuItem>
                        <MenuItem onClick={this.handleClose}>
                          <IconButton aria-label="like">
                            <ThumbUp />
                          </IconButton>
                        </MenuItem>
                        <MenuItem onClick={this.handleClose}>
                          <IconButton aria-label="dislike">
                            <ThumbDown />
                          </IconButton>
                        </MenuItem>
                      </Menu>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              }
            </List>
          </div>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  comments: state.commentsReducer.items,
  commentsLoading: state.commentsReducer.loading,
  commentsError: state.commentsReducer.error
});

const wrappedComponent = withStyles(styles)(CommentsList);
export default connect(mapStateToProps)(wrappedComponent);