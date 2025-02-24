import {createClient } from "redis";

const redis = await createClient({url: process.env.REDIS_URL}).connect();

export default redis;