import React from "react";
import styled from "styled-components";
import Card from "./about_us.styled";
import ahmedImage from "./images/ahmed.jpg";
import esmaImage from "./images/esma.jpg";
import amilImage from "./images/amil.jpg";
import ajsaImage from "./images/ajsa.jpg";

const CardsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const AboutUsPage = () => {
  return (
    <CardsWrapper>
      <Card
        image={amilImage}
        name="Amil Kahrovic"
        location="Novi Pazar, Serbia"
        job="Amil Kahrovic works as Web Developer"
        githubLink="https://github.com/AmilKahrovic06"
        imageUrl="link-to-image-1"
      />
      <Card
        image={esmaImage}
        name="Esma Becovic"
        location="Novi Pazar, Serbia"
        job="Esma Becovic works as Web Developer"
        githubLink="https://github.com/esmabecovic"
        imageUrl="link-to-image-2"
      />
      <Card
        image={ahmedImage}
        name="Ahmed Vucelj"
        location="Novi Pazar, Serbia"
        job="Ahmed Vucelj works as Web Developer"
        githubLink="https://github.com/ahmedvucelj06"
        imageUrl="link-to-image-2"
      />

      <Card
        image={ajsaImage}
        name="Ajsa Nicevic"
        location="Novi Pazar, Serbia"
        job="Ajsa Nicevic works as Web Developer"
        githubLink="https://www.github.com/your-username"
        imageUrl="link-to-image-2"
      />
    </CardsWrapper>
  );
};

export default AboutUsPage;
