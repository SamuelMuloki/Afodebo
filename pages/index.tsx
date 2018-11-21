import { Paper, Typography } from "@material-ui/core"
import { createStyles, Theme } from "@material-ui/core/styles"
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles"
import { Layout } from "../components/templates"

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    mainContainer: {
      padding: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit,
    },
  })

interface IProps extends WithStyles<typeof styles> {}

const Index = (props: IProps) => {
  const { classes } = props
  return (
    <Layout>
      <Paper className={classes.mainContainer}>
        <Typography variant="h5">Hello Next.js 👋</Typography>
      </Paper>
    </Layout>
  )
}

export default withStyles(styles)(Index)
