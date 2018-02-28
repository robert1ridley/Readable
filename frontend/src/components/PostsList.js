import React from 'react';
import { withStyles } from 'material-ui/styles';
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
            <ListItem key={post.id}>
              <Avatar>
                <FaceIcon />
              </Avatar>
              <ListItemText primary={post.title} secondary={post.body} />
            </ListItem>
          )
        }
      </List>
    </div>
  );
}

export default withStyles(styles)(PostsList);
