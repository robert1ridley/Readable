import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
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
    if(this.mounted){
      this.setState({
        open: false
      })
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidMount() {
    this.props.dispatch(fetchSinglePost(this.props.postId));
  }

  voteOnPost(vote) {
    this.props.dispatch(updateVotes(vote, this.props.postId));
  }

  deletePost = (postId) => {
    this.props.dispatch(deletePost(postId))
    .then(this.props.history.push("/"))
  }

  render() {
    console.log(this.props)
    return (
      <div>
        {
          this.props.post.deleted && !this.props.post.loading &&
          <Redirect to="/"/>
        }
        {
          (this.props.post !== {} || this.props.postId === '' || this.props.loading !== true) &&
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
                        onClick={() => this.deletePost(this.props.postId)}
                      />
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </div>  
        }
        <UpdatePostPopUp
          open={this.state.open}
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