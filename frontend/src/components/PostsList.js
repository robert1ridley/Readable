import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FaceIcon from 'material-ui-icons/Face';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
import DateRangeIcon from 'material-ui-icons/DateRange';
import InsertCommentIcon from 'material-ui-icons/InsertComment';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Chip from 'material-ui/Chip';
import AddPost from './AddPost';
import VoteButtons from './VoteButtons';
import { calculateCommentCount } from '../utils';
import { updateVotes } from '../Actions/postsActions';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: 10,
    paddingBottom: 30
  },
  listItem: {
    marginLeft: 20,
    marginRight: 20,
    maxWidth: 700,
    cursor: 'pointer'
  },
  innerList: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 2
  }),
  chip: {
    margin: 10,
  },
});

const PostsList = (props) => {
  const { classes, posts, updatedCommentCounts } = props;
  return (
    <Grid container spacing={24} style={{flexGrow: 1}}>
      <Grid item md={3} xs={1} />
      <Grid item md={6} xs={10}>
        <div className={classes.root}>
          <List>
            <AddPost />
            {
              posts.map(post => 
                !post.deleted &&
                <div key={post.id} className={classes.listItem} key={post.id}>
                  <Paper className={classes.innerList} elevation={4}>
                  <Link to={`/${post.category}/${post.id}`} key={post.id}>
                    <ListItem>
                      <Avatar>
                        <FaceIcon />
                      </Avatar>
                      <ListItemText primary={post.title} secondary={post.body} />
                    </ListItem>
                    <BottomNavigation
                      value='blue'
                      showLabels
                    >
                      <BottomNavigationAction 
                        label={`${post.voteScore} likes`} 
                        icon={post.voteScore < 0 ? <ThumbDown /> : <ThumbUp />} 
                      />
                      <BottomNavigationAction
                        label={`${moment(new Date(post.timestamp)).fromNow()}`}
                        icon={<DateRangeIcon />}
                      />
                      <BottomNavigationAction
                        label={
                          `${calculateCommentCount(post.id, post.commentCount, updatedCommentCounts)} comments`
                        } 
                        icon={<InsertCommentIcon />}
                      />
                      <BottomNavigationAction 
                        label={post.author}
                        icon={<FaceIcon />}
                      />
                    </BottomNavigation>
                    </Link>
                    <VoteButtons
                      postId={post.id}
                    />
                  </Paper>
                </div>
              )
            }
          </List>
        </div>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => ({
  updatedCommentCounts: state.postsReducer.updatedCommentCounts
});

const wrappedComponent = withStyles(styles)(PostsList);
export default connect(mapStateToProps)(wrappedComponent);