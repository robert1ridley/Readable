import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
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
import { updateVotes, deletePost } from '../Actions/postsActions';
import UpdatePostPopUp from './UpdatePostPopUp';

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
  state = {
    open: false
  }

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

  componentDidMount() {
    this.props.dispatch(fetchSinglePost(this.props.postId))
  }

  voteOnPost(vote) {
    this.props.dispatch(updateVotes(vote, this.props.postId));
  }

  deletePost = (postId) => {
    this.props.dispatch(deletePost(postId))
    .then(this.props.history.push("/"))
  }

  render() {
    const { post, loading, postId } = this.props;
    const { open } = this.state;
    return (
      <div>
        {
          post.deleted && !post.loading &&
          <Redirect to="/"/>
        }
        {
          (post !== {} || postId === '' || loading !== true) &&
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
                    title={post.title}
                    subheader={post.author}
                  />
                  <CardContent>
                    <Typography component="p">
                      {post.body}
                    </Typography>
                    <Typography component="p" style={styles.date}>
                      {`${moment(new Date(post.timestamp)).fromNow()}`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <div style={{display: 'block'}}>
                      <Chip
                        avatar={<Avatar><Favorite /></Avatar>}
                        label={post.voteScore}
                        style={styles.chip}
                      />
                      <Chip
                        avatar={<Avatar><ExpandLessIcon /></Avatar>}
                        label="Upvote"
                        style={styles.chip}
                        onClick={() => this.voteOnPost("upVote")}
                      />
                      <Chip
                        avatar={<Avatar><ExpandMoreIcon /></Avatar>}
                        label="Downvote"
                        style={styles.chip}
                        onClick={() => this.voteOnPost("downVote")}
                      />
                      <Chip
                        avatar={<Avatar><ModeEditIcon /></Avatar>}
                        label="Edit Post"
                        style={styles.chip}
                        onClick={this.openPopup}
                      />
                      <Chip
                        avatar={<Avatar><DeleteIcon /></Avatar>}
                        label="Delete Post"
                        style={styles.chip}
                        onClick={() => this.deletePost(postId)}
                      />
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </div>  
        }
        <UpdatePostPopUp
          open={open}
          closePopUp={this.closePopUp}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  
  post: state.postsReducer.singleItem,
  loading: state.postsReducer.loading,
  error: state.postsReducer.error
});

const wrappedComponent = withRouter(OnePostItem)
export default connect(mapStateToProps)(wrappedComponent);