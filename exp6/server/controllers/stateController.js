import State from "../models/State.js";

export const getAllStates = async (req, res, next) => {
  try {
    const states = await State.find();
    res.json(states);
  } catch (error) {
    next(error);
  }
};

export const addState = async (req, res, next) => {
  try {
    const newState = new State(req.body);
    await newState.save();
    res.status(201).json(newState);
  } catch (error) {
    next(error);
  }
};
