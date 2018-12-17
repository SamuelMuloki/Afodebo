import React from "react"
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap"
import { strapiRegister } from "../components/libs/auth"

export interface SignUpProps {
  isAuthenticated: boolean
}

export interface SignUpState {
  data: {
    email: string
    username: string
    password: string
  }
  loading: boolean
  error: string
}

class SignUp extends React.Component<SignUpProps, SignUpState> {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        email: "",
        username: "",
        password: "",
      },
      loading: false,
      error: "",
    }
  }

  onChange(propertyName, event) {
    const { data } = this.state
    data[propertyName] = event.target.value
    this.setState({ data })
  }
  onSubmit() {
    const {
      data: { email, username, password },
    } = this.state
    this.setState({ loading: true })

    strapiRegister(username, email, password)
      .then(() => this.setState({ loading: false }))
      .catch(error => this.setState({ error }))
  }

  render() {
    const { error } = this.state
    return (
      <main>
        <Row>
          <Col sm="12" md={{ size: 5, offset: 3 }}>
            <div className="paper">
              <div className="header">
                <img src="https://strapi.io/assets/images/logo.png" />
              </div>
              <section className="wrapper">
                <div className="notification">{error}</div>
                <Form>
                  <FormGroup>
                    <Label>Username:</Label>
                    <Input
                      onChange={this.onChange.bind(this, "username")}
                      type="text"
                      name="username"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email:</Label>
                    <Input
                      onChange={this.onChange.bind(this, "email")}
                      type="email"
                      name="email"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password:</Label>
                    <Input
                      onChange={this.onChange.bind(this, "password")}
                      type="password"
                      name="password"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <span>
                      <a href="">
                        <small>Forgot Password?</small>
                      </a>
                    </span>
                    <Button
                      style={{ float: "right", width: 120 }}
                      color="primary"
                      onClick={this.onSubmit.bind(this)}
                    >
                      Submit
                    </Button>
                  </FormGroup>
                </Form>
              </section>
            </div>
          </Col>
        </Row>
        <style jsx>
          {`
            .paper {
              border: 1px solid lightgray;
              box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
                0px 1px 1px 0px rgba(0, 0, 0, 0.14),
                0px 2px 1px -1px rgba(0, 0, 0, 0.12);
              height: 540px;
              border-radius: 6px;
              margin-top: 90px;
            }
            .notification {
              color: #ab003c;
            }
            .header {
              width: 100%;
              height: 120px;
              background-color: #3f51b5;
              margin-bottom: 30px;
              border-radius-top: 6px;
            }
            .wrapper {
              padding: 10px 30px 20px 30px !important;
            }
            a {
              color: blue !important;
            }
            img {
              margin: 15px 30px 10px 50px;
            }
          `}
        </style>
      </main>
    )
  }
}
export default SignUp
