import { Request } from "express";
import { Follower } from "./followers.model";

const createFollowerIntoDB = async(req:Request)=>{
const { chefId } = req.body;
const followerId = req.user.id;

const result = await Follower.create({
    chefId,
    followerId
})

return result;
}

const removeFollowerFromDB = async(req:Request)=>{
const { chefId } = req.body;
const followerId = req.user.id;

const result = await Follower.deleteOne({
    chefId,
    followerId
})

return result;
}

const getMyFollowersFromDB = async(req:Request)=>{
const chefId = req.user.id;

const result = await Follower.find({
    chefId
})

return result;
}

const getMyFollowingFromDB = async(req:Request)=>{
const followerId = req.user.id;

const result = await Follower.find({
    followerId
})

return result;
}

export const FollowerService = {
    createFollowerIntoDB,removeFollowerFromDB, getMyFollowersFromDB, getMyFollowingFromDB
}