import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const filterArrayText = ["Newest Posts", "Oldest Posts", "Most Likes", "Fewest Likes"]

class SortButtons extends React.Component {
  state = {
    activeIndex: 0
  }

  handleFilterChange(index) {
    this.setState({
      activeIndex: index
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {
          filterArrayText.map((text, index) => 
          <Button 
            className={classes.button}
            key={index}
            color={this.state.activeIndex === index ? "primary" : "default"}
            onClick={() => this.handleFilterChange(index)}
          >
            {text}
          </Button>
          )
        }
      </div>
    )
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});


export default withStyles(styles)(SortButtons);