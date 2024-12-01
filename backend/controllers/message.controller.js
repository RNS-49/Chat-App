import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js"

export const sendMessage = async (req,res)=>{
   try {
    const {message}= req.body;
    const {id:receiverId}=req.params;
    const senderId=req.user._id;

    let conversation = await Conversation.findOne({
      participants:{$all:[senderId,receiverId]},
    });

    if(!conversation){
      conversation = await Conversation.create({
        participants:[senderId,receiverId],
      });
    }

    const newMessage=new Message({
      senderId,
      receiverId,
      message,
    });
    
    if(newMessage){
         conversation.messages.push(newMessage._id);    // pushing the message into the "conversation" "messages" field
    }
    
   // await conversation.save();
   // await newMessage.save();

   await Promise.all([conversation.save(), newMessage.save()]);   // both will occur at the same time
    res.status(201).json(newMessage);
   } catch (error) {
    console.error("error in sendmessage controller:",error.message);
    res.status(500).json({error:"internal server error"});
   }
};


export const getMessages= async(req,res)=>{
  try {
    const {id: userToChatId} = req.params;   // its the id of the receiver
    const senderId = req.user._id;            // id of the one when send the message
    

    const conversation = await Conversation.findOne({
      participants:{$all:[senderId,userToChatId]},
    }).populate("messages");

    if(!conversation){
       res.status(200).json([]);
    }
    
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.error("error in getMessages controller:",error.message);
    res.status(500).json({error:"internal server error"});
  }
}