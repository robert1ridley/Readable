import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import DeleteIcon from 'material-ui-icons/Delete';
import Avatar from 'material-ui/Avatar';
import FaceIcon from 'material-ui-icons/Face';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
import pink from 'material-ui/colors/pink';
import blue from 'material-ui/colors/blue'
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
} from 'material-ui/List';

import { updateCommentVoteCount, deleteComment } from '../Actions/commentsActions';
import UpdateCommentPopUp from './UpdateCommentPopUp';

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
    marginLeft: 72,
    color: '#0000008a',
    fontSize: '0.875rem',
    fontWeight: 400
  },
  listItemContainer: {
    marginBottom: 30
  },
  activeListItemContainer: {
    marginBottom: 30,
    backgroundColor: '#f4433612'
  },
  blueAvatar: {
    margin: 5,
    marginLeft: 0,
    width: 30,
    height: 30,
    color: '#fff',
    backgroundColor: blue[500],
    cursor: 'pointer'
  },
  pinkAvatar: {
    margin: 5,
    width: 30,
    height: 30,
    color: '#fff',
    backgroundColor: pink[500],
    cursor: 'pointer'
  },
  greenAvatar: {
    margin: 5,
    width: 30,
    height: 30,
    color: '#fff',
    backgroundColor: green[500],
    cursor: 'pointer'
  },
  redAvatar: {
    margin: 5,
    width: 30,
    height: 30,
    color: '#fff',
    backgroundColor: red[500],
    cursor: 'pointer'
  },
  icon: {
    width: 15
  },
  row: {
    display: 'flex'
  },
});

class SingleComment extends React.Component {
  state = {
    open: false,
    votesUpdated: false
  };

  openPopup = () => {
    this.setState({
      open: true
    })
  }

  closePopUp = () => {
    this.setState({
      open: false
    })
  }

  voteOnComment(vote, commentId) {
    this.props.dispatch(updateCommentVoteCount(vote, commentId))
    .then(this.votesUpdated())
  }

  votesUpdated() {
    this.setState({
      votesUpdated: true
    })
    setTimeout(() => 
    this.setState({
      votesUpdated: false
    }), 1000)
  }

  deleteComment(commentId) {
    this.props.dispatch(deleteComment(commentId))
  }

  render() {
    const { classes, comment } = this.props;
    const { votesUpdated } = this.state;
    return (
      <div className={votesUpdated? classes.activeListItemContainer : classes.listItemContainer}>
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
        </ListItem>
        <div className={classes.commentText}>{comment.voteScore} <span>Likes</span>
          <div className={classes.row}>
            <Avatar
              className={classes.blueAvatar}
              onClick={this.openPopup}
            >
              <ModeEditIcon
                className={classes.icon}
              />
            </Avatar>
            <Avatar
              className={classes.pinkAvatar}
              onClick={() => this.deleteComment(comment.id)}
            >
              <DeleteIcon className={classes.icon} />
            </Avatar>
            <Avatar
              className={classes.greenAvatar}
              onClick={() => this.voteOnComment("upVote", comment.id)}
            >
              <ThumbUp 
                className={classes.icon}
              />
            </Avatar>
            <Avatar
              className={classes.redAvatar}
              onClick={() => this.voteOnComment("downVote", comment.id)}
            >
              <ThumbDown
                className={classes.icon}
              />
            </Avatar>
          </div>
        </div>
        <UpdateCommentPopUp
          comment={comment}
          open={this.state.open}
          closePopUp={this.closePopUp}
        />
      </div>
    )
  }
}

const WrappedComponent = connect()(SingleComment);
export default withStyles(styles)(WrappedComponent);