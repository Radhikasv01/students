// src/Components/Home.js
import React, { useState } from 'react';
import {
  Container, Grid, Card, CardMedia, CardContent,
  Typography, CardActionArea, Box, Paper
} from '@mui/material';

const cards = [
  {
    id: 1,
    title: "Student Books",
   image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
    content: "Explore a wide range of subject books recommended by the school."
  },
  {
    id: 2,
    title: "Courses",
   image: "https://img.freepik.com/free-photo/online-courses-concept_23-2148572965.jpg",
    content: "Check out all the available courses and their schedules."
  },
  {
    id: 3,
    title: "Sports Activities",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
    content: "Get involved in sports and view the upcoming events."
  },
  {
    id: 4,
    title: "Register List",
image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80",
    path: "/registerlist",
  },
];

const Home = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Welcome to Student Portal
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.id}>
            <Card onClick={() => setSelectedCard(card)}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={card.image}
                  alt={card.title}
                />
                <CardContent>
                  <Typography variant="h6">{card.title}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedCard && (
        <Paper sx={{ mt: 4, p: 3 }}>
          <Typography variant="h5" gutterBottom>{selectedCard.title}</Typography>
          <Typography variant="body1">{selectedCard.content}</Typography>
        </Paper>
      )}
    </Container>
  );
};

export default Home;


