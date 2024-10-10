import express from "express";
const app = express();

//here is the intermediate code
const user = [
  { id: "1", name: "User 1" },
  { id: "2", name: "User 2" },
  { id: "3", name: "User 3" },
  { id: "4", name: "User 4" },
  { id: "5", name: "User 5" },
  { id: "6", name: "User 6" },
  { id: "7", name: "User 7" },
  { id: "8", name: "User 8" },
  { id: "9", name: "User 9" },
  { id: "10", name: "User 10" },
  { id: "11", name: "User 11" },
  { id: "12", name: "User 12" },
  { id: "13", name: "User 13" },
];

const post = [
  { id: "1", name: "Post 1" },
  { id: "2", name: "Post 2" },
  { id: "3", name: "Post 3" },
  { id: "4", name: "Post 4" },
  { id: "5", name: "Post 5" },
  { id: "6", name: "Post 6" },
  { id: "7", name: "Post 7" },
  { id: "8", name: "Post 8" },
  { id: "9", name: "Post 9" },
  { id: "10", name: "Post 10" },
  { id: "11", name: "Post 11" },
  { id: "12", name: "Post 12" },
  { id: "13", name: "Post 13" },
];

function Paginatedresult (model) {
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    //basic pagination
    //index start from 0
    //for page number = 2 and limit number 3
    //for page number = 2 and limit number 3
    const startIndex = (page - 1) * limit; //3rd index ================================= 4th user
    const endIndex = page * limit; //6th index = 7th user =========== but give 5th index(6th user) because end element is not included

    const result = {};

    if (endIndex < model.length) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    result.result = post.slice(startIndex, endIndex);
    res.Paginatedresult = result;
    next();
  };
};

app.get("/post", Paginatedresult(post), (req, res) => {
  res.json(res.Paginatedresult);
});

app.get("/user",  Paginatedresult(user), (req, res) => {
  res.json(res.Paginatedresult);
});

const port = 5000;
app.listen(port);
