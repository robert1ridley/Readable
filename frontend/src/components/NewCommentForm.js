import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { addComment } from '../Actions/commentsActions';
import { generateUid } from '../utils';

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

class NewCommentForm extends React.Component {
  state = {
    id: '',
    timestamp: '',
    body: '',
    author: '',
    parentId: '',
    voteScore: 0
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updateStateOnSubmit = () => {
    this.setState({
      timestamp: Date.now(),
      id: generateUid(),
      parentId: this.props.match.params.post
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.updateStateOnSubmit()
    this.props.dispatch(addComment(this.state))
    .then(this.props.closePopUp)
  }

  render() {
    const { open, closePopUp } = this.props;
    return (
      <form>
        <Dialog
          open={open}
          onClose={closePopUp}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add New Comment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter all of the details of your comment. Don't leave any fields blank.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="author"
              id="name"
              label="Your Name"
              type="name"
              onChange={this.handleChange('author')}
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
              label="Comment Body"
              type="text"
              onChange={this.handleChange('body')}
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closePopUp} color="primary">
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
  categories: state.categoryReducer.items
});
const wrappedComponent = withStyles(styles)(NewCommentForm);
const redirectWrappedComponent = withRouter(wrappedComponent);
export default connect(mapStateToProps)(redirectWrappedComponent);