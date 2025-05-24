const mongoose = require('mongoose');
const Course = require('../models/Course');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Course.deleteMany();
  await Course.insertMany([
    {
      title: 'Guitar Basics',
      description: 'Learn chords, strumming, and more.',
      image: 'https://via.placeholder.com/150'
    },
    {
      title: 'Piano Level 1',
      description: 'Intro to keyboard and sheet music.',
      image: 'https://via.placeholder.com/150'
    },
    {
      title: 'Drumming Essentials',
      description: 'Master rhythm and coordination.',
      image: 'https://via.placeholder.com/150'
    },
    {
      title: 'Violin Beginner',
      description: 'Get started with the violin.',
      image: 'https://via.placeholder.com/150'
    }
  ]);
  console.log('Courses seeded!');
  mongoose.disconnect();
});