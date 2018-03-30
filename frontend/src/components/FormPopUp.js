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
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import { addPost } from '../Actions/postsActions';

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

function guid() {
  function _p8(s) {
      var p = (Math.random().toString(16)+"000000000").substr(2,8);
      return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}

class FormPopUp extends React.Component {
  state = {
    id: '',
    timestamp: '',
    title: '',
    body: '',
    author: '',
    voteScore: 1,
    commentCount: 0,
    category: 'react'
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updateStateOnSubmit = () => {
    this.setState({
      timestamp: Date.now(),
      id: guid()
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.updateStateOnSubmit()
    this.props.dispatch(addPost(this.state))
    .then(this.props.closePopUp)
    .then(this.props.history.push("/"))
  }

  render() {
    const { classes, categories } = this.props;
    return (
      <form>
        <Dialog
          open={this.props.open}
          onClose={this.props.closePopUp}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add New Post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter all of the details of the post you would like to make. Don't leave any fields blank.
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
              name="title"
              id="title"
              label="Post Title"
              type="text"
              onChange={this.handleChange('title')}
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
              fullWidth
              required
            />
            <TextField
              id="select-category-native"
              select
              label="Category"
              name="category"
              className={classes.textField}
              value={this.state.category}
              onChange={this.handleChange('category')}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu
                },
              }}
              helperText="Please select the category of your post"
              margin="normal"
              required
            >
              {categories.map(option => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
              ))}
            </TextField>
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
  categories: state.categoryReducer.items
});

const wrappedComponent = withStyles(styles)(FormPopUp);
const redirectWrappedComponent = withRouter(wrappedComponent);
export default connect(mapStateToProps)(redirectWrappedComponent);