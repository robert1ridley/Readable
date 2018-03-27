import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

export default class FormDialog extends React.Component {
  state = {
    topic: ''
  };

handleChange = event => {
  this.setState({ [event.target.name]: event.target.value });
};

  render() {
    return (
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
            id="title"
            label="Post Title"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            multiline
            rows="4"
            id="body"
            label="Post Body"
            type="text"
            fullWidth
          />
          <Select
            value={this.state.topic}
            onChange={this.handleChange}
            inputProps={{
              name: 'topic',
              id: 'topic-simple',
            }}
            fullWidth
            helperText="Please select your topic"
          >
            <MenuItem value="Topic">
              <em>Topic</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.closePopUp} color="primary">
            Cancel
          </Button>
          <Button color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
