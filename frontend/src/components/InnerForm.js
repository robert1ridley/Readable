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

class InnerForm extends React.Component {
  render() {
    console.log(this.props)
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
              onChange={this.props.handleChange('author')}
              value={this.props.formData.author}
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
              onChange={this.props.handleChange('title')}
              value={this.props.formData.title}
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
              onChange={this.props.handleChange('body')}
              value={this.props.formData.body}
              fullWidth
              required
            />
            <TextField
              id="select-category-native"
              select
              label="Category"
              name="category"
              className={classes.textField}
              value={this.props.formData.category}
              onChange={this.props.handleChange('category')}
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
            <Button color="primary" type="submit" onClick={(event) => this.props.handleSubmit(event)}>
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

const wrappedComponent = withStyles(styles)(InnerForm);
export default connect(mapStateToProps)(wrappedComponent);