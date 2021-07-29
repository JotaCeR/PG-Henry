const Movie = require("../models/Movie");
const User = require("../models/User");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "autocinehenry@gmail.com", // generated ethereal user
    pass: "ykxotzanjxikdvjt", // generated ethereal password
  },
});

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movieFound = await Movie.findById(id);
    return res.json(movieFound);
  } catch (error) {
    console.log(error);
  }
};

const getMovies = async (req, res) => {
  let movies;
  let { genre } = req.query;
  try {
    if (genre) {
      movies = await Movie.find({ genre: genre }); // tratar de encontrar la búsqueda tipo like de SQL en mongoDB.
      return res.status(200).json(movies);
    } else {
      movies = await Movie.find();
      return res.json(movies);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const postMovie = async (req, res) => {
  try {
    const {
      start,
      finish,
      functionDays,
      times,
      price,
      date,
      title,
      poster,
      description,
      genre,
      onBillboard,
      cast,
      trailer,
      rated,
      runtime,
      director,
      IMDb,
    } = req.body;
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const shows = [];
    const startArr = start.split("-");
    const finishArr = finish.split("-");
    const startDate = new Date(startArr[0], startArr[1] - 1, startArr[2]);
    const finishDate = new Date(finishArr[0], finishArr[1] - 1, finishArr[2]);
    for (i = startDate; i <= finishDate; i.setDate(i.getDate() + 1)) {
      let day = days[i.getDay()];
      if (functionDays.includes(day)) {
        let date = new Date(i);
        let time = times.map(
          (e) =>
            (e = {
              [e]: [
                { slot: "A1", ocuppied: false },
                { slot: "A2", ocuppied: false },
                { slot: "A3", ocuppied: false },
                { slot: "A4", ocuppied: false },
                { slot: "A5", ocuppied: false },
                { slot: "A6", ocuppied: false },
                { slot: "A7", ocuppied: false },
                { slot: "A8", ocuppied: false },
                { slot: "A9", ocuppied: false },
                { slot: "A10", ocuppied: false },
                { slot: "B1", ocuppied: false },
                { slot: "B2", ocuppied: false },
                { slot: "B3", ocuppied: false },
                { slot: "B4", ocuppied: false },
                { slot: "B5", ocuppied: false },
                { slot: "B6", ocuppied: false },
                { slot: "B7", ocuppied: false },
                { slot: "B8", ocuppied: false },
                { slot: "B9", ocuppied: false },
                { slot: "B10", ocuppied: false },
                { slot: "C1", ocuppied: false },
                { slot: "C2", ocuppied: false },
                { slot: "C3", ocuppied: false },
                { slot: "C4", ocuppied: false },
                { slot: "C5", ocuppied: false },
                { slot: "C6", ocuppied: false },
                { slot: "C7", ocuppied: false },
                { slot: "C8", ocuppied: false },
                { slot: "C9", ocuppied: false },
                { slot: "C10", ocuppied: false },
              ],
              cancelled: false,
            })
        );
        shows.push({ date, day, price, time });
      }
    }

    const movie = await new Movie({
      title,
      date,
      poster,
      description,
      genre,
      onBillboard: false,
      shows,
      cast,
      trailer,
      rated,
      runtime,
      director,
      IMDb,
    });
    const movieSaved = await movie.save();
    res.send(movieSaved);
  } catch (error) {
    res.status(400).send(error);
  }
};

const putMovie = async (req, res) => {
  try {
    const {
      title,
      date,
      poster,
      description,
      genre,
      onBillboard,
      shows,
      cast,
      trailer,
      rated,
      runtime,
      director,
      IMDb,
    } = req.body;
    const newMovie = {
      title,
      date,
      poster,
      description,
      genre,
      onBillboard,
      shows,
      cast,
      trailer,
      rated,
      runtime,
      director,
      IMDb,
    };
    await Movie.findByIdAndUpdate(req.params.id, newMovie);
    res.json({ status: "Movie Updated" });
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateShow = async (req, res) => {
  try {
    const { movie_title, date, time } = req.body;
    let movieFound = await Movie.findOne({ title: movie_title });
    let updatedShows = movieFound.shows.map((el) =>
      el.date.includes(date)
        ? {
            ...el,
            time: el.time.map((show) =>
              show.hasOwnProperty(time)
                ? {
                    ...show,
                    cancelled: !show.cancelled,
                  }
                : show
            ),
          }
        : el
    );

    await Movie.findOneAndUpdate(
      { title: movie_title },
      { shows: updatedShows }
    );

    let userslist = await User.find();

    if (
      movieFound.shows.find(
        (el) =>
          el.date.includes(date) &&
          el.time.find((show) => show.hasOwnProperty(time) && !show.cancelled)
      )
    ) {
      await userslist.forEach(async (user) => {
        try {
          if (
            user.bookings.find(
              (el) =>
                el.movie_title === movie_title &&
                el.date === date.slice(0, 10) &&
                el.time === time
            )
          ) {
            await User.findByIdAndUpdate(user._id, {
              bookings: user.bookings.map((el) =>
                el.movie_title !== movie_title &&
                el.date !== date &&
                el.time !== time
                  ? el
                  : {
                      ...el,
                      status: "cancelled",
                    }
              ),
            });
            transporter.sendMail({
              from: '"AutoCine Henry 🎥" <autocinehenry@gmail.com>',
              to: user.email,
              subject: "Show has been cancelled",
              html: `
        <p>We are really sorry to bring you this news, but the show scheduled for ${movie_title}, the day ${date.slice(
                0,
                10
              )} at time ${time} has been cancelled.
        Get in touch with us replying to this email so we can fix the issue.</p>
        <p>Best regards and sorry again!</p>
        <br/><br/>All rights reserved by &copy; <a href="http://localhost:3000">Autocinema App</a></p>
        `,
            });
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
    res.send("Ok");
  } catch (error) {
    console.log(error);
  }
};
const deleteMovie = async (req, res) => {
  try {
    const _id = req.query;
    await Movie.deleteOne({ _id });
    res.json({ message: `Movie has been deleted` });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  getMovieById,
  getMovies,
  postMovie,
  putMovie,
  updateShow,
  deleteMovie,
};
