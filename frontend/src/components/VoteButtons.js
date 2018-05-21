import React from 'react';
import { connect } from 'react-redux';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import DeleteIcon from 'material-ui-icons/Delete';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import UpdatePostPopUp from './UpdatePostPopUp';
import { updateVotes, deletePost, fetchSinglePost } from '../Actions/postsActions';

const styles = {
  chip: {
    margin: 10
  }
}

class VoteButtons extends React.Component {
  state = {
    open: false
  }

  openPopup = () => {
    this.props.dispatch(fetchSinglePost(this.props.postId))
    .then(
      this.setState({
        open: true
      })
    )
  }

  closePopUp = () => {
    this.setState({
      open: false
    })
  }

  voteOnPost(vote, postId) {
    this.props.dispatch(updateVotes(vote, postId));
  }

  deletePost = (postId) => {
    this.props.dispatch(deletePost(postId))
  }

  render() {
    const { postId } = this.props;
    const { open } = this.state;
    return (
      <div style={{display: 'block', textAlign: 'center'}}>
        <Chip
          avatar={<Avatar><ModeEditIcon /></Avatar>}
          label={"Edit"}
          style={styles.chip}
          onClick={this.openPopup}
        />
        <Chip
          avatar={<Avatar><DeleteIcon /></Avatar>}
          label="Delete"
          style={styles.chip}
          onClick={() => this.deletePost(postId)}
        />
        <Chip
          avatar={<Avatar><ThumbUp /></Avatar>}
          label={"Upvote"}
          style={styles.chip}
          onClick={() => this.voteOnPost("upVote", postId)}
        />
        <Chip
          avatar={<Avatar><ThumbDown /></Avatar>}
          label="Downvote"
          style={styles.chip}
          onClick={() => this.voteOnPost("downVote", postId)}
        />
        <UpdatePostPopUp
          open={open}
          closePopUp={this.closePopUp}
        />
      </div>
    )
  }
}

export default connect()(VoteButtons);

