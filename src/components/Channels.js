import React from "react";
import styled from "styled-components";

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
  &:hover{
    background: #3e313c;
  }
`;

const Green = styled.span`
  color: #38978d;
`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : "○");

const channel = ({ id, name }) => (
  <SideBarListItem key={`channel-${id}`}>{`# ${name}`}</SideBarListItem>
);

const user = ({ id, name }) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble /> {name}
  </SideBarListItem>
);

export default ({ teamName, username, channels, users }) => (
  <ChannelWrapper>
    <PushLeft>
      <TeamNameHeader>{teamName}</TeamNameHeader>
      {username}
    </PushLeft>
    <div>
      <SideBarList>
        <PushLeft>Channels</PushLeft>
        {channels.map(channel)}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <PushLeft>Direct Messages</PushLeft>
        {users.map(user)}
      </SideBarList>
    </div>
  </ChannelWrapper>
);
