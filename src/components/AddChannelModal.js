import React from "react";
import gql from "graphql-tag";
import { Header, Form, Button, Modal, Input } from "semantic-ui-react";
import { withFormik } from "formik";
import { compose, graphql } from "react-apollo";
import { allTeamsQuery } from "../graphql/team";
import { findIndex } from "lodash";

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
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        id
        name
      }
    }
  }
`;

export default compose(
  graphql(createChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ name: "" }),
    handleSubmit: async (values, { props: { closeChannel, teamId, mutate }, setSubmitting }) => {
      await mutate({
        variables: { teamId, name: values.name },
        createChannel: {
          __typename: "Mutation",
          channel: {
            __typename: "Channel",
            id: -1,
            name: values.name
          }
        },
        update: (store, { data: { createChannel } }) => {
          const { ok, channel } = createChannel;
          // console.log("OK", ok);
          // console.log("channel:", channel);
          if (!ok) {
            return;
          }
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: allTeamsQuery });
          // Add our comment from the mutation to the end.
          const teamIdx = findIndex(data.allTeams, ["id", teamId]);
          data.allTeams[teamIdx].channels.push(channel);
          // Write our data back to the cache.
          store.writeQuery({ query: allTeamsQuery, data });
        }
      });
      closeChannel();
      setSubmitting(false);
    }
  })
)(AddChannelModal);
