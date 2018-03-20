import React from 'react';
import { connect } from 'react-redux';
import { fetchSinglePost } from '../Actions/postsActions';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Favorite from 'material-ui-icons/Favorite';
import Avatar from 'material-ui/Avatar';
import FaceIcon from 'material-ui-icons/Face';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import ExpandLessIcon from 'material-ui-icons/ExpandLess';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import DeleteIcon from 'material-ui-icons/Delete';
import Chip from 'material-ui/Chip';

const styles = {
  card: {
    minWidth: 275,
    marginTop: 30,
  },
  chip: {
    margin: 5,
  },
  date: {
    color: 'rgba(0, 0, 0, 0.54)',
    marginTop: 15
  }
};

class OnePostItem extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchSinglePost(this.props.postId));
  }

  upVote() {
    alert('You upvoted.');
  }

  downVote() {
    alert('You downvoted.');
  }

  editPost() {
    alert('so you want to edit the post ...');
  }

  deletePost() {
    alert('delete this post');
  }

  render() {
    return (
      <div>
        {
          this.props.post!== {} && this.props.postId!== '' &&
          <div>
            <Grid container spacing={24} style={{flexGrow: 1}}>
              <Grid item md={3} xs={1} />
              <Grid item md={6} xs={10}>
                <Card style={styles.card}>
                  <CardHeader
                    avatar={
                      <Avatar>
                        <FaceIcon />
                      </Avatar>
                    }
                    title={this.props.post.title}
                    subheader={this.props.post.author}
                  />
                  <CardContent>
                    <Typography component="p">
                      {this.props.post.body}
                    </Typography>
                    <Typography component="p" style={styles.date}>
                      {`${new Date(this.props.post.timestamp).getDay()}/${new Date(this.props.post.timestamp).getMonth()}/${new Date(this.props.post.timestamp).getFullYear()}`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <div style={{display: 'block'}}>
                      <Chip
                        avatar={<Avatar><Favorite /></Avatar>}
                        label={this.props.post.voteScore}
                        style={styles.chip}
                      />
                      <Chip
                        avatar={<Avatar><ExpandLessIcon /></Avatar>}
                        label="Upvote"
                        style={styles.chip}
                        onClick={this.upVote}
                      />
                      <Chip
                        avatar={<Avatar><ExpandMoreIcon /></Avatar>}
                        label="Downvote"
                        style={styles.chip}
                        onClick={this.downVote}
                      />
                      <Chip
                        avatar={<Avatar><ModeEditIcon /></Avatar>}
                        label="Edit Post"
                        style={styles.chip}
                        onClick={this.editPost}
                      />
                      <Chip
                        avatar={<Avatar><DeleteIcon /></Avatar>}
                        label="Delete Post"
                        style={styles.chip}
                        onClick={this.deletePost}
                      />
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </div>  
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.postsReducer.singleItem,
  loading: state.postsReducer.loading,
  error: state.postsReducer.error
});

export default connect(mapStateToProps)(OnePostItem);