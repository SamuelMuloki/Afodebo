import { createStyles, Theme } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Stepper from "@material-ui/core/Stepper"
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles"
import Typography from "@material-ui/core/Typography"
import React from "react"
import AddressForm from "./AddressForm"
import PaymentForm from "./PaymentForm"
import Review from "./Review"

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    layout: {
      width: "auto",
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
      [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
        width: 600,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 2,
      [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
        marginTop: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit * 6,
        padding: theme.spacing.unit * 3,
      },
    },
    stepper: {
      padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
    },
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
    },
    button: {
      marginTop: theme.spacing.unit * 3,
      marginLeft: theme.spacing.unit,
    },
  })

const steps = ["Shipping address", "Payment details", "Review your order"]

export const getStepContent = step => {
  switch (step) {
    case 0:
      return <AddressForm />
    case 1:
      return <PaymentForm />
    case 2:
      return <Review />
    default:
      throw new Error("Unknown step")
  }
}

export interface CheckoutProps extends WithStyles<typeof styles> {}

export interface CheckoutState {
  activeStep: number
}

class Checkout extends React.Component<CheckoutProps, CheckoutState> {
  state = {
    activeStep: 0,
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }))
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }))
  }

  handleReset = () => {
    this.setState({
      activeStep: 0,
    })
  }

  render() {
    const { classes } = this.props
    const { activeStep } = this.state

    return (
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={this.handleBack} className={classes.button}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      </Paper>
    )
  }
}

export default withStyles(styles)(Checkout)
