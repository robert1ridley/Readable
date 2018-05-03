import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import DeleteIcon from 'material-ui-icons/Delete';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FaceIcon from 'material-ui-icons/Face';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
import {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';

import { updateCommentVoteCount } from '../Actions/commentsActions';

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
  commentText: {
    marginLeft: 70,
    color: '#0000008a',
    fontSize: '0.875rem',
    fontWeight: 400
  },
  listItemContainer: {
    marginBottom: 30
  }
});

class SingleComment extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  voteOnComment(vote, commentId) {
    this.props.dispatch(updateCommentVoteCount(vote, commentId));
  }

  render() {
    const { classes, comment } = this.props;
    const { anchorEl } = this.state;
    return (
      <div key={comment.id} className={classes.listItemContainer}>
        <ListItem>
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
              color="primary"
              variant="raised"
              onClick={this.handleClick}
            >
              COMMENT OPTIONS
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
                  <ThumbUp
                    onClick={() => this.voteOnComment("upVote", comment.id)}
                  />
                </IconButton>
              </MenuItem>
              <MenuItem onClick={this.handleClose}>
                <IconButton aria-label="dislike">
                  <ThumbDown
                    onClick={() => this.voteOnComment("downVote", comment.id)}
                  />
                </IconButton>
              </MenuItem>
            </Menu>
          </ListItemSecondaryAction>
        </ListItem>
        <div className={classes.commentText}>{comment.voteScore} Likes</div>
      </div>
    )
  }
}

const WrappedComponent = connect()(SingleComment);
export default withStyles(styles)(WrappedComponent);