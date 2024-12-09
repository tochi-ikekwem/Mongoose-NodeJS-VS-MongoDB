// app.js  

// Import required packages  
const mongoose = require('mongoose');  
require('dotenv').config(); // Load environment variables from .env file  

// Connect to MongoDB using Mongoose  
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })  
  .then(() => console.log('MongoDB connected...'))  
  .catch(err => console.log(err));  

// Define a Person schema  
const personSchema = new mongoose.Schema({  
  name: { type: String, required: true }, // Name is required  
  age: Number, // Age is optional  
  favoriteFoods: { type: [String], default: [] } // Array of favorite foods with default to empty array  
});  

// Create a Person model  
const Person = mongoose.model('Person', personSchema);



// Create a new person instance  
const person = new Person({  
    name: 'John Doe',  
    age: 30,  
    favoriteFoods: ['Pizza', 'Pasta']  
  });  
  
  // Save the person to the database  
  person.save(function(err, data) {  
    if (err) return console.error(err);  
    console.log('Person saved:', data);  
  });



  // Array of people to create  
const arrayOfPeople = [  
    { name: 'Mary', age: 25, favoriteFoods: ['Burritos', 'Tacos'] },  
    { name: 'Alice', age: 28, favoriteFoods: ['Sushi', 'Salad'] },  
    { name: 'Bob', age: 22, favoriteFoods: ['Steak', 'Fries'] }  
  ];  
  
  // Use model.create() to save multiple records  
  Person.create(arrayOfPeople, (err, data) => {  
    if (err) return console.error(err);  
    console.log('Multiple people saved:', data);  
  });



  // Find all people named 'John Doe'  
Person.find({ name: 'John Doe' }, (err, people) => {  
    if (err) return console.error(err);  
    console.log('Found people:', people);  
  });




  // Function to find a person by favorite food  
const findPersonByFood = (food) => {  
    Person.findOne({ favoriteFoods: food }, (err, person) => {  
      if (err) return console.error(err);  
      console.log('Found person with favorite food:', person);  
    });  
  };  
  
  // Example usage  
  findPersonByFood('Pizza');




// Function to find a person by ID  
const findPersonById = (personId) => {  
    Person.findById(personId, (err, person) => {  
      if (err) return console.error(err);  
      console.log('Found person by ID:', person);  
    });  
  };  
  
  // Example usage (replace with a valid person ID)  
  findPersonById('your_person_id_here');



  const updateFavoriteFood = (personId) => {  
    Person.findById(personId, (err, person) => {  
      if (err) return console.error(err);  
      person.favoriteFoods.push('Hamburger'); // Add a new food  
      person.save((err, updatedPerson) => {  
        if (err) return console.error(err);  
        console.log('Updated person:', updatedPerson);  
      });  
    });  
  };  
  
  // Example usage (replace with a valid person ID)  
  updateFavoriteFood('your_person_id_here');




  const updatePersonAgeByName = (personName) => {  
    Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true }, (err, updatedPerson) => {  
      if (err) return console.error(err);  
      console.log('Updated person:', updatedPerson);  
    });  
  };  
  
  // Example usage  
  updatePersonAgeByName('John Doe');




  const deletePersonById = (personId) => {  
    Person.findByIdAndRemove(personId, (err, deletedPerson) => {  
      if (err) return console.error(err);  
      console.log('Deleted person:', deletedPerson);  
    });  
  };  
  
  // Example usage (replace with a valid person ID)  
  deletePersonById('your_person_id_here');




  const deletePeopleByName = (name) => {  
    Person.remove({ name: name }, (err, result) => {  
      if (err) return console.error(err);  
      console.log('Delete result:', result);  
    });  
  };  
  
  // Example usage  
  deletePeopleByName('Mary');




  const findBurritoLovers = () => {  
    Person.find({ favoriteFoods: 'Burritos' })  
      .sort({ name: 1 }) // Sort by name  
      .limit(2) // Limit to 2 results  
      .select('-age') // Exclude age from results  
      .exec((err, data) => {  
        if (err) return console.error(err);  
        console.log('Burrito lovers:', data);  
      });  
  };  
  
  // Example usage  
  findBurritoLovers();