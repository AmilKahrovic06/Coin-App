import React from "react";
import { FiGithub } from "react-icons/fi";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  margin-right: 20px;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 375px;
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 1.7s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.div`
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 8px;
`;

const Location = styled.div`
  font-size: 12px;
  margin-top: 4px;
`;

const Job = styled.div`
  font-size: 10px;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GitHubLink = styled.a`
  margin-top: 50px;
  color: #000;
  text-decoration: none;
`;

const Card = ({ name, location, job, githubLink, image }) => {
  return (
    <CardContainer>
      <Image src={image} alt={name} />
      <Name>{name}</Name>
      <Location>{location}</Location>
      <Job>{job}</Job>
      <GitHubLink href={githubLink} target="_blank">
        <FiGithub size={24} />
      </GitHubLink>
    </CardContainer>
  );
};

export default Card;
