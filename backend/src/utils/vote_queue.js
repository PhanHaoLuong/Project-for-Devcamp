import post from '../models/post.model.js';

const vote_queue = []; //currently using memory to store votes, can be replaced with a database
const BATCH_SIZE = 10;
const BATCH_INTERVAL = 10000;

const process_votes = async () => {
    if (vote_queue.length === 0) return;

    const votesToProcess = vote_queue.splice(0, BATCH_SIZE);

    const bulkWriteOps = votesToProcess.map(({ postid, voteChange }) => ({
        updateOne: {
            filter: { _id: postid },
            update: { $inc: { votes: voteChange } },
        },
    }));

    try {
        await post.bulkWrite(bulkWriteOps);
    } catch (error) {
        console.error('Error processing votes:', error);
    }
}

setInterval(process_votes, BATCH_INTERVAL);

export const add_vote = (postid, author, voteChange) => {
    vote_queue.push({ postid, author, voteChange });
};