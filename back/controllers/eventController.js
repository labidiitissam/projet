import Place from "../models/placeModel.js";


// @Desc create place
 const createPlace=async (req, res) => {
    try {
      // Extract the place details from the request body
      const {
        eventPlaceName,
        ownerPhoneNumber,
        eventPlaceAdress,
        Description,
        price,
        eventPlaceImage
      } = req.body;
      const existingPlace = await Place.findOne({ eventPlaceName });

      if (existingPlace) {
        return res.status(500).json({ message: 'Une Salle portant le même nom existe déjà' });
      }
  
      // Create a new Place document
      const newPlace = new Place({
        eventPlaceName,
        eventPlaceAdress,
        ownerPhoneNumber,
        Description:Description,
        price,
        ownerId:req.user.id,
        Availability:true,
        eventPlaceImage
      });
      // Save the new place to the database
      await newPlace.save();
  
      // Respond with a success message and the saved place data
      res.status(201).json({ message: 'Salle crée', place: newPlace });
    } catch (err) {
      // If there's an error, respond with an error status and message
      res.status(500).json({ message: 'Echec de la création de salle', error: err.message });
    }
  };

  // @Desc Get a list of all places
   const getlistOfEventPlaces=async (req, res) => {
    try {
      // Fetch all places from the database
      const places = await Place.find({}).populate({
        path: 'ownerId',
        select: '-password' // Exclude the 'password' field
      });
  
      // Respond with the list of places
      res.status(200).json({ places });
    } catch (err) {
      // If there's an error, respond with an error status and message
      res.status(500).json({ message: 'Impossible d’obtenir la liste des salles', error: err.message });
    }
  };



 // @Desc update place by id 
 const updatePlace=async (req, res) => {
    try {
      const placeId = req.params.id;
       
      // Find the place by its ID
      const place = await Place.findById(placeId);
  
      if (!place) {
        return res.status(404).json({ message: 'Salle introuvable' });
      }
      console.log(req.user.id,place.ownerId.toHexString())
      if(req.user.id != place.ownerId.toHexString()) {
        return res.status(404).json({ message: 'Non autorisé' });
      }
     
      // Update the place fields with the new values from the request body
      place.eventPlaceName = req.body.eventPlaceName;
      place.eventPlaceAdress = req.body.eventPlaceAdress;
      place.ownerPhoneNumber = req.body.ownerPhoneNumber;
      place.Description = req.body.Description;
      place.price = req.body.price;
      place.Availability=req.body.Availability
  
      // Save the updated place to the database
      await place.save();
  
      // Respond with the updated place data
      res.status(200).json({ message: 'Mise à jour réussie', place });
    } catch (err) {
      // If there's an error, respond with an error status and message
      res.status(500).json({ message: 'Echec de la mise à jour', error: err.message });
    }
  };
  

  


  export {createPlace,getlistOfEventPlaces,updatePlace}