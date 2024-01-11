import styled from "styled-components";
import Card from "../components/Card.js";
import useSWR from "swr";
import { StyledLink } from "../components/StyledLink.js";

const List = styled.ul`
  max-width: 1000px;
  width: 100vw;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-left: 0;
`;

const ListItem = styled.li`
  position: relative;
  width: 100%;
  padding: 0 1rem;
`;

const FixedLink = styled(StyledLink)`
  position: fixed;
  bottom: 50px;
  right: 50px;
`;
export default function Home() {
  const { data } = useSWR("/api/places", { fallbackData: [] });

  return (
    <>
      <FixedLink href="/create" passHref legacyBehavior>
        + place
      </FixedLink>
      <List role="list">
        {data.map((place) => {
          return (
            <ListItem key={place._id}>
              <Card
                name={place.name}
                image={place.image}
                location={place.location}
                id={`${place._id.$oid ?? place._id}`}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
