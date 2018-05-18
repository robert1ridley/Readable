import React from 'react';
import { connect } from 'react-redux';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { updateVotes } from '../Actions/postsActions';

const styles = {
  chip: {
    margin: 10
  }
}

class VoteButtons extends React.Component {

  voteOnPost(vote, postId) {
    this.props.dispatch(updateVotes(vote, postId));
  }

  render() {
    const { postId } = this.props;
    return (
      <div style={{display: 'block', textAlign: 'center'}}>
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
      </div>
    )
  }
}

export default connect()(VoteButtons);

