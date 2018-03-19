import React from 'react';
import { connect } from 'react-redux';
import { fetchSinglePost } from '../Actions/postsActions';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import ThumbUp from 'material-ui-icons/ThumbUp';

const styles = {
  card: {
    minWidth: 275,
    marginTop: 30
  },
  title: {
    marginBottom: 16,
    fontSize: 18,
    fontWeight: 700
  },
  pos: {
    marginBottom: 12,
  },
};

class SinglePost extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchSinglePost(this.props.match.params.post));
  }

  render() {
    return (
      <div>
        {
          this.props.post!== {} &&
          <div>
            <Grid container spacing={24} style={{flexGrow: 1}}>
              <Grid item md={3} xs={1} />
              <Grid item md={6} xs={10}>
                <Card style={styles.card}>
                  <CardContent>
                    <Typography style={styles.title} color="textSecondary">
                      {this.props.post.title}
                    </Typography>
                    <Typography component="p">
                      {this.props.post.body}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="textSecondary" style={{maxWidth: 50, minWidth: 0}}><ThumbUp /> &nbsp;{this.props.post.voteScore}</Button>
                    <Button size="small" style={{maxWidth: 10, minWidth: 0, margin: 0}}>+</Button>
                    <Button size="small" style={{maxWidth: 10, minWidth: 0, margin: 0}}>-</Button>
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

export default connect(mapStateToProps)(SinglePost);