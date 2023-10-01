import Reservation from "../models/reservationModel.js"



// @Desc  create Reservation
  const  createReservation =async (req, res) => {
    try {
      const { date, place } = req.body;
     
       // Check if there is any existing reservation for the same date, time, and place
    const existingReservation = await Reservation.findOne({
        date,
        place: place,
        isCancled:false
      });
  
      if (existingReservation) {
        return res.status(409).json({ message: 'la salle est indisponible pour cette date' });
      }
      // Create a new Reservation document
      const newReservation = new Reservation({
        date,
        user: req.user.id,
        place: place,
      });
  
      // Save the new reservation to the database
      await newReservation.save();
  
      // Respond with a success message and the saved reservation data
      res.status(201).json({ message: 'Réservation crée avec succès', reservation: newReservation });
    } catch (err) {
      // If there's an error, respond with an error status and message
      res.status(500).json({ message: 'Echec de la création de la réservation', error: err.message });
    }
  };


// @Desc reservations for a specific user
 const getRservationByUser= async (req, res) => {
    try {
      const userId = req.user.id;
  
      // Fetch reservations for the specific user from the database
      const reservations = await Reservation.find({ user: userId }).populate("place")
  
      // Respond with the list of reservations for the user
      res.status(200).json({ reservations });
    } catch (err) {
      // If there's an error, respond with an error status and message
      res.status(500).json({ message: 'Impossible d’obtenir les réservations', error: err.message });
    }
  };

  
  //@Desc get publisher salles reservation

  // @Desc reservations for a specific user
 const getPublisherRservation= async (req, res) => {
  try {
    

    // Fetch owner place  reservations
    const reservation = await Reservation.find({}).populate('place').populate('user').exec();
    
    
    const publisherReservations=await reservation.filter(res=>res.place.ownerId==req.user.id)
    // Respond with the list of reservations 
    res.status(200).json({ publisherReservations });
  } catch (err) {
    // If there's an error, respond with an error status and message
    res.status(500).json({ message: 'Impossible d’obtenir les réservations', error: err.message });
  }
};


  //@Desc cancel reservation
  const cancelReservation=async (req,res)=>{
    // Find the reservation by its ID
    const resId = req.params.id;
  
    const reservation = await Reservation.findById(resId);

    if (!reservation) {
        return res.status(404).json({ message: 'Reservation Introuvable' });
      }

      reservation.isCancled = true
      await reservation.save();

    // Respond with the updated reservation data
    res.status(200).json({ message: 'Mise à jour réussie' });
  }


  export {createReservation,getRservationByUser,cancelReservation,getPublisherRservation}