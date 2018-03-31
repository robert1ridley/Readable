import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { editPost, editPostForm } from '../Actions/postsActions';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class UpdatePostPopUp extends React.Component {
  handleChange = name => event => {
    this.props.dispatch(editPostForm(name, event.target.value))
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.dispatch(editPost(this.props.post))
    .then(this.props.closePopUp)
    .then(this.props.history.push("/"))
  }

  render() {
    const { post } = this.props;
    return (
      <form>
        <Dialog
          open={this.props.open}
          onClose={this.props.closePopUp}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your changes. Don't leave any fields blank.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              id="title"
              label="Post Title"
              type="text"
              onChange={this.handleChange('title')}
              value={post.title}
              fullWidth
              required
            />
            <TextField
              autoFocus
              margin="dense"
              multiline
              rows="2"
              name="body"
              id="body"
              label="Post Body"
              type="text"
              onChange={this.handleChange('body')}
              value={post.body}
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closePopUp} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit" onClick={(event) => this.handleSubmit(event)}>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  post: state.postsReducer.singleItem,
  loading: state.postsReducer.loading,
  error: state.postsReducer.error
});

const wrappedComponent = withStyles(styles)(UpdatePostPopUp);
const wrappedComponentWithRouter = withRouter(wrappedComponent);
export default connect(mapStateToProps)(wrappedComponentWithRouter);