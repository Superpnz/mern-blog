import mongoose from "mongoose";
import Message from "../models/Message.js"

export const createMessage = async (req, res) => {
    const { text, author} = req.body;
    try {
        const message = await Message.create({text, author});
        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({createdAt: -1});
        res.status(200).json(messages);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const getMessage = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such message'});
    }

    try {
        const message = await Message.findById(id);

        if(!message) {
            return res.status(404).json({error: 'No such message'});
        }

        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const deleteMessage = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such message'});
    }

    try {
        const message = await Message.findByIdAndDelete(id);

        if(!message) {
            return res.status(404).json({error: 'No such message'});
        }

        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const updateMessage = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such message'});
    }

    try {
        const message = await Message.findByIdAndUpdate(
            id,
            {...req.body},
            {new: true, runValidators: true}
        );

        if(!message) {
            return res.status(404).json({error: 'No such message'});
        }

        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}