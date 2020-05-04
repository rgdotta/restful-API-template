//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/templateDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

const templateSchema = {
  title: String,
  character: String,
  origin: String,
};

const Template = mongoose.model("Template", templateSchema);

////Requests targeting all entries.

app
  .route("/templates")
  .get(function (req, res) {
    Template.find({}, function (err, foundtemplates) {
      if (err) {
        console.log(err);
      } else {
        res.send(foundtemplates);
      }
    });
  })
  .post(function (req, res) {
    const newTemplate = new template({
      title: req.body.title,
      character: req.body.character,
      origin: req.body.origin,
    });

    newTemplate.save(function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully added new entry.");
      }
    });
  })
  .delete(function (req, res) {
    Template.deleteMany(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.send("Succesfully deleted all templates");
      }
    });
  });

////Requests targeting specific entries.

//By title
app
  .route("/templates/:templatePart")
  .get(function (req, res) {
    let target = req.params.templatePart;
    Template.findOne({ title: { $regex: target } }, function (
      err,
      foundTemplate
    ) {
      if (err) {
        console.log(err);
      } else if (foundTemplate) {
        res.send(foundTemplate);
      } else {
        res.send("No match with that title.");
      }
    });
  })
  //To avoid unwanted changes, the put and patch method will use the id
  .put(function (req, res) {
    Template.updateOne(
      { _id: req.params.templatePart },
      {
        title: req.body.title,
        character: req.body.character,
        origin: req.body.origin,
      },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          res.send("Succesfully updated.");
        }
      }
    );
  })
  .patch(function (req, res) {
    Template.updateOne(
      { _id: req.params.templatePart },
      { $set: req.body },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          res.send("Succesfully updated.");
        }
      }
    );
  })
  .delete(function (req, res) {
    let target = req.params.templatePart;
    Template.deleteOne({ title: { $regex: target } }, function (err) {
      if (err) {
        console.log(err);
      } else {
        res.send("Succesfully deleted.");
      }
    });
  });

//Get by character
app.route("/templates/character/:templateCharacter").get(function (req, res) {
  let target = req.params.templateCharacter;
  Template.find({ character: { $regex: target } }, function (
    err,
    foundTemplate
  ) {
    if (err) {
      console.log(err);
    } else if (foundTemplate) {
      res.send(foundTemplate);
    } else {
      ("No match with that character.");
    }
  })
    //To avoid unwanted changes, the put and patch method will use the id
    .put(function (req, res) {
      Template.updateOne(
        { _id: req.params.templatePart },
        {
          title: req.body.title,
          character: req.body.character,
          origin: req.body.origin,
        },
        function (err) {
          if (err) {
            console.log(err);
          } else {
            res.send("Succesfully updated.");
          }
        }
      );
    })
    .patch(function (req, res) {
      Template.updateOne(
        { _id: req.params.templatePart },
        { $set: req.body },
        function (err) {
          if (err) {
            console.log(err);
          } else {
            res.send("Succesfully updated.");
          }
        }
      );
    })
    .delete(function (req, res) {
      let target = req.params.templatePart;
      Template.deleteOne({ character: { $regex: target } }, function (err) {
        if (err) {
          console.log(err);
        } else {
          res.send("Succesfully deleted.");
        }
      });
    });
});

//Get by work
app.route("/templates/origin/:templateOrigin").get(function (req, res) {
  let target = req.params.templateOrigin;
  Template.find({ origin: { $regex: target } }, function (err, foundTemplate) {
    if (err) {
      console.log(err);
    } else if (foundTemplate) {
      res.send(foundTemplate);
    } else {
      ("No match with that origin.");
    }
  }) //To avoid unwanted changes, the put and patch method will use the id
    .put(function (req, res) {
      Template.updateOne(
        { _id: req.params.templatePart },
        {
          title: req.body.title,
          character: req.body.character,
          origin: req.body.origin,
        },
        function (err) {
          if (err) {
            console.log(err);
          } else {
            res.send("Succesfully updated.");
          }
        }
      );
    })
    .patch(function (req, res) {
      Template.updateOne(
        { _id: req.params.templatePart },
        { $set: req.body },
        function (err) {
          if (err) {
            console.log(err);
          } else {
            res.send("Succesfully updated.");
          }
        }
      );
    })
    .delete(function (req, res) {
      let target = req.params.templatePart;
      Template.deleteOne({ origin: { $regex: target } }, function (err) {
        if (err) {
          console.log(err);
        } else {
          res.send("Succesfully deleted.");
        }
      });
    });
});

////
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
