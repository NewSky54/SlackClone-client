import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
`;

const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`;

const PushLeft = styled.div`
  padding-left: 10px;
`;

const SideBarListItem = styled.li`
  paddding: 2px;
  padding-left: 10px;
  &:hover {
    background: #3e313c;
  }
`;

const Green = styled.span`
  color: #38978d;
`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : "○");

const channel = ({ id, name }, teamId) => (
  <Link key={`channel-${id}`} to={`/view-team/${teamId}/${id}`}>
    <SideBarListItem>{`# ${name}`}</SideBarListItem>
  </Link>
);
//
const user = ({ id, name }) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble /> {name}
  </SideBarListItem>
);

export default ({ teamName, username, channels, users, openChannel, teamId, onInvitePeopleClick }) => (
  <ChannelWrapper>
    <PushLeft>
      <TeamNameHeader>{teamName}</TeamNameHeader>
      {username}
    </PushLeft>
    <div>
      <SideBarList>
        <PushLeft>
          Channels
          {` `}
          <Icon onClick={openChannel} name={"add circle"} />
        </PushLeft>
        {channels.map(c => channel(c, teamId))}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <PushLeft>Direct Messages</PushLeft>
        {users.map(user)}
      </SideBarList>
    </div>
    <div>
      <a href="#invite-people" onClick={onInvitePeopleClick}>
        + Invite People
      </a>
    </div>
  </ChannelWrapper>
);
