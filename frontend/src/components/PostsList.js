import React from 'react';
import { withStyles } from 'material-ui/styles';
import moment from 'moment';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FaceIcon from 'material-ui-icons/Face';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: 30
  },
});

function PostsList(props) {
  const { classes, posts } = props;
  return (
    <div className={classes.root}>
      <List>
        {
          posts.map(post => 
            <div key={post.id}>
              <ListItem>
                <Avatar>
                  <FaceIcon />
                </Avatar>
                <ListItemText primary={post.title} secondary={post.body} />
              </ListItem>
              <p style={{marginLeft:70, fontSize: '80%', fontWeight: 500}}>Likes: 
                <span style={{fontWeight: 100}}> {post.voteScore} </span>
                Date:
                <span style={{fontWeight: 100}}> {`${new Date(post.timestamp).getDay()}/${new Date(post.timestamp).getMonth()}/${new Date(post.timestamp).getFullYear()}`}</span>
                {console.log(new Date(post.timestamp))}
              </p>
            </div>
          )
        }
      </List>
    </div>
  );
}

export default withStyles(styles)(PostsList);