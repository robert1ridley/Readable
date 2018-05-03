import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

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
    body: '',
    id: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  };

  componentWillReceiveProps(nextProps) {
    console.log("EVOKED")
    this.setState({
      body: nextProps.comment.body,
      id: nextProps.comment.id
    })
  }

  // handleSubmit = async (event) => {
  //   event.preventDefault();
  //   this.props.dispatch(editPost(this.state))
  //   .then(this.props.history.push("/"))
  // }

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
              // onChange={this.handleChange('body')}
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

// const mapStateToProps = state => ({
//   post: state.postsReducer.singleItem,
//   loading: state.postsReducer.loading,
//   error: state.postsReducer.error
// });

// const wrappedComponent = withStyles(styles)(UpdatePostPopUp);
// const wrappedComponentWithRouter = withRouter(wrappedComponent);
// export default connect(mapStateToProps)(wrappedComponentWithRouter);
export default UpdateCommentPopUp;