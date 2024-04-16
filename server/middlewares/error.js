const errorMiddleware = (err,req,res,next)=>{

    err.message = err.message || 'Internal Server Error';
    err.status = err.status ||  500;

    return res.status(err.status).json({
        success: false,
        message: err.message,
    })

};

const TryCatch = (passedFunction)=> async(req,res,next)=>{
    try {
        
        await passedFunction(req,res,next);

    } catch (error) {
        next(error);
    }
}

export { errorMiddleware,TryCatch};