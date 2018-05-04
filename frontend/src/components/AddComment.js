import React from 'react';
import { withStyles } from 'material-ui/styles';
import AddIcon from 'material-ui-icons/Add';
import Paper from 'material-ui/Paper';
import Tooltip from 'material-ui/Tooltip';
import NewCommentForm from '../components/NewCommentForm';

const styles = theme => ({
  addButtonContainer: {
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

class AddComment extends React.Component {
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
      <div style={{marginBottom: 20}}>
        <Tooltip id="tooltip-icon" title="Add New Comment">
          <Paper 
            className={classes.addButtonContainer}
            elevation={4}
            onClick={this.openPopup}
          >
            <AddIcon className={classes.addButton} />
          </Paper>
        </Tooltip>
        <NewCommentForm
          open={this.state.open}
          closePopUp={this.closePopUp}
        />
      </div>
    )
  }
}

export default withStyles(styles)(AddComment);