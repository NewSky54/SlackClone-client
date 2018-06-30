import React from "react";
import gql from "graphql-tag";
import { Header, Form, Button, Modal, Input } from "semantic-ui-react";
import { withFormik } from "formik";
import { compose, graphql } from "react-apollo";
import findIndex from "lodash/findIndex";
import { allTeamsQuery } from "../graphql/team";

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

  // Why Formik over Redux-Forms?
  //   • AccordingDan Abramov, form state is inherently ephemeral and local, so tracking it in Redux (or any kind of Flux library) is unnecessary
  //   • Redux-Form calls your entire top-level Redux reducer multiple times ON EVERY SINGLE KEYSTROKE. This is fine for small apps, but as your Redux app grows, input latency will continue to increase if you use Redux-Form.
  //   • Redux-Form is 22.5 kB minified gzipped (Formik is 7.8 kB)
  withFormik({
    mapPropsToValues: () => ({ name: "" }),
    handleSubmit: async (values, { props: { closeChannel, teamId, mutate }, setSubmitting }) => {
      await mutate({
        // The 'variables' which will be used to execute the mutation operation.
        // Should correspond to the variables that my mutation definition accepts.
        variables: { teamId, name: values.name },
        // The optimistic response option allows me to make my mutations feel faster by
        // simulating the result of your mutation in your UI before the mutation actually finishes.
        optimisticResponse: {
          createChannel: {
            __typename: "Mutation",
            ok: true,
            channel: {
              __typename: "Channel",
              id: -1,
              name: values.name
            }
          }
        },
        // Using 'update' I can update my store based on my mutation’s result. I.e. Updating my cache
        update: (store, { data: { createChannel } }) => {
          const { ok, channel } = createChannel;
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
