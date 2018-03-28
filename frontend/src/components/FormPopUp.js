import React from 'react';
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
    author: '',
    title: '',
    body: '',
    category: 'Choose a category',
    timestamp: '',
    id: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit(event) {
    console.log("evoked")
    event.preventDefault();
    this.setState({
      timestamp: Date.now(),
      id: guid()
    })
  }

  render() {
    console.log(this.state)
    const { classes, categories } = this.props;
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
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
            <Button color="primary" type="submit">
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
export default connect(mapStateToProps)(wrappedComponent);