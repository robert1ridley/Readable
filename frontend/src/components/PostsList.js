import React from 'react';
import { withStyles } from 'material-ui/styles';
import moment from 'moment';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FaceIcon from 'material-ui-icons/Face';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
import DateRangeIcon from 'material-ui-icons/DateRange';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import InsertCommentIcon from 'material-ui-icons/InsertComment';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: 30,
  },
});

function PostsList(props) {
  const { classes, posts } = props;
  return (
    <div className={classes.root}>
      <List>
        {
          posts.map(post => 
            <div key={post.id} style={{marginBottom: 30, cursor: 'pointer'}}>
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
              </BottomNavigation>
            </div>
          )
        }
      </List>
    </div>
  );
}

export default withStyles(styles)(PostsList);