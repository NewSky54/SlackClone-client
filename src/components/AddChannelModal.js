import React from "react";
import { Header, Form, Button, Modal, Input } from "semantic-ui-react";
import { withFormik } from "formik";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";

const AddChannelModal = ({
  openChannel,
  closeChannel,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <Modal open={openChannel} onClose={closeChannel}>
    <Header icon="plus" content="Create Channel" />
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            placeholder="Channel Name"
            fluid
          />
        </Form.Field>
        <Button.Group fluid>
          <Button disabled={isSubmitting} onClick={closeChannel}>
            Cancel
          </Button>
          <Button.Or />
          <Button disabled={isSubmitting} onClick={handleSubmit} positive>
            Save
          </Button>
        </Button.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name)
  }
`;

export default compose(
  graphql(createChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ name: "" }),
    handleSubmit: async (values, { props: { closeChannel, teamId, mutate }, setSubmitting }) => {
      await mutate({ variables: { teamId, name: values.name } });
      closeChannel();
      setSubmitting(false);
    }
  })
)(AddChannelModal);
