import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Paper from 'material-ui/Paper';
import Tooltip from 'material-ui/Tooltip';
import FormPopUp from '../components/FormPopUp';

const styles = theme => ({
  addButtonContainer: {
    marginLeft: 20,
    marginRight: 20,
    minHeight: 20,
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#3f51b5',
    cursor: 'pointer'
  },
  addButton: {
    color: 'white'
  }
});

class AddPost extends React.Component {
  state = {
    open: false
  }

  openPopup = () => {
    this.setState({
      open: true
    })
  }

  closePopUp = () => {
    this.setState({
      open: false
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Tooltip id="tooltip-icon" title="Create New Post">
          <Paper 
            className={classes.addButtonContainer}
            elevation={4}
            onClick={this.openPopup}
          >
            <AddIcon className={classes.addButton} />
          </Paper>
        </Tooltip>
        <FormPopUp
          open={this.state.open}
          closePopUp={this.closePopUp}
        />
      </div>
    )
  }
}

export default withStyles(styles)(AddPost);