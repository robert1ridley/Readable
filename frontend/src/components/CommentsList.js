import React from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import List from 'material-ui/List';
import { fetchComments } from '../Actions/commentsActions';
import SingleComment from './SingleComment';
import AddComment from './AddComment';

const styles = theme => ({
  background: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  }
});

class CommentsList extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchComments(this.props.postId));
  }

  render () {
    const { classes, comments, postId } = this.props;
    return (
      <Grid container spacing={24} style={{flexGrow: 1}}>
        <Grid item md={3} xs={1} />
        <Grid item md={6} xs={10}>
          <Typography variant="subheading" className={classes.title}>
            Comments • {comments.length}
          </Typography>
          <div className={classes.background}>
            <List>
              <AddComment />
              {
                comments &&
                comments.map(comment =>
                  !comment.deleted ?
                  <SingleComment
                    comment={comment}
                    key={comment.id}
                    parentId={postId}
                  /> :
                  <div />
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