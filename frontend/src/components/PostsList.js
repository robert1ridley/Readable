import React from 'react';
import { Link } from 'react-router-dom';
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
    marginTop: theme.spacing.unit * 3
  }),
});

function PostsList(props) {
  const { classes, posts } = props;
  return (
    <Grid container spacing={24} style={{flexGrow: 1}}>
      <Grid item md={3} xs={1} />
      <Grid item md={6} xs={10}>
        <div className={classes.root}>
          <List>
            {
              posts.map(post => 
                post.deleted !== true &&
                <Link to={`/${post.category}/${post.id}`} key={post.id}>
                  <div key={post.id} className={classes.listItem}>
                    <Paper className={classes.innerList} elevation={4}>
                      <ListItem>
                        <Avatar>
                          <FaceIcon />
                        </Avatar>
                        <ListItemText primary={post.title} secondary={post.body} />
                      </ListItem>
                      <BottomNavigation
                        value='blue'
                        showLabels
                        style={{maxWidth: 400}}
                      >
                        <BottomNavigationAction 
                          label={`${post.voteScore} likes`} 
                          icon={post.voteScore < 0 ? <ThumbDown /> : <ThumbUp />} 
                        />
                        <BottomNavigationAction 
                          label={`${new Date(post.timestamp).getDay()}/${new Date(post.timestamp).getMonth()}/${new Date(post.timestamp).getFullYear()}`}
                          icon={<DateRangeIcon />}
                        />
                        <BottomNavigationAction 
                          label={`${post.commentCount} comments`} 
                          icon={<InsertCommentIcon />}
                        />
                        <BottomNavigationAction 
                          label={post.author}
                          icon={<FaceIcon />}
                        />
                      </BottomNavigation>
                    </Paper>
                  </div>
                </Link>
              )
            }
          </List>
        </div>
       </Grid>
     </Grid>
  );
}

export default withStyles(styles)(PostsList);