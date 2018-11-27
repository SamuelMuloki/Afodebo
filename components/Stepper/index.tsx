import Button from "@material-ui/core/Button"
import MobileStepper from "@material-ui/core/MobileStepper"
import Paper from "@material-ui/core/Paper"
import { Theme, withStyles, WithStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import React from "react"

const styles = (theme: Theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: "hidden",
    display: "block",
    width: "100%",
  },
})

export interface StepperProps extends WithStyles<typeof styles> {
  tutorialSteps: Array<StepperImage>
  theme: Theme
}

export interface StepperState {
  activeStep: number
}

export interface StepperImage {
  imgPath: string
  label: string
}

class Stepper extends React.Component<StepperProps, StepperState> {
  state = {
    activeStep: 0,
  }

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }))
  }

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }))
  }

  render() {
    const { classes, theme, tutorialSteps } = this.props
    const { activeStep } = this.state
    const maxSteps = tutorialSteps.length

    return (
      <>
        <Paper square elevation={0} className={classes.header}>
          <Typography>{tutorialSteps[activeStep].label}</Typography>
        </Paper>
        <img
          className={classes.img}
          src={tutorialSteps[activeStep].imgPath}
          alt={tutorialSteps[activeStep].label}
        />
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={this.handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={this.handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Stepper)
