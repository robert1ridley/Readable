import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import { editComment } from '../Actions/commentsActions';

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

class UpdateCommentPopUp extends React.Component {
  state = {
    author: '',
    body: '',
    deleted: '',
    id: '',
    parentDeleted: '',
    parentId: '',
    timestamp: '',
    voteScore: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      author: nextProps.comment.author, 
      body: nextProps.comment.body,
      deleted: nextProps.comment.deleted,
      id: nextProps.comment.id,
      parentDeleted: nextProps.comment.parentDeleted,
      parentId: nextProps.comment.parentId,
      timestamp: nextProps.comment.timestamp,
      voteScore: nextProps.comment.voteScore
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.dispatch(editComment(this.state))
    .then(this.props.closePopUp)
  }

  render() {
    const { body } = this.state;
    return (
      <form>
        <Dialog
          open={this.props.open}
          onClose={this.props.closePopUp}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Comment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your changes. Don't leave any fields blank.
            </DialogContentText>
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
              value={body}
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closePopUp} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit" onClick={(event) => this.handleSubmit(event)}>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.postsReducer.loading,
  error: state.postsReducer.error
});

const wrappedComponent = withRouter(UpdateCommentPopUp);
export default connect(mapStateToProps)(wrappedComponent);