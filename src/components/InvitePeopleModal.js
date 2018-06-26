import React from "react";
import gql from "graphql-tag";
import { Header, Form, Button, Modal, Input } from "semantic-ui-react";
import { withFormik } from "formik";
import { compose, graphql } from "react-apollo";
import normalizeErrors from "../normalizeErrors";
const InvitePeopleModal = ({
  openChannel,
  closeChannel,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  touched,
  errors
}) => (
  <Modal open={openChannel} onClose={closeChannel}>
    <Header icon="plus" content="Add People to your Team" />
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            placeholder="User's email"
            fluid
          />
        </Form.Field>
        {touched.email && errors.email ? errors.email[0] : null}
        <Button.Group fluid>
          <Button disabled={isSubmitting} onClick={closeChannel}>
            Cancel
          </Button>
          <Button.Or />
          <Button disabled={isSubmitting} onClick={handleSubmit} positive>
            Add User
          </Button>
        </Button.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const addTeamMemberMutation = gql`
  mutation($email: String!, $teamId: Int!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default compose(
  graphql(addTeamMemberMutation),
  withFormik({
    mapPropsToValues: () => ({ email: "" }),
    handleSubmit: async (
      values,
      { props: { closeChannel, teamId, mutate }, setSubmitting, setErrors }
    ) => {
      const response = await mutate({
        variables: { teamId, email: values.email }
      });
      const { ok, errors } = response.data.addTeamMember;
      if (ok) {
        console.log('OK:', normalizeErrors(ok))
        closeChannel();
        setSubmitting(false);
      } else {
        setSubmitting(false);
        setErrors(normalizeErrors(errors));
      }
    }
  })
)(InvitePeopleModal);
